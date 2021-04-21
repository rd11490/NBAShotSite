package endpoints

import com.amazonaws.services.lambda.runtime.Context
import datamodel.{SeasonsResponse}
import io.circe.generic.auto._
import io.github.mkotsur.aws.handler.Lambda.{Proxy, _}
import io.github.mkotsur.aws.proxy
import io.github.mkotsur.aws.proxy.ProxyResponse
import storage.PostgresClient
import storage.tables.NBATables

import scala.concurrent.{ExecutionContext, Future}

class SeasonHandler extends Proxy[String, SeasonsResponse] {
  import utils.RichFuture._
  implicit val executionContext: ExecutionContext = ExecutionContext.global
  override def handle(
      input: proxy.ProxyRequest[String],
      c: Context): Either[Throwable, ProxyResponse[SeasonsResponse]] = {
    val response = SeasonHandler.selectSeasons().map(v => SeasonsResponse(v.sorted.reverse)).await
    APIResponse.response(Some(response))
  }
}

object SeasonHandler {
  implicit val executionContext: ExecutionContext = ExecutionContext.global
  def selectSeasons( /*IO*/ ): Future[Seq[String]] = {
    PostgresClient
      .selectSeasons(NBATables.seasons)
  }
}
