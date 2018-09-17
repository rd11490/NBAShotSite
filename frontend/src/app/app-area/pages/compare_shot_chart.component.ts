import {Component, OnInit} from '@angular/core';
import {CompareOptions1, CompareOptions2, State} from "../../app.state";
import {GetPlayers, GetSeasons, GetTeams} from "../../actions/initial.action";
import {Store} from "@ngrx/store";
import {CompareShotSearch, RawShotSearch, SearchInProgress} from "../../actions/search.action";
import {ActivatedRoute, Router} from "@angular/router";
import {SetHash} from "../../actions/options.action";
import {selectCompareResponseSearchActions, selectRawResponseSearchActions} from "../../selectors/initial.selectors";
import {selectHash} from "../../selectors/options.selectors";

@Component({
  selector: 'compare_shot_chart',
  template: `
    <h1>COMPARE SHOT CHARTS</h1>
    <options [source]="this._source1"></options>
    <options [source]="this._source2"></options>
    <button class="search-button" (click)="search()">Search</button>

  `,
  styleUrls: ['../../css/general.css']
})
export class CompareShotChartComponent implements OnInit{

  private _source1: string;
  private _source2: string;

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

  }

  private search = (): void => {
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
