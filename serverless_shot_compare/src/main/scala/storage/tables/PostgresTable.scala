package storage.tables

import storage.{PostgresUtils, SqlTypeHolder}

import scala.reflect.runtime.universe._

trait PostgresTable {
  def name: String

  def columns: Seq[SqlTypeHolder]
}

private[storage] object PostgresTable {

  private final case class TableImpl[T: TypeTag](_name: String) extends PostgresTable {
    override def name: String = _name

    override def columns: IndexedSeq[SqlTypeHolder] = PostgresUtils.getFields[T]
  }

  def apply[T: TypeTag](name: String): PostgresTable =
    TableImpl[T](name)
}