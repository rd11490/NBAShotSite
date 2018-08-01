package com.rrdinsights.shotcompare.collection.etl.application

import com.github.mauricio.async.db.RowData
import com.rrdinsights.shotcompare.utils.storage.PostgresClient
import com.rrdinsights.shotcompare.utils.storage.datamodel.{ RawPlayerBoxScoreAdvanced, RawTeamBoxScoreAdvanced, ResultSetMapper }
import com.rrdinsights.shotcompare.utils.storage.tables.NBATables

object PlayerIdMapBuilder {

  def main(strings: Array[String]): Unit = {
    val teams = buildTeamMap()
    writeTeamMap(teams)
  }

  private def buildTeamMap( /*IO*/ ): Seq[PlayerInfo] = {
    PostgresClient
      .selectFromAndWait(
        NBATables.raw_player_box_score_advanced,
        RawPlayerBoxScoreAdvanced.apply
      )
      .map(
        v =>
          PlayerInfo(
            s"${v.playerId}",
            v.playerId,
            v.playerName
          )
      )
      .distinct
  }

  private def writeTeamMap(teams: Seq[PlayerInfo]): Unit = {
    PostgresClient.createTable(NBATables.player_info)
    PostgresClient.insertInto(NBATables.player_info, teams)
  }

}

final case class PlayerInfo(
  primaryKey: String,
  playerId: Integer,
  playerName: String
)

object PlayerInfo extends ResultSetMapper {
  def apply(resultSet: RowData): PlayerInfo =
    PlayerInfo(
      getString(resultSet, 0),
      getInt(resultSet, 1),
      getString(resultSet, 2)
    )
}
