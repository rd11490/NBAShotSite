package endpoints

import com.amazonaws.services.lambda.runtime.Context
import datamodel.TeamInfo
import io.circe.generic.auto._
import io.github.mkotsur.aws.handler.Lambda.{Proxy, _}
import io.github.mkotsur.aws.proxy
import io.github.mkotsur.aws.proxy.ProxyResponse
import storage.PostgresClient
import storage.tables.NBATables
import utils.Creds

import scala.concurrent.ExecutionContext

class TeamNameAdderHandler extends Proxy[Seq[TeamInfo], String] {

  implicit val executionContext: ExecutionContext = ExecutionContext.global

  override def handle(input: proxy.ProxyRequest[Seq[TeamInfo]],
                      c: Context): Either[Throwable, ProxyResponse[String]] = {
    val auth = input.headers.flatMap(v => v.get("Authorization"))
    if (auth.exists(PlayerInfoAdderHandler.verifyId)) {
      val message = input.body match {
        case Some(teams) =>
          val success =
            PostgresClient.insertInto(NBATables.team_info, teams)
          if (success) "Success" else "Failure"
        case None => "No Players Provided"
      }
      APIResponse.response(Some(message))
    } else {
      APIResponse.noAuthResponse()
    }
  }
}

object TeamNameAdderHandler {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  def verifyId(id: String): Boolean = {
    Creds.getCreds.Write.exists(v => v.equalsIgnoreCase(id))
  }
}
