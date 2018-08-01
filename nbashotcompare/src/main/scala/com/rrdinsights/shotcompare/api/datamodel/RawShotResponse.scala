package com.rrdinsights.shotcompare.api.datamodel

import java.{ lang => jl }

import com.rrdinsights.shotcompare.utils.storage.datamodel.ShotWithPlayers

final case class RawShotResponse(
  shooter: jl.Integer,
  offensiveTeamId: jl.Integer,
  defenseTeamId: jl.Integer,
  shotDistance: jl.Integer,
  xCoordinate: jl.Integer,
  yCoordinate: jl.Integer,
  shotZone: String,
  shotMadeFlag: jl.Integer,
  shotValue: jl.Integer
)

object RawShotResponse {
  def apply(shotWithPlayers: ShotWithPlayers): RawShotResponse =
    RawShotResponse(
      shooter = shotWithPlayers.shooter,
      offensiveTeamId = shotWithPlayers.offenseTeamId,
      defenseTeamId = shotWithPlayers.defenseTeamId,
      shotDistance = shotWithPlayers.shotDistance,
      xCoordinate = shotWithPlayers.xCoordinate,
      yCoordinate = shotWithPlayers.yCoordinate,
      shotZone = shotWithPlayers.shotZone,
      shotMadeFlag = shotWithPlayers.shotMadeFlag,
      shotValue = shotWithPlayers.shotValue
    )
}

final case class RawShotRequestData(
    shooter: Option[Int] = None,
    offenseTeamId: Option[Int] = None,
    offensePlayerIds: Option[String] = None,
    offenseOffPlayerIds: Option[String] = None,
    defenseTeamId: Option[Int] = None,
    defensePlayerIds: Option[String] = None,
    defenseOffPlayerIds: Option[String] = None,
    period: Option[Int] = None,
    secondsRemaining: Option[Int] = None,
    season: Option[String] = None,
    startDate: Option[Long] = None,
    endDate: Option[Long] = None
) {
  def toWhereClause: Seq[String] =
    Seq(
      shooter.map(v => s"shooter = $v"),
      offenseTeamId.map(v => s"offenseTeamId = $v"),
      defenseTeamId.map(v => s"defenseTeamId = $v"),
      period.map(v => s"period = $v"),
      secondsRemaining.map(v => s"secondsRemaining <= $v"),
      season.map(v => s"""season = '$v'"""),
      startDate.map(v => s"gameDate >= $v"),
      endDate.map(v => s"gameDate <= $v")
    ).flatten ++
      (defenseOffPlayerIds.map(ids =>
        ids.split(",").map(v => defensiveOffPlayerWhere(v.toInt))) ++
        offenseOffPlayerIds.map(ids =>
          ids.split(",").map(v => offensiveOffPlayerWhere(v.toInt))) ++
        defensePlayerIds.map(ids =>
          ids.split(",").map(v => defensivePlayerWhere(v.toInt))) ++
        offensePlayerIds.map(ids =>
          ids.split(",").map(v => offensivePlayerWhere(v.toInt)))).flatten

  private def offensivePlayerWhere(id: Int): String = {
    s"""(offensePlayer1Id = $id OR offensePlayer2Id = $id OR
       |offensePlayer3Id = $id OR offensePlayer4Id = $id OR
       |offensePlayer5Id = $id)
     """.stripMargin
  }

  private def offensiveOffPlayerWhere(id: Int): String = {
    s"""(offensePlayer1Id != $id AND offensePlayer2Id != $id AND
       |offensePlayer3Id != $id AND offensePlayer4Id != $id AND
       |offensePlayer5Id != $id)
     """.stripMargin
  }

  private def defensivePlayerWhere(id: Int): String = {
    s"""(defensePlayer1Id = $id OR defensePlayer2Id = $id OR
       |defensePlayer3Id = $id OR defensePlayer4Id = $id OR
       |defensePlayer5Id = $id)
     """.stripMargin
  }

  private def defensiveOffPlayerWhere(id: Int): String = {
    s"""(defensePlayer1Id != $id AND defensePlayer2Id != $id AND
       |defensePlayer3Id != $id AND defensePlayer4Id != $id AND
       |defensePlayer5Id != $id)
     """.stripMargin
  }
}

final case class RawShots(shots: Seq[RawShotResponse])

final case class ZonedShots(total: ZonedShot, shots: Seq[ZonedShot])

final case class ZonedShot(
    key: String,
    bin: String,
    shotAttempts: Integer,
    shotMade: Integer,
    shotValue: Integer,
    frequency: jl.Double
) {
  def +(other: ZonedShot): ZonedShot = ZonedShot(
    key,
    bin,
    shotAttempts + other.shotAttempts,
    shotMade + other.shotMade,
    shotValue,
    if (frequency > 0) frequency else other.frequency
  )
}
