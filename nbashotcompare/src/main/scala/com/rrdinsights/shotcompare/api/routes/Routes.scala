package com.rrdinsights.shotcompare.api.routes

import java.util.concurrent.Executor

import akka.actor.ActorSystem
import akka.util.Timeout
import com.rrdinsights.shotcompare.api.endpoints.{ InternalEndpoint, ShotChartEndpoint }
import org.json4s.NoTypeHints
import org.json4s.jackson.Serialization
import akka.http.scaladsl.server.Directives.{ pathPrefix, _ }
import akka.http.scaladsl.server.Route

import scala.concurrent.duration._
import scala.concurrent.{ ExecutionContext, ExecutionContextExecutor }

trait Routes {
  implicit def system: ActorSystem

  implicit lazy val timeout: Timeout = Timeout(60 seconds) // usually we'd obtain the timeout from the system's configuration
  implicit val formats = Serialization.formats(NoTypeHints)
  implicit lazy val global: ExecutionContextExecutor =
    ExecutionContext.fromExecutor(null: Executor)

  val internalEndpoint: InternalEndpoint = new InternalEndpoint()
  val shotChartEndpoint: ShotChartEndpoint = new ShotChartEndpoint()

  lazy val routes: Route = concat(
    internalEndpoint.internalRoutes,
    shotChartEndpoint.shotChartRoutes
  )

}
