import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../app.state";
import {Observable} from "rxjs/Observable";
import {selectOptionDescription} from "../../selectors/fourfactors_options.selectors";

@Component({
  selector: 'four-factors-5yr-options',
  template: `    
      <div>
        <div class="option-line">
          <div class="option-two"><fourfactors-players-select></fourfactors-players-select></div>
          <div class="option-two"><fourfactors-5-season-select></fourfactors-5-season-select></div>
        </div>
      </div>
  `,
  styleUrls: ['../../css/general.css']
})
export class FourFactorsFiveYearOptionsComponent {

  _description: Observable<string>;

  constructor(private store: Store<State>) {

  }

  ngOnInit(): void {
    this._description = selectOptionDescription(this.store)
  }

}
