import {Component, Input} from '@angular/core';
import {Store} from "@ngrx/store";
import {Options, State} from "../../app.state";

@Component({
  selector: 'options',
  template: `
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-description>
          Filter Shot Data
        </mat-panel-description>
      </mat-expansion-panel-header>
      <div>
        <!--<div class="option-line">-->
        <!--<div class="option-offense"><shooter-select [source]="this._source"></shooter-select></div>-->
        <!--<div class="option-offense"><offense-team-select [source]="this._source"></offense-team-select></div>-->
        <!--<div class="option-offense"><offensive-players-on-select [source]="this._source"></offensive-players-on-select></div>-->
        <!--<div class="option-offense"><offensive-players-off-select [source]="this._source"></offensive-players-off-select></div>-->
        <!--</div>-->
        <!---->
        <!--<div class="option-line">-->
        <!--<div class="option-defense"><defense-team-select [source]="this._source"></defense-team-select></div>-->
        <!--<div class="option-defense"><defensive-players-on-select [source]="this._source"></defensive-players-on-select></div>-->
        <!--<div class="option-defense"><defensive-players-off-select [source]="this._source"></defensive-players-off-select></div>-->
        <!--</div>-->

        <!--<div class="option-line">-->
        <!--<div class="option-other"><season-select [source]="this._source"></season-select></div>-->
        <!--</div>-->
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
          <div class="option-other"><season-select [source]="this._source"></season-select></div>
        </div>
      </div>
    </mat-expansion-panel>

  `,
  styleUrls: ['../../css/general.css']
})
export class OptionsComponent {

  private _source: string;

  constructor(private store: Store<State>) {
  }

  @Input("source")
  set source(source: string) {
    this._source = source;
  }


}
