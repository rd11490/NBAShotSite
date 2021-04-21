package endpoints
import datamodel.{FrequencyShotRequest, ShotRequest}
import dataselect.ShotSelect
import storage.PostgresClient
import storage.tables.NBATables
import utils.TestSpec

import scala.concurrent.{ExecutionContext, ExecutionContextExecutor}

class SelectSpec  extends TestSpec {
  test("Select empty") {
    implicit val context: ExecutionContextExecutor = ExecutionContext.global
    import utils.RichFuture._
//
//    PostgresClient.createTable(NBATables.role_cache_table)
//    PostgresClient.createTable(NBATables.frequency_role_cache_table)
//    PostgresClient.createTable(NBATables.compare_role_cache_table)

  }
}




