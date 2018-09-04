package storage.datamodel

import java.{lang => jl}

final case class RawGameSummaryExtraStats(
  primaryKey: String,
  gameId: String,
  leagueId: String,
  teamId: jl.Integer,
  teamAbbreviation: String,
  teamCity: String,
  pointsInPaint: jl.Integer,
  secondChancePoints: jl.Integer,
  fastBreakPoints: jl.Integer,
  largestLead: jl.Integer,
  leadChanges: jl.Integer,
  timesTied: jl.Integer,
  teamTurnovers: jl.Integer,
  totalTurnovers: jl.Integer,
  teamRebounds: jl.Integer,
  pointsOffTurnOvers: jl.Integer,
  dt: String,
  season: String
)