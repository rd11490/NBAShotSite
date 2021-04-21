package datamodel

import org.json4s.{DefaultFormats, Formats}
import org.json4s.jackson.Serialization.write
import java.{lang => jl}
import com.github.mauricio.async.db.RowData

final case class OneWayPossession(primaryKey: String,
                                  season: String,
                                  seasonType: String,
                                  gameId: String,
                                  gameDate: jl.Long,
                                  period: jl.Integer,
                                  secondsElapsed: jl.Integer,
                                  offenseTeamId1: jl.Integer,
                                  offensePlayer1Id: jl.Integer,
                                  offensePlayer2Id: jl.Integer,
                                  offensePlayer3Id: jl.Integer,
                                  offensePlayer4Id: jl.Integer,
                                  offensePlayer5Id: jl.Integer,
                                  defenseTeamId2: jl.Integer,
                                  defensePlayer1Id: jl.Integer,
                                  defensePlayer2Id: jl.Integer,
                                  defensePlayer3Id: jl.Integer,
                                  defensePlayer4Id: jl.Integer,
                                  defensePlayer5Id: jl.Integer,
                                  points: jl.Double = 0.0,
                                  expectedPoints: jl.Double = 0.0,
                                  defensiveRebounds: jl.Integer = 0,
                                  offensiveRebounds: jl.Integer = 0,
                                  opponentDefensiveRebounds: jl.Integer = 0,
                                  opponentOffensiveRebounds: jl.Integer = 0,
                                  offensiveFouls: jl.Integer = 0,
                                  defensiveFouls: jl.Integer = 0,
                                  turnovers: jl.Integer = 0,
                                  fieldGoalAttempts: jl.Integer = 0,
                                  fieldGoals: jl.Integer = 0,
                                  threePtAttempts: jl.Integer = 0,
                                  threePtMade: jl.Integer = 0,
                                  freeThrowAttempts: jl.Integer = 0,
                                  freeThrowsMade: jl.Integer = 0,
                                  possessions: jl.Integer = 0,
                                  seconds: jl.Integer = 0,
                                  dt: String) {
  def toPossessionAggregate: PossessionsAggregation =
    PossessionsAggregation(
      points = points,
      expectedPoints = expectedPoints,
      defensiveRebounds = defensiveRebounds,
      offensiveRebounds = offensiveRebounds,
      opponentDefensiveRebounds = opponentDefensiveRebounds,
      opponentOffensiveRebounds = opponentOffensiveRebounds,
      offensiveFouls = offensiveFouls,
      defensiveFouls = defensiveFouls,
      turnovers = turnovers,
      fieldGoalAttempts = fieldGoalAttempts,
      fieldGoals = fieldGoals,
      threePtAttempts = threePtAttempts,
      threePtMade = threePtMade,
      freeThrowAttempts = freeThrowAttempts,
      freeThrowsMade = freeThrowsMade,
      possessions = possessions,
      seconds = seconds,
    )
}

object OneWayPossession extends ResultSetMapper {

  private implicit val formats: Formats = DefaultFormats

  def toJson(possessions: Seq[OneWayPossession]): String = write(possessions)


  def apply(resultSet: RowData): OneWayPossession =
    OneWayPossession(
      primaryKey = getString(resultSet, 0),
      season = getString(resultSet, 1),
      seasonType = getString(resultSet, 2),
      gameId = getString(resultSet, 3),
      gameDate = getLong(resultSet, 4),
      period = getInt(resultSet, 5),
      secondsElapsed = getInt(resultSet, 6),
      offenseTeamId1 = getInt(resultSet, 7),
      offensePlayer1Id = getInt(resultSet, 8),
      offensePlayer2Id = getInt(resultSet, 9),
      offensePlayer3Id = getInt(resultSet, 10),
      offensePlayer4Id = getInt(resultSet, 11),
      offensePlayer5Id = getInt(resultSet, 12),
      defenseTeamId2 = getInt(resultSet, 13),
      defensePlayer1Id = getInt(resultSet, 14),
      defensePlayer2Id = getInt(resultSet, 15),
      defensePlayer3Id = getInt(resultSet, 16),
      defensePlayer4Id = getInt(resultSet, 17),
      defensePlayer5Id = getInt(resultSet, 18),
      points = getDouble(resultSet, 19),
      expectedPoints = getDouble(resultSet, 20),
      defensiveRebounds = getInt(resultSet, 21),
      offensiveRebounds = getInt(resultSet, 22),
      opponentDefensiveRebounds = getInt(resultSet, 23),
      opponentOffensiveRebounds = getInt(resultSet, 24),
      offensiveFouls = getInt(resultSet, 25),
      defensiveFouls = getInt(resultSet, 26),
      turnovers = getInt(resultSet, 27),
      fieldGoalAttempts = getInt(resultSet, 28),
      fieldGoals = getInt(resultSet, 29),
      threePtAttempts = getInt(resultSet, 30),
      threePtMade = getInt(resultSet, 31),
      freeThrowAttempts = getInt(resultSet, 32),
      freeThrowsMade = getInt(resultSet, 33),
      possessions = getInt(resultSet, 34),
      seconds = getInt(resultSet, 35),
      dt = getString(resultSet, 36)
    )

}
