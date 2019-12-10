package datamodel

final case class ShotProfile(playerId: String,
                             name: String,
                             teamName: String,
                             shotStatisticsContainer: ShotProfileContainer)

final case class ShotProfileResponse(params: ShotRequest,
                                     data: Seq[ShotProfile])

final case class ShotProfileContainer(total: ShotStatistics,
                                      threes: ShotStatistics,
                                      twos: ShotStatistics,
                                      rim: ShotStatistics,
                                      midrange: ShotStatistics,
                                      threesBreakdown: ThreePointBreakdown,
                                      twoPointBreakdown: TwoPointBreakdown)

final case class ThreePointBreakdown(corner: ShotStatistics,
                                     aboveBreak: ShotStatistics,
                                     longThrees: ShotStatistics)

final case class TwoPointBreakdown(rim: ShotStatistics,
                                   elevenFt: ShotStatistics,
                                   eighteenFt: ShotStatistics,
                                   longTwo: ShotStatistics)
