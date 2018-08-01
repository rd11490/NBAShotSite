package com.rrdinsights.shotcompare.collection.investigation

import com.rrdinsights.shotcompare.collection.etl.application.GameDate
import com.rrdinsights.shotcompare.utils.storage.PostgresClient
import com.rrdinsights.shotcompare.utils.storage.tables.NBATables

object GameDateMapper {

  lazy val GameMap: Map[String, GameDate] = buildGameIdMap()

  private def buildGameIdMap( /*IO*/ ): Map[String, GameDate] = {
    PostgresClient
      .selectFromAndWait(NBATables.game_dates, GameDate.apply)
      .map(v => (v.gameId, v))
      .toMap
  }

  def gameDate(gameId: String): Option[GameDate] = {
    GameMap.get(gameId)
  }
}
