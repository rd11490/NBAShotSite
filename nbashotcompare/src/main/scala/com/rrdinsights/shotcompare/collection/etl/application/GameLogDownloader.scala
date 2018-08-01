package com.rrdinsights.shotcompare.collection.etl.application

import com.rrdinsights.scalabrine.ScalabrineClient
import com.rrdinsights.scalabrine.endpoints.TeamGameLogEndpoint
import com.rrdinsights.scalabrine.models.GameLog
import com.rrdinsights.scalabrine.parameters.{ ParameterValue, SeasonParameter, TeamIdParameter }
import com.rrdinsights.shotcompare.utils.storage.PostgresClient
import com.rrdinsights.shotcompare.utils.storage.datamodel.GameRecord
import com.rrdinsights.shotcompare.utils.storage.tables.NBATables

object GameLogDownloader {

  def downloadAndWriteAllGameLogs(season: String, dt: String): Unit = {
    val gameLog = downloadAllGameLogs(season)
    writeGameLogs(gameLog, season, dt)
  }

  private def downloadTeamGameLog(seasonParameter: ParameterValue, teamId: ParameterValue): Seq[GameLog] = {
    val gameLogEndpoint = TeamGameLogEndpoint(teamId, seasonParameter)
    ScalabrineClient.getTeamGameLog(gameLogEndpoint).teamGameLog.games
    try {
      ScalabrineClient.getTeamGameLog(gameLogEndpoint).teamGameLog.games
    } catch {
      case e: Throwable =>
        println("Failed to Download!")
        println(seasonParameter.toUrl)
        println(e)
        Seq.empty
    }
  }

  private def downloadAllGameLogs(season: String): Seq[GameLog] = {
    val seasonParameter = SeasonParameter.newParameterValue(season)
    TeamIdParameter.TeamIds
      .flatMap(v => {
        Thread.sleep(1000)
        downloadTeamGameLog(seasonParameter, v)
      })
  }

  private def writeGameLogs(gameLogs: Seq[GameLog], season: String, dt: String): Unit = {
    PostgresClient.createTable(NBATables.game_record)
    val gameRecords = gameLogs.map(GameRecord.apply(_, season, dt))
    PostgresClient.insertInto(NBATables.game_record, gameRecords)
  }

  def readGameLogs(season: String): Seq[GameRecord] =
    PostgresClient.selectFromAndWait[GameRecord](
      NBATables.game_record,
      GameRecord.apply,
      s"Season = '$season'"
    )

}
