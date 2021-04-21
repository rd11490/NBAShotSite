package datamodel

import storage.PostgresClient

final case class PossessionsRequest(hash: Option[String],
                                    params: Option[PossessionRequestParams])

final case class PossessionRequestParams(
    offenseTeamId: Option[Int] = None,
    offensePlayerIds: Option[Seq[Int]] = None,
    offenseOffPlayerIds: Option[Seq[Int]] = None,
    defenseTeamId: Option[Int] = None,
    defensePlayerIds: Option[Seq[Int]] = None,
    defenseOffPlayerIds: Option[Seq[Int]] = None,
    period: Option[Seq[Int]] = None,
    secondsRemaining: Option[Int] = None,
    season: Option[Seq[String]] = None,
    seasonType: Option[String] = None,
    startDate: Option[Long] = None,
    endDate: Option[Long] = None
) {
  def toWhereClause: Seq[String] = {
    val where = Seq(
      offenseTeamId.map(v => s"offenseTeamId1 = $v"),
      defenseTeamId.map(v => s"defenseTeamId2 = $v"),
      period.flatMap(periodWhere),
      secondsRemaining.map(v => s"secondsRemaining <= $v"),
      season.flatMap(seasonWhere),
      seasonType.map(v => s"""seasontype = '$v'"""),
      startDate.map(v => s"gameDate >= $v"),
      endDate.map(v => s"gameDate <= $v")
    ).flatten ++
      (defenseOffPlayerIds.map(ids => ids.map(v => defensiveOffPlayerWhere(v))) ++
        offenseOffPlayerIds.map(ids => ids.map(v => offensiveOffPlayerWhere(v))) ++
        defensePlayerIds.map(ids => ids.map(v => defensivePlayerWhere(v))) ++
        offensePlayerIds.map(ids => ids.map(v => offensivePlayerWhere(v)))).flatten

    where.foreach(checkSql)
    where
  }

  private def checkSql(str: String): Unit = {
    PostgresClient.BadTerms.foreach(v =>
      if (str.toLowerCase.contains(v.toLowerCase)) {
        throw new IllegalArgumentException("SQL INJECTION ATTEMPTED!")
    })
  }

  private def seasonWhere(seasons: Seq[String]): Option[String] =
    if (seasons.nonEmpty) {
      Some(seasons.map(v => s"""season = '$v'""").mkString("(", " OR ", ")"))
    } else {
      None
    }

  private def periodWhere(periods: Seq[Int]): Option[String] =
    if (periods.nonEmpty) {
      Some(periods.map(v => s"period = $v").mkString("(", " OR ", ")"))
    } else {
      None
    }

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

final case class FourFactorsRequest(hash: Option[String],
                                    params: Option[FourFactorsRequestParams])

final case class FourFactorsRequestParams(seasons: Option[Seq[String]] = None,
                                          players: Option[Seq[Int]] = None,
                                          teams: Option[Seq[Int]] = None) {
  def toWhereClause: Seq[String] = {
    Seq(seasons.flatMap(seasonWhere),
        players.flatMap(playersWhere),
        teams.flatMap(teamsWhere)).flatten
  }

  private def seasonWhere(seasons: Seq[String]): Option[String] =
    if (seasons.nonEmpty) {
      Some(seasons.map(v => s"""season = '$v'""").mkString("(", " OR ", ")"))
    } else {
      None
    }

  private def playersWhere(players: Seq[Int]): Option[String] = {
    if (players.nonEmpty) {
      Some(players.map(v => s"playerid = $v").mkString("(", " OR ", ")"))
    } else {
      None
    }
  }

  private def teamsWhere(teams: Seq[Int]): Option[String] = {
    if (teams.nonEmpty) {
      Some(teams.map(v => s"teamid = $v").mkString("(", " OR ", ")"))
    } else {
      None
    }
  }
}

final case class RawShotRequest(hash: Option[String],
                                params: Option[ShotRequest])

final case class FrequencyShotRequest(hash: Option[String],
                                      params: Option[ShotRequest])

final case class FrequencyRoleShotRequest(hash: Option[String],
                                      params: Option[ShotRequestWithRole])

final case class CompareShotRequest(hash: Option[String], params: Option[ShotCompareRequest[ShotRequest]])

final case class CompareRoleShotRequest(hash: Option[String], params: Option[ShotCompareRequest[ShotRequestWithRole]])

final case class ShotCompareRequest[T](shots1: T, shots2: T)

final case class ShotRequest(
    shooter: Option[Seq[Int]] = None,
    offenseTeamId: Option[Int] = None,
    offensePlayerIds: Option[Seq[Int]] = None,
    offenseOffPlayerIds: Option[Seq[Int]] = None,
    defenseTeamId: Option[Int] = None,
    defensePlayerIds: Option[Seq[Int]] = None,
    defenseOffPlayerIds: Option[Seq[Int]] = None,
    period: Option[Seq[Int]] = None,
    secondsRemaining: Option[Int] = None,
    season: Option[Seq[String]] = None,
    seasonType: Option[String] = None,
    startDate: Option[Long] = None,
    endDate: Option[Long] = None) {

  def toWhereClause: Seq[String] = {
    val where = Seq(
      shooter.flatMap(shooterWhere),
      offenseTeamId.map(v => s"offenseTeamId = $v"),
      defenseTeamId.map(v => s"defenseTeamId = $v"),
      period.flatMap(periodWhere),
      secondsRemaining.map(v => s"secondsRemaining <= $v"),
      season.flatMap(seasonWhere),
      seasonType.map(v => s"""seasontype = '$v'"""),
      startDate.map(v => s"gameDate >= $v"),
      endDate.map(v => s"gameDate <= $v")
    ).flatten ++
      (defenseOffPlayerIds.map(ids => ids.map(v => defensiveOffPlayerWhere(v))) ++
        offenseOffPlayerIds.map(ids => ids.map(v => offensiveOffPlayerWhere(v))) ++
        defensePlayerIds.map(ids => ids.map(v => defensivePlayerWhere(v))) ++
        offensePlayerIds.map(ids => ids.map(v => offensivePlayerWhere(v)))).flatten

    where.foreach(checkSql)
    where
  }

  private def checkSql(str: String): Unit = {
    PostgresClient.BadTerms.foreach(v =>
      if (str.toLowerCase.contains(v.toLowerCase)) {
        throw new IllegalArgumentException("SQL INJECTION ATTEMPTED!")
    })
  }

  private def shooterWhere(shooters: Seq[Int]): Option[String] = {
    if (shooters.nonEmpty) {
      Some(shooters.map(v => s"shooter = $v").mkString("(", " OR ", ")"))
    } else {
      None
    }
  }

  private def seasonWhere(seasons: Seq[String]): Option[String] =
    if (seasons.nonEmpty) {
      Some(seasons.map(v => s"""season = '$v'""").mkString("(", " OR ", ")"))
    } else {
      None
    }

  private def periodWhere(periods: Seq[Int]): Option[String] =
    if (periods.nonEmpty) {
      Some(periods.map(v => s"period = $v").mkString("(", " OR ", ")"))
    } else {
      None
    }

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

final case class ShotRequestWithRole(
                              shooter: Option[Seq[Int]] = None,
                              offenseTeamId: Option[Int] = None,
                              offensePlayerIds: Option[Seq[Int]] = None,
                              offenseOffPlayerIds: Option[Seq[Int]] = None,
                              defenseTeamId: Option[Int] = None,
                              defensePlayerIds: Option[Seq[Int]] = None,
                              defenseOffPlayerIds: Option[Seq[Int]] = None,
                              period: Option[Seq[Int]] = None,
                              secondsRemaining: Option[Int] = None,
                              season: Option[Seq[String]] = None,
                              seasonType: Option[String] = None,
                              startDate: Option[Long] = None,
                              endDate: Option[Long] = None,
                              shooterRole: Option[Seq[String]] = None,
                              offensePlayerRoles: Option[Seq[String]] = None,
                              offenseOffPlayerRoles: Option[Seq[String]] = None,
                              defensePlayerRoles: Option[Seq[String]] = None,
                              defenseOffPlayerRoles: Option[Seq[String]] = None) {

  def toWhereClause: Seq[String] = {
    val where = Seq(
      shooter.flatMap(shooterWhere),
      shooterRole.flatMap(shooterRoleWhere),
      offenseTeamId.map(v => s"offenseTeamId = $v"),
      defenseTeamId.map(v => s"defenseTeamId = $v"),
      period.flatMap(periodWhere),
      secondsRemaining.map(v => s"secondsRemaining <= $v"),
      season.flatMap(seasonWhere),
      seasonType.map(v => s"""seasontype = '$v'"""),
      startDate.map(v => s"gameDate >= $v"),
      endDate.map(v => s"gameDate <= $v")
    ).flatten ++
      (defenseOffPlayerIds.map(ids => ids.map(v => defensiveOffPlayerWhere(v))) ++
        offenseOffPlayerIds.map(ids => ids.map(v => offensiveOffPlayerWhere(v))) ++
        defensePlayerIds.map(ids => ids.map(v => defensivePlayerWhere(v))) ++
        offensePlayerIds.map(ids => ids.map(v => offensivePlayerWhere(v)))).flatten ++
      (defenseOffPlayerRoles.map(ids =>
        ids.map(v => defensiveOffPlayerRoleWhere(v))) ++
        offenseOffPlayerRoles.map(ids =>
          ids.map(v => offensiveOffPlayerRoleWhere(v))) ++
        defensePlayerRoles.map(ids => ids.map(v => defensivePlayerRoleWhere(v))) ++
        offensePlayerRoles.map(ids =>
          ids.map(v => offensivePlayerRoleWhere(v)))).flatten

    where.foreach(checkSql)
    where
  }

  private def checkSql(str: String): Unit = {
    PostgresClient.BadTerms.foreach(v =>
      if (str.toLowerCase.contains(v.toLowerCase)) {
        throw new IllegalArgumentException("SQL INJECTION ATTEMPTED!")
      })
  }

  private def shooterWhere(shooters: Seq[Int]): Option[String] = {
    if (shooters.nonEmpty) {
      Some(shooters.map(v => s"shooter = $v").mkString("(", " OR ", ")"))
    } else {
      None
    }
  }

  private def shooterRoleWhere(shooters: Seq[String]): Option[String] = {
    if (shooters.nonEmpty) {
      Some(shooters.map(v => s"shooterRole = $v").mkString("(", " OR ", ")"))
    } else {
      None
    }
  }

  private def seasonWhere(seasons: Seq[String]): Option[String] =
    if (seasons.nonEmpty) {
      Some(seasons.map(v => s"""season = '$v'""").mkString("(", " OR ", ")"))
    } else {
      None
    }

  private def periodWhere(periods: Seq[Int]): Option[String] =
    if (periods.nonEmpty) {
      Some(periods.map(v => s"period = $v").mkString("(", " OR ", ")"))
    } else {
      None
    }

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

  private def offensivePlayerRoleWhere(role: String): String = {
    s"""(offensePlayer1Role = '$role' OR offensePlayer2Role = '$role' OR
       |offensePlayer3Role = '$role' OR offensePlayer4Role = '$role' OR
       |offensePlayer5Role = '$role')
     """.stripMargin
  }

  private def offensiveOffPlayerRoleWhere(role: String): String = {
    s"""(offensePlayer1Role != '$role' AND offensePlayer2Role != '$role' AND
       |offensePlayer3Role != '$role' AND offensePlayer4Role != '$role' AND
       |offensePlayer5Role != '$role')
     """.stripMargin
  }

  private def defensivePlayerRoleWhere(role: String): String = {
    s"""(defensePlayer1Role = '$role' OR defensePlayer2Role = '$role' OR
       |defensePlayer3Role = '$role' OR defensePlayer4Role = '$role' OR
       |defensePlayer5Role = '$role')
     """.stripMargin
  }

  private def defensiveOffPlayerRoleWhere(role: String): String = {
    s"""(defensePlayer1Role != '$role' AND defensePlayer2Role != '$role' AND
       |defensePlayer3Role != '$role' AND defensePlayer4Role != '$role' AND
       |defensePlayer5Role != '$role')
     """.stripMargin
  }
}
