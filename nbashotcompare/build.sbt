import sbt.Keys.resolvers

lazy val akkaHttpVersion = "10.0.11"
lazy val akkaVersion = "2.5.8"

resolvers += Resolver.mavenLocal
resolvers += Resolver.publishMavenLocal

lazy val root = (project in file(".")).
  settings(
    inThisBuild(List(
      organization := "com.rrdinsights",
      scalaVersion := "2.12.4"
    )),
    name := "NBAShotCompare",
    libraryDependencies ++= Seq(
      "com.typesafe.akka" %% "akka-http" % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-http-spray-json" % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-http-xml" % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-stream" % akkaVersion,
      "com.rrdinsights.scalabrine" % "scalabrine" % "0.0.3",
      "org.scala-lang" % "scala-reflect" % "2.12.4",
      "org.apache.commons" % "commons-lang3" % "3.5",
      "commons-cli" % "commons-cli" % "1.4",
      "com.github.mauricio" %% "postgresql-async" % "0.2.21",
      "com.typesafe.akka" %% "akka-http-testkit" % akkaHttpVersion % Test,
      "com.typesafe.akka" %% "akka-testkit" % akkaVersion % Test,
      "com.typesafe.akka" %% "akka-stream-testkit" % akkaVersion % Test,
      "org.scalatest" %% "scalatest" % "3.0.1" % Test))
assemblyJarName in assembly := "NBA_Shot_Compare.jar"




