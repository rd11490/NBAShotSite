import {Component, Input} from '@angular/core';
import {Store} from "@ngrx/store";
import {Options, State} from "../../app.state";
import * as OptionSelectors from "../../selectors/options.selectors";
import * as InitialSelectors from "../../selectors/initial.selectors";
import {selectDefensivePlayersOff, selectDescription} from "../../selectors/options.selectors";
import {Observable} from "rxjs/Observable";
import {selectOptionDescription} from "../../selectors/fourfactors_options.selectors";

@Component({
  selector: 'four-factors-options',
  template: `    
      <div>
        <div class="option-line">
          <div class="option-three"><fourfactors-players-select></fourfactors-players-select></div>
          <div class="option-three"><fourfactors-team-select></fourfactors-team-select></div>
          <div class="option-three"><fourfactors-season-select></fourfactors-season-select></div>
        </div>
      </div>
  `,
  styleUrls: ['../../css/general.css']
})
export class FourFactorsOptionsComponent {

  _description: Observable<string>;

  constructor(private store: Store<State>) {

  }

  ngOnInit(): void {
    this._description = selectOptionDescription(this.store)
  }

}
