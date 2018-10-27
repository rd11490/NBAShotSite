package endpoints
import datamodel.{FrequencyShotRequest, ShotRequest}
import shotselect.ShotSelect
import utils.TestSpec

import scala.concurrent.{ExecutionContext, ExecutionContextExecutor}

class SelectSpec  extends TestSpec {
  test("Select empty") {
    implicit val context: ExecutionContextExecutor = ExecutionContext.global
    import utils.RichFuture._

    val request = ShotRequest(shooter = Some(1628369), season = Some("2014-15"))

    val out = ShotSelect.selectZonedShots(request).await()
    println(out)
  }
}




