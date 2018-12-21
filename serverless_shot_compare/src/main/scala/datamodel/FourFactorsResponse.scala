package datamodel

final case class FourFactorsResponse(params: FourFactorsRequest, fourFactors: Seq[RealAdjustedFourFactors])
