import {Component, OnInit} from '@angular/core';
import {FrequencyOptions, State} from "../../app.state";
import {GetPlayers, GetSeasons, GetTeams} from "../../actions/initial.action";
import {Store} from "@ngrx/store";
import {CompareShotSearch, FrequencyShotSearch, SearchInProgress} from "../../actions/search.action";
import {SetHash} from "../../actions/options.action";
import {ActivatedRoute, Router} from "@angular/router";
import {selectHash} from "../../selectors/options.selectors";
import {selectFrequencyResponseSearchActions, selectPageLoaded} from "../../selectors/initial.selectors";

@Component({
  selector: 'frequency_shot_chart',
  template: `  
    <h1>FREQUENCY SHOT CHARTS</h1>
    <options [source]="this._source"></options>
    <button class="search-button" (click)="search()">Search</button>
  `,
  styleUrls: ['../../css/general.css']
})
export class FrequencyShotChartComponent implements OnInit {

  private _source: string;

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
          console.log(hashCode)
          const url = this.route.snapshot.url;
          this.router.navigate([url[0].path], {queryParams: {id: hashCode}, replaceUrl: true})
        })
      });

  }

  private search = (): void => {
    this.store.dispatch(new SetHash(undefined, this._source));
    this.store.dispatch(new SearchInProgress(true));
    this.store.dispatch(new FrequencyShotSearch());
  };

  private searchWithHash = (): void => {
    this.store.dispatch(new SearchInProgress(true));
    this.store.dispatch(new FrequencyShotSearch());
  };
}
