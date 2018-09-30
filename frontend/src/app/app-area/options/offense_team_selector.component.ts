import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TeamId} from "../../models/options.models";
import {Store} from "@ngrx/store";
import {Options, State} from "../../app.state";
import * as OptionActions from './../../actions/options.action'
import * as OptionSelectors from './../../selectors/options.selectors'
import {Observable} from "rxjs/Observable";
import * as InitialSelectors from "../../selectors/initial.selectors";
import {NgSelectComponent} from "@ng-select/ng-select";

@Component({
  selector: 'offense-team-select',
  template: `
    <div>
      Offense Team
      <ng-select [items]="this.teams | async"
                 bindLabel="teamName"
                 bindValue="teamId"
                 [multiple]="false"
                 placeholder="Team"
                 [virtualScroll]="true"
                 (change)="selectTeam($event)">
      </ng-select>
    </div>
  `,
  styleUrls: ['../../css/general.css']
})
export class OffenseTeamSelectorComponent implements OnInit {
  _source: string;
  teams: Observable<Array<TeamId>>;
  selectedItem: Observable<TeamId>;

  constructor(private store: Store<State>) {

  }

  ngOnInit(): void {
    this.teams = InitialSelectors.selectTeams(this.store);

    OptionSelectors.selectOffensiveTeam(this.store, this._source).subscribe(v => {
      if (v != null) {
        this.ngSelect.select({
          name: [v.teamName],
          label: v.teamName,
          value: v
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

  selectTeam(team: TeamId) {
    this.store.dispatch(new OptionActions.SetOffenseTeam(team, this._source));
  }

}
