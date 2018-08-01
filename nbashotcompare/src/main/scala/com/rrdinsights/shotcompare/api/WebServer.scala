package com.rrdinsights.shotcompare.api

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.stream.ActorMaterializer
import com.rrdinsights.shotcompare.api.routes.Routes
import com.rrdinsights.shotcompare.utils.Creds

import scala.concurrent.Await
import scala.concurrent.duration.Duration

object WebServer extends App with Routes {

  // set up ActorSystem and other dependencies here
  //#main-class
  //#server-bootstrapping
  implicit val system: ActorSystem = ActorSystem("ShotChartAkkaHttpServer")
  implicit val materializer: ActorMaterializer = ActorMaterializer()
  //#server-bootstrapping

  //#main-class
  // from the UserRoutes trait
  //#main-class

  Creds.getCreds

  //#http-server
  Http().bindAndHandle(routes, "localhost", 8080)

  println(s"Server online at http://localhost:8080/")

  Await.result(system.whenTerminated, Duration.Inf)
  //#http-server
  //#main-class
}

//#main-class
