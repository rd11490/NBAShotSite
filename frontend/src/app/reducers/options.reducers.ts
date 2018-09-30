import * as OptionActions from './../actions/options.action'
import {CompareOptions1, CompareOptions2, FrequencyOptions, Options, RawOptions, State} from "../app.state";

export const initialOptions: Options = {
  hash: undefined,
  shooter: undefined,
  offensivePlayersOn: [],
  defensivePlayersOn: [],
  offensivePlayersOff: [],
  defensivePlayersOff: [],
  season: undefined,
  offensiveTeam: undefined,
  defensiveTeam: undefined,
  period: undefined,
  secondRemaining: undefined,
  startDate: undefined,
  endDate: undefined
};

export const initialState:  Map<string, Options> =
    new Map<string, Options> ()
    .set(RawOptions, initialOptions)
    .set(FrequencyOptions, initialOptions)
    .set(CompareOptions1, initialOptions)
    .set(CompareOptions2, initialOptions);

export function optionsReducer(options: Map<string, Options> = initialState, action: OptionActions.Actions): Map<string, Options> {
  switch (action.type) {
    case OptionActions.SET_HASH: {
      return setHashReducer(options, action as OptionActions.SetHash);
    }
    case OptionActions.SET_SHOOTER: {
      return setShooterReducer(options, action as OptionActions.SetShooter);
    }
    case OptionActions.SET_SEASON: {
      return setSeasonReducer(options, action as OptionActions.SetSeason);
    }
    case OptionActions.SET_OFFENSE_TEAM: {
      return setOffensiveTeamReducer(options, action as OptionActions.SetOffenseTeam);
    }
    case OptionActions.SET_DEFENSE_TEAM : {
      return setDefensiveTeamReducer(options, action as OptionActions.SetDefenseTeam);
    }
    case OptionActions.SET_OFFENSE_ON : {
      return setOffensePlayersOnReducer(options, action as OptionActions.SetOffensePlayersOn);
    }
    case OptionActions.SET_OFFENSE_OFF : {
      return setOffensePlayersOffReducer(options, action as OptionActions.SetOffensePlayersOff);
    }
    case OptionActions.SET_DEFENSE_ON : {
      return setDefensePlayersOnReducer(options, action as OptionActions.SetDefensePlayersOn);
    }
    case OptionActions.SET_DEFENSE_OFF : {
      return setDefensePlayersOffReducer(options, action as OptionActions.SetDefensePlayersOff);
    }
    case OptionActions.SET_PERIOD : {
      return setPeriodReducer(options, action as OptionActions.SetPeriod);
    }
    case OptionActions.SET_SECONDS_REMAINING : {
      return setSecondsRemainingReducer(options, action as OptionActions.SetSecondsRemaining);
    }
    default: {
      return options;

    }
  }
};

const setHashReducer = (options: Map<string, Options>, action: OptionActions.SetHash): Map<string, Options> => {
  switch (action.type) {
    case OptionActions.SET_HASH:
      options.get(action.key).hash = action.payload;
      return options;
    default:
      return options;
  }
};

const setSeasonReducer = (options: Map<string, Options>, action: OptionActions.SetSeason): Map<string, Options> => {
  switch (action.type) {
    case OptionActions.SET_SEASON:
      options.get(action.key).season = action.payload;
      return options;
    default:
      return options;
  }
};

const setShooterReducer = (options: Map<string, Options>, action: OptionActions.SetShooter): Map<string, Options> => {
  switch (action.type) {
    case OptionActions.SET_SHOOTER:
      options.get(action.key).shooter = action.payload;
      return options;
    default:
      return options;
  }
};

const setOffensiveTeamReducer = (options: Map<string, Options>, action: OptionActions.SetOffenseTeam): Map<string, Options> => {
  switch (action.type) {
    case OptionActions.SET_OFFENSE_TEAM:
      options.get(action.key).offensiveTeam = action.payload;
      return options;
    default:
      return options;
  }
};

const setDefensiveTeamReducer = (options: Map<string, Options>, action: OptionActions.SetDefenseTeam): Map<string, Options> => {
  switch (action.type) {
    case OptionActions.SET_DEFENSE_TEAM:
      options.get(action.key).defensiveTeam = action.payload;
      return options;
    default:
      return options;
  }
};

const setOffensePlayersOnReducer = (options: Map<string, Options>, action: OptionActions.SetOffensePlayersOn): Map<string, Options> => {
  switch (action.type) {
    case OptionActions.SET_OFFENSE_ON:
      options.get(action.key).offensivePlayersOn = action.payload.slice(0, 5);
      return options;
    default:
      return options;
  }
};

const setOffensePlayersOffReducer = (options: Map<string, Options>, action: OptionActions.SetOffensePlayersOff): Map<string, Options> => {
  switch (action.type) {
    case OptionActions.SET_OFFENSE_OFF:
      options.get(action.key).offensivePlayersOff = action.payload;
      return options;
    default:
      return options;
  }
};

const setDefensePlayersOnReducer = (options: Map<string, Options>, action: OptionActions.SetDefensePlayersOn): Map<string, Options> => {
  switch (action.type) {
    case OptionActions.SET_DEFENSE_ON:
      options.get(action.key).defensivePlayersOn = action.payload.slice(0, 5);
      return options;
    default:
      return options;
  }
};

const setDefensePlayersOffReducer = (options: Map<string, Options>, action: OptionActions.SetDefensePlayersOff): Map<string, Options> => {
  switch (action.type) {
    case OptionActions.SET_DEFENSE_OFF:
      options.get(action.key).defensivePlayersOff = action.payload;
      return options;
    default:
      return options;
  }
};

const setPeriodReducer = (options: Map<string, Options>, action: OptionActions.SetPeriod): Map<string, Options> => {
  switch (action.type) {
    case OptionActions.SET_PERIOD:
      options.get(action.key).period = action.payload;
      return options;
    default:
      return options;
  }
};

const setSecondsRemainingReducer = (options: Map<string, Options>, action: OptionActions.SetSecondsRemaining): Map<string, Options> => {
  switch (action.type) {
    case OptionActions.SET_SECONDS_REMAINING:
      options.get(action.key).secondRemaining = action.payload;
      return options;
    default:
      return options;
  }
};

