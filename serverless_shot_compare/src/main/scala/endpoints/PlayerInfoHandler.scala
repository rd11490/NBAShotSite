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

class PlayerInfoHandler extends Proxy[String, PlayerNameResponse] {
  implicit val executionContext: ExecutionContext = ExecutionContext.global
  import utils.RichFuture._
  override def handle(
                       input: proxy.ProxyRequest[String],
                       c: Context): Either[Throwable, ProxyResponse[PlayerNameResponse]] = {
    val response =
      PlayerInfoHandler.selectPlayerInfo().map(v => PlayerNameResponse(v)).await
    APIResponse.response(Some(response))
  }
}

object PlayerInfoHandler {
  implicit val executionContext: ExecutionContext = ExecutionContext.global
  def selectPlayerInfo( /*IO*/ ): Future[Seq[PlayerName]] = {
    PostgresClient
      .selectFrom(NBATables.player_info, PlayerInfo.apply)
      .map(v => v.map(c => PlayerName(c.playerId, c.playerName)).distinct.sortBy(_.name))
  }
}
