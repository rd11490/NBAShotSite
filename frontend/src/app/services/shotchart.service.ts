import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
  CompareShotResponse,
  FrequencyShotResponse,
  PlayerNameResponse,
  RawShotsResponse, SeasonsResponse,
  TeamInfoResponse
} from "../models/response.models";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {ShotCompareParams, ShotCompareRequest, ShotParams, ShotRequest} from "../models/options.models";

const BASE_URL: string = "https://7enmqppfr7.execute-api.us-east-1.amazonaws.com/dev";

const buildUrl = (endpoint) => {
  return BASE_URL+endpoint;
};

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'text/plain' }),
  withCredentials: false
};

@Injectable()
export class ShotchartService {
  constructor(private http: HttpClient) {
  }

  getPlayers(): Observable<PlayerNameResponse> {
    return this.http.get<PlayerNameResponse>(buildUrl('/players'), httpOptions)
  }

  getTeams(): Observable<TeamInfoResponse> {
    return this.http.get<TeamInfoResponse>(buildUrl('/teams'), httpOptions)
  }

  getSeasons(): Observable<SeasonsResponse> {
    return this.http.get<SeasonsResponse>(buildUrl('/seasons'), httpOptions);
  }

  getRawShots(params: ShotRequest): Observable<RawShotsResponse> {
    return this.http.post<RawShotsResponse>(buildUrl('/raw'), params, httpOptions)
  }

  getFrequencyShots(params: ShotRequest): Observable<FrequencyShotResponse> {
    return this.http.post<FrequencyShotResponse>(buildUrl('/frequency'), params, httpOptions)
  }

  getCompareShots(params: ShotCompareRequest): Observable<CompareShotResponse> {
    return this.http.post<CompareShotResponse>(buildUrl('/compare'), params, httpOptions)
  }


}

