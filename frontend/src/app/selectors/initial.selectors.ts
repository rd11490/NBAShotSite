import {CompareOptions1, CompareOptions2, FrequencyOptions, RawOptions, State} from "../app.state";
import {PlayerId, ShotCompareRequest, ShotParams, ShotRequest, TeamId} from "../models/options.models";
import {Action, Store} from "@ngrx/store";
import {Observable} from 'rxjs/Rx';
import {
  SetDefensePlayersOff,
  SetDefensePlayersOn,
  SetDefenseTeam,
  SetHash,
  SetOffensePlayersOff,
  SetOffensePlayersOn,
  SetOffenseTeam,
  SetSeason,
  SetShooter
} from "../actions/options.action";
import 'rxjs/add/observable/combineLatest';
import * as shotchartSelectors from './shotchart.selectors';


export const selectPlayers = (store: Store<State>): Observable<Array<PlayerId>> => {
  return store.select(state => state.players);

};

export const selectTeams = (store: Store<State>): Observable<Array<TeamId>> => {
  return store.select(state => state.teams);
};

export const selectSeasons = (store: Store<State>): Observable<Array<string>> => {
  return store.select(state => state.seasons);
};

export const selectPageLoaded = (store: Store<State>): Observable<boolean> => {
  return selectPlayers(store).combineLatest(selectTeams(store), selectSeasons(store))
    .map(value => {
      const [players, teams, seasons]: [Array<PlayerId>, Array<TeamId>, Array<string>] = value;
      return players.length > 0 && teams.length > 0 && seasons.length > 0
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

const paramsToActions = (arr: Array<Action>, loc: string, params: ShotParams, players: Array<PlayerId>, teams: Array<TeamId>): Array<Action> => {
  const shooter = findPlayer(params.shooter, players);
  const offenseTeamId = findTeam(params.offenseTeamId, teams);
  const defenseTeamId = findTeam(params.defenseTeamId, teams);

  const offensePlayersOn = findPlayers(params.offensePlayerIds, players);
  const offensePlayersOff = findPlayers(params.offenseOffPlayerIds, players);

  const defensePlayersOn = findPlayers(params.defensePlayerIds, players);
  const defensePlayersOff = findPlayers(params.defenseOffPlayerIds, players);

  arr.push(new SetShooter(shooter, loc));
  arr.push(new SetSeason(params.season, loc));

  arr.push(new SetOffenseTeam(offenseTeamId, loc));
  arr.push(new SetDefenseTeam(defenseTeamId, loc));

  arr.push(new SetOffensePlayersOn(offensePlayersOn, loc));
  arr.push(new SetOffensePlayersOff(offensePlayersOff, loc));

  arr.push(new SetDefensePlayersOn(defensePlayersOn, loc));
  arr.push(new SetDefensePlayersOff(defensePlayersOff, loc));

  return arr;
};

const findPlayer = (id: number, players: Array<PlayerId>): PlayerId => players.find(v => v.id === id);
const findTeam = (id: number, teams: Array<TeamId>): TeamId => teams.find(v => v.teamId === id);
const findPlayers = (ids: Array<number>, players: Array<PlayerId>) => {
  if (ids != null) {
    return ids
      .map(p => findPlayer(p, players))
      .filter(v => v != null);
  } else {
    return []
  }
};
