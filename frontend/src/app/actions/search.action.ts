import {Action} from '@ngrx/store'
import {
  CompareShotResponse,
  FourFactorsResponse,
  FrequencyShotResponse,
  RawShotsResponse,
  SearchError
} from "../models/response.models";

export const SEARCH_IN_PROGRESS = 'Search In Progress';

export const RAW_SHOT_SEARCH = 'Raw Shot Search';

export const FREQUENCY_SHOT_SEARCH = 'Frequency Shot Search';

export const COMPARE_SHOT_SEARCH = 'Compare Shot Search';

export const STORE_RAW_SHOTS = 'Store Raw Shots';

export const STORE_FREQUENCY_SHOTS = 'Store Frequency Shots';

export const STORE_COMPARE_SHOTS = 'Store Compare Shots';

export const FOUR_FACTORS_SEARCH = 'Four Factors Search';
export const FOUR_FACTORS_THREE_YEAR_SEARCH = 'Four Factors 3yr Search';
export const FOUR_FACTORS_FIVE_YEAR_SEARCH = 'Four Factors 5yr Search';



export const STORE_FOUR_FACTORS = 'Store Four Factors';

export const COLOR_BY_FREQUENCY = "Color By Frequency";

export const INVERT_COLOR = "Invert Color";

export class InvertColor implements Action {
  readonly type = INVERT_COLOR;

  constructor(public payload: boolean) {
  }
}

export class ColorByFrequency implements Action {
  readonly type = COLOR_BY_FREQUENCY;

  constructor(public payload: boolean) {
  }
}

export class SearchInProgress implements Action {
  readonly type = SEARCH_IN_PROGRESS;

  constructor(public payload: boolean) {
  }

}

export class FourFactorsSearch implements Action {
  readonly type = FOUR_FACTORS_SEARCH;

  constructor() {
  }

}

export class FourFactorsThreeYearSearch implements Action {
  readonly type = FOUR_FACTORS_THREE_YEAR_SEARCH;

  constructor() {
  }

}

export class FourFactorsFiveYearSearch implements Action {
  readonly type = FOUR_FACTORS_FIVE_YEAR_SEARCH;

  constructor() {
  }

}

export class StoreFourFactors implements Action {
  readonly type = STORE_FOUR_FACTORS;

  constructor(public payload: FourFactorsResponse) {
  }

}

export class RawShotSearch implements Action {
  readonly type = RAW_SHOT_SEARCH;

  constructor() {
  }

}

export class FrequencyShotSearch implements Action {
  readonly type = FREQUENCY_SHOT_SEARCH;

  constructor() {
  }

}

export class CompareShotSearch implements Action {
  readonly type = COMPARE_SHOT_SEARCH;

  constructor() {
  }

}

export class StoreRawShots implements Action {
  readonly type = STORE_RAW_SHOTS;

  constructor(public payload: RawShotsResponse) {
  }
}

export class StoreFrequencyShots implements Action {
  readonly type = STORE_FREQUENCY_SHOTS;

  constructor(public payload: FrequencyShotResponse) {
  }
}

export class StoreCompareShots implements Action {
  readonly type = STORE_COMPARE_SHOTS;

  constructor(public payload: CompareShotResponse) {
  }
}

export type Actions = StoreCompareShots |
  StoreFrequencyShots
  | FourFactorsSearch
  | StoreRawShots
  | CompareShotSearch
  | FrequencyShotSearch
  | RawShotSearch
  | SearchInProgress
  | ColorByFrequency
  | InvertColor;
