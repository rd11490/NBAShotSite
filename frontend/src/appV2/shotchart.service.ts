import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
  CompareShotResponse, FourFactorsResponse,
  FrequencyShotResponse,
  PlayerNameResponse,
  RawShotsResponse, RolesResponse,
  SeasonsResponse,
  TeamInfoResponse
} from "./models/response.models";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {FourFactorsRequest, RoleShotParams, ShotCompareRequest, ShotParams, ShotRequest} from "./models/options.models";

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

  getRoles(): Observable<RolesResponse> {
    return this.http.get<RolesResponse>(buildUrl('/roles'), httpOptions);
  }

  getSeasons3(): Observable<SeasonsResponse> {
    return this.http.get<SeasonsResponse>(buildUrl('/seasons3'), httpOptions);
  }

  getSeasons5(): Observable<SeasonsResponse> {
    return this.http.get<SeasonsResponse>(buildUrl('/seasons5'), httpOptions);
  }

  getRawShots(params: ShotRequest<ShotParams>): Observable<RawShotsResponse<ShotParams>> {
    return this.http.post<RawShotsResponse<ShotParams>>(buildUrl('/raw'), params, httpOptions).catch(err => {
      return Observable.of({
        params: undefined,
        shots: undefined,
        searchError: {isError: true, message: 'Search Failure: Please Try Again'}
      })
    })
  }

  getFrequencyShots(params: ShotRequest<ShotParams>): Observable<FrequencyShotResponse<ShotParams>> {
    return this.http.post<FrequencyShotResponse<ShotParams>>(buildUrl('/frequency'), params, httpOptions).catch(err => {
      return Observable.of({
        params: undefined,
        data: undefined,
        searchError: {isError: true, message: 'Search Failure: Please Try Again'}
      })
    })
  }

  getCompareShots(params: ShotCompareRequest<ShotParams>): Observable<CompareShotResponse<ShotParams>> {
    return this.http.post<CompareShotResponse<ShotParams>>(buildUrl('/compare'), params, httpOptions).catch(err => {
      return Observable.of({
        searchError: {isError: true, message: 'Search Failure: Please Try Again'},
        params: undefined,
        data: undefined
      })
    })
  }

  getRawRoleShots(params: ShotRequest<RoleShotParams>): Observable<RawShotsResponse<RoleShotParams>> {
    return this.http.post<RawShotsResponse<RoleShotParams>>(buildUrl('/roleRaw'), params, httpOptions).catch(err => {
      return Observable.of({
        params: undefined,
        shots: undefined,
        searchError: {isError: true, message: 'Search Failure: Please Try Again'}
      })
    })
  }

  getFrequencyRoleShots(params: ShotRequest<RoleShotParams>): Observable<FrequencyShotResponse<RoleShotParams>> {
    return this.http.post<FrequencyShotResponse<RoleShotParams>>(buildUrl('/roleFrequency'), params, httpOptions).catch(err => {
      return Observable.of({
        params: undefined,
        data: undefined,
        searchError: {isError: true, message: 'Search Failure: Please Try Again'}
      })
    })
  }

  getCompareRoleShots(params: ShotCompareRequest<RoleShotParams>): Observable<CompareShotResponse<RoleShotParams>> {
    return this.http.post<CompareShotResponse<RoleShotParams>>(buildUrl('/roleCompare'), params, httpOptions).catch(err => {
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

  getFourFactors3Yr(params: FourFactorsRequest): Observable<FourFactorsResponse> {
    return this.http.post<FourFactorsResponse>(buildUrl('/fourfactors3'), params, httpOptions).catch(err => {
      return Observable.of({
        searchError: {isError: true, message: 'Search Failure: Please Try Again'},
        params: undefined,
        fourFactors: undefined
      })
    })
  }

  getFourFactors5Yr(params: FourFactorsRequest): Observable<FourFactorsResponse> {
    return this.http.post<FourFactorsResponse>(buildUrl('/fourfactors5'), params, httpOptions).catch(err => {
      return Observable.of({
        searchError: {isError: true, message: 'Search Failure: Please Try Again'},
        params: undefined,
        fourFactors: undefined
      })
    })
  }



}

