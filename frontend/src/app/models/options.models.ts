
export class PlayerId {
  id: number;
  name: string;
}

export class TeamId {
  teamId: number;
  teamName: string;
}

export class ShotRequest {
  hash: string;
  params: ShotParams;
}

export class ShotParams {
  shooter?: Array<number>;
  offenseTeamId?: number;
  offensePlayerIds?: Array<number>;
  offenseOffPlayerIds?: Array<number>;
  defenseTeamId?: number;
  defensePlayerIds?: Array<number>;
  defenseOffPlayerIds?: Array<number>;
  period?: Array<number>;
  secondsRemaining?: number;
  season?: Array<string>;
  seasonType?: string;
  startDate?: number;
  endDate?: number;
}

export class ShotCompareRequest {
  hash: string;
  params: ShotCompareParams;
}

export class ShotCompareParams {
  shots1: ShotParams;
  shots2: ShotParams;
}

export class FourFactorsRequest {
  hash: string;
  params: FourFactorsParams;
}

export class FourFactorsParams {
  players?: Array<number>;
  seasons?: Array<string>;
  teams?: Array<number>;
}
