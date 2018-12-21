import {Action} from '@ngrx/store'
import {PlayerId, TeamId} from "../models/options.models";

export const SET_FOUR_FACTORS_HASH = 'Set Four Factors Hash';

export const SET_FOUR_FACTORS_PLAYERS = 'Set Four Factors Players';
export const SET_FOUR_FACTORS_SEASONS = 'Set Four Factors Seasons';
export const SET_FOUR_FACTORS_TEAMS = 'Set Four Factors Teams';


export class SetHash implements Action {
  readonly type = SET_FOUR_FACTORS_HASH;

  constructor(public payload: string) {
  }
}

export class SetPlayers implements Action {
  readonly type = SET_FOUR_FACTORS_PLAYERS;

  constructor(public payload: Array<PlayerId>) {
  }
}

export class SetSeasons implements Action {
  readonly type = SET_FOUR_FACTORS_SEASONS;

  constructor(public payload: Array<string>) {
  }
}

export class SetTeams implements Action {
  readonly type = SET_FOUR_FACTORS_TEAMS;

  constructor(public payload: Array<TeamId>) {
  }
}

export type Actions = SetHash | SetPlayers | SetSeasons | SetTeams;
