package endpoints

import com.amazonaws.services.lambda.runtime.Context
import datamodel._
import io.circe.generic.auto._
import io.github.mkotsur.aws.handler.Lambda.{Proxy, _}
import io.github.mkotsur.aws.proxy
import io.github.mkotsur.aws.proxy.ProxyResponse
import shotselect.ShotSelect
import utils.ShotZone

import scala.concurrent.{ExecutionContext, Future}

class RawShotHandler extends Proxy[FrequencyShotRequest, RawShots] {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  import utils.RichFuture._

  override def handle(
      input: proxy.ProxyRequest[FrequencyShotRequest],
      c: Context): Either[Throwable, ProxyResponse[RawShots]] = {

    val response = input.body.map(v => {
      val shotParams = ParamsHandler.handleFrequencyParams(v)
      RawShotHandler.selectRawShots(shotParams).await
    })
    APIResponse.response(response)
  }
}

object RawShotHandler {
  implicit val executionContext: ExecutionContext = ExecutionContext.global

  def selectRawShots(params: FrequencyShotRequest): Future[RawShots] =
    ShotSelect
      .selectData(params.params.getOrElse(ShotRequest()))
      .map(v => (calculateStats(v), v.map(c => RawShotResponse(c))))
      .map(v => RawShots(params, v._1, v._2))

  def calculateStats(shots: Seq[ShotWithPlayers]): ShotStatisticsContainer = {
    if (shots.isEmpty) {
      ShotStatisticsContainer.empty
    } else {
      val zones = shots
        .flatMap(toShotZone)
        .groupBy(_.key)
        .map(v => v._2.reduce(_ + _))
        .toSeq
      val total = zones.find(_.key == "total").getOrElse(ZonedShot.empty)
      val threes = zones
        .find(_.key == "three")
        .map(v => v.copy(frequency = calculateFrequency(v, total)))
        .getOrElse(ZonedShot.empty)
      val twos = zones
        .find(_.key == "two")
        .map(v => v.copy(frequency = calculateFrequency(v, total)))
        .getOrElse(ZonedShot.empty)
      val rim = zones
        .find(_.key == "rim")
        .map(v => v.copy(frequency = calculateFrequency(v, total)))
        .getOrElse(ZonedShot.empty)
      val mid = zones
        .find(_.key == "mid")
        .map(v => v.copy(frequency = calculateFrequency(v, total)))
        .getOrElse(ZonedShot.empty)

      ShotStatisticsContainer(
        total = toTotalStats(total, twos, threes),
        threes = toShotStatistics(threes),
        twos = toShotStatistics(twos),
        rim = toShotStatistics(rim),
        midrange = toShotStatistics(mid)
      )

    }

  }

  private def toTotalStats(total: ZonedShot,
                           twos: ZonedShot,
                           threes: ZonedShot): ShotStatistics = {
    val attempts = total.shotAttempts
    val freq = 0.0
    val pps = if (attempts > 0) {
      ((twos.shotMade * twos.shotValue) + (threes.shotMade * threes.shotValue)).toDouble / attempts.toDouble
    } else {
      0.0
    }

    ShotStatistics(
      attempts = attempts,
      made = total.shotMade,
      frequency = freq,
      pointsPerShot = pps
    )

  }

  private def toShotStatistics(zone: ZonedShot): ShotStatistics = {
    val pps =
      if (zone.shotAttempts > 0)
        (zone.shotMade.doubleValue() * zone.shotValue
          .doubleValue()) / zone.shotAttempts.doubleValue()
      else 0.0
    ShotStatistics(
      attempts = zone.shotAttempts,
      made = zone.shotMade,
      frequency = zone.frequency,
      pointsPerShot = pps
    )
  }

  private def calculateFrequency(zone: ZonedShot, total: ZonedShot): Double = {
    if (total.shotAttempts > 0) {
      zone.shotAttempts.doubleValue() / total.shotAttempts
    } else {
      0.0
    }
  }

  private def toShotZone(shot: ShotWithPlayers): Seq[ZonedShot] = {
    val total = Some(
      ZonedShot("total",
                "total",
                shot.shotAttemptedFlag,
                shot.shotMadeFlag,
                shot.shotValue,
                0.0))
    val points = if (shot.shotValue == 3) {
      Some(
        ZonedShot("three",
                  "three",
                  shot.shotAttemptedFlag,
                  shot.shotMadeFlag,
                  shot.shotValue,
                  0.0))
    } else if (shot.shotValue == 2) {
      Some(
        ZonedShot("two",
                  "two",
                  shot.shotAttemptedFlag,
                  shot.shotMadeFlag,
                  shot.shotValue,
                  0.0))
    } else {
      None
    }
    val zone =
      if (shot.shotValue == 2 && shot.shotZone != ShotZone.RestrictedArea.toString) {
        Some(
          ZonedShot("mid",
                    "mid",
                    shot.shotAttemptedFlag,
                    shot.shotMadeFlag,
                    shot.shotValue,
                    0.0))
      } else if (shot.shotValue == 2 && shot.shotZone == ShotZone.RestrictedArea.toString) {
        Some(
          ZonedShot("rim",
                    "rim",
                    shot.shotAttemptedFlag,
                    shot.shotMadeFlag,
                    shot.shotValue,
                    0.0))
      } else {
        None
      }

    Seq(total, points, zone).flatten
  }
}
