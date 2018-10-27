import {Action} from '@ngrx/store'
import {PlayerId, TeamId} from "../models/options.models";

export const SET_HASH = 'Set Hash';

export const SET_SHOOTER = 'Set Shooter';

export const SET_OFFENSE_ON = 'Set Offense On';
export const SET_OFFENSE_OFF = 'Set Offense Off';

export const SET_DEFENSE_ON = 'Set Defense On';
export const SET_DEFENSE_OFF = 'Set Defense Off';

export const SET_SEASON = 'Set Season';

export const SET_DATE_LOWER_BOUND = 'Set Date Lower Bound';
export const SET_DATE_UPPER_BOUND = 'Set Date Upper Bound';

export const SET_OFFENSE_TEAM = 'Set Offense Team';
export const SET_DEFENSE_TEAM = 'Set Defense Team';

export const SET_PERIOD = 'Set Period';
export const SET_SECONDS_REMAINING = 'Set Seconds Remaining';

export class SetHash implements Action {
  readonly type = SET_HASH;

  constructor(public payload: string,
              public key: string) {
  }
}

export class SetShooter implements Action {
  readonly type = SET_SHOOTER;

  constructor(public payload: PlayerId,
              public key: string) {
  }
}

export class SetOffensePlayersOn implements Action {
  readonly type = SET_OFFENSE_ON;

  constructor(public payload: Array<PlayerId>,
              public key: string) {
  }
}

export class SetOffensePlayersOff implements Action {
  readonly type = SET_OFFENSE_OFF;

  constructor(public payload: Array<PlayerId>,
              public key: string) {
  }
}

export class SetDefensePlayersOn implements Action {
  readonly type = SET_DEFENSE_ON;

  constructor(public payload: Array<PlayerId>,
              public key: string) {
  }
}

export class SetDefensePlayersOff implements Action {
  readonly type = SET_DEFENSE_OFF;

  constructor(public payload: Array<PlayerId>,
              public key: string) {
  }
}

export class SetSeason implements Action {
  readonly type = SET_SEASON;

  constructor(public payload: string,
              public key: string) {
  }
}

export class SetOffenseTeam implements Action {
  readonly type = SET_OFFENSE_TEAM;

  constructor(
    public payload: TeamId,
    public key: string) {
  }
}

export class SetDefenseTeam implements Action {
  readonly type = SET_DEFENSE_TEAM;

  constructor(public payload: TeamId,
              public key: string) {
  }
}

export class SetPeriod implements Action {
  readonly type = SET_PERIOD;

  constructor(public payload: number,
              public key: string) {
  }
}

export class SetSecondsRemaining implements Action {
  readonly type = SET_SECONDS_REMAINING;

  constructor(public payload: number,
              public key: string) {
  }
}

export class SetDateLowerBound implements Action {
  readonly type = SET_DATE_LOWER_BOUND;

  constructor(public payload: number,
              public key: string) {
  }
}

export class SetDateUpperBound implements Action {
  readonly type = SET_DATE_UPPER_BOUND;

  constructor(public payload: number,
              public key: string) {
  }
}

export type Actions = SetShooter
  | SetOffensePlayersOn
  | SetOffensePlayersOff
  | SetDefensePlayersOn
  | SetDefensePlayersOff
  | SetSeason
  | SetOffenseTeam
  | SetDefenseTeam
  | SetPeriod
  | SetSecondsRemaining
  | SetHash
  | SetShooter
  | SetDateLowerBound
  | SetDateUpperBound;
