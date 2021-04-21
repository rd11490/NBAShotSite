import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../app.state";
import * as OptionActions from './../../actions/options.action'
import {MatDatepickerInputEvent} from "@angular/material";
import * as OptionSelectors from './../../selectors/options.selectors'



@Component({
  selector: 'end-date-select',
  template: `
    <div>
      End Date
      <mat-form-field>
        <input matInput
               [(ngModel)]="startAt"
               [min]="minDate"
               [max]="maxDate"
               [matDatepicker]="start_picker"
               placeholder="End Date"
               (dateInput)="selectEndDate($event)"
               (dateChange)="selectEndDate($event)">
        <mat-datepicker-toggle matSuffix [for]="start_picker"></mat-datepicker-toggle>
        <mat-datepicker #start_picker
                        [touchUi]="false"
                        startView="month"
                        [startAt]="startAt"
        ></mat-datepicker>
      </mat-form-field>
      <button mat-raised-button (click)="resetForm()">Reset</button>
    </div>
  `,
  styleUrls: ['../../css/general.css']
})
export class EndDateSelectorComponent implements OnInit {

  _source: string;
  minDate: Date = new Date(2000, 0, 1);
  maxDate: Date = new Date(2030, 0, 1);
  startAt: Date;


  constructor(private store: Store<State>) {

  }


  ngOnInit(): void {
    OptionSelectors.selectEndDate(this.store, this._source).subscribe(v => {
      if (v != null) {
        this.startAt = new Date(v)
      }
    })
  }

  @Input("source")
  set source(source: string) {
    this._source = source;
  }

  selectEndDate(date: MatDatepickerInputEvent<Date>) {
    this.store.dispatch(new OptionActions.SetDateUpperBound(date.value.getTime(), this._source));
  }

  resetForm() {
    this.startAt = undefined;
    this.store.dispatch(new OptionActions.SetDateUpperBound(undefined, this._source));

  };

}
