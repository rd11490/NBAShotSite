import {Options} from "../app.state";
import {Observable} from "rxjs/Observable";
import {PlayerId, TeamId} from "../models/options.models";
import {Store} from "@ngrx/store";

export const selectShooter = (store: Store<Options>): Observable<PlayerId> => {
  console.log("Selector: ");
  return store.select(state => state.shooter);

}

export const selectOffensivePlayersOn = (store: Store<Options>): Observable<Array<PlayerId>> =>
  store.select(state => state.offensivePlayersOn);

export const selectOffensivePlayersOff = (store: Store<Options>): Observable<Array<PlayerId>> =>
  store.select(state => state.offensivePlayersOff);

export const selectOffensiveTeam = (store: Store<Options>): Observable<TeamId> =>
  store.select(state => state.offensiveTeam);

export const selectDefensivePlayersOn = (store: Store<Options>): Observable<Array<PlayerId>> =>
  store.select(state => state.defensivePlayersOn);

export const selectDefensivePlayersOff = (store: Store<Options>): Observable<Array<PlayerId>> =>
  store.select(state => state.defensivePlayersOff);

export const selectDefensiveTeam = (store: Store<Options>): Observable<TeamId> =>
  store.select(state => state.defensiveTeam);

export const selectSeason = (store: Store<Options>): Observable<string> =>
  store.select(state => state.season);

export const selectPeriod = (store: Store<Options>): Observable<number> =>
  store.select(state => state.period);

export const selectSecondsRemaining = (store: Store<Options>): Observable<number> =>
  store.select(state => state.secondRemaining);


