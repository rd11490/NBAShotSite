//package shotselect
//
//import datamodel._
//import shotselect.ShotSelect.selectData
//import utils.ShotZone
//
//import scala.concurrent.{ExecutionContext, Future}
//
//object ShotProfileSelect {
//
//  def selectShotsForProfile(params: ShotRequest)(
//    implicit executionContext: ExecutionContext): Future[Seq[ShotProfile]] =
//    selectData(params)
//      .map(v => {
//        v.groupBy(_.shooter).map(s => calculateStats(s._1, s._2))
//      })
//
//  private def calculateStats(player: Integer,
//                             shots: Seq[ShotWithPlayers]): ShotProfile = {
//    val total = shots.length
//    val totals = calculateTotalStats(shots, total)
//    val threes = calculateThreeStats(shots, total)
//    val twos = calculateThreeStats(shots, total)
//    val rim = calculateRimStats(shots, total)
//    val midRange = calculateMidRangeStats(shots, total)
//    val threeBreakdown = calculateThreeBreakdown(shots, total)
//
//  }
//
//  private def calculateTotalStats(shots: Seq[ShotWithPlayers], total: Int): ShotStatistics =
//    shots.map(toShotsForReduction).reduceOption(_ + _).map(v =>) //.getOrElse(ShotStatistics.empty)
//
//  private def calculateThreeStats(shots: Seq[ShotWithPlayers], total: Int): ShotStatistics =
//    calculateTotalStats(shots
//      .filter(_.shotValue == 3), total)
//
//  private def calculateTwoStats(shots: Seq[ShotWithPlayers], total: Int): ShotStatistics =
//    calculateTotalStats(shots
//      .filter(_.shotValue == 2), total)
//
//  private def calculateRimStats(shots: Seq[ShotWithPlayers], total: Int): ShotStatistics =
//    calculateTotalStats(shots
//      .filter(_.shotZone == ShotZone.RestrictedArea.toString), total)
//
//  private def calculateMidRangeStats(shots: Seq[ShotWithPlayers], total: Int): ShotStatistics =
//    calculateTotalStats(shots
//      .filter(s => s.shotValue == 2 && s.shotZone != ShotZone.RestrictedArea.toString), total)
//
//  private def calculateThreeBreakdown(shots: Seq[ShotWithPlayers], total: Int): ThreePointBreakdown = {
//    val zones = shots.groupBy(_.shotZone).map(v => v._2.reduce(_ + _))
//  }
//
//  private def toShotsForReduction(shot: ShotWithPlayers)(
//    implicit executionContext: ExecutionContext): ZonedShot = {
//    ZonedShot(
//      s"${shot.shotValue}_${shot.shotZone}",
//      shot.shotZone,
//      shot.shotAttemptedFlag,
//      shot.shotMadeFlag,
//      shot.shotValue,
//      0.0
//    )
//  }
//
//  private def toStatistic(zonedShot: ZonedShot): ShotStatistics =
//    ShotStatistics(zonedShot.shotAttempts, zonedShot.shotMade, zonedShot.frequency, calculatePPS(zonedShot))
//
//  private def calculatePPS(zonedShot: ZonedShot): Double =
//    if (zonedShot.shotAttempts > 0) {
//      (zonedShot.shotValue * zonedShot.shotMade).toDouble / zonedShot.shotAttempts.toDouble
//    } else {
//      0.0
//    }
//
//
//}
//
///*
//
//val threesFreq =
//      if (total.shotAttempts > 0)
//        shotData.shotAttempts.toDouble / total.shotAttempts
//      else 0.0
//    val threesPPS =
//      if (shotData.shotAttempts > 0)
//        (shotData.shotValue * shotData.shotMade).toDouble / shotData.shotAttempts
//      else 0.0
//
//final case class ShotProfile(playerId: String,
//                             name: String,
//                             teamName: String,
//                             shotStatisticsContainer: ShotStatisticsContainer)
//
//final case class ShotProfileResponse(params: ShotRequest,
//                                     data: Seq[ShotProfile])
//
//final case class ShotProfileContainer(total: ShotStatistics,
//                                      threes: ShotStatistics,
//                                      twos: ShotStatistics,
//                                      rim: ShotStatistics,
//                                      midrange: ShotStatistics,
//                                      threesBreakdown: ThreePointBreakdown,
//                                      twoPointBreakdown: TwoPointBreakdown)
//
//final case class ThreePointBreakdown(corner: ShotStatistics,
//                                     aboveBreak: ShotStatistics,
//                                     longThrees: ShotStatistics)
//
//final case class TwoPointBreakdown(rim: ShotStatistics,
//                                   elevenFt: ShotStatistics,
//                                   eighteenFt: ShotStatistics,
//                                   longTwo: ShotStatistics)
//
// */
