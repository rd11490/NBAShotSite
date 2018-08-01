package com.rrdinsights.shotcompare.utils.storage

import com.github.mauricio.async.db.pool.{ ConnectionPool, PoolConfiguration }
import com.github.mauricio.async.db.{ Configuration, Connection }
import com.github.mauricio.async.db.postgresql.PostgreSQLConnection
import com.github.mauricio.async.db.postgresql.pool.PostgreSQLConnectionFactory
import com.rrdinsights.shotcompare.utils.Creds

import scala.concurrent.{ Await, ExecutionContext }
import scala.concurrent.duration._

object PostgresConnection {

  var pools: scala.collection.mutable.Map[Database, ConnectionPool[PostgreSQLConnection]] = scala.collection.mutable.Map.empty

  def getConnection(database: Database): ConnectionPool[PostgreSQLConnection] = {
    if (pools.get(database).isEmpty) {
      val configuration = Configuration(
        username = Creds.getCreds.Postgresql.get.Username,
        password = Creds.getCreds.Postgresql.get.Password,
        database = Some(database.toString),
        host = Creds.getCreds.Postgresql.get.Hostname,
        port = Creds.getCreds.Postgresql.get.Port
      )

      val connectionFactory = new PostgreSQLConnectionFactory(configuration)
      val connectionPool = new ConnectionPool(connectionFactory, PoolConfiguration.Default, ExecutionContext.global)

      pools.put(database, connectionPool)
    }
    pools(database)

  }

  def destory(database: Database, connection: PostgreSQLConnection): Unit =
    if (pools.get(database).nonEmpty) {
      pools(database).disconnect
    }

}