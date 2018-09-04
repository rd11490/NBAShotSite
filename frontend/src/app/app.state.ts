import {PlayerId, TeamId} from "./models/options.models";
import {CompareShotResponse, FrequencyShotResponse, RawShotsResponse} from "./models/response.models";

export interface State {
  options: Map<string, Options>;
  players: Array<PlayerId>;
  teams: Array<TeamId>;
  seasons: Array<string>;
  rawShotChartResponse: RawShotsResponse;
  frequencyChartResponse: FrequencyShotResponse;
  compareShotResponse: CompareShotResponse;
  searchInProgress: boolean;
}
export interface Options {
  hash: string;
  shooter: PlayerId;

  offensivePlayersOn: Array<PlayerId>;
  defensivePlayersOn: Array<PlayerId>;
  offensivePlayersOff: Array<PlayerId>;
  defensivePlayersOff: Array<PlayerId>;

  season: string;

  offensiveTeam: TeamId;
  defensiveTeam: TeamId;

  period: number;
  secondRemaining: number;

  startDate: number;
  endDate: number;

}

export const RawOptions: string = "RAW";
export const FrequencyOptions: string = "FREQUENCY";
export const CompareOptions1: string = "COMPARE1";
export const CompareOptions2: string = "COMPARE2";


