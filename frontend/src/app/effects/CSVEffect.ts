import {Injectable} from "@angular/core";
import {State} from "../app.state";
import {Store} from "@ngrx/store";
import {Actions, Effect} from "@ngrx/effects";
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import * as FourFactorsOptionActions from "../actions/fourfactors_options.action";
import {DownloadCSV} from "../services/download_csv.service";
import {DownloadCSVAction} from "../actions/fourfactors_options.action";
import {Observable} from "rxjs/Observable";

@Injectable()
export class CSVEffect {
  constructor(
    private actions: Actions,
    private csvService: DownloadCSV,
    private store: Store<State>
  ) {
  }

  @Effect()
  downloadCSV = () =>
    this.actions
      .ofType(FourFactorsOptionActions.DOWNLOAD_CSV)
      .withLatestFrom(this.store)
      .mergeMap(this.callCSVService);


  private callCSVService = (value: [DownloadCSVAction, State]):  Observable<any> => {
    if (value[1].fourFactorsResponse != null) {
      this.csvService.exportAsCSV(value[1].fourFactorsResponse.fourFactors);
    }
    return Observable.of({type:"NO_ACTION"});
  };

}


