import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {Options} from "../../app.state";

@Component({
  selector: 'options',
  template: `
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-description>
          Filter Shot Data
        </mat-panel-description>
      </mat-expansion-panel-header>

      <shooter-select></shooter-select>
      <offense-team-select></offense-team-select>
      <offensive-players-on-select></offensive-players-on-select>
      <offensive-players-off-select></offensive-players-off-select>
      <defense-team-select></defense-team-select>
      <defensive-players-on-select></defensive-players-on-select>
      <defensive-players-off-select></defensive-players-off-select>
    </mat-expansion-panel>

  `,
  styleUrls: ['../../css/general.css']
})
export class OptionsComponent {

  constructor(private store: Store<Options>) {

  }


}
