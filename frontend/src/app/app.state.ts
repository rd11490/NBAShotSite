import {PlayerId, TeamId} from "./models/options.models";

export interface Options {
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

}
