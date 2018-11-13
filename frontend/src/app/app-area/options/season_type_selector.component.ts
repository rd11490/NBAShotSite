import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../app.state";
import * as OptionActions from './../../actions/options.action'
import * as OptionSelectors from './../../selectors/options.selectors'
import {Observable} from "rxjs/Observable";
import * as InitialSelectors from "../../selectors/initial.selectors";
import {NgOption, NgSelectComponent} from "@ng-select/ng-select";

@Component({
  selector: 'season-type-select',
  template: `
    <div>
      Season Type
      <ng-select [items]="this.seasonTypes"
                 [multiple]="false"
                 placeholder="SeasonType"
                 [virtualScroll]="true"
                 (change)="selectSeasonType($event)">
      </ng-select>
    </div>
  `,
  styleUrls: ['../../css/general.css']
})
export class SeasonTypeSelectorComponent implements OnInit {

  _source: string;
  seasonTypes:Array<string> = ["Regular Season", "Playoffs"];

  constructor(private store: Store<State>) {

  }

  ngOnInit(): void {
    OptionSelectors.selectSeasonType(this.store, this._source).subscribe(v => {
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

  selectSeasonType(season: string) {
    this.store.dispatch(new OptionActions.SetSeasonType(season, this._source));
  }

}
