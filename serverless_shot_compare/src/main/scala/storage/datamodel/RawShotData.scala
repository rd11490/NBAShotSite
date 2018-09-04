package storage.datamodel

import java.{ lang => jl }

import com.github.mauricio.async.db.RowData

final case class RawShotData(
    primaryKey: String,
    gridType: String,
    gameId: String,
    eventNumber: jl.Integer,
    playerId: jl.Integer,
    playerName: String,
    teamId: jl.Integer,
    teamName: String,
    period: jl.Integer,
    minutesRemaining: jl.Integer,
    secondsRemaining: jl.Integer,
    eventType: String,
    actionType: String,
    shotZoneBasic: String,
    shotZoneArea: String,
    shotZoneRange: String,
    shotType: String,
    shotDistance: jl.Integer,
    xCoordinate: jl.Integer,
    yCoordinate: jl.Integer,
    shotAttemptedFlag: jl.Integer,
    shotMadeFlag: jl.Integer,
    gameDate: String,
    homeTeam: String,
    awayTeam: String,
    season: String,
    dt: String
) {

  def shotValue: jl.Integer = shotZoneBasic.substring(0, 1).toInt
}

object RawShotData extends ResultSetMapper {

  private def fixShotValue(dist: Integer, zone: String): String = {
    if (zone != null && dist != null) {
      if (dist >= 27 && zone.contains("2")) {
        zone.replaceAll("2", "3")
      } else if (dist <= 19 && zone.contains("3")) {
        zone.replaceAll("3", "2")
      } else {
        zone
      }
    } else {
      zone
    }
  }

  def apply(resultSet: RowData): RawShotData =
    RawShotData(
      getString(resultSet, 0),
      getString(resultSet, 1),
      getString(resultSet, 2),
      getInt(resultSet, 3),
      getInt(resultSet, 4),
      getString(resultSet, 5),
      getInt(resultSet, 6),
      getString(resultSet, 7),
      getInt(resultSet, 8),
      getInt(resultSet, 9),
      getInt(resultSet, 10),
      getString(resultSet, 11),
      getString(resultSet, 12),
      getString(resultSet, 13),
      getString(resultSet, 14),
      getString(resultSet, 15),
      getString(resultSet, 16),
      getInt(resultSet, 17),
      getInt(resultSet, 18),
      getInt(resultSet, 19),
      getInt(resultSet, 20),
      getInt(resultSet, 21),
      getString(resultSet, 22),
      getString(resultSet, 23),
      getString(resultSet, 24),
      getString(resultSet, 25),
      getString(resultSet, 26)
    )
}