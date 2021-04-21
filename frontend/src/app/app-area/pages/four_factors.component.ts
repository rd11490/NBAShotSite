import {Component, OnInit} from '@angular/core';
import {State} from '../../app.state'
import {Store} from "@ngrx/store";
import {GetPlayers, GetSeasons, GetTeams} from "../../actions/initial.action";
import {FourFactorsSearch, SearchInProgress, StoreFourFactors} from "../../actions/search.action";
import {selectFourFactorsResponseSearchActions, selectPageLoaded} from "../../selectors/initial.selectors";
import {DownloadCSVAction, SetHash} from "../../actions/fourfactors_options.action";
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
    <h1>Regularized Adjusted Four Factors</h1>
    <div [hidden]="(this._searchFailure | async)">
      <h1 style="color:red;">{{(this._searchFailureMessage | async)}}</h1>
    </div>
    <div [hidden]="(this._done_loading | async)">
      <h6>Select players, seasons, and/or teams then click "Search" to filter the table</h6>
      <four-factors-options></four-factors-options>
      <div>
        <button class="search-button" (click)="search()">Search</button>
      </div>
      <br>
      <button (click)="download()">Export to CSV</button>
      <mat-tab-group>
        <mat-tab label="RAPM">
          <h2>RAPM</h2>
          <four_factors_table
            [fourfactors]="this._fourFactors | async"
            [displayColumns]="['playerName', 'RAPM', 'RAPM_Rank', 'RAPM__Off', 'RAPM__Off_Rank',
      'RAPM__Def', 'RAPM__Def_Rank', 'teamName', 'season']"></four_factors_table></mat-tab>
        <mat-tab label="Luck Adjusted RAPM">
          <h2>Luck Adjusted RAPM</h2>
          <div *ngIf="this._showLuckAdjustedRAPM === false">
            <button (click)="this.flipLARAPM(true)">Explain</button>
          </div>
          <div *ngIf="this._showLuckAdjustedRAPM === true">
            <button (click)="this.flipLARAPM(false)">Hide</button>
            <h5>RAPM but with the target value being expected points per 100 pos instead of points per 100 pos</h5>
            <p>
              Expected points is calculated by replacing points scored off free throws and 3s and expected value.<br>
              Expected points off Freethrows is calculated as the career free throw percent of the shooter.<br>
              Expected points off 3s is calculated as the career points per shot for the shooter from the location of the shot.
              (For a shooter with a career average of 50% from the left corner a shot from the left corner is worth 1.5 points per shot)
            </p>

          </div>
          <four_factors_table
            [fourfactors]="this._fourFactors | async"
            [displayColumns]="['playerName', 'LA_RAPM', 'LA_RAPM_Rank', 'LA_RAPM__Off', 'LA_RAPM__Off_Rank',
      'LA_RAPM__Def', 'LA_RAPM__Def_Rank', 'teamName', 'season']"
          ></four_factors_table>
        </mat-tab>
        <mat-tab label="RA Effective Field Goal Percentage">
          <h2>Regularized Adjusted Effective Field Goal Percentage</h2>
          <div *ngIf="this._showEFG === false">
            <button (click)="this.flipEFG(true)">Explain</button>
          </div>
          <div *ngIf="this._showEFG === true">
            <button (click)="this.flipEFG(false)">Hide</button>
            <h5>Ridge Regressed Effective Field Goal Percentage</h5>
          </div>
          <four_factors_table
            [fourfactors]="this._fourFactors | async"
            [displayColumns]="['playerName', 'RA_EFG', 'RA_EFG_Rank', 'RA_EFG__Off', 'RA_EFG__Off_Rank',
      'RA_EFG__Def', 'RA_EFG__Def_Rank', 'teamName', 'season']"
          ></four_factors_table>
        </mat-tab>
        <mat-tab label="RA Turnover Rate">
          <h2>Regularized Adjusted Turnover Rate</h2>
          <div *ngIf="this._showTOV === false">
            <button (click)="this.flipTOV(true)">Explain</button>
          </div>
          <div *ngIf="this._showTOV === true">
            <button (click)="this.flipTOV(false)">Hide</button>
            <h5>Ridge Regressed Turnover Rate</h5>
          </div>
          <four_factors_table
            [fourfactors]="this._fourFactors | async"
            [displayColumns]="['playerName', 'RA_TOV', 'RA_TOV_Rank', 'RA_TOV__Off', 'RA_TOV__Off_Rank',
      'RA_TOV__Def', 'RA_TOV__Def_Rank', 'teamName', 'season']"
          ></four_factors_table>
        </mat-tab>
        <mat-tab label="RA Free Throw Rate"> <h2>Regularized Adjusted Free Throw Rate</h2>
          <div *ngIf="this._showFTR === false">
            <button (click)="this.flipFTR(true)">Explain</button>
          </div>
          <div *ngIf="this._showFTR === true">
            <button (click)="this.flipFTR(false)">Hide</button>
            <h5>Ridge Regressed Free Throw Rate</h5>
          </div>
          <four_factors_table
            [fourfactors]="this._fourFactors | async"
            [displayColumns]="['playerName', 'RA_FTR', 'RA_FTR_Rank', 'RA_FTR__Off', 'RA_FTR__Off_Rank',
      'RA_FTR__Def', 'RA_FTR__Def_Rank', 'teamName', 'season']"
          ></four_factors_table>
        </mat-tab>
        <mat-tab label="RA Rebound Rate">
          <h2>Regularized Adjusted Rebound Rate</h2>
          <div *ngIf="this._showRBD === false">
            <button (click)="this.flipRBD(true)">Explain</button>
          </div>
          <div *ngIf="this._showRBD === true">
            <button (click)="this.flipRBD(false)">Hide</button>
            <h5>Ridge Regressed Rebound Rate</h5>
          </div>
          <four_factors_table
            [fourfactors]="this._fourFactors | async"
            [displayColumns]="['playerName', 'RA_ORBD', 'RA_ORBD_Rank', 'RA_ORBD__Off', 'RA_ORBD__Off_Rank',
      'RA_ORBD__Def', 'RA_ORBD__Def_Rank', 'teamName', 'season']"
          ></four_factors_table>
        </mat-tab>
      </mat-tab-group>
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

  _showLuckAdjustedRAPM: boolean = false;
  _showEFG: boolean = false;
  _showRBD: boolean = false;
  _showTOV: boolean = false;
  _showFTR: boolean = false;



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
      this.store.dispatch(new SetHash("-2146555570")); //TODO Update when new season rolls around
      this.searchWithHash();
    }

    selectFourFactorsResponseSearchActions(this.store)
      .subscribe((actions) => {
        actions.forEach(action => {
          console.log(action)
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

  public flipRBD = (bool: boolean): void => {
    this._showRBD = bool;
  };

  public flipFTR = (bool: boolean): void => {
    this._showFTR = bool;
  };

  public flipTOV = (bool: boolean): void => {
    this._showTOV = bool;
  };

  public flipEFG = (bool: boolean): void => {
    this._showEFG = bool;
  };

  public flipLARAPM = (bool: boolean): void => {
    this._showLuckAdjustedRAPM = bool;
  };

  public download = (): void => {
    this.store.dispatch(new DownloadCSVAction());
  }

}
