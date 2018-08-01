package com.rrdinsights.shotcompare.api.endpoints

import akka.http.scaladsl.server.Directives.{ concat, pathPrefix }
import akka.http.scaladsl.server.Route
import akka.http.scaladsl.server.directives.MethodDirectives.get
import akka.http.scaladsl.server.directives.RouteDirectives.complete
import com.rrdinsights.shotcompare.api.datamodel.{ PlayerName, PlayerNameResponse, TeamInfoResponse, TeamName }
import com.rrdinsights.shotcompare.collection.etl.application.{ PlayerInfo, TeamInfo }
import com.rrdinsights.shotcompare.utils.storage.PostgresClient
import com.rrdinsights.shotcompare.utils.storage.tables.NBATables
import org.json4s.NoTypeHints
import org.json4s.jackson.Serialization
import org.json4s.jackson.Serialization.write

import scala.concurrent.{ ExecutionContext, Future }

class InternalEndpoint(implicit executionContext: ExecutionContext) {
  implicit val formats = Serialization.formats(NoTypeHints)

  lazy val internalRoutes: Route =
    concat(
      pathPrefix(InternalRoutes.Players) {
        get {
          val players: Future[String] = selectPlayerInfo()
            .map(v => write(PlayerNameResponse(v)))

          complete(players)
        }
      },
      pathPrefix(InternalRoutes.Teams) {
        get {
          val teams: Future[String] = selectTeamInfo()
            .map(v => write(TeamInfoResponse(v)))

          complete(teams)
        }
      }
    )

  def selectTeamInfo( /*IO*/ ): Future[Seq[TeamName]] = {
    PostgresClient
      .selectFrom(NBATables.team_info, TeamInfo.apply)
      .map(v => v.map(c => TeamName(c.teamId, c.teamName)).distinct)
  }

  def selectPlayerInfo( /*IO*/ ): Future[Seq[PlayerName]] = {
    PostgresClient
      .selectFrom(NBATables.player_info, PlayerInfo.apply)
      .map(v => v.map(c => PlayerName(c.playerId, c.playerName)).distinct)
  }

}

object InternalRoutes {
  val Players: String = "players"
  val Teams: String = "teams"
}

