import {State} from "../app.state";
import {Observable} from "rxjs/Observable";
import {PlayerId, TeamId} from "../models/options.models";
import {Store} from "@ngrx/store";

export const selectShooter = (store: Store<State>, optionType: string): Observable<PlayerId> => {
  return store.select(state => {
    return state.options.get(optionType).shooter
  });
};

export const selectOffensivePlayersOn = (store: Store<State>, optionType: string): Observable<Array<PlayerId>> =>
  store.select(state => state.options.get(optionType).offensivePlayersOn);

export const selectOffensivePlayersOff = (store: Store<State>, optionType: string): Observable<Array<PlayerId>> =>
  store.select(state => state.options.get(optionType).offensivePlayersOff);

export const selectOffensiveTeam = (store: Store<State>, optionType: string): Observable<TeamId> =>
  store.select(state => state.options.get(optionType).offensiveTeam);

export const selectDefensivePlayersOn = (store: Store<State>, optionType: string): Observable<Array<PlayerId>> =>
  store.select(state => state.options.get(optionType).defensivePlayersOn);

export const selectDefensivePlayersOff = (store: Store<State>, optionType: string): Observable<Array<PlayerId>> =>
  store.select(state => state.options.get(optionType).defensivePlayersOff);

export const selectDefensiveTeam = (store: Store<State>, optionType: string): Observable<TeamId> =>
  store.select(state => state.options.get(optionType).defensiveTeam);

export const selectSeason = (store: Store<State>, optionType: string): Observable<string> =>
  store.select(state => state.options.get(optionType).season);

export const selectPeriod = (store: Store<State>, optionType: string): Observable<number> =>
  store.select(state => state.options.get(optionType).period);

export const selectSecondsRemaining = (store: Store<State>, optionType: string): Observable<number> =>
  store.select(state => state.options.get(optionType).secondRemaining);

export const selectHash = (store: Store<State>, optionType: string): Observable<string> =>
  store.select(state => state.options.get(optionType).hash);
