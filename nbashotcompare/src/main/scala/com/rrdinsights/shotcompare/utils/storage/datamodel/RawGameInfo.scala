package com.rrdinsights.shotcompare.utils.storage.datamodel

import java.{ lang => jl }

import com.github.mauricio.async.db.RowData
import com.rrdinsights.scalabrine.models.GameInfo

final case class RawGameInfo(
  primaryKey: String,
  gameId: String,
  gameDate: String,
  attendance: jl.Integer,
  gameTime: String,
  dt: String,
  season: String
)

object RawGameInfo extends ResultSetMapper {

  def apply(gameInfo: GameInfo, gameId: String, dt: String, season: Option[String]): RawGameInfo = {
    RawGameInfo(
      gameId,
      gameId,
      gameInfo.gameDate,
      gameInfo.attendance,
      gameInfo.gameTime,
      dt,
      season.getOrElse(DataModelUtils.gameIdToSeason(gameId))
    )
  }

  def apply(resultSet: RowData): RawGameInfo =
    RawGameInfo(
      getString(resultSet, 0),
      getString(resultSet, 1),
      getString(resultSet, 2),
      getInt(resultSet, 3),
      getString(resultSet, 4),
      getString(resultSet, 5),
      getString(resultSet, 6)
    )
}
