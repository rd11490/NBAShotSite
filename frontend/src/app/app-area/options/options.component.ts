import {Component, Input} from '@angular/core';
import {Store} from "@ngrx/store";
import {Options, State} from "../../app.state";
import * as OptionSelectors from "../../selectors/options.selectors";
import * as InitialSelectors from "../../selectors/initial.selectors";
import {selectDefensivePlayersOff, selectDescription} from "../../selectors/options.selectors";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'options',
  template: `
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-description>
          <span style="width: 100%;text-align: center">{{this._description | async}}</span>
        </mat-panel-description>
      </mat-expansion-panel-header>
      <div>
        <div class="option-line">
        <div class="option-two"><shooter-select [source]="this._source"></shooter-select></div>
        </div>
        <div class="option-line">
          <div class="option-two"><offense-team-select [source]="this._source"></offense-team-select></div>
          <div class="option-two"><defense-team-select [source]="this._source"></defense-team-select></div>
        </div>
        <div class="option-line">
          <div class="option-two"><offensive-players-on-select [source]="this._source"></offensive-players-on-select></div>
          <div class="option-two"><defensive-players-on-select [source]="this._source"></defensive-players-on-select></div>
        </div>
        <div class="option-line">
          <div class="option-two"><offensive-players-off-select [source]="this._source"></offensive-players-off-select></div>
          <div class="option-two"><defensive-players-off-select [source]="this._source"></defensive-players-off-select></div>
        </div>
        <div class="option-line">
          <div class="option-two"><start-date-select [source]="this._source"></start-date-select></div>
          <div class="option-two"><end-date-select [source]="this._source"></end-date-select></div>
        </div>
        <div class="option-line">
          <div class="option-other"><season-select [source]="this._source"></season-select></div>
        </div>
      </div>
    </mat-expansion-panel>

  `,
  styleUrls: ['../../css/general.css']
})
export class OptionsComponent {

  _source: string;
  _description: Observable<string>;

  constructor(private store: Store<State>) {

  }

  ngOnInit(): void {
    this._description = selectDescription(this.store, this._source);
  }

  @Input("source")
  set source(source: string) {
    this._source = source;
  }


}
