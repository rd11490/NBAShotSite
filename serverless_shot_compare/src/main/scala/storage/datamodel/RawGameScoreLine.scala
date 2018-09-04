package storage.datamodel

import java.{ lang => jl }

final case class RawGameScoreLine(
  primaryKey: String,
  gameDateTimeEST: String,
  gameSequence: jl.Integer,
  gameId: String,
  teamId: jl.Integer,
  teamAbbreviation: String,
  teamCityName: String,
  teamNickName: String,
  teamWinsLosses: String,
  quarter1Points: jl.Integer,
  quarter2Points: jl.Integer,
  quarter3Points: jl.Integer,
  quarter4Points: jl.Integer,
  ot1Points: jl.Integer,
  ot2Points: jl.Integer,
  ot3Points: jl.Integer,
  ot4Points: jl.Integer,
  ot5Points: jl.Integer,
  ot6Points: jl.Integer,
  ot7Points: jl.Integer,
  ot8Points: jl.Integer,
  ot9Points: jl.Integer,
  ot10Points: jl.Integer,
  points: jl.Integer,
  dt: String,
  season: String
)
