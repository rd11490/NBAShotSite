import {CompareOptions1, CompareOptions2, FourFactorsOptions, FrequencyOptions, RawOptions, State} from "../app.state";
import {
  FourFactorsParams, FourFactorsRequest,
  PlayerId,
  ShotCompareRequest,
  ShotParams,
  ShotRequest,
  TeamId
} from "../models/options.models";
import {Action, Store} from "@ngrx/store";
import {Observable} from 'rxjs/Rx';
import {
  SetDateLowerBound, SetDateUpperBound,
  SetDefensePlayersOff,
  SetDefensePlayersOn,
  SetDefenseTeam,
  SetHash,
  SetOffensePlayersOff,
  SetOffensePlayersOn,
  SetOffenseTeam, SetPeriod,
  SetSeason, SetSeasonType,
  SetShooter
} from "../actions/options.action";
import 'rxjs/add/observable/combineLatest';
import * as shotchartSelectors from './shotchart.selectors';
import * as fourFactorsSelectors from './fourfactors.selectors';
import * as fourFactorsOptions from '../actions/fourfactors_options.action';



export const selectPlayers = (store: Store<State>): Observable<Array<PlayerId>> => {
  return store.select(state => state.players);

};

export const selectTeams = (store: Store<State>): Observable<Array<TeamId>> => {
  return store.select(state => state.teams);
};

export const selectSeasons = (store: Store<State>): Observable<Array<string>> => {
  return store.select(state => state.seasons);
};

export const selectSearchInProgress = (store: Store<State>): Observable<boolean> => {
  return store.select(state => state.searchInProgress);
}

export const selectPageLoaded = (store: Store<State>): Observable<boolean> => {
  return selectPlayers(store).combineLatest(selectTeams(store), selectSeasons(store), selectSearchInProgress(store))
    .map(value => {
      const [players, teams, seasons, searchInProgress]: [Array<PlayerId>, Array<TeamId>, Array<string>, boolean] = value;
      return players.length > 0 && teams.length > 0 && seasons.length > 0 && !searchInProgress
    })
};

export const selectFourFactorsResponseSearchActions = (store: Store<State>): Observable<Array<Action>> => {
  return fourFactorsSelectors.selectFourFactorsParams(store)
    .combineLatest(
      selectPlayers(store),
      selectTeams(store),
      selectSeasons(store)).map(v => {
      const [params, players, teams, seasons]: [FourFactorsRequest, Array<PlayerId>, Array<TeamId>, Array<string>] = v;
      if (params != null) {
        const arr = fourFactorsParamsToActions(new Array<Action>(), params.params, players, teams);
        arr.push(new fourFactorsOptions.SetHash(params.hash));
        return arr;
      }
      return [];
    })
};

export const selectFrequencyResponseSearchActions = (store: Store<State>): Observable<Array<Action>> => {
  return shotchartSelectors.selectFrequencyShotParams(store)
    .combineLatest(
      selectPlayers(store),
      selectTeams(store),
      selectSeasons(store))
    .map(v => {
      const [params, players, teams, seasons]: [ShotRequest, Array<PlayerId>, Array<TeamId>, Array<string>] = v;
      if (params != null) {
        const arr = paramsToActions(new Array<Action>(), FrequencyOptions, params.params, players, teams);
        arr.push(new SetHash(params.hash, FrequencyOptions));
        return arr;
      }
      return []
    })

};

export const selectRawResponseSearchActions = (store: Store<State>): Observable<Array<Action>> => {
  return shotchartSelectors.selectRawShotParams(store)
    .combineLatest(
      selectPlayers(store),
      selectTeams(store),
      selectSeasons(store)).map(v => {
      const [params, players, teams, seasons]: [ShotRequest, Array<PlayerId>, Array<TeamId>, Array<string>] = v;
      if (params != null) {
        const arr = paramsToActions(new Array<Action>(), RawOptions, params.params, players, teams)
        arr.push(new SetHash(params.hash, RawOptions));
        return arr;
      }
      return [];
    })
};

export const selectCompareResponseSearchActions = (store: Store<State>): Observable<Array<Action>> => {
  return Observable.combineLatest(
    shotchartSelectors.selectCompareShotParams(store),
      selectPlayers(store),
      selectTeams(store),
      selectSeasons(store))
    .map(v => {
      const [params, players, teams, seasons]: [ShotCompareRequest, Array<PlayerId>, Array<TeamId>, Array<string>] = v;
      if (params != null) {
        const arr = paramsToActions(new Array<Action>(), CompareOptions1, params.params.shots1, players, teams);
        const arr2 = paramsToActions(arr, CompareOptions2, params.params.shots2, players, teams);
        arr2.push(new SetHash(params.hash, CompareOptions1));
        arr2.push(new SetHash(params.hash, CompareOptions2));
        return arr2;
      }
      return []

    })
};

const fourFactorsParamsToActions = (arr: Array<Action>, params: FourFactorsParams, players: Array<PlayerId>, teams: Array<TeamId>): Array<Action> => {
  const player = findPlayers(params.players, players);
  const team = findTeams(params.teams, teams);

  arr.push(new fourFactorsOptions.SetPlayers(player));
  arr.push(new fourFactorsOptions.SetSeasons(params.seasons));
  arr.push(new fourFactorsOptions.SetTeams(team));

  return arr;
};

const paramsToActions = (arr: Array<Action>, loc: string, params: ShotParams, players: Array<PlayerId>, teams: Array<TeamId>): Array<Action> => {
  const shooter = findPlayers(params.shooter, players);
  const offenseTeamId = findTeam(params.offenseTeamId, teams);
  const defenseTeamId = findTeam(params.defenseTeamId, teams);

  const offensePlayersOn = findPlayers(params.offensePlayerIds, players);
  const offensePlayersOff = findPlayers(params.offenseOffPlayerIds, players);

  const defensePlayersOn = findPlayers(params.defensePlayerIds, players);
  const defensePlayersOff = findPlayers(params.defenseOffPlayerIds, players);

  arr.push(new SetShooter(shooter, loc));
  arr.push(new SetSeason(params.season, loc));
  arr.push(new SetSeasonType(params.seasonType, loc));

  arr.push(new SetPeriod(params.period, loc));

  arr.push(new SetDateLowerBound(params.startDate, loc));
  arr.push(new SetDateUpperBound(params.endDate, loc));

  arr.push(new SetOffenseTeam(offenseTeamId, loc));
  arr.push(new SetDefenseTeam(defenseTeamId, loc));

  arr.push(new SetOffensePlayersOn(offensePlayersOn, loc));
  arr.push(new SetOffensePlayersOff(offensePlayersOff, loc));

  arr.push(new SetDefensePlayersOn(defensePlayersOn, loc));
  arr.push(new SetDefensePlayersOff(defensePlayersOff, loc));


  return arr;
};

const findPlayer = (id: number, players: Array<PlayerId>): PlayerId => players.find(v => v.id === id);
const findPlayers = (ids: Array<number>, players: Array<PlayerId>) => {
  if (ids != null) {
    return ids
      .map(p => findPlayer(p, players))
      .filter(v => v != null);
  } else {
    return []
  }
};
const findTeam = (id: number, teams: Array<TeamId>): TeamId => teams.find(v => v.teamId === id);
const findTeams = (ids: Array<number>, teams: Array<TeamId>) => {
  if (ids != null) {
    return ids
      .map(p => findTeam(p, teams))
      .filter(v => v != null);
  } else {
    return []
  }
};
