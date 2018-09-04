package storage.datamodel

import java.{ lang => jl }

import com.github.mauricio.async.db.RowData

final case class RosterPlayer(
  primaryKey: String,
  teamId: jl.Integer,
  seasonPlayed: String,
  leagueId: String,
  playerName: String,
  number: String,
  position: String,
  height: String,
  weight: String,
  birthDate: String,
  age: jl.Double,
  experience: String,
  school: String,
  playerId: jl.Integer,
  season: String,
  dt: String
)

object RosterPlayer extends ResultSetMapper {

  def apply(resultSet: RowData): RosterPlayer =
    RosterPlayer(
      getString(resultSet, 0),
      getInt(resultSet, 1),
      getString(resultSet, 2),
      getString(resultSet, 3),
      getString(resultSet, 4),
      getString(resultSet, 5),
      getString(resultSet, 6),
      getString(resultSet, 7),
      getString(resultSet, 8),
      getString(resultSet, 9),
      getDouble(resultSet, 10),
      getString(resultSet, 11),
      getString(resultSet, 12),
      getInt(resultSet, 13),
      getString(resultSet, 14),
      getString(resultSet, 15)
    )

}