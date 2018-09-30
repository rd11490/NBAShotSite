import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../app.state";
import * as OptionActions from './../../actions/options.action'
import * as OptionSelectors from './../../selectors/options.selectors'
import {Observable} from "rxjs/Observable";
import * as InitialSelectors from "../../selectors/initial.selectors";
import {NgOption, NgSelectComponent} from "@ng-select/ng-select";

@Component({
  selector: 'season-select',
  template: `
    <div>
      Seasons
      <ng-select [items]="this.seasons | async"
                 [multiple]="false"
                 placeholder="Season"
                 [virtualScroll]="true"
                 (change)="selectSeason($event)">
      </ng-select>
    </div>
  `,
  styleUrls: ['../../css/general.css']
})
export class SeasonSelectorComponent implements OnInit {

  _source: string;
  seasons: Observable<Array<string>>;

  constructor(private store: Store<State>) {

  }

  ngOnInit(): void {
    this.seasons = InitialSelectors.selectSeasons(this.store);
    OptionSelectors.selectSeason(this.store, this._source).subscribe(v => {
      if (v != null) {
        this.ngSelect.select({
          name: [v],
          label: v,
          value: v
        })
      }

    })
  }

  @ViewChild(NgSelectComponent)
  ngSelect: NgSelectComponent;

  @Input("source")
  set source(source: string) {
    this._source = source;
  }

  selectSeason(season: string) {
    this.store.dispatch(new OptionActions.SetSeason(season, this._source));
  }

}
