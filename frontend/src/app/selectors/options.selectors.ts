import {State} from "../app.state";
import {Observable} from "rxjs/Observable";
import {PlayerId, TeamId} from "../models/options.models";
import {Store} from "@ngrx/store";

export const selectDescription = (store: Store<State>, optionType: string): Observable<string> => {
  return Observable.combineLatest(selectODescription(store, optionType), selectDDescription(store, optionType)).map(v => {
    const [oDescription, dDescription]: [string, string] = v;
    return `${oDescription} ${dDescription}`;
  })
};

export const selectODescription = (store: Store<State>, optionType: string): Observable<string> => {
  return Observable.combineLatest(
    selectShooterName(store, optionType),
    selectOffensiveTeamName(store, optionType),
    selectOffensivePlayersOn(store, optionType),
    selectOffensivePlayersOff(store, optionType)
  ).map(v => {
    const [shooter, team, on, off]: [string, string, Array<PlayerId>, Array<PlayerId>] = v;
    return `Shooter: ${shooter} | Offensive Team: ${team} | O On Court: ${on.map(v => v.name).join(", ")} | O Off Court: ${off.map(v => v.name).join(", ")} | `;
  })
};

export const selectDDescription = (store: Store<State>, optionType: string): Observable<string> => {
  return Observable.combineLatest(
    selectDefensiveTeamName(store, optionType),
    selectDefensivePlayersOn(store, optionType),
    selectDefensivePlayersOff(store, optionType),
    selectSeason(store, optionType)
  ).map(v => {
    const [team, on, off, season]: [string, Array<PlayerId>, Array<PlayerId>, string] = v;
    return `Defensive Team: ${team} | D On Court: ${on.map(v => v.name).join(", ")} | D Off Court: ${off.map(v => v.name).join(", ")} | Season: ${season}`;
  })
};


export const selectShooter = (store: Store<State>, optionType: string): Observable<PlayerId> => {
  return store.select(state => {
    return state.options.get(optionType).shooter
  });
};

export const selectShooterName  = (store: Store<State>, optionType: string): Observable<string> => {
  return selectShooter(store, optionType).map(v => {
    if (v != null) {
      return v.name;
    }
    return 'None';
  })
};


export const selectOffensivePlayersOn = (store: Store<State>, optionType: string): Observable<Array<PlayerId>> =>
  store.select(state => state.options.get(optionType).offensivePlayersOn);

export const selectOffensivePlayersOff = (store: Store<State>, optionType: string): Observable<Array<PlayerId>> =>
  store.select(state => state.options.get(optionType).offensivePlayersOff);

export const selectOffensiveTeam = (store: Store<State>, optionType: string): Observable<TeamId> =>
  store.select(state => state.options.get(optionType).offensiveTeam);

export const selectOffensiveTeamName = (store: Store<State>, optionType: string): Observable<string> => {
  return selectOffensiveTeam(store, optionType).map(v => {
    if (v != null) {
      return v.teamName;
    }
    return 'None';
  })
};

export const selectDefensivePlayersOn = (store: Store<State>, optionType: string): Observable<Array<PlayerId>> =>
  store.select(state => state.options.get(optionType).defensivePlayersOn);

export const selectDefensivePlayersOff = (store: Store<State>, optionType: string): Observable<Array<PlayerId>> =>
  store.select(state => state.options.get(optionType).defensivePlayersOff);

export const selectDefensiveTeam = (store: Store<State>, optionType: string): Observable<TeamId> =>
  store.select(state => state.options.get(optionType).defensiveTeam);

export const selectDefensiveTeamName = (store: Store<State>, optionType: string): Observable<string> => {
  return selectDefensiveTeam(store, optionType).map(v => {
    if (v != null) {
      return v.teamName;
    }
    return 'None';
  })
};

export const selectSeason = (store: Store<State>, optionType: string): Observable<string> =>
  store.select(state => state.options.get(optionType).season);

export const selectPeriod = (store: Store<State>, optionType: string): Observable<number> =>
  store.select(state => state.options.get(optionType).period);

export const selectSecondsRemaining = (store: Store<State>, optionType: string): Observable<number> =>
  store.select(state => state.options.get(optionType).secondRemaining);

export const selectHash = (store: Store<State>, optionType: string): Observable<string> =>
  store.select(state => state.options.get(optionType).hash);
