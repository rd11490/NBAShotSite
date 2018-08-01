package com.rrdinsights.shotcompare.collection.investigation

import com.rrdinsights.shotcompare.collection.etl.application.TeamInfo
import com.rrdinsights.shotcompare.utils.storage.PostgresClient
import com.rrdinsights.shotcompare.utils.storage.tables.NBATables

object TeamMapper {

  lazy val TeamMap: Map[(Integer, String), TeamInfo] = buildTeamMap()

  private def buildTeamMap( /*IO*/ ): Map[(Integer, String), TeamInfo] = {
    PostgresClient.selectFromAndWait(NBATables.team_info, TeamInfo.apply)
      .map(v => ((v.teamId, v.season), v))
      .toMap
  }

  def teamInfo(teamId: Integer, season: String): Option[TeamInfo] = {
    TeamMap.get((teamId, season))
  }
}
