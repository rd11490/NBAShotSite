package com.rrdinsights.shotcompare.api.endpoints

import akka.http.scaladsl.server.Directives.{ concat, parameters, pathPrefix, _ }
import akka.http.scaladsl.server.Route
import akka.http.scaladsl.server.directives.MethodDirectives.get
import akka.http.scaladsl.server.directives.RouteDirectives.complete
import com.rrdinsights.shotcompare.api.datamodel._
import com.rrdinsights.shotcompare.collection.investigation.shots.ShotZone
import com.rrdinsights.shotcompare.utils.storage.PostgresClient
import com.rrdinsights.shotcompare.utils.storage.datamodel.ShotWithPlayers
import com.rrdinsights.shotcompare.utils.storage.tables.NBATables
import org.json4s.NoTypeHints
import org.json4s.jackson.Serialization
import org.json4s.jackson.Serialization.write

import scala.concurrent.{ ExecutionContext, Future }

class ShotChartEndpoint(implicit executionContext: ExecutionContext) {
  implicit val formats = Serialization.formats(NoTypeHints)

  lazy val shotChartRoutes: Route =
    concat(
      pathPrefix(ShotChartEndpoint.Raw) {
        get {
          parameters(
            'shooter.as[Int].?,
            'offenseTeamId.as[Int].?,
            'offensePlayerIds.as[String].?,
            'offenseOffPlayerIds.as[String].?,
            'defenseTeamId.as[Int].?,
            'defensePlayerIds.as[String].?,
            'defenseOffPlayerIds.as[String].?,
            'period.as[Int].?,
            'secondsRemaining.as[Int].?,
            'season.as[String].?,
            'startDate.as[Long].?,
            'endDate.as[Long].?
          ).as(RawShotRequestData) { params =>
            val shots: Future[String] = selectRawShots(params)
              .map(v => write(RawShots(v)))
            complete(shots)
          }
        }
      },
      pathPrefix(ShotChartEndpoint.Zones) {
        get {
          parameters(
            'shooter.as[Int].?,
            'offenseTeamId.as[Int].?,
            'offensePlayerIds.as[String].?,
            'offenseOffPlayerIds.as[String].?,
            'defenseTeamId.as[Int].?,
            'defensePlayerIds.as[String].?,
            'defenseOffPlayerIds.as[String].?,
            'period.as[Int].?,
            'secondsRemaining.as[Int].?,
            'season.as[String].?,
            'startDate.as[Long].?,
            'endDate.as[Long].?
          ).as(RawShotRequestData) { params =>
            val shots: Future[String] = selectZonedShots(params)
              .map(v => write(v))
            complete(shots)
          }
        }
      }
    )

  def selectRawShots(params: RawShotRequestData): Future[Seq[RawShotResponse]] =
    selectData(params)
      .map(v => v.map(c => RawShotResponse(c)))

  def selectZonedShots(params: RawShotRequestData): Future[ZonedShots] =
    selectData(params)
      .map(v => {
        v.map(toShotsForReduction)
          .groupBy(_.key)
          .map(c => c._2.reduce(_ + _))
          .toSeq
      })
      .map(fillEmptyZones)

  private def toShotsForReduction(shot: ShotWithPlayers): ZonedShot = {
    ZonedShot(
      s"${shot.shotValue}_${shot.shotZone}",
      shot.shotZone,
      shot.shotAttemptedFlag,
      shot.shotMadeFlag,
      shot.shotValue,
      0.0
    )
  }

  private def fillEmptyZones(shots: Seq[ZonedShot]): ZonedShots = {
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

  def selectData(params: RawShotRequestData): Future[Seq[ShotWithPlayers]] = {
    PostgresClient.selectFrom[ShotWithPlayers](
      NBATables.lineup_shots,
      ShotWithPlayers.apply,
      params.toWhereClause: _*
    )

  }
}

object ShotChartEndpoint {
  val Raw: String = "raw"
  val Zones: String = "zones"
}
