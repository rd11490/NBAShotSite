//package endpoints
//
//import com.amazonaws.services.lambda.runtime.Context
//import datamodel._
//import io.circe.generic.auto._
//import io.github.mkotsur.aws.handler.Lambda.{Proxy, _}
//import io.github.mkotsur.aws.proxy
//import io.github.mkotsur.aws.proxy.ProxyResponse
//import org.json4s.{DefaultFormats, Formats}
//import shotselect.ShotSelect
//
//import scala.concurrent.{ExecutionContext, Future}
//
//
//class ShotProfileHandler extends Proxy[FrequencyShotRequest, ZonedShotsResponse] {
//  implicit val executionContext: ExecutionContext = ExecutionContext.global
//  implicit val formats: Formats = DefaultFormats
//
//  import utils.RichFuture._
//
//  override def handle(input: proxy.ProxyRequest[FrequencyShotRequest],
//                      c: Context): Either[Throwable, ProxyResponse[ZonedShotsResponse]] = {
//    val response = input.body.map(v => {
//      val shotParams = ParamsHandler.handleFrequencyParams(v)
//      ShotProfileHandler.selectShots(shotParams).await
//    })
//    APIResponse.response(response)
//  }
//}
//
//
//object ShotProfileHandler {
//  implicit val executionContext: ExecutionContext = ExecutionContext.global
//
//  def selectShots(params: FrequencyShotRequest): Future[ShotProfileResponse] = //TODO
//
//}
//
//
//
//
//
//
