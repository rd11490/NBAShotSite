import {CompareOptions1, CompareOptions2, State} from "../app.state";
import {Observable} from "rxjs/Observable";
import {PlayerId, TeamId} from "../models/options.models";
import {Store} from "@ngrx/store";
import {DatePipe} from "@angular/common";

export const selectDescription = (store: Store<State>, optionType: string): Observable<string> => {
  return Observable.combineLatest(selectODescription(store, optionType), selectDDescription(store, optionType), selectDateDescription(store, optionType)).map((v: [string, string, string]) => {
    const description: string = v.filter(c => c != '').join(' | ');
    if (description == '') {
      return 'Select Search Options';
    }

    switch (optionType) {
      case CompareOptions1: {
       return `Shots 1: ${description}`;
      }
      case CompareOptions2: {
        return `Shots 2: ${description}`;
      }
      default: {
        return v.filter(c => c != '').join(' | ');
      }
    }
  })
};

export const selectODescription = (store: Store<State>, optionType: string): Observable<string> => {
  return Observable.combineLatest(
    selectShooterDescription(store, optionType),
    selectOffensiveTeamName(store, optionType),
    selectOffensivePlayersOnDescription(store, optionType),
    selectOffensivePlayersOffDescription(store, optionType)
  ).map((v: [string, string, string, string]) => {
    return v.filter(c => c != '').join(' | ');
  })
};

export const selectDDescription = (store: Store<State>, optionType: string): Observable<string> => {
  return Observable.combineLatest(
    selectDefensiveTeamName(store, optionType),
    selectDefensivePlayersOnDescription(store, optionType),
    selectDefensivePlayersOffDescription(store, optionType)
  ).map((v: [string, string, string]) => {
    return v.filter(c => c != '').join(' | ');
    ;
  })
};

export const selectDateDescription = (store: Store<State>, optionType: string): Observable<string> => {
  return Observable.combineLatest(
    selectPeriodDescription(store, optionType),
    selectSeasonDescription(store, optionType),
    selectSeasonTypeName(store, optionType),
    selectStartDateString(store, optionType),
    selectEndDateString(store, optionType))
    .map((v: [string, string, string, string, string]) => {
      return v.filter(c => c != '').join(' | ');
      ;
    })
};

export const selectShooterDescription = (store: Store<State>, optionType: string): Observable<string> => {
  return selectShooter(store, optionType).map((v: Array<PlayerId>) => {
    if (v != null && v.length > 0) {
      return `Shooter: ${v.map(v => v.name).join(", ")}`
    }
    return ''
  })
}

export const selectShooter = (store: Store<State>, optionType: string): Observable<Array<PlayerId>> => {
  return store.select(state => {
    return state.options.get(optionType).shooter
  });
};

export const selectSeasonTypeName = (store: Store<State>, optionType: string): Observable<string> => {
  return selectSeasonType(store, optionType).map(v => {
    if (v != null) {
      return `SeasonType: ${v}`;
    }
    return '';
  })
};

export const selectOffensivePlayersOn = (store: Store<State>, optionType: string): Observable<Array<PlayerId>> =>
  store.select(state => state.options.get(optionType).offensivePlayersOn);

export const selectOffensivePlayersOnDescription = (store: Store<State>, optionType: string): Observable<string> =>
  selectOffensivePlayersOn(store, optionType).map((v: Array<PlayerId>) => {
    if (v != null && v.length > 0) {
      return `O On Court: ${v.map(c => c.name).join(", ")}`;
    }
    return ''
  });

export const selectOffensivePlayersOff = (store: Store<State>, optionType: string): Observable<Array<PlayerId>> =>
  store.select(state => state.options.get(optionType).offensivePlayersOff);

export const selectOffensivePlayersOffDescription = (store: Store<State>, optionType: string): Observable<string> =>
  selectOffensivePlayersOff(store, optionType).map((v: Array<PlayerId>) => {
    if (v != null && v.length > 0) {
      return `O Off Court: ${v.map(c => c.name).join(", ")}`;
    }
    return ''
  });

