package endpoints

import com.amazonaws.services.lambda.runtime.Context
import datamodel.PlayerInfo
import io.circe.generic.auto._
import io.github.mkotsur.aws.handler.Lambda.{Proxy, _}
import io.github.mkotsur.aws.proxy
import io.github.mkotsur.aws.proxy.ProxyResponse
import storage.PostgresClient
import storage.tables.NBATables
import utils.Creds

import scala.concurrent.ExecutionContext

class PlayerInfoAdderHandler extends Proxy[Seq[PlayerInfo], String] {
  implicit val executionContext: ExecutionContext = ExecutionContext.global
  override def handle(input: proxy.ProxyRequest[Seq[PlayerInfo]],
                      c: Context): Either[Throwable, ProxyResponse[String]] = {
    val auth = input.headers.flatMap(v => v.get("Authorization"))
    if (auth.exists(PlayerInfoAdderHandler.verifyId)) {
      val message = input.body match {
        case Some(players) =>
          val success =
            PostgresClient.insertInto(NBATables.player_info, players)
          if (success) "Success" else "Failure"
        case None => "No Players Provided"
      }
      APIResponse.response(Some(message))
    } else {
      APIResponse.noAuthResponse()
    }
  }
}

object PlayerInfoAdderHandler {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  def verifyId(id: String): Boolean = {
    Creds.getCreds.Write.exists(v => v.equalsIgnoreCase(id))
  }
}
