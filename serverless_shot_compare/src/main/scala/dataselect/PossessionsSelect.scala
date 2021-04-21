package dataselect

import datamodel.{OneWayPossession, PossessionRequestParams, PossessionsAggregation, ShotRequest, ZonedShots}
import storage.PostgresClient
import storage.tables.NBATables

import scala.concurrent.{ExecutionContext, Future}

object PossessionsSelect {
  def selectPossessions(params: PossessionRequestParams)(
    implicit executionContext: ExecutionContext): Future[PossessionsAggregation] =
    selectData(params)
      .map(v => {
        v.map(_.toPossessionAggregate)
          .reduce(_ + _)
      })

  def selectData(params: PossessionRequestParams)(
    implicit executionContext: ExecutionContext)
  : Future[Seq[OneWayPossession]] = {
    PostgresClient.selectFrom[OneWayPossession](
      NBATables.possessions_table,
      OneWayPossession.apply,
      params.toWhereClause: _*
    )
  }
}
