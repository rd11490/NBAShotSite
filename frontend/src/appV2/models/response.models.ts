import {FourFactorsRequest, PlayerId, ShotCompareRequest, ShotRequest, TeamId} from "./options.models";
import {RawShot, ZonedShot} from "./shots.models";
import {RealAdjustedFourFactors} from "./fourfactors.models";

export class FourFactorsResponse {
  params: FourFactorsRequest;
  fourFactors: Array<RealAdjustedFourFactors>;
  searchError?: SearchError;
}

export class PlayerNameResponse {
  names: Array<PlayerId>;
}

export class TeamInfoResponse {
  teams: Array<TeamId>;
}

export class SeasonsResponse {
  seasons: Array<string>;
}

export class RolesResponse {
  roles: Array<string>;
}

export class RawShotsResponse<T> {
  params?: ShotRequest<T>;
  shots?: Array<RawShot>;
  statistics?: ShotStatisticsContainer;
  searchError?: SearchError;
}

export class FrequencyShotResponse<T> {
  params: ShotRequest<T>;
  data: ZonedShots;
  searchError?: SearchError;
}

export class CompareShotResponse<T> {
  params: ShotCompareRequest<T>;
  data: ZonedShotCompare;
  searchError?: SearchError;
}


export class ZonedShots {
  total?: ZonedShot;
  statistics?: ShotStatisticsContainer;
  shots?: Array<ZonedShot>
}

export class ZonedShotCompare {
  shots1?: ZonedShots;
  shots2?: ZonedShots;
}

export class ShotStatisticsContainer {
  total?: ShotStatistics;
  threes?: ShotStatistics;
  twos?: ShotStatistics;
  rim?: ShotStatistics;
  midrange?: ShotStatistics;

}

export class ShotStatistics {
  attempts?: number;
  made?: number;
  frequency?: number;
  pointsPerShot?: number;
}

export const ZeroShotStatistics = {
  attempts: 0,
  made: 0,
  frequency: 0.0,
  pointsPerShot: 0.0
};

export const ZeroShotStatisticsContainer = {
  total: ZeroShotStatistics,
  threes: ZeroShotStatistics,
  twos: ZeroShotStatistics,
  rim: ZeroShotStatistics,
  midrange: ZeroShotStatistics
};

export class SearchError {
  isError: boolean;
  message: string;
}

