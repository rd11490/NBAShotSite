import {Component, OnInit, ViewChild} from '@angular/core';
import {TeamId} from "../../models/options.models";
import {Store} from "@ngrx/store";
import {State} from "../../app.state";
import * as FourFactorsOptionActions from './../../actions/fourfactors_options.action'
import * as FourFactorsOptionSelectors from './../../selectors/fourfactors_options.selectors'
import {Observable} from "rxjs/Observable";
import * as InitialSelectors from "../../selectors/initial.selectors";
import {NgSelectComponent} from "@ng-select/ng-select";

@Component({
  selector: 'fourfactors-team-select',
  template: `
    <div>
      Teams
      <ng-select [items]="this.teams | async"
                 bindLabel="teamName"
                 bindValue="teamId"
                 [multiple]="true"
                 placeholder="Teams"
                 [virtualScroll]="true"
                 (change)="selectTeams($event)">
      </ng-select>
    </div>
  `,
  styleUrls: ['../../css/general.css']
})
export class FourFactorsTeamsSelectorComponent implements OnInit {

  teams: Observable<Array<TeamId>>;

  @ViewChild(NgSelectComponent)
  ngSelect: NgSelectComponent;

  constructor(private store: Store<State>) {

  }

  ngOnInit(): void {
    this.teams = InitialSelectors.selectTeams(this.store);
    FourFactorsOptionSelectors.selectTeams(this.store).subscribe(selectedTeams => {
      if (selectedTeams != null) {
        selectedTeams.forEach(team => {
          if (this.ngSelect.selectedItems.filter(v => v.value == team).length < 1) {
            this.ngSelect.select({
              name: [team.teamName],
              label: team.teamName,
              value: team
            })
          }
        })
      }
    })
  }

  selectTeams(team: Array<TeamId>) {
    this.store.dispatch(new FourFactorsOptionActions.SetTeams(team));
  }

}
