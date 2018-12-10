import {Store} from "@ngrx/store";
import {ShotCompareRequest, ShotRequest} from "../models/options.models";
import {Observable} from "rxjs/Observable";
import {State} from "../app.state";
import {RawShot, ZonedShot} from "../models/shots.models";
import {
  CompareShotResponse,
  FrequencyShotResponse,
  RawShotsResponse, SearchError,
  ShotStatisticsContainer, ZeroShotStatisticsContainer
} from "../models/response.models";


export const selectColorByFreq = (store: Store<State>) : Observable<boolean> => {
  return store.select(state => state.colorByFreq);
};

export const selectRawShotResponse = (store: Store<State>): Observable<RawShotsResponse> => {
  return store.select(state => state.rawShotChartResponse);
};

export const selectRawShots = (store: Store<State>): Observable<Array<RawShot>> => {
  return selectRawShotResponse(store).map(v => {
    if (v != null && v.shots != null) {
      return v.shots;
    }
    return [];
  });
};

export const selectRawShotParams = (store: Store<State>): Observable<ShotRequest> => {
  return selectRawShotResponse(store).map(v => {
    if (v!= null){
      return v.params;
    }
    return undefined;
  });
};

export const selectRawShotSearchError = (store: Store<State>): Observable<SearchError> => {
  return selectRawShotResponse(store).map((v: RawShotsResponse) => {
    if (v != null) {
      return v.searchError;
    }
    return undefined;
  });
};

export const selectRawShotSearchIsError = (store: Store<State>): Observable<boolean> => {
  return selectRawShotSearchError(store).map((v: SearchError) => {
    if (v != null) {
      return v.isError;
    }
    return false;
  })
};

export const selectRawShotStatistics = (store: Store<State>): Observable<ShotStatisticsContainer> => {
  return selectRawShotResponse(store).map(v => {
    if (v != null) {
      return v.statistics;
    } else {
      return ZeroShotStatisticsContainer;
    }
  });
};


export const selectFrequencyShotResponse = (store: Store<State>): Observable<FrequencyShotResponse> => {
  return store.select(state => state.frequencyChartResponse);
};

export const selectZonedShots = (store: Store<State>): Observable<Array<ZonedShot>> => {
  return selectFrequencyShotResponse(store).map(v => {
    if (v != null) {
      return v.data.shots;
    }
    return [];
  });
};

export const selectZonedShotStatistics = (store: Store<State>): Observable<ShotStatisticsContainer> => {
  return selectFrequencyShotResponse(store).map(v => {
    if (v != null) {
      return v.data.statistics;
    } else {
      return ZeroShotStatisticsContainer;
    }
  });
};

export const selectFrequencyShotParams = (store: Store<State>): Observable<ShotRequest> => {
  return selectFrequencyShotResponse(store).map((v: FrequencyShotResponse) => {
    if (v != null) {
      return v.params;
    }
    return undefined;
  });
};

export const selectFrequencyShotSearchError = (store: Store<State>): Observable<SearchError> => {
  return selectFrequencyShotResponse(store).map((v: FrequencyShotResponse) => {
    if (v != null) {
      return v.searchError;
    }
    return undefined;
  });
};

export const selectFrequencyShotSearchIsError = (store: Store<State>): Observable<boolean> => {
  return selectFrequencyShotSearchError(store).map((v: SearchError) => {
    if (v != null) {
      return v.isError;
    }
    return false;
  })
};

export const selectCompareShotResponse = (store: Store<State>): Observable<CompareShotResponse> => {
  return store.select(state => state.compareShotResponse);
};

export const selectZonedShots1 = (store: Store<State>): Observable<Array<ZonedShot>> => {
  return selectCompareShotResponse(store).map(v => {
    if (v != null) {
      return v.data.shots1.shots;
    }
    return [];
  });
};

export const selectZonedShots1Totals = (store: Store<State>): Observable<ZonedShot> => {
  return selectCompareShotResponse(store).map(v => v.data.shots1.total);
};

export const selectZonedShot1Statistics = (store: Store<State>): Observable<ShotStatisticsContainer> => {
  return selectCompareShotResponse(store).map(v => {
    if (v != null) {
      return v.data.shots1.statistics;
    } else {
      return ZeroShotStatisticsContainer;
    }
  });
};

export const selectZonedShots2 = (store: Store<State>): Observable<Array<ZonedShot>> => {
  return selectCompareShotResponse(store).map(v => {
    if (v != null) {
      return v.data.shots2.shots;
    }
    return [];
  });
};

export const selectZonedShots2Totals = (store: Store<State>): Observable<ZonedShot> => {
  return selectCompareShotResponse(store).map(v => v.data.shots2.total);
};

export const selectZonedShot2Statistics = (store: Store<State>): Observable<ShotStatisticsContainer> => {
  return selectCompareShotResponse(store).map(v => {
    if (v != null) {
      return v.data.shots2.statistics;
    } else {
      return ZeroShotStatisticsContainer;
    }
  });
};

export const selectCompareShotParams = (store: Store<State>): Observable<ShotCompareRequest> => {
  return selectCompareShotResponse(store).map(v => {
    if (v != null) {
      return v.params;
    }
    return undefined;
  });
};

export const selectCompareShotSearchError = (store: Store<State>): Observable<SearchError> => {
  return selectCompareShotResponse(store).map((v: CompareShotResponse) => {
    if (v != null) {
      return v.searchError;
    }
    return undefined;
  });
};

export const selectCompareShotSearchIsError = (store: Store<State>): Observable<boolean> => {
  return selectCompareShotSearchError(store).map((v: SearchError) => {
    if (v != null) {
      return v.isError;
    }
    return false;
  })
};
