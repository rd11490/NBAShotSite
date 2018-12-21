import {PlayerId, TeamId} from "../models/options.models";
import * as FourFactorsOptionActions from "../actions/fourfactors_options.action";
import {FourFactorsOptions} from "../app.state";

class InitialFourFactorsOptions implements FourFactorsOptions {
  hash: string;
  players: Array<PlayerId>;
  seasons: Array<string>;
  teams: Array<TeamId>;
  constructor(hash: string = undefined,
              player: Array<PlayerId> = [],
              season: Array<string> = [],
              teams: Array<TeamId> = []) {
    this.hash = hash;
    this.seasons = season;
    this.players = player;
    this.teams = teams;
  }
}

const initialState: FourFactorsOptions = new InitialFourFactorsOptions();

export function fourFactorsOptionsReducer(options: FourFactorsOptions = initialState, action: FourFactorsOptionActions.Actions): FourFactorsOptions {
  switch (action.type) {
    case FourFactorsOptionActions.SET_FOUR_FACTORS_HASH: {
      return setHashReducer(options, action as FourFactorsOptionActions.SetHash);
    }
    case FourFactorsOptionActions.SET_FOUR_FACTORS_PLAYERS: {
      return setPlayersReducer(options, action as FourFactorsOptionActions.SetPlayers);
    }
    case FourFactorsOptionActions.SET_FOUR_FACTORS_SEASONS: {
      return setSeasonsReducer(options, action as FourFactorsOptionActions.SetSeasons);
    }
    case FourFactorsOptionActions.SET_FOUR_FACTORS_TEAMS: {
      return setTeamsReducer(options, action as FourFactorsOptionActions.SetTeams);
    }
    default: {
    return options;
  }
  }
}

const setHashReducer = (options: FourFactorsOptions, action: FourFactorsOptionActions.SetHash): FourFactorsOptions => {
  switch (action.type) {
    case FourFactorsOptionActions.SET_FOUR_FACTORS_HASH:
      options.hash = action.payload;
      return options;
    default:
      return options;
  }
};

const setSeasonsReducer = (options: FourFactorsOptions, action: FourFactorsOptionActions.SetSeasons): FourFactorsOptions => {
  switch (action.type) {
    case FourFactorsOptionActions.SET_FOUR_FACTORS_SEASONS:
      options.seasons = action.payload;
      return options;
    default:
      return options;
  }
};

const setPlayersReducer = (options: FourFactorsOptions, action: FourFactorsOptionActions.SetPlayers): FourFactorsOptions => {
  switch (action.type) {
    case FourFactorsOptionActions.SET_FOUR_FACTORS_PLAYERS:
      options.players = action.payload;
      return options;
    default:
      return options;
  }
};

const setTeamsReducer = (options: FourFactorsOptions, action: FourFactorsOptionActions.SetTeams): FourFactorsOptions => {
  switch (action.type) {
    case FourFactorsOptionActions.SET_FOUR_FACTORS_TEAMS:
      options.teams = action.payload;
      return options;
    default:
      return options;
  }
};
