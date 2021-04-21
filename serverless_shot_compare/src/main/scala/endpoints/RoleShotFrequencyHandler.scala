package endpoints

import com.amazonaws.services.lambda.runtime.Context
import datamodel._
import dataselect.ShotSelect
import io.circe.generic.auto._
import io.github.mkotsur.aws.handler.Lambda.{Proxy, _}
import io.github.mkotsur.aws.proxy
import io.github.mkotsur.aws.proxy.ProxyResponse
import org.json4s.{DefaultFormats, Formats}

import scala.concurrent.{ExecutionContext, Future}


class RoleShotFrequencyHandler extends Proxy[FrequencyRoleShotRequest, ZonedRoleShotsResponse] {
  implicit val executionContext: ExecutionContext = ExecutionContext.global
  implicit val formats: Formats = DefaultFormats

  import utils.RichFuture._

  override def handle(input: proxy.ProxyRequest[FrequencyRoleShotRequest],
                      c: Context): Either[Throwable, ProxyResponse[ZonedRoleShotsResponse]] = {
    val response = input.body.map(v => {
      val shotParams = ParamsHandler.handleFrequencyRoleParams(v)
      RoleShotFrequencyHandler.selectShots(shotParams).await
    })
    APIResponse.response(response)
  }
}

object RoleShotFrequencyHandler {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  def selectShots(params: FrequencyRoleShotRequest): Future[ZonedRoleShotsResponse] =
    ShotSelect.selectZonedRoleShots(params.params.getOrElse(ShotRequestWithRole())).map(v => ZonedRoleShotsResponse(params, v))
}




