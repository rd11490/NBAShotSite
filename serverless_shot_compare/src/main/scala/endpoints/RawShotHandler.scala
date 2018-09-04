package endpoints

import com.amazonaws.services.lambda.runtime.Context
import datamodel._
import io.circe.generic.auto._
import io.github.mkotsur.aws.handler.Lambda.{Proxy, _}
import io.github.mkotsur.aws.proxy
import io.github.mkotsur.aws.proxy.ProxyResponse
import shotselect.ShotSelect

import scala.concurrent.{ExecutionContext, Future}

class RawShotHandler extends Proxy[RawShotRequest, RawShots] {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  import utils.RichFuture._

  override def handle(
                       input: proxy.ProxyRequest[RawShotRequest],
                       c: Context): Either[Throwable, ProxyResponse[RawShots]] = {

    val response = input.body.map(v => {
      val shotParams = ParamsHandler.handleRawParams(v)
      RawShotHandler.selectRawShots(shotParams).await
    })
    APIResponse.response(response)
  }
}

object RawShotHandler {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  def selectRawShots(params: RawShotRequest): Future[RawShots] =
    ShotSelect.selectData(params.params.getOrElse(ShotRequest()))
      .map(v => v.map(c => RawShotResponse(c)))
      .map(v => RawShots(params, v))
}
