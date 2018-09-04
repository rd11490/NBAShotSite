package storage.datamodel

import com.github.mauricio.async.db.RowData

final case class PlayerInfo(
    primaryKey: String,
    playerId: Integer,
    playerName: String
)

object PlayerInfo extends ResultSetMapper {
  def apply(resultSet: RowData): PlayerInfo =
    PlayerInfo(
      getString(resultSet, 0),
      getInt(resultSet, 1),
      getString(resultSet, 2)
    )
}
