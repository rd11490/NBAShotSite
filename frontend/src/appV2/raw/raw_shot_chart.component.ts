import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {RawShot} from "../models/shots.models";
import {ShotStatisticsContainer} from "../models/response.models";
import {ShotchartService} from "../shotchart.service";
import {Observable} from "rxjs";

@Component({
  selector: 'raw_shot_chart_container',
  templateUrl: './raw_shot_chart.component.html',
  styleUrls: ['../css/general.css']
})
export class RawShotChartComponent implements OnInit {
  _source: string;
  _shots: Observable<Array<RawShot>>;
  _loading: boolean;
  _done_loading: boolean;
  _searchFailure: boolean;
  _searchFailureMessage: string;
  _stats: Observable<ShotStatisticsContainer>;

  _roles: Observable<Array<string>>;


  constructor(
    private shotchartService: ShotchartService,
    private route: ActivatedRoute,
    private router: Router) {

    this._roles = shotchartService.getRoles()
      .map((v) => {
      console.log(v);
      return v.roles
    }).catch((err: Error) => {
      console.log(err);
      this._searchFailure = true;
      this._searchFailureMessage = err.message;
      return [];
      });


    const hash: string = (this.route.snapshot.queryParams != null) ? this.route.snapshot.queryParams["id"] : undefined;
    if (hash != null) {
      console.log(hash);
      this.searchWithHash();
    }

  }

  ngOnInit(): void {

  }

  search = (): void => {

  };

  private searchWithHash = (): void => {

  };
}
