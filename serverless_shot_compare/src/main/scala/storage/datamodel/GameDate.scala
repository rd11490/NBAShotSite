package storage.datamodel

import com.github.mauricio.async.db.RowData
import utils.TimeUtils

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
