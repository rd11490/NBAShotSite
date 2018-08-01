package com.rrdinsights.shotcompare.collection.etl.application

import com.github.mauricio.async.db.RowData
import com.rrdinsights.shotcompare.utils.TimeUtils
import com.rrdinsights.shotcompare.utils.storage.PostgresClient
import com.rrdinsights.shotcompare.utils.storage.datamodel.{ RawGameInfo, ResultSetMapper }
import com.rrdinsights.shotcompare.utils.storage.tables.NBATables

object GameDateMapBuilder {

  def main(strings: Array[String]): Unit = {
    val gameDates = buildGameDateMap()
    writeGameDateMap(gameDates)
  }

  private def buildGameDateMap( /*IO*/ ): Seq[GameDate] = {
    PostgresClient
      .selectFromAndWait(NBATables.raw_game_info, RawGameInfo.apply)
      .map(v => GameDate(v.gameId, v.gameId, v.gameDate, v.season))
      .distinct
  }

  private def writeGameDateMap(gameDates: Seq[GameDate]): Unit = {
    PostgresClient.createTable(NBATables.game_dates)
    PostgresClient.insertInto(NBATables.game_dates, gameDates)
  }

}

final case class GameDate(
    primaryKey: String,
    gameId: String,
    gameDate: String,
    season: String
) {
  lazy val gameDateInMillis: Long = TimeUtils.parseGameDate(gameDate)
}

object GameDate extends ResultSetMapper {
  def apply(resultSet: RowData): GameDate =
    GameDate(
      getString(resultSet, 0),
      getString(resultSet, 1),
      getString(resultSet, 2),
      getString(resultSet, 3)
    )
}
