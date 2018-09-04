package storage.datamodel

import java.{lang => jl}

final case class RosterCoach(
  primaryKey: String,
  teamId: jl.Integer,
  seasonPlayed: String,
  coachId: String,
  firstName: String,
  lastName: String,
  coachName: String,
  coachCode: String,
  isAssistant: jl.Boolean,
  coachType: String,
  school: String,
  season: String,
  dt: String
)
