import * as OptionActions from './../actions/options.action'
import {Options} from "../app.state";

export const initialOptions: Options = {
  shooter: undefined,
  offensivePlayersOn: [],
  defensivePlayersOn: [],
  offensivePlayersOff: [],
  defensivePlayersOff: [],
  season: undefined,
  offensiveTeam: undefined,
  defensiveTeam: undefined,
  period: undefined,
  secondRemaining: undefined

};

export const optionsReducer = (state: Options = initialOptions, action: OptionActions.Actions): Options => {
  switch (action.type) {
    case OptionActions.SET_SHOOTER: {
      return setShooterReducer(state, action as OptionActions.SetShooter);
    }
    case OptionActions.SET_SEASON: {
      return setSeasonReducer(state, action as OptionActions.SetSeason);
    }
    case OptionActions.SET_OFFENSE_TEAM: {
      return setOffensiveTeamReducer(state, action as OptionActions.SetOffenseTeam);
    }
    case OptionActions.SET_DEFENSE_TEAM : {
      return setDefensiveTeamReducer(state, action as OptionActions.SetDefenseTeam);
    }
    case OptionActions.SET_OFFENSE_ON : {
      return setOffensePlayersOnReducer(state, action as OptionActions.SetOffensePlayersOn);
    }
    case OptionActions.SET_OFFENSE_OFF : {
      return setOffensePlayersOffReducer(state, action as OptionActions.SetOffensePlayersOff);
    }
    case OptionActions.SET_DEFENSE_ON : {
      return setDefensePlayersOnReducer(state, action as OptionActions.SetDefensePlayersOn);
    }
    case OptionActions.SET_DEFENSE_OFF : {
      return setDefensePlayersOffReducer(state, action as OptionActions.SetDefensePlayersOff);
    }
    case OptionActions.SET_PERIOD : {
      return setPeriodReducer(state, action as OptionActions.SetPeriod);
    }
    case OptionActions.SET_SECONDS_REMAINING : {
      return setSecondsRemainingReducer(state, action as OptionActions.SetSecondsRemaining);
    }
    default: {
      return state;

    }
  }
};

const setSeasonReducer = (state: Options, action: OptionActions.SetSeason): Options => {
  switch (action.type) {
    case OptionActions.SET_SEASON:
      state.season = action.payload;
      return state;
    default:
      return state;
  }
};

const setShooterReducer = (state: Options, action: OptionActions.SetShooter): Options => {
  switch (action.type) {
    case OptionActions.SET_SHOOTER:
      console.log("Reducer: ", action.payload);
      console.log(state);
      state.shooter = action.payload;
      return state;
    default:
      return state;
  }
};

const setOffensiveTeamReducer = (state: Options, action: OptionActions.SetOffenseTeam): Options => {
  switch (action.type) {
    case OptionActions.SET_OFFENSE_TEAM:
      state.offensiveTeam = action.payload;
      return state;
    default:
      return state;
  }
};

const setDefensiveTeamReducer = (state: Options, action: OptionActions.SetDefenseTeam): Options => {
  switch (action.type) {
    case OptionActions.SET_DEFENSE_TEAM:
      state.defensiveTeam = action.payload;
      return state;
    default:
      return state;
  }
};

const setOffensePlayersOnReducer = (state: Options, action: OptionActions.SetOffensePlayersOn): Options => {
  switch (action.type) {
    case OptionActions.SET_OFFENSE_ON:
      state.offensivePlayersOn = action.payload.slice(0, 5);
      return state;
    default:
      return state;
  }
};

const setOffensePlayersOffReducer = (state: Options, action: OptionActions.SetOffensePlayersOff): Options => {
  switch (action.type) {
    case OptionActions.SET_OFFENSE_OFF:
      state.offensivePlayersOff = action.payload;
      return state;
    default:
      return state;
  }
};

const setDefensePlayersOnReducer = (state: Options, action: OptionActions.SetDefensePlayersOn): Options => {
  switch (action.type) {
    case OptionActions.SET_DEFENSE_ON:
      state.defensivePlayersOn = action.payload.slice(0, 5);
      return state;
    default:
      return state;
  }
};

const setDefensePlayersOffReducer = (state: Options, action: OptionActions.SetDefensePlayersOff): Options => {
  switch (action.type) {
    case OptionActions.SET_DEFENSE_OFF:
      state.defensivePlayersOff = action.payload;
      return state;
    default:
      return state;
  }
};

const setPeriodReducer = (state: Options, action: OptionActions.SetPeriod): Options => {
  switch (action.type) {
    case OptionActions.SET_PERIOD:
      state.period = action.payload;
      return state;
    default:
      return state;
  }
};

const setSecondsRemainingReducer = (state: Options, action: OptionActions.SetSecondsRemaining): Options => {
  switch (action.type) {
    case OptionActions.SET_SECONDS_REMAINING:
      state.secondRemaining = action.payload;
      return state;
    default:
      return state;
  }
};

