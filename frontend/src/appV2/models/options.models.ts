
export class PlayerId {
  id: number;
  name: string;
}

export class TeamId {
  teamId: number;
  teamName: string;
}

export class ShotRequest<T> {
  hash: string;
  params: T;
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

export class RoleShotParams extends ShotParams {
  shooterRole?: Array<string>;
  offensePlayerRoles?: Array<string>;
  offenseOffPlayerRoles?: Array<string>;
  defensePlayerRoles?: Array<string>;
  defenseOffPlayerRoles?: Array<string>;
}

export class ShotCompareRequest<T> {
  hash: string;
  params: ShotCompareParams<T>;
}

export class ShotCompareParams<T> {
  shots1: T;
  shots2: T;
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
