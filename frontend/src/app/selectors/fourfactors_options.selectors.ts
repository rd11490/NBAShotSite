import {Store} from "@ngrx/store";
import {State} from "../app.state";
import {Observable} from "rxjs/Observable";
import {PlayerId, TeamId} from "../models/options.models";

export const selectOptionDescription = (store: Store<State>): Observable<string> => {
  return Observable.combineLatest(selectPlayerNames(store), selectTeamNames(store), selectSeasonString(store)).map((v: [string, string, string]) => {
    const description: string = v.filter(c => c != '').join(' | ');
    if (description == '') {
      return 'Select Search Options';
    }
    return description;
  })
}

export const selectPlayerNames = (store: Store<State>): Observable<string> => {
  return selectPlayers(store).map((v: Array<PlayerId>) => {
    if (v != null && v.length > 0) {
      return `Players: ${v.map(v => v.name).join(", ")}`
    }
    return ''
  })
};

export const selectTeamNames = (store: Store<State>): Observable<string> => {
  return selectTeams(store).map((v: Array<TeamId>) => {
    if (v != null && v.length > 0) {
      return `Teams: ${v.map(v => v.teamName).join(", ")}`
    }
    return ''
  })
};

export const selectSeasonString = (store: Store<State>): Observable<string> => {
  return selectSeasons(store).map((v: Array<string>) => {
    if (v != null && v.length > 0) {
      return `Season: ${v.join(", ")}`
    }
    return ''
  })
};

export const selectHash = (store: Store<State>): Observable<string> =>
  store.select(state => state.fourFactorsOptions.hash);

export const selectPlayers = (store: Store<State>): Observable<Array<PlayerId>> =>
  store.select(state => state.fourFactorsOptions.players);

export const selectTeams = (store: Store<State>): Observable<Array<TeamId>> =>
  store.select(state => state.fourFactorsOptions.teams);

export const selectSeasons = (store: Store<State>): Observable<Array<string>> =>
  store.select(state => state.fourFactorsOptions.seasons);
