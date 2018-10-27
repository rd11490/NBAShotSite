import {Component, OnInit} from '@angular/core';
import {RawOptions, State} from '../../app.state'
import {Store} from "@ngrx/store";
import {GetPlayers, GetSeasons, GetTeams} from "../../actions/initial.action";
import {RawShotSearch, SearchInProgress, StoreRawShots} from "../../actions/search.action";
import {selectPageLoaded, selectRawResponseSearchActions} from "../../selectors/initial.selectors";
import {SetHash} from "../../actions/options.action";
import {selectHash} from "../../selectors/options.selectors";
import {ActivatedRoute, Router} from "@angular/router";
import {
  selectRawShots,
  selectRawShotSearchError,
  selectRawShotSearchIsError, selectRawShotStatistics
} from "../../selectors/shotchart.selectors";
import {Observable} from "rxjs/Observable";
import {RawShot} from "../../models/shots.models";
import {SearchError, ShotStatisticsContainer} from "../../models/response.models";

@Component({
  selector: 'raw_shot_chart_container',
  template: `
    <h1>Raw Shots</h1>
    <div [hidden]="(this._searchFailure | async)">
      <h1 style="color:red;">{{(this._searchFailureMessage | async)}}</h1>
    </div>
    <div [hidden]="(this._done_loading | async)">
      <options [source]="this._source"></options>
      <button class="search-button" (click)="search()">Search</button>
      <br>
      <div class="shot-stats-container">
        <stats-totals-component class="shot-stats" [stats]="(this._stats | async)"></stats-totals-component>
      </div>
      <div>
        <raw-shot-chart class="shot-chart" [shots]="(this._shots | async)"></raw-shot-chart>
      </div>
    </div>
    <div [hidden]="(this._loading | async)">
      <loading-component></loading-component>
    </div>


  `,
  styleUrls: ['../../css/general.css']
})
export class RawShotChartComponent implements OnInit {
  _source: string;
  _shots: Observable<Array<RawShot>>;
  _loading: Observable<boolean>;
  _done_loading: Observable<boolean>;
  _searchFailure: Observable<boolean>;
  _searchFailureMessage: Observable<string>;
  _stats: Observable<ShotStatisticsContainer>;


  constructor(private store: Store<State>,
              private route: ActivatedRoute,
              private router: Router) {

    this._source = RawOptions;
    store.dispatch(new GetPlayers());
    store.dispatch(new GetTeams());
    store.dispatch(new GetSeasons());

    const hash: string = (this.route.snapshot.queryParams != null) ? this.route.snapshot.queryParams["id"] : undefined;
    if (hash != null) {
      this.store.dispatch(new SetHash(hash, this._source));
      this.searchWithHash();
    }

    selectRawResponseSearchActions(this.store)
      .subscribe((actions) => {
        actions.forEach(action => {
          this.store.dispatch(action);
        })
      })

  }

  ngOnInit(): void {
    selectHash(this.store, this._source)
      .subscribe((hashCode) => {
        setTimeout(() => {
          const url = this.route.snapshot.url;
          this.router.navigate([url[0].path], {queryParams: {id: hashCode}, replaceUrl: true})
        })
      });

    this._shots = selectRawShots(this.store);
    this._loading = selectPageLoaded(this.store);
    this._done_loading = selectPageLoaded(this.store).map(v => !v);
    this._stats = selectRawShotStatistics(this.store);

    this._searchFailure = selectRawShotSearchIsError(this.store).map(v => {
      return !v
    });
    this._searchFailureMessage = selectRawShotSearchError(this.store).map((v: SearchError) => {
      if (v != null) {
        return v.message;
      }
      return undefined;
    });

    selectRawShotSearchIsError(this.store).subscribe(v => {
      if (v) {
        Observable.timer(3000).subscribe(() => {
          this.store.dispatch(new StoreRawShots(undefined));
          this.store.dispatch(new SearchInProgress(false));

        })
      }
    })


  }

  search = (): void => {
    this.store.dispatch(new SetHash(undefined, this._source));
    this.store.dispatch(new SearchInProgress(true));
    this.store.dispatch(new RawShotSearch());
  };

  private searchWithHash = (): void => {
    this.store.dispatch(new SearchInProgress(true));
    this.store.dispatch(new RawShotSearch());
  };
}
