package endpoints

import com.amazonaws.services.lambda.runtime.Context
import datamodel._
import io.circe.generic.auto._
import io.github.mkotsur.aws.handler.Lambda.{Proxy, _}
import io.github.mkotsur.aws.proxy
import io.github.mkotsur.aws.proxy.ProxyResponse
import shotselect.ShotSelect

import scala.concurrent.{ExecutionContext, Future}

class ShotFrequencyHandler extends Proxy[FrequencyShotRequest, ZonedShotsResponse] {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  import utils.RichFuture._

  override def handle(input: proxy.ProxyRequest[FrequencyShotRequest],
                      c: Context): Either[Throwable, ProxyResponse[ZonedShotsResponse]] = {

    val response = input.body.map(v => {
      println("Parsing Body")
      println(v)
      val shotParams = ParamsHandler.handleFrequencyParams(v)
      ShotFrequencyHandler.selectShots(shotParams).await
    })
    APIResponse.response(response)
  }
}

object ShotFrequencyHandler {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  def selectShots(params: FrequencyShotRequest): Future[ZonedShotsResponse] =
    ShotSelect.selectZonedShots(params.params.getOrElse(ShotRequest())).map(v => ZonedShotsResponse(params, v))
}


