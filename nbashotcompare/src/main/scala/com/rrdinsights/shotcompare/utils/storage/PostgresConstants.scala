package com.rrdinsights.shotcompare.utils.storage

import scala.reflect.runtime.universe._
import java.{ lang => jl }

object PostgresUtils {

  private val I: Type = localTypeOf[Int]
  private val JI: Type = localTypeOf[jl.Integer]
  private val S: Type = localTypeOf[String]
  private val D: Type = localTypeOf[Double]
  private val JD: Type = localTypeOf[jl.Double]
  private val L: Type = localTypeOf[Long]
  private val JL: Type = localTypeOf[jl.Long]
  private val B: Type = localTypeOf[Boolean]
  private val JB: Type = localTypeOf[jl.Boolean]

  private def mirror: Mirror = {
    runtimeMirror(Thread.currentThread().getContextClassLoader)
  }

  def localTypeOf[T: TypeTag]: `Type` = {
    val tag = implicitly[TypeTag[T]]
    tag.in(mirror).tpe.dealias
  }

  private[storage] def getFields[T: TypeTag]: IndexedSeq[SqlTypeHolder] = {
    typeOf[T].members.sorted.filter(!_.isMethod).map(convertTypeToSqlType).toIndexedSeq
  }

  private def convertTypeToSqlType(sym: Symbol): SqlTypeHolder = {
    val typeName = sym.typeSignature.dealias match {
      case t if t <:< JI || t <:< I => "INTEGER"
      case t if t <:< S => "VARCHAR(255)"
      case t if t <:< D || t <:< JD => "Double precision"
      case t if t <:< L || t <:< JL => "BIGINT"
      case t if t <:< JB || t <:< B => "BOOLEAN"
    }
    SqlTypeHolder(sym.name.toString.trim(), typeName)
  }
}

final case class SqlTypeHolder(fieldName: String, SqlType: String) {
  def sqlColumn: String = s"$fieldName $SqlType"
}

sealed trait Database

object Database {
  case object nba extends Database
}