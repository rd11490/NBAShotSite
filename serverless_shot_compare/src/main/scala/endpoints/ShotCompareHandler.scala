package endpoints

import com.amazonaws.services.lambda.runtime.Context
import datamodel._
import io.circe.generic.auto._
import io.github.mkotsur.aws.handler.Lambda.{Proxy, _}
import io.github.mkotsur.aws.proxy
import io.github.mkotsur.aws.proxy.ProxyResponse
import shotselect.ShotSelect

import scala.concurrent.{ExecutionContext, Future}

class ShotCompareHandler extends Proxy[CompareShotRequest, ZonedShotCompareResponse] {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  import utils.RichFuture._

  override def handle(input: proxy.ProxyRequest[CompareShotRequest],
                      c: Context): Either[Throwable, ProxyResponse[ZonedShotCompareResponse]] = {

    val response = input.body.map(v => {
      val params = ParamsHandler.handleCompareParams(v)
      ShotCompareHandler.selectShots(params).await
    })
    APIResponse.response(response)

  }
}

object ShotCompareHandler {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  def selectShots(params: CompareShotRequest): Future[ZonedShotCompareResponse] = {
    val left = ShotSelect.selectZonedShots(params.params.map(_.shots1).getOrElse(ShotRequest()))
    val right = ShotSelect.selectZonedShots(params.params.map(_.shots2).getOrElse(ShotRequest()))

    for {
      first <- left
      second <- right
    } yield ZonedShotCompareResponse(params, ZonedShotCompare(first, second))

  }
}




