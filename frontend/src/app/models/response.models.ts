import {PlayerId, TeamId} from "./options.models";

export class PlayerNameResponse {
  names: Array<PlayerId>;
}

export class TeamInfoResponse {
  teams: Array<TeamId>;
}
