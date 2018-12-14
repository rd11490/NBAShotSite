import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as SearchActions from '../actions/search.action'
import {MatRadioChange} from "@angular/material";
import {State} from "../app.state";


@Component({
  selector: 'color-select',
  template: `
    Color is based on : 
    <mat-radio-group class="color-radio-group"
                     (change)="selectColor($event)">
      <mat-radio-button class="color-radio-button" [value]='true' color="warn">
        Frequency
      </mat-radio-button>
      <mat-radio-button class="color-radio-button" [value]='false' [checked]='true' color="warn">
        PPS
      </mat-radio-button>
    </mat-radio-group>
  `,
  styleUrls: ['../css/general.css']
})
export class ColorSelectorComponent implements OnInit {


  constructor(private store: Store<State>) {

  }


  ngOnInit(): void {

  }

  selectColor(color: MatRadioChange) {
    this.store.dispatch(new SearchActions.ColorByFrequency(color.value))
  }


}
