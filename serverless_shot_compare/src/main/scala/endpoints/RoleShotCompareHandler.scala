package endpoints

import com.amazonaws.services.lambda.runtime.Context
import datamodel._
import dataselect.ShotSelect
import io.circe.generic.auto._
import io.github.mkotsur.aws.handler.Lambda.{Proxy, _}
import io.github.mkotsur.aws.proxy
import io.github.mkotsur.aws.proxy.ProxyResponse

import scala.concurrent.{ExecutionContext, Future}

class RoleShotCompareHandler extends Proxy[CompareRoleShotRequest, ZonedRoleShotCompareResponse] {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  import utils.RichFuture._

  override def handle(input: proxy.ProxyRequest[CompareRoleShotRequest],
                      c: Context): Either[Throwable, ProxyResponse[ZonedRoleShotCompareResponse]] = {

    val response = input.body.map(v => {
      val params = ParamsHandler.handleRoleCompareParams(v)
      RoleShotCompareHandler.selectShots(params).await
    })
    APIResponse.response(response)

  }
}

object RoleShotCompareHandler {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  def selectShots(params: CompareRoleShotRequest): Future[ZonedRoleShotCompareResponse] = {
    val left = ShotSelect.selectZonedRoleShots(params.params.map(_.shots1).getOrElse(ShotRequestWithRole()))
    val right = ShotSelect.selectZonedRoleShots(params.params.map(_.shots2).getOrElse(ShotRequestWithRole()))

    for {
      first <- left
      second <- right
    } yield ZonedRoleShotCompareResponse(params, ZonedShotCompare(first, second))

  }
}





