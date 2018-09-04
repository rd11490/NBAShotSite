package hello

import io.circe.generic.auto._
import io.github.mkotsur.aws.handler.Lambda._
import io.github.mkotsur.aws.handler.Lambda
import com.amazonaws.services.lambda.runtime.Context
import io.github.mkotsur.aws.proxy
import io.github.mkotsur.aws.proxy.ProxyResponse
import ScalaHandler._
import datamodel.ShotRequest

object ScalaHandler {
  case class Resp(message: String, request: ShotRequest)
}

class ScalaHandler extends Lambda[ShotRequest, Resp] {
  override def handle(req: ShotRequest, context: Context): Either[Throwable, Resp] =
    Right(Resp("And this is how you do it with mkotsur/aws-lambda-scala", req))
}

class ApiGatewayScalaHandler extends Proxy[ShotRequest, Resp] {
  override def handle(input: proxy.ProxyRequest[ShotRequest], c: Context): Either[Throwable, ProxyResponse[Resp]] = {
    val headers = Map("x-custom-response-header" -> "my custom response header value")
    val responseBodyOption = input.body.map(req => Resp("And this is how you do it with mkotsur/aws-lambda-scala", req))
    println(input)
    println(input.body)
    Right(ProxyResponse(200, Some(headers), responseBodyOption))
  }
}