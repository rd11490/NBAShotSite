package com.rrdinsights.shotcompare.api.datamodel

final case class TeamName(teamId: Int, teamName: String)

final case class TeamInfoResponse(teams: Seq[TeamName])
