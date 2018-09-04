package storage.datamodel

import com.github.mauricio.async.db.RowData

final case class TeamInfo(
                           primaryKey: String,
                           teamId: Integer,
                           teamName: String,
                           teamAbbreviation: String,
                           teamCity: String,
                           season: String
                         )

object TeamInfo extends ResultSetMapper {
  def apply(resultSet: RowData): TeamInfo =
    TeamInfo(
      getString(resultSet, 0),
      getInt(resultSet, 1),
      getString(resultSet, 2),
      getString(resultSet, 3),
      getString(resultSet, 4),
      getString(resultSet, 5)
    )
}
