import {Action} from '@ngrx/store'
import {PlayerId, TeamId} from "../models/options.models";

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

export class SetShooter implements Action {
  type: string = SET_SHOOTER;

  constructor(public payload: PlayerId) {
  }
}

export class SetOffensePlayersOn implements Action {
  type: string = SET_OFFENSE_ON;

  constructor(public payload: Array<PlayerId>) {
  }
}

export class SetOffensePlayersOff implements Action {
  type: string = SET_OFFENSE_OFF;

  constructor(public payload: Array<PlayerId>) {
  }
}

export class SetDefensePlayersOn implements Action {
  type: string = SET_DEFENSE_ON;

  constructor(public payload: Array<PlayerId>) {
  }
}

export class SetDefensePlayersOff implements Action {
  type: string = SET_DEFENSE_OFF;

  constructor(public payload: Array<PlayerId>) {
  }
}

export class SetSeason implements Action {
  type: string = SET_SEASON;

  constructor(public payload: string) {
  }
}

export class SetOffenseTeam implements Action {
  type: string = SET_OFFENSE_TEAM;

  constructor(public payload: TeamId) {
  }
}

export class SetDefenseTeam implements Action {
  type: string = SET_DEFENSE_TEAM;

  constructor(public payload: TeamId) {
  }
}

export class SetPeriod implements Action {
  type: string = SET_PERIOD;
  constructor(public payload: number) {
  }
}

export class SetSecondsRemaining implements Action {
  type: string = SET_SECONDS_REMAINING;
  constructor(public payload: number) {
  }
}

// TODO Come up with solution for date

export type Actions = SetShooter |
  SetOffensePlayersOn |
  SetOffensePlayersOff |
  SetDefensePlayersOn |
  SetDefensePlayersOff |
  SetSeason |
  SetOffenseTeam |
  SetDefenseTeam |
  SetPeriod |
  SetSecondsRemaining;
