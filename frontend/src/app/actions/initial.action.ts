import {Action} from '@ngrx/store'
import {PlayerId, TeamId} from "../models/options.models";

export const SET_PLAYERS = 'Set Players';
export const GET_PLAYERS = 'Get Players';

export const SET_TEAMS = 'Set Teams';
export const GET_TEAMS = 'Get Teams';

export const SET_SEASONS = 'Set Seasons';
export const GET_SEASONS = 'Get Seasons';

export const SET_SEASONS3 = 'Set Seasons 3 Year';
export const GET_SEASONS3 = 'Get Seasons 3 Year';

export const SET_SEASONS5 = 'Set Seasons 5 Year';
export const GET_SEASONS5 = 'Get Seasons 5 Year';

export class SetPlayers implements Action {
  readonly type = SET_PLAYERS;

  constructor(public payload: Array<PlayerId>) {
  }
}

export class GetPlayers implements Action {
  readonly type = GET_PLAYERS;

  constructor() {
  }
}

export class SetTeams implements Action {
  readonly type = SET_TEAMS;

  constructor(public payload: Array<TeamId>) {
  }
}

export class GetTeams implements Action {
  readonly type = GET_TEAMS;

  constructor() {
  }
}

export class SetSeasons implements Action {
  readonly type = SET_SEASONS;

  constructor(public payload: Array<string>) {
  }
}

export class GetSeasons implements Action {
  readonly type = GET_SEASONS;

  constructor() {
  }
}

export class SetSeasons3 implements Action {
  readonly type = SET_SEASONS3;

  constructor(public payload: Array<string>) {
  }
}

export class GetSeasons3 implements Action {
  readonly type = GET_SEASONS3;

  constructor() {
  }
}

export class SetSeasons5 implements Action {
  readonly type = SET_SEASONS5;

  constructor(public payload: Array<string>) {
  }
}

export class GetSeasons5 implements Action {
  readonly type = GET_SEASONS5;

  constructor() {
  }
}

export type Actions = SetPlayers
  | GetPlayers
  | SetTeams
  | GetTeams
  | GetSeasons
  | SetSeasons
  | GetSeasons3
  | SetSeasons3
  | GetSeasons5
  | SetSeasons5
