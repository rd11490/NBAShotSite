package datamodel

import storage.PostgresClient

final case class RawShotRequest(hash: Option[String], params: Option[ShotRequest])
final case class FrequencyShotRequest(hash: Option[String], params: Option[ShotRequest])
final case class CompareShotRequest(hash: Option[String], params: Option[ShotCompareRequest])

final case class ShotCompareRequest(shots1: ShotRequest, shots2: ShotRequest)

final case class ShotRequest(
                              shooter: Option[Int] = None,
                              offenseTeamId: Option[Int] = None,
                              offensePlayerIds: Option[Seq[Int]] = None,
                              offenseOffPlayerIds: Option[Seq[Int]] = None,
                              defenseTeamId: Option[Int] = None,
                              defensePlayerIds: Option[Seq[Int]] = None,
                              defenseOffPlayerIds: Option[Seq[Int]] = None,
                              period: Option[Int] = None,
                              secondsRemaining: Option[Int] = None,
                              season: Option[String] = None,
                              startDate: Option[Long] = None,
                              endDate: Option[Long] = None) {

  def toWhereClause: Seq[String] = {
    val where = Seq(
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
        ids.map(v => defensiveOffPlayerWhere(v))) ++
        offenseOffPlayerIds.map(ids =>
          ids.map(v => offensiveOffPlayerWhere(v))) ++
        defensePlayerIds.map(ids =>
          ids.map(v => defensivePlayerWhere(v))) ++
        offensePlayerIds.map(ids =>
          ids.map(v => offensivePlayerWhere(v)))).flatten

    where.foreach(checkSql)
    where
  }

  private def checkSql(str: String): Unit = {
    PostgresClient.BadTerms.foreach(v => if (str.toLowerCase.contains(v.toLowerCase)) {
      throw new IllegalArgumentException("SQL INJECTION ATTEMPTED!")
    })
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
