package com.rrdinsights.shotcompare.utils.storage.tables

import com.rrdinsights.shotcompare.collection.etl.application.{ GameDate, PlayerInfo, TeamInfo }
import com.rrdinsights.shotcompare.collection.investigation.shots.PlayerShotChartSection
import com.rrdinsights.shotcompare.utils.storage.datamodel._

object NBATables {

  val game_officials: PostgresTable = PostgresTable[GameOfficial]("game_officials")
  val game_record: PostgresTable = PostgresTable[GameRecord]("game_record")
  val raw_game_inactive_players: PostgresTable = PostgresTable[RawInactivePlayers]("raw_game_inactive_players")
  val raw_game_info: PostgresTable = PostgresTable[RawGameInfo]("raw_game_info")
  val raw_game_other_stats: PostgresTable = PostgresTable[RawOtherStats]("raw_game_other_stats")
  val raw_game_score_line: PostgresTable = PostgresTable[RawGameScoreLine]("raw_game_score_line")
  val raw_game_summary: PostgresTable = PostgresTable[RawGameSummary]("raw_game_summary")
  val raw_play_by_play: PostgresTable = PostgresTable[RawPlayByPlayEvent]("raw_play_by_play")

  val raw_shot_data: PostgresTable = PostgresTable[RawShotData]("raw_shot_data")
  val raw_player_profile_career_totals: PostgresTable = PostgresTable[RawPlayerProfileCareer]("raw_player_profile_career_totals")
  val raw_player_profile_season_totals: PostgresTable = PostgresTable[RawPlayerProfileSeason]("raw_player_profile_season_totals")
  val roster_player: PostgresTable = PostgresTable[RosterPlayer]("roster_player")
  val roster_coach: PostgresTable = PostgresTable[RosterCoach]("roster_coach")
  val raw_team_box_score_advanced: PostgresTable = PostgresTable[RawTeamBoxScoreAdvanced]("raw_team_box_score_advanced")
  val raw_player_box_score_advanced: PostgresTable = PostgresTable[RawPlayerBoxScoreAdvanced]("raw_player_box_score_advanced")
  val players_on_court: PostgresTable = PostgresTable[PlayersOnCourt]("players_on_court")
  val players_on_court_at_period: PostgresTable = PostgresTable[PlayersOnCourt]("players_on_court_at_period")
  val player_shot_charts: PostgresTable = PostgresTable[PlayerShotChartSection]("player_shot_charts")
  val lineup_shots: PostgresTable = PostgresTable[ShotWithPlayers]("lineup_shots")
  val team_info: PostgresTable = PostgresTable[TeamInfo]("team_info")
  val player_info: PostgresTable = PostgresTable[PlayerInfo]("player_info")
  val game_dates: PostgresTable = PostgresTable[GameDate]("game_date")

  val play_by_play_with_lineup: PostgresTable = PostgresTable[PlayByPlayWithLineup]("play_by_play_with_lineup")

  val team_scored_shots: PostgresTable = PostgresTable[ScoredShot]("team_scored_shots")
  val players_on_court_test: PostgresTable = PostgresTable[PlayersOnCourt]("players_on_court_test")

  val offense_expected_points: PostgresTable = PostgresTable[ExpectedPoints]("offense_expected_points")
  val defense_expected_points: PostgresTable = PostgresTable[ExpectedPoints]("defense_expected_points")

}
