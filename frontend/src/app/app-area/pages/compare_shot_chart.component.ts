import {Component, OnInit} from '@angular/core';
import {CompareOptions1, CompareOptions2, State} from "../../app.state";
import {GetPlayers, GetSeasons, GetTeams} from "../../actions/initial.action";
import {Store} from "@ngrx/store";
import {CompareShotSearch, SearchInProgress, StoreCompareShots} from "../../actions/search.action";
import {ActivatedRoute, Router} from "@angular/router";
import {SetHash} from "../../actions/options.action";
import {selectCompareResponseSearchActions, selectPageLoaded} from "../../selectors/initial.selectors";
import {selectHash, selectDescription} from "../../selectors/options.selectors";
import {SearchError, ShotStatisticsContainer} from "../../models/response.models";
import {Observable} from "rxjs/Observable";
import {ZonedShot} from "../../models/shots.models";
import {
  selectColorByFreq, selectInvertColor,
  selectCompareShotSearchIsError, selectFrequencyShotSearchError, selectFrequencyShotSearchIsError,
  selectZonedShot1Statistics, selectZonedShot2Statistics,
  selectZonedShots1, selectZonedShots2
} from "../../selectors/shotchart.selectors";

@Component({
  selector: 'compare_shot_chart',
  template: `
    <h1>COMPARE SHOT CHARTS</h1>
    <div [hidden]="(this._searchFailure | async)">
      <h1 style="color:red;">{{(this._searchFailureMessage | async)}}</h1>
    </div>
    <div [hidden]="(this._done_loading | async)">
      <options [source]="this._source1"></options>
      <options [source]="this._source2"></options>

      <button class="search-button" (click)="search()">Search</button>
      <p style="text-align: center">
        <color-select></color-select>
      </p>

      <br>
      <div class="shot-stats-container">
        <div style="max-width: 150px;">{{ _description1 | async }}</div>
        <stats-totals-component class="shot-stats" [stats]="(this._stats1 | async)"></stats-totals-component>
      </div>
      <div>
        <compare-shot-chart class="shot-chart"
                            [shots1]="(this._shots1 | async)"
                            [shots2]="(this._shots2 | async)"
                            [color]="(this._colorByFreq | async)"
                            [invertColor]="(this._invertColor | async)"
        ></compare-shot-chart>
      </div>
      <div class="shot-stats-container-right">
        <div style="max-width: 150px;">{{ _description2 | async }}</div>
        <stats-totals-component class="shot-stats" [stats]="(this._stats2 | async)"></stats-totals-component>
      </div>
    </div>
    <div [hidden]="(this._loading | async)">
      <loading-component></loading-component>
    </div>

  `,
  styleUrls: ['../../css/general.css']
})
export class CompareShotChartComponent implements OnInit{

  _source1: string;
  _source2: string;

  _loading: Observable<boolean>;
  _done_loading: Observable<boolean>;
  _searchFailure: Observable<boolean>;
  _searchFailureMessage: Observable<string>;
  _shots1: Observable<Array<ZonedShot>>;
  _stats1: Observable<ShotStatisticsContainer>;
  _shots2: Observable<Array<ZonedShot>>;
  _stats2: Observable<ShotStatisticsContainer>;
  _description1: Observable<string>;
  _description2: Observable<string>;
  _colorByFreq: Observable<boolean>;
  _invertColor: Observable<boolean>;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router) {

    this._source1 = CompareOptions1;
    this._source2 = CompareOptions2;

    store.dispatch(new GetPlayers());
    store.dispatch(new GetSeasons());
    store.dispatch(new GetTeams());

    const hash = (this.route.snapshot.queryParams != null) ? this.route.snapshot.queryParams["id"] : undefined;
    if (hash != null) {
      store.dispatch(new SetHash(hash, this._source1));
      store.dispatch(new SetHash(hash, this._source2));
      this.searchWithHash();
    }

    this._description1 = selectDescription(this.store, this._source1);

    this._description2 = selectDescription(this.store, this._source2);

    selectCompareResponseSearchActions(this.store)
      .subscribe((actions) => {
        actions.forEach(action => {
          this.store.dispatch(action);
        })
      })
  }

  ngOnInit(): void {
    selectHash(this.store, this._source1)
      .subscribe((hashCode) => {
        setTimeout(() => {
          const url = this.route.snapshot.url;
          this.router.navigate([url[0].path], {queryParams: {id: hashCode}, replaceUrl: true})
        })
      });

    this._stats1 = selectZonedShot1Statistics(this.store);
    this._stats2 = selectZonedShot2Statistics(this.store);

    this._shots1 = selectZonedShots1(this.store);
    this._shots2 = selectZonedShots2(this.store);

    this._colorByFreq = selectColorByFreq(this.store);
    this._invertColor = selectInvertColor(this.store);


    this._loading = selectPageLoaded(this.store);
    this._done_loading = selectPageLoaded(this.store).map(v => !v);
    this._searchFailure = selectFrequencyShotSearchIsError(this.store).map(v => !v);
    this._searchFailureMessage = selectFrequencyShotSearchError(this.store).map((v: SearchError) => {
      if (v != null) {
        return v.message;
      }
      return undefined;
    });







    selectCompareShotSearchIsError(this.store).subscribe(v => {
      if (v) {
        Observable.timer(3000).subscribe(() => {
          this.store.dispatch(new StoreCompareShots(undefined));
          this.store.dispatch(new SearchInProgress(false));

        })
      }
    })
  }

  search = (): void => {
    this.store.dispatch(new SetHash(undefined, this._source1));
    this.store.dispatch(new SetHash(undefined, this._source2));

    this.store.dispatch(new SearchInProgress(true));
    this.store.dispatch(new CompareShotSearch());
  };

  private searchWithHash = (): void => {
    this.store.dispatch(new SearchInProgress(true));
    this.store.dispatch(new CompareShotSearch());
  };
}
