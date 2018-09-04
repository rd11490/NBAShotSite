package storage.datamodel

import java.{ lang => jl }

import com.github.mauricio.async.db.RowData

final case class ShotWithPlayers(
  primaryKey: String,
  gameId: String,
  eventNumber: jl.Integer,
  shooter: jl.Integer,
  offenseTeamId: jl.Integer,
  offensePlayer1Id: jl.Integer,
  offensePlayer2Id: jl.Integer,
  offensePlayer3Id: jl.Integer,
  offensePlayer4Id: jl.Integer,
  offensePlayer5Id: jl.Integer,
  defenseTeamId: jl.Integer,
  defensePlayer1Id: jl.Integer,
  defensePlayer2Id: jl.Integer,
  defensePlayer3Id: jl.Integer,
  defensePlayer4Id: jl.Integer,
  defensePlayer5Id: jl.Integer,
  shotDistance: jl.Integer,
  xCoordinate: jl.Integer,
  yCoordinate: jl.Integer,
  shotZone: String,
  shotAttemptedFlag: jl.Integer,
  shotMadeFlag: jl.Integer,
  shotValue: jl.Integer,
  period: jl.Integer,
  minutesRemaining: jl.Integer,
  secondsRemaining: jl.Integer,
  gameDate: Long,
  season: String,
  dt: String
)

object ShotWithPlayers extends ResultSetMapper {

  def apply(resultSet: RowData): ShotWithPlayers =
    ShotWithPlayers(
      getString(resultSet, 0),
      getString(resultSet, 1),
      getInt(resultSet, 2),

      getInt(resultSet, 3),

      getInt(resultSet, 4),

      getInt(resultSet, 5),
      getInt(resultSet, 6),
      getInt(resultSet, 7),
      getInt(resultSet, 8),
      getInt(resultSet, 9),

      getInt(resultSet, 10),

      getInt(resultSet, 11),
      getInt(resultSet, 12),
      getInt(resultSet, 13),
      getInt(resultSet, 14),
      getInt(resultSet, 15),

      getInt(resultSet, 16),
      getInt(resultSet, 17),
      getInt(resultSet, 18),
      getString(resultSet, 19),
      getInt(resultSet, 20),
      getInt(resultSet, 21),
      getInt(resultSet, 22),

      getInt(resultSet, 23),
      getInt(resultSet, 24),
      getInt(resultSet, 25),

      getLong(resultSet, 26),
      getString(resultSet, 27),
      getString(resultSet, 28)
    )
}