package utils

import java.io.InputStream

import org.json4s.{ DefaultFormats, _ }
import org.json4s.jackson.JsonMethods._

object Creds {
  implicit val defaultFormats = DefaultFormats
  private val fileLocation: String = "/Creds.json"
  private lazy val creds: Creds = parse(
    scala.io.Source.fromInputStream(getStream()).getLines.mkString
  )
    .extract[Creds]

  private def getStream( /*IO*/ ): InputStream =
    getClass.getResourceAsStream(fileLocation)

  def getCreds: EnvironmentCreds =
    creds.Production
}
final case class Creds(Local: EnvironmentCreds, Production: EnvironmentCreds)

final case class EnvironmentCreds(
  MySQL: Option[MySQLCred],
  Postgresql: Option[PostgresqlCred],
  Write: Option[String]
)

final case class MySQLCred(Username: String, Password: String)

final case class PostgresqlCred(
  Username: String,
  Password: Option[String] = None,
  Hostname: String = "localhost",
  Port: Int = 5432
)
