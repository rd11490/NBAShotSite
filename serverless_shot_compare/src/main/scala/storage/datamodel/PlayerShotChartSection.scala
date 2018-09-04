package storage.datamodel

import java.{lang => jl}

import com.github.mauricio.async.db.RowData

case class ShotBinDetailed(playerId: jl.Integer, bin: String, value: Int)

case class ShotBinOverview(range: String, area: String, value: Int)

case class ShotData(shots: Int, made: Int) {

  def +(other: ShotData): ShotData =
    ShotData(shots + other.shots, made + other.made)
}

case class PlayerShotChartSection(primaryKey: String,
                                  playerId: jl.Integer,
                                  bin: String,
                                  value: Int,
                                  shots: Int,
                                  made: Int,
                                  dt: String)

object PlayerShotChartSection extends ResultSetMapper {

  def apply(bin: ShotBinDetailed,
            data: ShotData,
            dt: String): PlayerShotChartSection =
    PlayerShotChartSection(
      s"${bin.playerId}_${bin.bin}",
      bin.playerId,
      bin.bin,
      bin.value,
      data.shots,
      data.made,
      dt
    )

  def apply(resultSet: RowData): PlayerShotChartSection =
    PlayerShotChartSection(
      getString(resultSet, 0),
      getInt(resultSet, 1),
      getString(resultSet, 2),
      getInt(resultSet, 3),
      getInt(resultSet, 4),
      getInt(resultSet, 5),
      getString(resultSet, 6)
    )
}
