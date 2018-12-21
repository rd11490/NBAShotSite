package endpoints

import com.amazonaws.services.lambda.runtime.Context
import datamodel._
import io.circe.generic.auto._
import io.github.mkotsur.aws.handler.Lambda.{Proxy, _}
import io.github.mkotsur.aws.proxy
import io.github.mkotsur.aws.proxy.ProxyResponse
import storage.PostgresClient
import storage.tables.NBATables

import scala.concurrent.{ExecutionContext, Future}

class FourFactorsHandler
    extends Proxy[FourFactorsRequest, FourFactorsResponse] {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  import utils.RichFuture._

  override def handle(
      input: proxy.ProxyRequest[FourFactorsRequest],
      c: Context): Either[Throwable, ProxyResponse[FourFactorsResponse]] = {

    val response = input.body.map(v => {
      val fourFactorsParams = ParamsHandler.handleFourFactorsParams(v)
      FourFactorsHandler.selectFourFactors(fourFactorsParams).await
    })
    APIResponse.response(response)
  }
}

object FourFactorsHandler {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  def selectFourFactors(
      params: FourFactorsRequest): Future[FourFactorsResponse] =
    PostgresClient
      .selectFrom(
        NBATables.real_adjusted_four_factors,
        RealAdjustedFourFactors.apply,
        params.params.getOrElse(FourFactorsRequestParams()).toWhereClause: _*)
      .map(v => FourFactorsResponse(params, v))
}
