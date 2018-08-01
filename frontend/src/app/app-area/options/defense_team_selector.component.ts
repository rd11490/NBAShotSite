import {Component} from '@angular/core';
import {TeamId} from "../../models/options.models";
import {Store} from "@ngrx/store";
import {Options} from "../../app.state";
import * as OptionActions from './../../actions/options.action'
import * as OptionSelectors from './../../selectors/options.selectors'
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'defense-team-select',
  template: `
    <div>
      Defense Team
      <ng-select [items]="teams"
                 bindLabel="name"
                 [bindValue]="selectedItem | async"
                 bindValue="id"
                 [multiple]="false"
                 placeholder="Team"
                 (change)="selectTeam($event)">
      </ng-select>
    </div>
  `,
  styleUrls: ['../../css/general.css']
})
export class DefenseTeamSelectorComponent {

  private teams: TeamId[];
  selectedItem: Observable<TeamId>;

  constructor(private store: Store<Options>) {
    this.teams = [{name: "Celtics", id: 1}, {name: "Warriors", id: 2}, {name: "Raptors", id: 3}, {name: "Rockets", id: 4}, {name: "Hawks", id: 5}];
    this.selectedItem = OptionSelectors.selectDefensiveTeam(this.store);
  }

  selectTeam(team: TeamId) {
    this.store.dispatch(new OptionActions.SetDefenseTeam(team));
  }

}
