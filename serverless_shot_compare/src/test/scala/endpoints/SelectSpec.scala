package endpoints
import datamodel.{FrequencyShotRequest, ShotRequest}
import shotselect.ShotSelect
import storage.PostgresClient
import storage.tables.NBATables
import utils.TestSpec

import scala.concurrent.{ExecutionContext, ExecutionContextExecutor}

class SelectSpec  extends TestSpec {
  test("Select empty") {
    implicit val context: ExecutionContextExecutor = ExecutionContext.global
    import utils.RichFuture._

//    PostgresClient.createTable(NBATables.real_adjusted_four_factors)
  }
}




