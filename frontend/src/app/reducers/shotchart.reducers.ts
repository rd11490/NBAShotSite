import * as searchActions from "../actions/search.action";
import {CompareShotResponse, FrequencyShotResponse, RawShotsResponse} from "../models/response.models";
import {SearchInProgress, StoreCompareShots, StoreFrequencyShots, StoreRawShots} from "../actions/search.action";

export const setSearchInProgress = (state: boolean = false, action: SearchInProgress): boolean => {
  switch (action.type) {
    case searchActions.SEARCH_IN_PROGRESS: {
      return action.payload
    }
    default: {
      return state;
    }
  }
}

export const setRawShots = (state: RawShotsResponse = undefined, action: StoreRawShots): RawShotsResponse => {
  switch (action.type) {
    case searchActions.STORE_RAW_SHOTS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export const setFrequencyShots = (state: FrequencyShotResponse = undefined, action: StoreFrequencyShots): FrequencyShotResponse => {
  switch (action.type) {
    case searchActions.STORE_FREQUENCY_SHOTS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export const setCompareShots = (state: CompareShotResponse = undefined, action: StoreCompareShots): CompareShotResponse => {
  switch (action.type) {
    case searchActions.STORE_COMPARE_SHOTS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
