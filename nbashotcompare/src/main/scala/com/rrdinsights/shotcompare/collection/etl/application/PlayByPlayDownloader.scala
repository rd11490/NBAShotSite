package com.rrdinsights.shotcompare.collection.etl.application

import com.rrdinsights.scalabrine.ScalabrineClient
import com.rrdinsights.scalabrine.endpoints.PlayByPlayEndpoint
import com.rrdinsights.scalabrine.models.PlayByPlayEvent
import com.rrdinsights.scalabrine.parameters.{ GameIdParameter, ParameterValue }
import com.rrdinsights.shotcompare.utils.storage.PostgresClient
import com.rrdinsights.shotcompare.utils.storage.datamodel.{ GameRecord, RawPlayByPlayEvent }
import com.rrdinsights.shotcompare.utils.storage.tables.NBATables

object PlayByPlayDownloader {

  def downloadAndWriteAllPlayByPlay(gameLogs: Seq[GameRecord], season: String, dt: String): Unit = {
    val playByPlay = downloadAllPlayByPlay(gameLogs)
    writePlayByPlay(playByPlay, season, dt)
  }

  private def downloadAllPlayByPlay(gameLogs: Seq[GameRecord]): Seq[PlayByPlayEvent] = {
    gameLogs
      .map(_.gameId)
      .distinct
      .map(GameIdParameter.newParameterValue)
      .flatMap(v => {
        Thread.sleep(1000)
        downloadGamePlayByPlay(v)
      })
  }

  private def downloadGamePlayByPlay(gameIdParamter: ParameterValue): Seq[PlayByPlayEvent] = {
    val endpoint = PlayByPlayEndpoint(gameIdParamter)
    try {
      ScalabrineClient.getPlayByPlay(endpoint).playByPlay.events
    } catch {
      case e: Throwable =>
        println("Failed to Download!")
        println(gameIdParamter.toUrl)
        println(e)
        Seq.empty
    }
  }

  private def writePlayByPlay(events: Seq[PlayByPlayEvent], season: String, dt: String): Unit = {
    PostgresClient.createTable(NBATables.raw_play_by_play)
    val gameRecords = events.map(RawPlayByPlayEvent.apply(_, season, dt))
    PostgresClient.insertInto(NBATables.raw_play_by_play, gameRecords)
  }

  def readPlayByPlay(where: String*): Seq[RawPlayByPlayEvent] = {
    PostgresClient.selectFromAndWait[RawPlayByPlayEvent](
      NBATables.raw_play_by_play,
      RawPlayByPlayEvent.apply,
      where: _*
    )
  }
}