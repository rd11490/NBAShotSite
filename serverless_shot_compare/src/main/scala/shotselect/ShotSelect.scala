package shotselect

import datamodel.{ShotRequest, ShotWithPlayers, ZonedShot, ZonedShots}
import storage.PostgresClient
import storage.tables.NBATables
import utils.ShotZone

import scala.concurrent.{ExecutionContext, Future}

object ShotSelect {
  def selectZonedShots(params: ShotRequest)(implicit executionContext: ExecutionContext): Future[ZonedShots] =
    selectData(params)
      .map(v => {
        v.map(toShotsForReduction)
          .groupBy(_.key)
          .map(c => c._2.reduce(_ + _))
          .toSeq
      })
      .map(fillEmptyZones)

  private def toShotsForReduction(shot: ShotWithPlayers)(implicit executionContext: ExecutionContext): ZonedShot = {
    ZonedShot(
      s"${shot.shotValue}_${shot.shotZone}",
      shot.shotZone,
      shot.shotAttemptedFlag,
      shot.shotMadeFlag,
      shot.shotValue,
      0.0
    )
  }

  private def fillEmptyZones(shots: Seq[ZonedShot])(implicit executionContext: ExecutionContext): ZonedShots = {
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
      totalZone,
      shotZones.map(v =>
        v.copy(frequency = v.shotAttempts.toDouble / totalShots))
    )
  }

  def selectData(params: ShotRequest)(implicit executionContext: ExecutionContext): Future[Seq[ShotWithPlayers]] = {
    PostgresClient.selectFrom[ShotWithPlayers](
      NBATables.lineup_shots,
      ShotWithPlayers.apply,
      params.toWhereClause: _*
    )
  }
}
