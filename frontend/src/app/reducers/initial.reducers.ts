import * as initialActions from "../actions/initial.action";
import {SetPlayers, SetSeasons, SetTeams} from "../actions/initial.action";
import {PlayerId, TeamId} from "../models/options.models";

export function setPlayersReducer(state: Array<PlayerId> = [], action: SetPlayers): Array<PlayerId> {
  switch (action.type) {
    case initialActions.SET_PLAYERS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export function setTeamsReducer(state:  Array<TeamId> = [], action: SetTeams): Array<TeamId> {
  switch (action.type) {
    case initialActions.SET_TEAMS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export function setSeasonsReducer(state:  Array<string> = [], action: SetSeasons): Array<string> {
  switch (action.type) {
    case initialActions.SET_SEASONS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
