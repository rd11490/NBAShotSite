import {FourFactorsParams, FourFactorsRequest} from "../models/options.models";
import {Store} from "@ngrx/store";
import {FourFactorsResponse, SearchError} from "../models/response.models";
import {State} from "../app.state";
import {Observable} from "rxjs/Observable";
import {RealAdjustedFourFactors} from "../models/fourfactors.models";

export const selectFourFactorsResponse = (store: Store<State>): Observable<FourFactorsResponse> => {
  return store.select(state => state.fourFactorsResponse);
};

export const selectFourFactors = (store: Store<State>): Observable<Array<RealAdjustedFourFactors>> => {
  return selectFourFactorsResponse(store).map(v => {
    if (v != null && v.fourFactors != null) {
      return v.fourFactors;
    }
    return [];
  });
};

export const selectFourFactorsParams = (store: Store<State>): Observable<FourFactorsRequest> => {
  return selectFourFactorsResponse(store).map(v => {
    if (v != null) {
      return v.params;
    }
    return undefined;
  });
};

export const selectFourFactorsSearchError = (store: Store<State>): Observable<SearchError> => {
  return selectFourFactorsResponse(store).map((v: FourFactorsResponse) => {
    if (v != null) {
      return v.searchError;
    }
    return undefined;
  });
};

export const selectFourFactorsSearchIsError = (store: Store<State>): Observable<boolean> => {
  return selectFourFactorsSearchError(store).map((v: SearchError) => {
    if (v != null) {
      return v.isError;
    }
    return false;
  })
};
