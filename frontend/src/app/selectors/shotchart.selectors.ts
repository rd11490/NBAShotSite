import {Store} from "@ngrx/store";
import {ShotCompareRequest, ShotRequest} from "../models/options.models";
import {Observable} from "rxjs/Observable";
import {State} from "../app.state";
import {RawShot, ZonedShot} from "../models/shots.models";
import {
  CompareShotResponse,
  FrequencyShotResponse,
  RawShotsResponse,
  ShotStatisticsContainer, ZeroShotStatisticsContainer
} from "../models/response.models";

export const selectRawShotResponse = (store: Store<State>): Observable<RawShotsResponse> => {
  return store.select(state => state.rawShotChartResponse);
};

export const selectRawShots = (store: Store<State>): Observable<Array<RawShot>> => {
  return selectRawShotResponse(store).map(v => {
    if (v != null) {
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
      console.log(v.data.statistics);
      console.log(v.data.statistics.total);

      return v.data.statistics;
    } else {
      return ZeroShotStatisticsContainer;
    }
  });
};

export const selectFrequencyShotParams = (store: Store<State>): Observable<ShotRequest> => {
  return selectFrequencyShotResponse(store).map(v => {
    if (v != null) {
      return v.params;
    }
    return undefined;
  });
};

export const selectCompareShotResponse = (store: Store<State>): Observable<CompareShotResponse> => {
  return store.select(state => state.compareShotResponse);
};

export const selectZonedShots1 = (store: Store<State>): Observable<Array<ZonedShot>> => {
  return selectCompareShotResponse(store).map(v => v.data.shots1.shots);
};

export const selectZonedShots1Totals = (store: Store<State>): Observable<ZonedShot> => {
  return selectCompareShotResponse(store).map(v => v.data.shots1.total);
};

export const selectZonedShots2 = (store: Store<State>): Observable<Array<ZonedShot>> => {
  return selectCompareShotResponse(store).map(v => v.data.shots2.shots);
};

export const selectZonedShots2Totals = (store: Store<State>): Observable<ZonedShot> => {
  return selectCompareShotResponse(store).map(v => v.data.shots2.total);
};

export const selectCompareShotParams = (store: Store<State>): Observable<ShotCompareRequest> => {
  return selectCompareShotResponse(store).map(v => {
    if (v != null) {
      return v.params;
    }
    return undefined;
  });
};
