package com.rrdinsights.shotcompare.utils

import com.github.mauricio.async.db.Connection

import scala.concurrent.Future

/**
 * From David Pollak's Control Structure.
 */
private[shotcompare] object Control {

  /**
   *
   * @param param of type A; passed to func
   * @param func any function or whatever that matches the signature
   * @tparam A any type with def close(): Unit; Java's Closeable interface should be compatible
   * @tparam B any type including Any
   * @return of type B
   */
  def using[A <: { def disconnect: Future[Connection] }, B](param: A)(func: A => B): B =
    try {
      func(param)
    } finally {
      // close even when an Exception is caught
      if (param != null) param.disconnect
    }

}