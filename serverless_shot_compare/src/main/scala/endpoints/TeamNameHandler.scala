package endpoints

import com.amazonaws.services.lambda.runtime.Context
import datamodel._
import io.circe.generic.auto._
import io.github.mkotsur.aws.handler.Lambda.{Proxy, _}
import io.github.mkotsur.aws.proxy
import io.github.mkotsur.aws.proxy.ProxyResponse
import storage.PostgresClient
import storage.datamodel.TeamInfo
import storage.tables.NBATables

import scala.concurrent.{ExecutionContext, Future}

class TeamNameHandler extends Proxy[String, TeamInfoResponse] {

  import utils.RichFuture._

  implicit val executionContext: ExecutionContext = ExecutionContext.global

  override def handle(
                       input: proxy.ProxyRequest[String],
                       c: Context): Either[Throwable, ProxyResponse[TeamInfoResponse]] = {
    val response =
      TeamNameHandler.selectTeamInfo().map(v => TeamInfoResponse(v)).await
    APIResponse.response(Some(response))
  }
}

object TeamNameHandler {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  def selectTeamInfo(/*IO*/): Future[Seq[TeamName]] = {
    PostgresClient
      .selectFrom(NBATables.team_info, TeamInfo.apply)
      .map(v => v.groupBy(_.teamId)
        .map(c => c._2.maxBy(_.season))
        .map(c => TeamName(c.teamId, c.teamName))
        .toSeq
        .sortBy(_.teamName))
  }
}
