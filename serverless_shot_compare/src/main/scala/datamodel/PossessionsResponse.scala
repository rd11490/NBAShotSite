package datamodel


final case class PossessionsAggregation(points: Double = 0.0,
                                        expectedPoints: Double = 0.0,
                                        defensiveRebounds: Int = 0,
                                        offensiveRebounds: Int = 0,
                                        opponentDefensiveRebounds: Int = 0,
                                        opponentOffensiveRebounds: Int = 0,
                                        offensiveFouls: Int = 0,
                                        defensiveFouls: Int = 0,
                                        turnovers: Int = 0,
                                        fieldGoalAttempts: Int = 0,
                                        fieldGoals: Int = 0,
                                        threePtAttempts: Int = 0,
                                        threePtMade: Int = 0,
                                        freeThrowAttempts: Int = 0,
                                        freeThrowsMade: Int = 0,
                                        possessions: Int = 0,
                                        seconds: Int = 0) {

  def +(other: PossessionsAggregation): PossessionsAggregation =
    PossessionsAggregation(
      points = points + other.points,
      expectedPoints = expectedPoints + other.expectedPoints,
      defensiveRebounds = defensiveRebounds + other.defensiveRebounds,
      offensiveRebounds = offensiveRebounds + other.offensiveRebounds,
      opponentDefensiveRebounds = opponentDefensiveRebounds + other.opponentDefensiveRebounds,
      opponentOffensiveRebounds = opponentOffensiveRebounds + other.opponentOffensiveRebounds,
      offensiveFouls = offensiveFouls + other.offensiveFouls,
      defensiveFouls = defensiveFouls + other.defensiveFouls,
      turnovers = turnovers + other.turnovers,
      fieldGoalAttempts = fieldGoalAttempts + other.fieldGoalAttempts,
      fieldGoals = fieldGoals + other.fieldGoals,
      threePtAttempts = threePtAttempts + other.threePtAttempts,
      threePtMade = threePtMade + other.threePtMade,
      freeThrowAttempts = freeThrowAttempts + other.freeThrowAttempts,
      freeThrowsMade = freeThrowsMade + other.freeThrowsMade,
      possessions = possessions + other.possessions,
      seconds = seconds + other.seconds
    )
}

final case class PossessionsResponse(
                                      params: PossessionsRequest,
                                      possession: PossessionsAggregation
                                    )
