package endpoints

import com.amazonaws.services.lambda.runtime.Context
import datamodel._
import dataselect.PossessionsSelect
import io.circe.generic.auto._
import io.github.mkotsur.aws.handler.Lambda.{Proxy, _}
import io.github.mkotsur.aws.proxy
import io.github.mkotsur.aws.proxy.ProxyResponse
import org.json4s.{DefaultFormats, Formats}

import scala.concurrent.{ExecutionContext, Future}


class PossessionsHandler extends Proxy[PossessionsRequest, PossessionsResponse] {
  implicit val executionContext: ExecutionContext = ExecutionContext.global
  implicit val formats: Formats = DefaultFormats

  import utils.RichFuture._

  override def handle(input: proxy.ProxyRequest[PossessionsRequest],
                      c: Context): Either[Throwable, ProxyResponse[PossessionsResponse]] = {
    val response = input.body.map(v => {
      val possessions = ParamsHandler.handlePossessionParams(v)
      PossessionsHandler.selectPossessions(possessions).await
    })
    APIResponse.response(response)
  }
}

object PossessionsHandler {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  def selectPossessions(params: PossessionsRequest): Future[PossessionsResponse] =
    PossessionsSelect.selectPossessions(params.params.getOrElse(PossessionRequestParams())).map(v => PossessionsResponse(params, v))
}



