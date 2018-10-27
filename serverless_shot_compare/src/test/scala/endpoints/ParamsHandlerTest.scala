package endpoints

import datamodel.{FrequencyShotRequest, ShotRequest}
import utils.TestSpec

final class ParamsHandlerTest extends TestSpec {
  test("Store params in postgres") {
    val shotRequestParams = FrequencyShotRequest(hash = None, params = Some(ShotRequest(shooter = Some(123456), season = Some("2017-18"), startDate = Some(1540267200000L))))
    val cachedParams = ParamsHandler.handleFrequencyParams(shotRequestParams)
  }
}
