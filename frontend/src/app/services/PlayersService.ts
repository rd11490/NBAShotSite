import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PlayerNameResponse, TeamInfoResponse} from "../models/response.models";
import {Observable} from "rxjs/Observable";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class PlayersService {
  constructor(private http: HttpClient) {
  }

  getPlayers(): Observable<PlayerNameResponse> {
    return this.http.get<PlayerNameResponse>('/players')
  }

  getTeams(): Observable<TeamInfoResponse> {
    return this.http.get<TeamInfoResponse>('/teams')
  }
}

