package com.rrdinsights.shotcompare.collection.etl.application

import com.github.mauricio.async.db.RowData
import com.rrdinsights.shotcompare.utils.storage.PostgresClient
import com.rrdinsights.shotcompare.utils.storage.datamodel.{
  RawTeamBoxScoreAdvanced,
  ResultSetMapper
}
import com.rrdinsights.shotcompare.utils.storage.tables.NBATables

object TeamIdMapBuilder {

  def main(strings: Array[String]): Unit = {
    val teams = buildTeamMap()
    writeTeamMap(teams)
  }

  private def buildTeamMap( /*IO*/ ): Seq[TeamInfo] = {
    PostgresClient
      .selectFromAndWait(
        NBATables.raw_team_box_score_advanced,
        RawTeamBoxScoreAdvanced.apply
      )
      .map(
        v =>
          TeamInfo(
            s"${v.teamId}_${v.season}",
            v.teamId,
            v.teamName,
            v.teamAbbreviation,
            v.teamCity,
            v.season
          )
      )
      .distinct
  }

  private def writeTeamMap(teams: Seq[TeamInfo]): Unit = {
    PostgresClient.createTable(NBATables.team_info)
    PostgresClient.insertInto(NBATables.team_info, teams)
  }

}

final case class TeamInfo(
  primaryKey: String,
  teamId: Integer,
  teamName: String,
  teamAbbreviation: String,
  teamCity: String,
  season: String
)

object TeamInfo extends ResultSetMapper {
  def apply(resultSet: RowData): TeamInfo =
    TeamInfo(
      getString(resultSet, 0),
      getInt(resultSet, 1),
      getString(resultSet, 2),
      getString(resultSet, 3),
      getString(resultSet, 4),
      getString(resultSet, 5)
    )
}
