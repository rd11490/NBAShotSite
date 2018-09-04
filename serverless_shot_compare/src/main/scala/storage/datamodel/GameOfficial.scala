package storage.datamodel

import java.{ lang => jl }

final case class GameOfficial(
  primaryKey: String,
  gameId: String,
  officialId: jl.Integer,
  firstName: String,
  lastName: String,
  number: String,
  dt: String,
  season: String
)

