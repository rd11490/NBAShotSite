package endpoints

import datamodel.{FrequencyShotRequest, ShotRequest}
import utils.TestSpec

final class ParamsHandlerTest extends TestSpec {
  test("Store params in postgres") {
    val shotRequestParams = FrequencyShotRequest(hash = None, params = Some(ShotRequest(shooter = Some(123456), season = Some("2017-18"))))
    val cachedParams = ParamsHandler.handleFrequencyParams(shotRequestParams)
  }

}