export const selectOffensiveTeam = (store: Store<State>, optionType: string): Observable<TeamId> =>
  store.select(state => state.options.get(optionType).offensiveTeam);

export const selectOffensiveTeamName = (store: Store<State>, optionType: string): Observable<string> => {
  return selectOffensiveTeam(store, optionType).map(v => {
    if (v != null) {
      return `Offensive Team: ${v.teamName}`;
    }
    return '';
  })
};

export const selectDefensivePlayersOn = (store: Store<State>, optionType: string): Observable<Array<PlayerId>> =>
  store.select(state => state.options.get(optionType).defensivePlayersOn);

export const selectDefensivePlayersOnDescription = (store: Store<State>, optionType: string): Observable<string> =>
  selectDefensivePlayersOn(store, optionType).map((v: Array<PlayerId>) => {
    if (v != null && v.length > 0) {
      return `D On Court: ${v.map(c => c.name).join(", ")}`;
    }
    return ''
  });

export const selectDefensivePlayersOff = (store: Store<State>, optionType: string): Observable<Array<PlayerId>> =>
  store.select(state => state.options.get(optionType).defensivePlayersOff);

export const selectDefensivePlayersOffDescription = (store: Store<State>, optionType: string): Observable<string> =>
  selectDefensivePlayersOff(store, optionType).map((v: Array<PlayerId>) => {
    if (v != null && v.length > 0) {
      return `D Off Court: ${v.map(c => c.name).join(", ")}`;
    }
    return ''
  });

export const selectDefensiveTeam = (store: Store<State>, optionType: string): Observable<TeamId> =>
  store.select(state => state.options.get(optionType).defensiveTeam);

export const selectDefensiveTeamName = (store: Store<State>, optionType: string): Observable<string> => {
  return selectDefensiveTeam(store, optionType).map(v => {
    if (v != null) {
      return `Defensive Team: ${v.teamName}`;
    }
    return '';
  })
};

export const selectSeason = (store: Store<State>, optionType: string): Observable<Array<string>> =>
  store.select(state => state.options.get(optionType).season);

export const selectSeasonDescription = (store: Store<State>, optionType: string): Observable<string> =>
  selectSeason(store, optionType).map((v: Array<string>) => {
    if (v != null && v.length > 0) {
      return ` Season: ${v.join(", ")}`;
    }
    return ''
  });

export const selectSeasonType = (store: Store<State>, optionType: string): Observable<string> =>
  store.select(state => state.options.get(optionType).seasonType);

export const selectPeriod = (store: Store<State>, optionType: string): Observable<Array<number>> =>
  store.select(state => state.options.get(optionType).period);

export const selectPeriodDescription = (store: Store<State>, optionType: string): Observable<string> =>
  selectPeriod(store, optionType).map((v: Array<number>) => {
    if (v != null && v.length > 0) {
      return `Period: ${v.join(", ")}`;
    }
    return '';
  });

export const selectSecondsRemaining = (store: Store<State>, optionType: string): Observable<number> =>
  store.select(state => state.options.get(optionType).secondRemaining);

export const selectHash = (store: Store<State>, optionType: string): Observable<string> =>
  store.select(state => state.options.get(optionType).hash);

export const selectStartDate = (store: Store<State>, optionType: string): Observable<number> =>
  store.select(state => state.options.get(optionType).startDate);

export const selectEndDate = (store: Store<State>, optionType: string): Observable<number> =>
  store.select(state => state.options.get(optionType).endDate);


export const selectStartDateString = (store: Store<State>, optionType: string): Observable<string> =>
  selectStartDate(store, optionType).map(v => {
    if (v != null) {
      return `Start Date ${datePipe.transform(v, 'MM/dd/yyyy')}`;
    }
    return ''
  });

const datePipe = new DatePipe('en-US');

export const selectEndDateString = (store: Store<State>, optionType: string): Observable<string> =>
  selectEndDate(store, optionType).map(v => {
    if (v != null) {
      return `End Date ${datePipe.transform(v, 'MM/dd/yyyy')}`;
    }
    return ''
  });
