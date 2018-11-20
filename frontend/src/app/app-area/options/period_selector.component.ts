import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../app.state";
import * as OptionActions from './../../actions/options.action'
import * as OptionSelectors from './../../selectors/options.selectors'
import {Observable} from "rxjs/Observable";
import * as InitialSelectors from "../../selectors/initial.selectors";
import {NgOption, NgSelectComponent} from "@ng-select/ng-select";
import {SetPeriod} from "../../actions/options.action";

@Component({
  selector: 'period-select',
  template: `
    <div>
      Period
      <ng-select [items]="this.periods"
                 [multiple]="true"
                 placeholder="Period"
                 [virtualScroll]="true"
                 (change)="selectPeriods($event)">
      </ng-select>
    </div>
  `,
  styleUrls: ['../../css/general.css']
})
export class PeriodSelectorComponent implements OnInit {

  _source: string;
  periods:Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private store: Store<State>) {

  }

  ngOnInit(): void {
    OptionSelectors.selectPeriod(this.store, this._source).subscribe(selectedPeriods => {
      if (selectedPeriods != null) {
        selectedPeriods.forEach(period => {
          if (this.ngSelect.selectedItems.filter(v => v.value == period).length < 1) {
            this.ngSelect.select({
              name: [period],
              label: period.toLocaleString(),
              value: period
            })
          }
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

  selectPeriods(seasons: Array<number>) {
    this.store.dispatch(new OptionActions.SetPeriod(seasons, this._source));
  }

}
