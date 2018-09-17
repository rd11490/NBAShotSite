import {Injectable} from "@angular/core";
import {CompareOptions1, CompareOptions2, FrequencyOptions, Options, RawOptions, State} from "../app.state";
import {Action, select, Store} from "@ngrx/store";
import {ShotchartService} from "../services/shotchart.service";
import {Observable} from "rxjs/Observable";
import * as initialActions from "../actions/initial.action";
import {GetPlayers, GetSeasons, GetTeams, SetPlayers, SetSeasons, SetTeams} from "../actions/initial.action";
import * as searchActions from "../actions/search.action";
import {
  CompareShotSearch,
  FrequencyShotSearch,
  RawShotSearch,
  SearchInProgress,
  StoreCompareShots,
  StoreFrequencyShots,
  StoreRawShots
} from "../actions/search.action";
import {Actions, Effect} from "@ngrx/effects";
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import {selectPageLoaded, selectPlayers, selectSeasons, selectTeams} from "../selectors/initial.selectors";
import {PlayerId, ShotParams, TeamId} from "../models/options.models";
import {CompareShotResponse, FrequencyShotResponse, RawShotsResponse} from "../models/response.models";
import {
  SetDefensePlayersOff,
  SetDefensePlayersOn,
  SetDefenseTeam,
  SetHash,
  SetOffensePlayersOff,
  SetOffensePlayersOn,
  SetOffenseTeam,
  SetSeason,
  SetShooter,
} from "../actions/options.action";


@Injectable()
export class InitializeEffects {
  constructor(
    private actions: Actions,
    private playersService: ShotchartService,
    private store: Store<State>
  ) {
  }

  @Effect()
  getPlayersEffect = (): Observable<Action> =>
    this.actions
      .ofType(initialActions.GET_PLAYERS)
      .withLatestFrom(this.store)
      .mergeMap(this.callPlayerService)
      .map(response => {
        return new SetPlayers(response)
      });

  private callPlayerService = (value: [GetPlayers, State]): Observable<Array<PlayerId>> => {
    if (value[1].players == null || value[1].players.length < 1) {
      return this.playersService.getPlayers().map(v => v.names);
    }
    return selectPlayers(this.store);
  };

  @Effect()
  getTeamsEffect = (): Observable<Action> =>
    this.actions
      .ofType(initialActions.GET_TEAMS)
      .withLatestFrom(this.store)
      .mergeMap(this.callTeamService)
      .map(response => {
        return new SetTeams(response)
      });

  private callTeamService = (value: [GetTeams, State]): Observable<Array<TeamId>> => {
    if (value[1].teams == null || value[1].teams.length < 1) {
      return this.playersService.getTeams().map(v => v.teams);
    }
    return selectTeams(this.store);
  };

  @Effect()
  getSeasonsEffect = (): Observable<Action> =>
    this.actions
      .ofType(initialActions.GET_SEASONS)
      .withLatestFrom(this.store)
      .mergeMap(this.callSeasonService)
      .map(response => {
        return new SetSeasons(response)
      });

  private callSeasonService = (value: [GetSeasons, State]): Observable<Array<string>> => {
    if (value[1].seasons == null || value[1].seasons.length < 1) {
      return this.playersService.getSeasons().map(v => v.seasons);
    }
    return selectSeasons(this.store);
  };


  @Effect()
  rawShotsEffect = (): Observable<Action> =>
    this.actions
      .ofType(searchActions.RAW_SHOT_SEARCH)
      .withLatestFrom(this.store)
      .mergeMap(this.callRawShotService)
      .map(response => {
        return new StoreRawShots(response);
      });

  private callRawShotService = (value: [RawShotSearch, State]): Observable<RawShotsResponse> => {
    const storedParams = value[1].options.get(RawOptions);
    const params = {
      hash: storedParams.hash,
      params: toShotParams(storedParams)
    };
    return this.playersService.getRawShots(params);
  };

  @Effect()
  frequencyShotsEffect = (): Observable<Action> =>
    this.actions
      .ofType(searchActions.FREQUENCY_SHOT_SEARCH)
      .withLatestFrom(this.store)
      .mergeMap(this.callFrequencyShotService)
      .map(response => {
        return new StoreFrequencyShots(response);
      });

  private callFrequencyShotService = (value: [FrequencyShotSearch, State]): Observable<FrequencyShotResponse> => {
    const storedParams = value[1].options.get(FrequencyOptions);
    const params = {
      hash: storedParams.hash,
      params: toShotParams(storedParams)
    };


    return this.playersService.getFrequencyShots(params)
  };

  @Effect()
  compareShotsEffect = (): Observable<Action> =>
    this.actions
      .ofType(searchActions.COMPARE_SHOT_SEARCH)
      .withLatestFrom(this.store)
      .mergeMap(this.callCompareShotService)
      .map(response => {
        return new StoreCompareShots(response);
      });


  private callCompareShotService = (value: [CompareShotSearch, State]): Observable<CompareShotResponse> => {
    const storedParams1 = value[1].options.get(CompareOptions1);
    const storedParams2 = value[1].options.get(CompareOptions2);

    const params = {
      hash: storedParams1.hash,
      params: {
        shots1: toShotParams(storedParams1),
        shots2: toShotParams(storedParams2)
      }
    };
    return this.playersService.getCompareShots(params);
  };

}

const toShotParams = (storedParams: Options): ShotParams => {
  const shooter = storedParams.shooter ? storedParams.shooter.id : undefined;
  const oTeamId = storedParams.offensiveTeam ? storedParams.offensiveTeam.teamId : undefined;
  const oPlayersOn = storedParams.offensivePlayersOn ? storedParams.offensivePlayersOn.map(v => v.id) : undefined;
  const oPlayersOff = storedParams.offensivePlayersOff ? storedParams.offensivePlayersOff.map(v => v.id) : undefined;
  const dTeamId = storedParams.defensiveTeam ? storedParams.defensiveTeam.teamId : undefined;
  const dPlayersOn = storedParams.defensivePlayersOn ? storedParams.defensivePlayersOn.map(v => v.id) : undefined;
  const dPlayersOff = storedParams.defensivePlayersOff ? storedParams.defensivePlayersOff.map(v => v.id) : undefined;

  return {
    shooter: shooter,
    offenseTeamId: oTeamId,
    offensePlayerIds: oPlayersOn,
    offenseOffPlayerIds: oPlayersOff,
    defenseTeamId: dTeamId,
    defensePlayerIds: dPlayersOn,
    defenseOffPlayerIds: dPlayersOff,
    period: storedParams.period,
    secondsRemaining: storedParams.secondRemaining,
    season: storedParams.season,
    startDate: storedParams.startDate,
    endDate: storedParams.endDate
  };
};


