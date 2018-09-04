import {PlayerId, ShotCompareRequest, ShotRequest, TeamId} from "./options.models";
import {RawShot, ZonedShot} from "./shots.models";

export class PlayerNameResponse {
  names: Array<PlayerId>;
}

export class TeamInfoResponse {
  teams: Array<TeamId>;
}

export class SeasonsResponse {
  seasons: Array<string>;
}

export class RawShotsResponse {
  params?: ShotRequest;
  shots?: Array<RawShot>;

}

export class FrequencyShotResponse {
  params: ShotRequest;
  data: ZonedShots;
}

export class CompareShotResponse {
  params: ShotCompareRequest;
  data: ZonedShotCompare;
}


export class ZonedShots {
  total?: ZonedShot;
  shots?: Array<ZonedShot>
}

export class ZonedShotCompare {
  shots1?: ZonedShots;
  shots2?: ZonedShots;
}
