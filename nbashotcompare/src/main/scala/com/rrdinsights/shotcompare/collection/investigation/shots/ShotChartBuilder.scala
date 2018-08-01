package com.rrdinsights.shotcompare.collection.investigation.shots

import com.rrdinsights.shotcompare.collection.etl.application.ShotChartDownloader
import com.rrdinsights.shotcompare.utils.TimeUtils
import com.rrdinsights.shotcompare.utils.storage.PostgresClient
import com.rrdinsights.shotcompare.utils.storage.tables.NBATables

object ShotChartBuilder {

  def main(strings: Array[String]): Unit = {
    val dt = TimeUtils.dtNow

    val shots = ShotChartDownloader.readShotData()

    val shotHistograms = shots
      .groupBy(_.playerId)
      .flatMap(v => ShotHistogram.calculate(v._2))
      .map(v => PlayerShotChartSection.apply(v._1, v._2, dt))
      .toSeq

    writeShotCharts(shotHistograms)
  }

  def writeShotCharts(shots: Seq[PlayerShotChartSection]): Unit = {
    PostgresClient.createTable(NBATables.player_shot_charts)
    PostgresClient.insertInto(NBATables.player_shot_charts, shots)
  }

}
