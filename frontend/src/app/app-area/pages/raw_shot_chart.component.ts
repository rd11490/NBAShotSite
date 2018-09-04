import {Component, OnInit} from '@angular/core';
import {RawOptions, State} from '../../app.state'
import {Store} from "@ngrx/store";
import {GetPlayers, GetSeasons, GetTeams} from "../../actions/initial.action";
import {RawShotSearch, SearchInProgress} from "../../actions/search.action";
import {selectRawResponseSearchActions} from "../../selectors/initial.selectors";
import {SetHash} from "../../actions/options.action";
import {selectHash} from "../../selectors/options.selectors";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'raw_shot_chart',
  template: `
    <h1>RAW SHOT CHARTS</h1>
    <options [source]="this._source"></options>
    <button class="search-button" (click)="search()">Search</button>
  `,
  styleUrls: ['../../css/general.css']
})
export class RawShotChartComponent implements OnInit {
  private _source: string;

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
          console.log(hashCode);
          const url = this.route.snapshot.url;
          this.router.navigate([url[0].path], {queryParams: {id: hashCode}, replaceUrl: true})
        })
      });

  }

  private search = (): void => {
    this.store.dispatch(new SetHash(undefined, this._source));
    this.store.dispatch(new SearchInProgress(true));
    this.store.dispatch(new RawShotSearch());
  };

  private searchWithHash = (): void => {
    this.store.dispatch(new SearchInProgress(true));
    this.store.dispatch(new RawShotSearch());
  };
}
