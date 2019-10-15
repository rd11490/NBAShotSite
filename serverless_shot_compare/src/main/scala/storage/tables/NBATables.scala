package storage.tables

import datamodel._

object NBATables {

  val lineup_shots: PostgresTable =
    PostgresTable[ShotWithPlayers]("lineup_shots")
  val team_info: PostgresTable = PostgresTable[TeamInfo]("team_info")
  val player_info: PostgresTable = PostgresTable[PlayerInfo]("player_info")
  val game_dates: PostgresTable = PostgresTable[GameDate]("game_date")
  val seasons: PostgresTable = PostgresTable[Seasons]("seasons")
  val seasons3: PostgresTable = PostgresTable[Seasons]("seasons3")
  val seasons5: PostgresTable = PostgresTable[Seasons]("seasons5")


  val real_adjusted_four_factors: PostgresTable =
    PostgresTable[RealAdjustedFourFactors]("real_adjusted_four_factors")

  val real_adjusted_four_factors_three_year: PostgresTable =
    PostgresTable[RealAdjustedFourFactors]("real_adjusted_four_factors_three_year")

  val real_adjusted_four_factors_five_year: PostgresTable =
    PostgresTable[RealAdjustedFourFactors]("real_adjusted_four_factors_five_year")

  val raw_cache_table: PostgresTable =
    PostgresTable[CacheParams]("raw_cache_table")
  val frequency_cache_table: PostgresTable =
    PostgresTable[CacheParams]("frequency_cache_table")
  val compare_cache_table: PostgresTable =
    PostgresTable[CacheParams]("compare_cache_table")
  val four_factors_cache_table: PostgresTable =
    PostgresTable[CacheParams]("four_factors_cache_table")

}
