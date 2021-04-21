package endpoints

import com.amazonaws.services.lambda.runtime.Context
import datamodel.RolesResponse
import io.circe.generic.auto._
import io.github.mkotsur.aws.handler.Lambda.{Proxy, _}
import io.github.mkotsur.aws.proxy
import io.github.mkotsur.aws.proxy.ProxyResponse
import storage.PostgresClient
import storage.tables.NBATables

import scala.concurrent.{ExecutionContext, Future}

class RolesHandler extends Proxy[String, RolesResponse] {
  import utils.RichFuture._
  implicit val executionContext: ExecutionContext = ExecutionContext.global
  override def handle(
      input: proxy.ProxyRequest[String],
      c: Context): Either[Throwable, ProxyResponse[RolesResponse]] = {
    val response = RolesHandler.selectRoles().map(v => RolesResponse(v.sorted.reverse)).await
    APIResponse.response(Some(response))
  }
}


object RolesHandler {
  implicit val executionContext: ExecutionContext = ExecutionContext.global
  def selectRoles( /*IO*/ ): Future[Seq[String]] = {
    PostgresClient
      .selectRoles(NBATables.roles)
  }
}