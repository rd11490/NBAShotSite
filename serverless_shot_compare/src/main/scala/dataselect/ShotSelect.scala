package dataselect

import datamodel._
import storage.PostgresClient
import storage.tables.NBATables
import utils.ShotZone

import scala.concurrent.{ExecutionContext, Future}

object ShotSelect {
  def selectZonedShots(params: ShotRequest)(
      implicit executionContext: ExecutionContext): Future[ZonedShots] =
    selectData(params)
      .map(v => {
        v.map(toShotsForReduction)
          .groupBy(_.key)
          .map(c => c._2.reduce(_ + _))
          .toSeq
      })
      .map(fillEmptyZonesAndStats)

  private def toShotsForReduction(shot: ShotWithPlayers)(
    implicit executionContext: ExecutionContext): ZonedShot = {
    ZonedShot(
      s"${shot.shotValue}_${shot.shotZone}",
      shot.shotZone,
      shot.shotAttemptedFlag,
      shot.shotMadeFlag,
      shot.shotValue,
      0.0
    )
  }

  def selectZonedRoleShots(params: ShotRequestWithRole)(
    implicit executionContext: ExecutionContext): Future[ZonedShots] =
    selectRoleShots(params)
      .map(v => {
        v.map(toRoleShotsForReduction)
          .groupBy(_.key)
          .map(c => c._2.reduce(_ + _))
          .toSeq
      })
      .map(fillEmptyZonesAndStats)

  private def toRoleShotsForReduction(shot: ShotWithPlayersAndRole)(
    implicit executionContext: ExecutionContext): ZonedShot = {
    ZonedShot(
      s"${shot.shotValue}_${shot.shotZone}",
      shot.shotZone,
      shot.shotAttemptedFlag,
      shot.shotMadeFlag,
      shot.shotValue,
      0.0
    )
  }




  private def fillEmptyZonesAndStats(shots: Seq[ZonedShot])(
      implicit executionContext: ExecutionContext): ZonedShots = {
    val shotZones = (ShotZone.zones.map(zone => {
      ZonedShot(
        s"${zone.value}_$zone",
        zone.toString,
        0,
        0,
        zone.value,
        0.0
      )
    }) ++ shots)
      .groupBy(_.key)
      .map(v => v._2.reduce(_ + _))
      .toSeq

    val totalShots = shotZones.map(_.shotAttempts.toDouble).sum
    val totalMade = shotZones.map(_.shotMade.toDouble).sum

    val totalZone = ZonedShot(
      "Total",
      "Total",
      totalShots.toInt,
      totalMade.toInt,
      0,
      100.0
    )

    ZonedShots(
      total = totalZone,
      statistics = calculateStats(shots = shots, total = totalZone),
      shots = shotZones.map(v => {
        val freq =
          if (totalShots > 0.0) v.shotAttempts.toDouble / totalShots else 0.0
        v.copy(frequency = freq)
      })
    )
  }

  private def calculateStats(shots: Seq[ZonedShot], total: ZonedShot)(
      implicit executionContext: ExecutionContext): ShotStatisticsContainer = {

    val threesData = shots
      .filter(_.shotValue == 3)

    val threesStats = calculateStat(threesData, total)

    val twosData = shots
      .filter(_.shotValue == 2)

    val twosStats = calculateStat(twosData, total)

    val rimData = shots.filter(_.bin == ShotZone.RestrictedArea.toString)

    val rimStats = calculateStat(rimData, total)

    val midRangeData = shots.filter(v =>
      v.bin != ShotZone.RestrictedArea.toString && v.shotValue == 2)

    val midRangeStats = calculateStat(midRangeData, total)

    val totalAttempts = shots.map(_.shotAttempts.intValue()).sum
    val totalMade = shots.map(_.shotMade.intValue()).sum
    val points =
      shots.map(v => (v.shotMade * v.shotValue).intValue()).sum.toDouble
    val PPS = if (totalAttempts > 0) points / totalAttempts else 0.0
    val totalStats = ShotStatistics(attempts = totalAttempts,
                                    made = totalMade,
                                    frequency = 1.0,
                                    pointsPerShot = PPS)

    ShotStatisticsContainer(total = totalStats,
                            threes = threesStats,
                            twos = twosStats,
                            rim = rimStats,
                            midrange = midRangeStats)
  }

  private def calculateStat(shots: Seq[ZonedShot], total: ZonedShot)(
      implicit executionContext: ExecutionContext): ShotStatistics = {

    val shotData = if (shots.isEmpty) {
      ZonedShot("", "", 0, 0, 0, 0.0)
    } else shots.reduce(_ + _)

    val threesFreq =
      if (total.shotAttempts > 0)
        shotData.shotAttempts.toDouble / total.shotAttempts
      else 0.0
    val threesPPS =
      if (shotData.shotAttempts > 0)
        (shotData.shotValue * shotData.shotMade).toDouble / shotData.shotAttempts
      else 0.0

    ShotStatistics(attempts = shotData.shotAttempts,
                   made = shotData.shotMade,
                   frequency = threesFreq,
                   pointsPerShot = threesPPS)
  }

  def selectData(params: ShotRequest)(
      implicit executionContext: ExecutionContext)
    : Future[Seq[ShotWithPlayers]] = {
    PostgresClient.selectFrom[ShotWithPlayers](
      NBATables.lineup_shots,
      ShotWithPlayers.apply,
      params.toWhereClause: _*
    )
  }

  def selectRoleShots(params: ShotRequestWithRole)(
    implicit executionContext: ExecutionContext)
  : Future[Seq[ShotWithPlayersAndRole]] = {
    PostgresClient.selectFrom[ShotWithPlayersAndRole](
      NBATables.role_shots,
      ShotWithPlayersAndRole.apply,
      params.toWhereClause: _*
    )
  }
}
