package endpoints

import io.github.mkotsur.aws.proxy.ProxyResponse

object StandardHeaders {
  val Headers: Option[Map[String, String]] = Some(
    Map(
      "Access-Control-Allow-Origin" -> "*",
      "Access-Control-Allow-Methods" -> "POST, GET, OPTIONS",
      "Access-Control-Allow-Header" -> "X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Credentials" -> "false"
    )
  )
}


object APIResponse {
  def response[T](body: Option[T]): Either[Throwable, ProxyResponse[T]] =
    Right(ProxyResponse(200, StandardHeaders.Headers, body))

}