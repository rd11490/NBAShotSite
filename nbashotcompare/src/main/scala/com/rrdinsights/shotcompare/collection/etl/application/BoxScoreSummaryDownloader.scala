package com.rrdinsights.shotcompare.collection.etl.application

import com.rrdinsights.scalabrine.ScalabrineClient
import com.rrdinsights.scalabrine.endpoints.BoxScoreEndpoint
import com.rrdinsights.scalabrine.models._
import com.rrdinsights.scalabrine.parameters.{ GameIdParameter, ParameterValue }
import com.rrdinsights.shotcompare.utils.storage.PostgresClient
import com.rrdinsights.shotcompare.utils.storage.datamodel._
import com.rrdinsights.shotcompare.utils.storage.tables.NBATables

object BoxScoreSummaryDownloader {

  def downloadAndWriteAllBoxScoreSummaries(gameLogs: Seq[GameRecord], dt: String, season: Option[String]): Unit = {
    downloadAlBoxScoreSummaries(gameLogs)
      .foreach(v => writeBoxScoreSummaryComponents(v._2, v._1, dt, season))
  }

  def writeBoxScoreSummaryComponents(summary: BoxScoreSummary, gameId: String, dt: String, season: Option[String]): Unit = {
    summary.gameSummary.foreach(writeGameSummary(_, dt, season))
    summary.gameInfo.foreach(writeGameInfo(_, gameId, dt, season))
    writeInactivePlayres(summary.inactivePlayers, gameId, dt, season)
    writeOfficials(summary.officials, gameId, dt, season)
    val scoreLines = Seq(summary.homeStats.scoreLine, summary.awayStats.scoreLine).flatten
    if (scoreLines.nonEmpty) {
      writeScoreLines(scoreLines, dt, season)
    }
    val otherStats = Seq(summary.homeStats.otherStats, summary.awayStats.otherStats).flatten
    if (otherStats.nonEmpty) {
      writeOtherStats(otherStats, gameId, dt, season)
    }
  }

  private def downloadAlBoxScoreSummaries(gameLogs: Seq[GameRecord]): Seq[(String, BoxScoreSummary)] = {
    gameLogs
      .map(_.gameId)
      .distinct
      .map(GameIdParameter.newParameterValue)
      .flatMap(v => {
        Thread.sleep(500)
        println(v.value)
        downloadBoxScoreSummary(v).map(s => (v.value, s))
      })
  }

  private def downloadBoxScoreSummary(gameIdParamter: ParameterValue): Option[BoxScoreSummary] = {
    val endpoint = BoxScoreEndpoint(gameIdParamter)
    try {
      Some(ScalabrineClient.getBoxScoreSummary(endpoint).boxScoreSummary)
    } catch {
      case e: Throwable =>
        println("Failed to Download!")
        println(gameIdParamter.toUrl)
        println(e)
        None
    }
  }

  private def writeGameSummary(summary: GameSummary, dt: String, season: Option[String]): Unit = {
    val rawGameSummary = RawGameSummary(summary, dt, season)
    PostgresClient.createTable(NBATables.raw_game_summary)
    PostgresClient.insertInto(NBATables.raw_game_summary, Seq(rawGameSummary))
  }

  def readGameSummary(whereClauses: String*): Seq[RawGameSummary] = {
    PostgresClient.selectFromAndWait[RawGameSummary](
      NBATables.raw_game_summary,
      RawGameSummary.apply,
      whereClauses: _*
    )
  }

  private def writeGameInfo(info: GameInfo, gameId: String, dt: String, season: Option[String]): Unit = {
    val rawGameInfo = RawGameInfo(info, gameId, dt, season)
    PostgresClient.createTable(NBATables.raw_game_info)
    PostgresClient.insertInto(NBATables.raw_game_info, Seq(rawGameInfo))
  }

  def readGameInfo(whereClauses: String*): Seq[RawGameInfo] = {
    PostgresClient.selectFromAndWait[RawGameInfo](
      NBATables.raw_game_info,
      RawGameInfo.apply,
      whereClauses: _*
    )
  }

  private def writeScoreLines(scoreLines: Seq[ScoreLine], dt: String, season: Option[String]): Unit = {
    val rawScoreLines = scoreLines.map(RawGameScoreLine(_, dt, season))
    PostgresClient.createTable(NBATables.raw_game_score_line)
    PostgresClient.insertInto(NBATables.raw_game_score_line, rawScoreLines)
  }

  private def writeOtherStats(otherStats: Seq[OtherStats], gameId: String, dt: String, season: Option[String]): Unit = {
    val rawOtherStats = otherStats.map(RawOtherStats(_, gameId, dt, season))
    PostgresClient.createTable(NBATables.raw_game_other_stats)
    PostgresClient.insertInto(NBATables.raw_game_other_stats, rawOtherStats)
  }

  private def writeOfficials(officials: Seq[Officials], gameId: String, dt: String, season: Option[String]): Unit = {
    val gameOfficials = officials.map(GameOfficial(_, gameId, dt, season))
    PostgresClient.createTable(NBATables.game_officials)
    PostgresClient.insertInto(NBATables.game_officials, gameOfficials)
  }

  private def writeInactivePlayres(inactivePlayers: Seq[InactivePlayers], gameId: String, dt: String, season: Option[String]): Unit = {
    val rawInactivePlayers = inactivePlayers.map(v => RawInactivePlayers(v, gameId, dt, season))
    PostgresClient.createTable(NBATables.raw_game_inactive_players)
    PostgresClient.insertInto(NBATables.raw_game_inactive_players, rawInactivePlayers)
  }
}
