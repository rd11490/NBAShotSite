import * as searchActions from "../actions/search.action";
import {
  CompareShotResponse,
  FourFactorsResponse,
  FrequencyShotResponse,
  RawShotsResponse
} from "../models/response.models";
import {
  ColorByFrequency, InvertColor,
  SearchInProgress,
  StoreCompareShots, StoreFourFactors,
  StoreFrequencyShots,
  StoreRawShots
} from "../actions/search.action";

export function setInvertColor(state: boolean = false, action: InvertColor): boolean {
  switch (action.type) {
    case searchActions.INVERT_COLOR: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

export function setColorByFreq(state: boolean = false, action: ColorByFrequency): boolean {
  switch (action.type) {
    case searchActions.COLOR_BY_FREQUENCY: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

export function setSearchInProgress(state: boolean = false, action: SearchInProgress): boolean {
  switch (action.type) {
    case searchActions.SEARCH_IN_PROGRESS: {
      return action.payload
    }
    default: {
      return state;
    }
  }
}

export function setRawShots(state: RawShotsResponse = undefined, action: StoreRawShots): RawShotsResponse {
  switch (action.type) {
    case searchActions.STORE_RAW_SHOTS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export function setFrequencyShots(state: FrequencyShotResponse = undefined, action: StoreFrequencyShots): FrequencyShotResponse {
  switch (action.type) {
    case searchActions.STORE_FREQUENCY_SHOTS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export function setCompareShots(state: CompareShotResponse = undefined, action: StoreCompareShots): CompareShotResponse {
  switch (action.type) {
    case searchActions.STORE_COMPARE_SHOTS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export function setFourFactors(state: FourFactorsResponse = undefined, action: StoreFourFactors): FourFactorsResponse {
  switch (action.type) {
    case searchActions.STORE_FOUR_FACTORS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
