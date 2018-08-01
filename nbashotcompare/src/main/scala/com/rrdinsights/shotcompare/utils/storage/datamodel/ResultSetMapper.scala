package com.rrdinsights.shotcompare.utils.storage.datamodel

import java.{ lang => jl }

import com.github.mauricio.async.db.RowData

trait ResultSetMapper {
  protected def getInt(resultSet: RowData, col: Int): jl.Integer = {
    val value = resultSet(col)
    if (value == null) {
      null
    } else {
      jl.Integer.valueOf(value.asInstanceOf[Int])
    }
  }

  protected def getString(resultSet: RowData, col: Int): String = {
    val value = resultSet(col)
    if (value == null) {
      null
    } else {
      value.asInstanceOf[String]
    }
  }

  protected def getBoolean(resultSet: RowData, col: Int): jl.Boolean = {
    val value = resultSet(col)
    if (resultSet == null) {
      null
    } else {
      jl.Boolean.valueOf(value.asInstanceOf[Boolean])
    }
  }

  protected def getDouble(resultSet: RowData, col: Int): jl.Double = {
    val value = resultSet(col)
    if (value == null) {
      null
    } else {
      jl.Double.valueOf(value.asInstanceOf[Double])
    }
  }

  protected def getLong(resultSet: RowData, col: Int): jl.Long = {
    val value = resultSet(col)
    if (value == null) {
      null
    } else {
      jl.Long.valueOf(value.asInstanceOf[Long])
    }
  }
}