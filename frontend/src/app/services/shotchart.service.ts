import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
  CompareShotResponse, FourFactorsResponse,
  FrequencyShotResponse,
  PlayerNameResponse,
  RawShotsResponse,
  SeasonsResponse,
  TeamInfoResponse
} from "../models/response.models";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {FourFactorsRequest, ShotCompareRequest, ShotRequest} from "../models/options.models";

const BASE_URL: string = "https://7enmqppfr7.execute-api.us-east-1.amazonaws.com/dev";

const buildUrl = (endpoint) => {
  return BASE_URL + endpoint;
};

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'text/plain'}),
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
    return this.http.post<RawShotsResponse>(buildUrl('/raw'), params, httpOptions).catch(err => {
      return Observable.of({
        params: undefined,
        shots: undefined,
        searchError: {isError: true, message: 'Search Failure: Please Try Again'}
      })
    })
  }

  getFrequencyShots(params: ShotRequest): Observable<FrequencyShotResponse> {
    return this.http.post<FrequencyShotResponse>(buildUrl('/frequency'), params, httpOptions).catch(err => {
      return Observable.of({
        params: undefined,
        data: undefined,
        searchError: {isError: true, message: 'Search Failure: Please Try Again'}
      })
    })
  }

  getCompareShots(params: ShotCompareRequest): Observable<CompareShotResponse> {
    return this.http.post<CompareShotResponse>(buildUrl('/compare'), params, httpOptions).catch(err => {
      return Observable.of({
        searchError: {isError: true, message: 'Search Failure: Please Try Again'},
        params: undefined,
        data: undefined
      })
    })
  }

  getFourFactors(params: FourFactorsRequest): Observable<FourFactorsResponse> {
    return this.http.post<FourFactorsResponse>(buildUrl('/fourfactors'), params, httpOptions).catch(err => {
      return Observable.of({
        searchError: {isError: true, message: 'Search Failure: Please Try Again'},
        params: undefined,
        fourFactors: undefined
      })
    })
  }


}

