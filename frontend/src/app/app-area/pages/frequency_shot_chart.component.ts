import {Component, OnInit} from '@angular/core';
import {FrequencyOptions, State} from "../../app.state";
import {GetPlayers, GetSeasons, GetTeams} from "../../actions/initial.action";
import {Store} from "@ngrx/store";
import {FrequencyShotSearch, SearchInProgress} from "../../actions/search.action";
import {SetHash} from "../../actions/options.action";
import {ActivatedRoute, Router} from "@angular/router";
import {selectHash} from "../../selectors/options.selectors";
import {selectFrequencyResponseSearchActions, selectPageLoaded} from "../../selectors/initial.selectors";
import {ZonedShot} from "../../models/shots.models";
import {selectZonedShots} from "../../selectors/shotchart.selectors";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'frequency_shot_chart_container',
  template: `  
    <h1>Shots By Location</h1>
    <div [hidden]="(this._done_loading | async)">
      <options [source]="this._source"></options>
      <button class="search-button" (click)="search()">Search</button>
      <br>
      <div>
      <frequency-shot-chart class="shot-chart" [shots]="(this._shots | async)"></frequency-shot-chart>
      </div>
    </div>
    <div [hidden]="(this._loading | async)">
      <loading-component></loading-component>
    </div>

  `,
  styleUrls: ['../../css/general.css']
})
export class FrequencyShotChartComponent implements OnInit {

  _source: string;
  _shots: Observable<Array<ZonedShot>>;
  _loading: Observable<boolean>;
  _done_loading: Observable<boolean>;

  constructor(private store: Store<State>,
              private route: ActivatedRoute,
              private router: Router) {

    this._source = FrequencyOptions;
    store.dispatch(new GetPlayers());
    store.dispatch(new GetTeams());
    store.dispatch(new GetSeasons());

    const hash = (this.route.snapshot.queryParams != null) ? this.route.snapshot.queryParams["id"] : undefined;
    if (hash != null) {
      this.store.dispatch(new SetHash(hash, this._source));
      this.searchWithHash();
    }

    selectFrequencyResponseSearchActions(this.store)
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

    this._shots = selectZonedShots(this.store);
    this._loading = selectPageLoaded(this.store);
    this._done_loading = selectPageLoaded(this.store).map(v => !v);


  }

  search = (): void => {
    this.store.dispatch(new SetHash(undefined, this._source));
    this.store.dispatch(new SearchInProgress(true));
    this.store.dispatch(new FrequencyShotSearch());
  };

  private searchWithHash = (): void => {
    this.store.dispatch(new SearchInProgress(true));
    this.store.dispatch(new FrequencyShotSearch());
  };
}
