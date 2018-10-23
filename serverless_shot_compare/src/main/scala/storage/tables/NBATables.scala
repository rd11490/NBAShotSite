package storage.tables

import datamodel._

object NBATables {

  val lineup_shots: PostgresTable =
    PostgresTable[ShotWithPlayers]("lineup_shots")
  val team_info: PostgresTable = PostgresTable[TeamInfo]("team_info")
  val player_info: PostgresTable = PostgresTable[PlayerInfo]("player_info")
  val game_dates: PostgresTable = PostgresTable[GameDate]("game_date")

  val raw_cache_table: PostgresTable =
    PostgresTable[CacheParams]("raw_cache_table")
  val frequency_cache_table: PostgresTable =
    PostgresTable[CacheParams]("frequency_cache_table")
  val compare_cache_table: PostgresTable =
    PostgresTable[CacheParams]("compare_cache_table")

}
