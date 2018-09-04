import sbt.Keys._
import sbt._

name := "NBA Shot Site"

scalaVersion := "2.12.4"
assemblyJarName in assembly := "nbashotsite.jar"

libraryDependencies ++= Seq(
  "com.amazonaws" % "aws-lambda-java-events" % "2.2.1",
  "com.amazonaws" % "aws-lambda-java-core" % "1.2.0",
  "com.github.mauricio" %% "postgresql-async" % "0.2.21",
  "io.github.mkotsur" %% "aws-lambda-scala" % "0.0.13",
  "org.json4s" %% "json4s-jackson" % "3.6.0",
  "org.scalatest" %% "scalatest" % "3.0.1" % Test,
  "org.mockito" % "mockito-all" % "1.9.5" % Test
)
