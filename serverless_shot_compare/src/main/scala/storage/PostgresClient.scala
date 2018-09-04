package storage

import com.github.mauricio.async.db.util.ExecutorServiceUtils.CachedExecutionContext
import com.github.mauricio.async.db.{QueryResult, RowData}
import org.json4s.{DefaultFormats, JValue}
import org.json4s.jackson.JsonMethods._
import storage.tables.PostgresTable
import utils.NullSafe

import scala.concurrent.duration._
import scala.concurrent.{Await, Future}

object PostgresClient {

  /*
    Constants
   */
  private val Drop: String = "DROP"
  private val Create: String = "CREATE"
  private val Table: String = "TABLE"
  private val If: String = "IF"
  private val Not: String = "NOT"
  private val Exists: String = "EXISTS"
  private val Insert: String = "INSERT"
  private val Into: String = "INTO"
  private val Values: String = "VALUES"
  private val Null: String = "NULL"
  private val Select: String = "SELECT"
  private val From: String = "FROM"
  private val And: String = " AND "
  private val Excluded: String = "Excluded"
  private val Add: String = "Add"
  private val Index: String = "INDEX"

  private val IfNotExists: String = s"$If $Not $Exists"

  private val PrimaryKey: String = "primaryKey"

  private val DuplicateKey: String = s"ON CONFLICT ($PrimaryKey) DO UPDATE SET"

  val BadTerms: Seq[String] = Seq(Drop, Insert, Create, ";", Add, Index)

  implicit val formats = DefaultFormats

  /*
    Public Methods
   */
  def createTable(table: PostgresTable): Boolean = {
    val out = PostgresConnection
      .getConnection(Database.nba)
      .sendQuery(createTableStatement(table.name, table.columns))
    Await.result(out, 5 seconds)
    out.isCompleted
  }

  def dropTable(table: PostgresTable): Boolean = {
    val out = PostgresConnection
      .getConnection(Database.nba)
      .sendQuery(dropTableStatement(table.name))
    Await.result(out, 5 seconds)
    out.isCompleted
  }

  def insertInto[T <: Product](table: PostgresTable, data: Seq[T]): Boolean = {
    if (data.nonEmpty) {
      data
        .grouped(100)
        .map(insertIntoGrouped(table, _))
        .reduce(_ & _)
    } else {
      true
    }

  }

  def insertIntoGrouped[T <: Product](
    table: PostgresTable,
    data: Seq[T]
  ): Boolean = {
    val query = insertTableStatement(table, data)
    try {
      val out = PostgresConnection.getConnection(Database.nba).sendQuery(query)
      Await.result(out, 5 seconds)
      out.isCompleted
    } catch {
      case e: Throwable =>
        println(query)
        println(e)
        throw e
    }
  }

  def selectFromAndWait[T <: Product](
    table: PostgresTable,
    rowMapper: RowData => T,
    whereClauses: String*
  ): Seq[T] = {
    val future: Future[QueryResult] = PostgresConnection
      .getConnection(Database.nba)
      .sendQuery(selectTableStatement(table, whereClauses: _*))
    val result = future.map(queryResult =>
      queryResult.rows match {
        case Some(rows) =>
          rows.map(v => rowMapper(v))
        case None =>
          Seq.empty[T]
      })
    Await.result(result, 300 seconds)
  }

  def selectFrom[T <: Product](
    table: PostgresTable,
    rowMapper: RowData => T,
    whereClauses: String*
  ): Future[Seq[T]] = {
    val future: Future[QueryResult] = PostgresConnection
      .getConnection(Database.nba)
      .sendQuery(selectTableStatement(table, whereClauses: _*))
    future.map(queryResult =>
      queryResult.rows match {
        case Some(rows) =>
          rows.map(v => rowMapper(v))
        case None =>
          Seq.empty[T]
      })
  }

  def selectSeasons(table: PostgresTable): Future[Seq[String]] = {
    val future: Future[QueryResult] = PostgresConnection
      .getConnection(Database.nba)
      .sendQuery(selectSeasonStatement(table))

    future.map(queryResult =>
      queryResult.rows match {
        case Some(rows) =>
          rows.map(v => v(0).asInstanceOf[String])
        case None =>
          Seq.empty[String]
      })
  }

  private def selectSeasonStatement(table: PostgresTable): String =
    s"$Select DISTINCT season $From ${table.name}"

  /*
    Private Methods
   */

  private[storage] def selectTableStatement(
    table: PostgresTable,
    whereClauses: String*
  ): String =
    trace(
      s"$Select ${toColumnNamesForSelect(table)} $From ${table.name}${
        if (whereClauses.nonEmpty)
          whereClauses.mkString(" WHERE ", And, "")
        else ""
      }"
    )

  private[storage] def createTableStatement(
    name: String,
    fields: Seq[SqlTypeHolder]
  ): String =
    trace(
      s"$Create $Table $IfNotExists $name ${createFieldsStatement(fields)}".trim
    )

  private def primaryKeyStatement(fields: Seq[SqlTypeHolder]): String =
    if (fields.map(_.fieldName).contains(PrimaryKey)) {
      s" PRIMARY KEY ($PrimaryKey)"
    } else {
      ""
    }

  private def dropTableStatement(name: String): String =
    s"$Drop $Table $If $Exists $name"

  private def insertTableStatement[T <: Product](
    table: PostgresTable,
    data: Seq[T]
  ): String =
    s"$Insert $Into ${table.name} ${toColumnNamesForInsert(table)} $Values ${
      toValueRows(
        data
      )
    } $DuplicateKey ${toDuplicateReplaceValues(table.columns)}"

  private def toColumnNames(table: PostgresTable): Seq[String] =
    table.columns.map(v => s"""${v.fieldName.toLowerCase}""")

  private def toColumnNamesForSelect(table: PostgresTable): String =
    toColumnNames(table).mkString(", ")

  private def toColumnNamesForInsert(table: PostgresTable): String =
    toColumnNames(table).mkString("(", ", ", ")")

  private def toValueRows[T <: Product](data: Seq[T]): String =
    data.map(toValueRow(_)).mkString(", ")

  private def toValueRow[T <: Product](data: T): String =
    data.productIterator.map(convertToString).mkString("(", ", ", ")")

  private def toDuplicateReplaceValues(fields: Seq[SqlTypeHolder]): String =
    fields
      .filterNot(_.fieldName == PrimaryKey)
      .map(toUpdateValue)
      .mkString(", ")

  private def toUpdateValue(field: SqlTypeHolder): String =
    s"${field.fieldName} = $Excluded.${field.fieldName}"

  private def convertToString(s: Any): String =
    if (s == null) {
      null
    } else {
      s match {
        case str: String =>
          "\'" + cleanString(str) + "\'"
        case jval: JValue =>
          "\'" + compact(render(jval)) + "\'"
        case _ =>
          s.toString
      }
    }

  private def cleanString(str: String): String = {
    str.replaceAll("'", "")
  }

  private def createFieldsStatement(fields: Seq[SqlTypeHolder]): String =
    if (fields.isEmpty) {
      ""
    } else {
      (fields
        .map(toSqlColumn) :+ primaryKeyStatement(fields))
        .filter(NullSafe.isNotNullOrEmpty)
        .mkString("(", ", ", ")")
    }

  private def toSqlColumn(sqlTypeHolder: SqlTypeHolder): String =
    if (sqlTypeHolder.fieldName == PrimaryKey) {
      s"${sqlTypeHolder.sqlColumn} $Not $Null"
    } else {
      sqlTypeHolder.sqlColumn
    }

  private def trace[T](stmt: T): T = {
    println(stmt)
    stmt
  }
}
