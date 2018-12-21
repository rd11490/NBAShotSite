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

class FourFactorsAdderHandler extends Proxy[Seq[RealAdjustedFourFactors], String] {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  override def handle(
                       input: proxy.ProxyRequest[Seq[RealAdjustedFourFactors]],
                       c: Context): Either[Throwable, ProxyResponse[String]] = {

    val auth = input.headers.flatMap(v => v.get("Authorization"))
    if (auth.exists(FourFactorsAdderHandler.verifyId)) {
      val message = input.body match {
        case Some(fourFactors) =>
          val success = PostgresClient.insertInto(NBATables.real_adjusted_four_factors, fourFactors)
          if (success) "Success" else "Failure"
        case None => "No Shot Provided"
      }
      APIResponse.response(Some(message))
    } else {
      APIResponse.noAuthResponse()
    }

  }
}

object FourFactorsAdderHandler {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  def verifyId(id: String): Boolean = {
    Creds.getCreds.Write.exists(v => v.equalsIgnoreCase(id))
  }
}




