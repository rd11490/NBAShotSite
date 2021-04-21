package datamodel

import java.{lang => jl}

final case class RawShotResponse(
                                  xCoordinate: jl.Integer,
                                  yCoordinate: jl.Integer,
                                  shotMadeFlag: jl.Integer,
                                  metadata: Seq[RawShotMetadata]
                                )

object RawShotResponse {
  def apply(shotWithPlayers: ShotWithPlayers): RawShotResponse =
    RawShotResponse(
      xCoordinate = shotWithPlayers.xCoordinate,
      yCoordinate = shotWithPlayers.yCoordinate,
      shotMadeFlag = shotWithPlayers.shotMadeFlag,
      metadata = Seq(
        RawShotMetadata("Distance", s"${shotWithPlayers.shotDistance} Ft"),
        RawShotMetadata("Qtr", shotWithPlayers.period.toString),
        RawShotMetadata("Sec Left In Qtr",
          shotWithPlayers.secondsRemaining.toString)
      )
    )

  def fromShotWithPlayersAndRole(shotWithPlayers: ShotWithPlayersAndRole): RawShotResponse =
    RawShotResponse(
      xCoordinate = shotWithPlayers.xCoordinate,
      yCoordinate = shotWithPlayers.yCoordinate,
      shotMadeFlag = shotWithPlayers.shotMadeFlag,
      metadata = Seq(
        RawShotMetadata("Distance", s"${shotWithPlayers.shotDistance} Ft"),
        RawShotMetadata("Qtr", shotWithPlayers.period.toString),
        RawShotMetadata("Sec Left In Qtr",
          shotWithPlayers.secondsRemaining.toString)
      )
    )
}

final case class RawShots(params: FrequencyShotRequest,
                          statistics: ShotStatisticsContainer,
                          shots: Seq[RawShotResponse])

final case class RoleShots(params: FrequencyRoleShotRequest,
                          statistics: ShotStatisticsContainer,
                          shots: Seq[RawShotResponse])

final case class ZonedShots(total: ZonedShot,
                            statistics: ShotStatisticsContainer,
                            shots: Seq[ZonedShot])

final case class ShotStatisticsContainer(total: ShotStatistics,
                                         threes: ShotStatistics,
                                         twos: ShotStatistics,
                                         rim: ShotStatistics,
                                         midrange: ShotStatistics)

object ShotStatisticsContainer {
  def empty: ShotStatisticsContainer = ShotStatisticsContainer(
    ShotStatistics.empty,
    ShotStatistics.empty,
    ShotStatistics.empty,
    ShotStatistics.empty,
    ShotStatistics.empty
  )
}

final case class ShotStatistics(attempts: Int,
                                made: Int,
                                frequency: Double,
                                pointsPerShot: Double)

object ShotStatistics {
  def empty: ShotStatistics = ShotStatistics(0, 0, 0.0, 0.0)
}

final case class ZonedShotsResponse(params: FrequencyShotRequest, data: ZonedShots)

final case class ZonedRoleShotsResponse(params: FrequencyRoleShotRequest, data: ZonedShots)


final case class ZonedShotCompare(shots1: ZonedShots, shots2: ZonedShots)

final case class ZonedShotCompareResponse(params: CompareShotRequest, data: ZonedShotCompare)
final case class ZonedRoleShotCompareResponse(params: CompareRoleShotRequest, data: ZonedShotCompare)


final case class ZonedShot(
                            key: String,
                            bin: String,
                            shotAttempts: Integer,
                            shotMade: Integer,
                            shotValue: Integer,
                            frequency: jl.Double
                          ) {
  def +(other: ZonedShot): ZonedShot = ZonedShot(
    key,
    bin,
    shotAttempts + other.shotAttempts,
    shotMade + other.shotMade,
    shotValue,
    if (frequency > 0.0) frequency else if (other.frequency > 0.0) other.frequency else 0.0
  )
}

object ZonedShot {
  def empty: ZonedShot = ZonedShot("", "", 0, 0, 0, 0.0)

}
