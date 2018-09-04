import {Action} from '@ngrx/store'
import {PlayerId, TeamId} from "../models/options.models";

export const SET_PLAYERS = 'Set Players';
export const GET_PLAYERS = 'Get Players';

export const SET_TEAMS = 'Set Teams';
export const GET_TEAMS = 'Get Teams';

export const SET_SEASONS = 'Set Seasons';
export const GET_SEASONS = 'Get Seasons';

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

export type Actions = SetPlayers
  | GetPlayers
  | SetTeams
  | GetTeams
  | GetSeasons
  | SetSeasons

