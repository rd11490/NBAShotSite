import {Component, OnInit} from '@angular/core';
import {State} from '../../app.state'
import {Store} from "@ngrx/store";
import {GetPlayers, GetSeasons, GetTeams} from "../../actions/initial.action";
import {FourFactorsSearch, SearchInProgress, StoreFourFactors} from "../../actions/search.action";
import {selectFourFactorsResponseSearchActions, selectPageLoaded} from "../../selectors/initial.selectors";
import {SetHash} from "../../actions/fourfactors_options.action";
import {
  selectFourFactors,
  selectFourFactorsSearchError,
  selectFourFactorsSearchIsError
} from "../../selectors/fourfactors.selectors";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {SearchError} from "../../models/response.models";
import {RealAdjustedFourFactors} from "../../models/fourfactors.models";
import {selectHash} from "../../selectors/fourfactors_options.selectors";

@Component({
  selector: 'four_factors_page',
  template: `
    <h1>Real Adjusted Four Factors</h1>
    <div [hidden]="(this._searchFailure | async)">
      <h1 style="color:red;">{{(this._searchFailureMessage | async)}}</h1>
    </div>
    <div [hidden]="(this._done_loading | async)">
      <h6>Select players, seasons, and/or teams then click "Search" to filter the table</h6>
      <four-factors-options></four-factors-options>
      <button class="search-button" (click)="search()">Search</button>
      <br>
      <h2>Luck Adjusted RAPM</h2>
      <four_factors_table 
        [fourfactors]="this._fourFactors | async"
        [displayColumns]="['playerName', 'LA_RAPM', 'LA_RAPM_Rank', 'LA_RAPM__Off', 'LA_RAPM__Off_Rank',
      'LA_RAPM__Def', 'LA_RAPM__Def_Rank', 'teamName', 'season']"
      ></four_factors_table>
      <br>
      <h2>RAPM</h2>
      <four_factors_table
        [fourfactors]="this._fourFactors | async"
        [displayColumns]="['playerName', 'RAPM', 'RAPM_Rank', 'RAPM__Off', 'RAPM__Off_Rank',
      'RAPM__Def', 'RAPM__Def_Rank', 'teamName', 'season']"
      ></four_factors_table>
      <br>
      <h2>Real Adjusted Effective Field Goal Percentage</h2>
      <four_factors_table
        [fourfactors]="this._fourFactors | async"
        [displayColumns]="['playerName', 'RA_EFG', 'RA_EFG_Rank', 'RA_EFG__Off', 'RA_EFG__Off_Rank',
      'RA_EFG__Def', 'RA_EFG__Def_Rank', 'teamName', 'season']"
      ></four_factors_table>
      <br>
      <h2>Real Adjusted Turnover Rate</h2>
      <four_factors_table
        [fourfactors]="this._fourFactors | async"
        [displayColumns]="['playerName', 'RA_TOV', 'RA_TOV_Rank', 'RA_TOV__Off', 'RA_TOV__Off_Rank',
      'RA_TOV__Def', 'RA_TOV__Def_Rank', 'teamName', 'season']"
      ></four_factors_table>
      <br>
      <h2>Real Adjusted Freethrow Rate</h2>
      <four_factors_table
        [fourfactors]="this._fourFactors | async"
        [displayColumns]="['playerName', 'RA_FTR', 'RA_FTR_Rank', 'RA_FTR__Off', 'RA_FTR__Off_Rank',
      'RA_FTR__Def', 'RA_FTR__Def_Rank', 'teamName', 'season']"
      ></four_factors_table>
      <br>
      <h2>Real Adjusted Rebound Rate</h2>
      <four_factors_table
        [fourfactors]="this._fourFactors | async"
        [displayColumns]="['playerName', 'RA_ORBD', 'RA_ORBD_Rank', 'RA_ORBD__Off', 'RA_ORBD__Off_Rank',
      'RA_ORBD__Def', 'RA_ORBD__Def_Rank', 'teamName', 'season']"
      ></four_factors_table>
      <br>
      
    </div>
    <div [hidden]="(this._loading | async)">
      <loading-component></loading-component>
    </div>


  `,
  styleUrls: ['../../css/general.css']
})
export class FourFactorsComponent implements OnInit {
  _fourFactors: Observable<Array<RealAdjustedFourFactors>>;
  _loading: Observable<boolean>;
  _done_loading: Observable<boolean>;
  _searchFailure: Observable<boolean>;
  _searchFailureMessage: Observable<string>;


  constructor(private store: Store<State>,
              private route: ActivatedRoute,
              private router: Router) {

    store.dispatch(new GetPlayers());
    store.dispatch(new GetTeams());
    store.dispatch(new GetSeasons());

    const hash: string = (this.route.snapshot.queryParams != null) ? this.route.snapshot.queryParams["id"] : undefined;
    if (hash != null) {
      this.store.dispatch(new SetHash(hash));
      this.searchWithHash();
    } else {
      this.search();
    }



    selectFourFactorsResponseSearchActions(this.store)
      .subscribe((actions) => {
        actions.forEach(action => {
          this.store.dispatch(action);
        })
      })

  }

  ngOnInit(): void {
    selectHash(this.store)
      .subscribe((hashCode) => {
        setTimeout(() => {
          const url = this.route.snapshot.url;
          this.router.navigate([url[0].path], {queryParams: {id: hashCode}, replaceUrl: true})
        })
      });

    this._fourFactors = selectFourFactors(this.store);
    this._loading = selectPageLoaded(this.store);
    this._done_loading = selectPageLoaded(this.store).map(v => !v);

    this._searchFailure = selectFourFactorsSearchIsError(this.store).map(v => {
      return !v
    });
    this._searchFailureMessage = selectFourFactorsSearchError(this.store).map((v: SearchError) => {
      if (v != null) {
        return v.message;
      }
      return undefined;
    });

    selectFourFactorsSearchIsError(this.store).subscribe(v => {
      if (v) {
        Observable.timer(3000).subscribe(() => {
          this.store.dispatch(new StoreFourFactors(undefined));
          this.store.dispatch(new SearchInProgress(false));

        })
      }
    });
    }

  search = (): void => {
    this.store.dispatch(new SetHash(undefined));
    this.store.dispatch(new SearchInProgress(true));
    this.store.dispatch(new FourFactorsSearch());
  };

  private searchWithHash = (): void => {
    this.store.dispatch(new SearchInProgress(true));
    this.store.dispatch(new FourFactorsSearch());
  };

}
