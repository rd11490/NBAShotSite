package endpoints

import com.amazonaws.services.lambda.runtime.Context
import datamodel._
import io.circe.generic.auto._
import io.github.mkotsur.aws.handler.Lambda.{Proxy, _}
import io.github.mkotsur.aws.proxy
import io.github.mkotsur.aws.proxy.ProxyResponse
import storage.PostgresClient
import storage.tables.NBATables
import utils.Creds

import scala.concurrent.ExecutionContext

class PossessionsAdderHandler extends Proxy[Seq[OneWayPossession], String] {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  override def handle(
                       input: proxy.ProxyRequest[Seq[OneWayPossession]],
                       c: Context): Either[Throwable, ProxyResponse[String]] = {

    val logger = c.getLogger
    logger.log("Adding possessions - check auth")
    val auth = input.headers.flatMap(v => v.get("Authorization"))
    if (auth.exists(PossessionsAdderHandler.verifyId)) {
      val message = input.body match {
        case Some(possessions) =>
          logger.log("possessions - auth passed")
          val success = PostgresClient.insertInto(NBATables.possessions_table, possessions)
          logger.log("wrote to table - auth passed")
          if (success) "Success" else "Failure"
        case None => "No Shot Provided"
      }
      APIResponse.response(Some(message))
    } else {
      APIResponse.noAuthResponse()
    }

  }
}

object PossessionsAdderHandler {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  def verifyId(id: String): Boolean = {
    Creds.getCreds.Write.exists(v => v.equalsIgnoreCase(id))
  }
}












