package com.rrdinsights.shotcompare.utils.storage

import com.rrdinsights.scalabrine.ScalabrineClient
import com.rrdinsights.scalabrine.endpoints.PlayByPlayEndpoint
import com.rrdinsights.scalabrine.parameters.GameIdParameter
import com.rrdinsights.shotcompare.TestSpec
import com.rrdinsights.shotcompare.utils.storage.tables.NBATables

final class MySqlClientTest extends TestSpec {
  test("create table") {
    val pbp = ScalabrineClient.getPlayByPlay(PlayByPlayEndpoint(GameIdParameter.newParameterValue("0021600730"))).playByPlay.events

    PostgresClient.createTable(NBATables.raw_play_by_play)
  }
}