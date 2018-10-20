package endpoints

import com.amazonaws.services.lambda.runtime.Context
import datamodel._
import io.circe.generic.auto._
import io.github.mkotsur.aws.handler.Lambda.{Proxy, _}
import io.github.mkotsur.aws.proxy
import io.github.mkotsur.aws.proxy.ProxyResponse
import shotselect.ShotSelect
import storage.PostgresClient
import storage.tables.NBATables
import utils.Creds

import scala.concurrent.{ExecutionContext, Future}

class RawShotAdderHandler extends Proxy[ShotWithPlayers, String] {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  import utils.RichFuture._

  override def handle(
                       input: proxy.ProxyRequest[ShotWithPlayers],
                       c: Context): Either[Throwable, ProxyResponse[String]] = {

    val auth = input.headers.flatMap(v => v.get("Authorization"))
    if (auth.exists(RawShotAdderHandler.verifyId)) {
      val message = input.body match {
        case Some(shot) =>
          val success = PostgresClient.insertInto(NBATables.lineup_shots, Seq(shot))
          if (success) "Success" else "Failure"
        case None => "No Shot Provided"
      }
      APIResponse.response(Some(message))
    } else {
      APIResponse.noAuthResponse()
    }

  }
}
object RawShotAdderHandler {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  def verifyId(id: String): Boolean = {
    Creds.getCreds.Write.exists(v => v.equalsIgnoreCase(id))
  }
}


