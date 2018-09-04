package storage.datamodel

import java.{ lang => jl }

import com.github.mauricio.async.db.RowData

final case class RawPlayerBoxScoreAdvanced(
    primaryKey: String,
    gameId: String,
    teamId: jl.Integer,
    teamAbbreviation: String,
    teamCity: String,
    playerId: jl.Integer,
    playerName: String,
    startPosition: String,
    comment: String,
    minutes: jl.Double,
    offensiveRating: jl.Double,
    defensiveRating: jl.Double,
    netRating: jl.Double,
    assistPercentage: jl.Double,
    assistTurnOverRatio: jl.Double,
    assistRatio: jl.Double,
    offensiveReboundPercentage: jl.Double,
    defensiveReboundPercentage: jl.Double,
    reboundPercentage: jl.Double,
    teamTurnOverPercentage: jl.Double,
    effectiveFieldGoalPercentage: jl.Double,
    trueShootingPercentage: jl.Double,
    usageRate: jl.Double,
    pace: jl.Double,
    playerEstimatedImpact: jl.Double,
    season: String,
    dt: String
) {

}

object RawPlayerBoxScoreAdvanced extends ResultSetMapper {

  def apply(resultSet: RowData): RawPlayerBoxScoreAdvanced =
    RawPlayerBoxScoreAdvanced(
      getString(resultSet, 0),
      getString(resultSet, 1),
      getInt(resultSet, 2),
      getString(resultSet, 3),
      getString(resultSet, 4),
      getInt(resultSet, 5),
      getString(resultSet, 6),
      getString(resultSet, 7),
      getString(resultSet, 8),
      getDouble(resultSet, 9),
      getDouble(resultSet, 10),
      getDouble(resultSet, 11),
      getDouble(resultSet, 12),
      getDouble(resultSet, 13),
      getDouble(resultSet, 14),
      getDouble(resultSet, 15),
      getDouble(resultSet, 16),
      getDouble(resultSet, 17),
      getDouble(resultSet, 18),
      getDouble(resultSet, 19),
      getDouble(resultSet, 20),
      getDouble(resultSet, 21),
      getDouble(resultSet, 22),
      getDouble(resultSet, 23),
      getDouble(resultSet, 24),
      getString(resultSet, 25),
      getString(resultSet, 26)
    )

}