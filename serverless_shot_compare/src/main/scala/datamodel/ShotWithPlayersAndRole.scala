package datamodel

import java.{lang => jl}

import org.json4s.{DefaultFormats, Formats}
import org.json4s.jackson.Serialization.write
import com.github.mauricio.async.db.RowData

final case class ShotWithPlayersAndRole(primaryKey: String,
                                        gameId: String,
                                        eventNumber: jl.Integer,
                                        shooter: jl.Integer,
                                        shooterRole: String,
                                        offenseTeamId: jl.Integer,
                                        offensePlayer1Id: jl.Integer,
                                        offensePlayer2Id: jl.Integer,
                                        offensePlayer3Id: jl.Integer,
                                        offensePlayer4Id: jl.Integer,
                                        offensePlayer5Id: jl.Integer,
                                        offensePlayer1Role: String,
                                        offensePlayer2Role: String,
                                        offensePlayer3Role: String,
                                        offensePlayer4Role: String,
                                        offensePlayer5Role: String,
                                        defenseTeamId: jl.Integer,
                                        defensePlayer1Id: jl.Integer,
                                        defensePlayer2Id: jl.Integer,
                                        defensePlayer3Id: jl.Integer,
                                        defensePlayer4Id: jl.Integer,
                                        defensePlayer5Id: jl.Integer,
                                        defensePlayer1Role: String,
                                        defensePlayer2Role: String,
                                        defensePlayer3Role: String,
                                        defensePlayer4Role: String,
                                        defensePlayer5Role: String,
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
                                        gameDate: jl.Long,
                                        season: String,
                                        seasonType: String,
                                        dt: String)

object ShotWithPlayersAndRole extends ResultSetMapper {

  private implicit val formats: Formats = DefaultFormats

  def shotsToJson(shots: Seq[ShotWithPlayersAndRole]): String = write(shots)

  def apply(resultSet: RowData): ShotWithPlayersAndRole =
    ShotWithPlayersAndRole(
      primaryKey = getString(resultSet, 0),
      gameId = getString(resultSet, 1),
      eventNumber = getInt(resultSet, 2),
      shooter = getInt(resultSet, 3),
      shooterRole = getString(resultSet, 4),
      offenseTeamId = getInt(resultSet, 5),
      offensePlayer1Id = getInt(resultSet, 6),
      offensePlayer2Id = getInt(resultSet, 7),
      offensePlayer3Id = getInt(resultSet, 8),
      offensePlayer4Id = getInt(resultSet, 9),
      offensePlayer5Id = getInt(resultSet, 10),
      offensePlayer1Role = getString(resultSet, 11),
      offensePlayer2Role = getString(resultSet, 12),
      offensePlayer3Role = getString(resultSet, 13),
      offensePlayer4Role = getString(resultSet, 14),
      offensePlayer5Role = getString(resultSet, 15),
      defenseTeamId = getInt(resultSet, 16),
      defensePlayer1Id = getInt(resultSet, 17),
      defensePlayer2Id = getInt(resultSet, 18),
      defensePlayer3Id = getInt(resultSet, 19),
      defensePlayer4Id = getInt(resultSet, 20),
      defensePlayer5Id = getInt(resultSet, 21),
      defensePlayer1Role = getString(resultSet, 22),
      defensePlayer2Role = getString(resultSet, 23),
      defensePlayer3Role = getString(resultSet, 24),
      defensePlayer4Role = getString(resultSet, 25),
      defensePlayer5Role = getString(resultSet, 26),
      shotDistance = getInt(resultSet, 27),
      xCoordinate = getInt(resultSet, 28),
      yCoordinate = getInt(resultSet, 29),
      shotZone = getString(resultSet, 30),
      shotAttemptedFlag = getInt(resultSet, 31),
      shotMadeFlag = getInt(resultSet, 32),
      shotValue = getInt(resultSet, 33),
      period = getInt(resultSet, 34),
      minutesRemaining = getInt(resultSet, 35),
      secondsRemaining = getInt(resultSet, 36),
      gameDate = getLong(resultSet, 37),
      season = getString(resultSet, 38),
      seasonType = getString(resultSet, 39),
      dt = getString(resultSet, 40)
    )
}
