import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TeamId} from "../../models/options.models";
import {Store} from "@ngrx/store";
import {State} from "../../app.state";
import * as OptionActions from './../../actions/options.action'
import * as OptionSelectors from './../../selectors/options.selectors'
import {Observable} from "rxjs/Observable";
import * as InitialSelectors from "../../selectors/initial.selectors";
import {NgSelectComponent} from "@ng-select/ng-select";

@Component({
  selector: 'defense-team-select',
  template: `
    <div>
      Defense Team
      <ng-select [items]="this.teams | async"
                 bindLabel="teamName"
                 bindValue="teamiId"
                 [multiple]="false"
                 placeholder="Team"
                 [virtualScroll]="true"
                 (change)="selectTeam($event)">
      </ng-select>
    </div>
  `,
  styleUrls: ['../../css/general.css']
})
export class DefenseTeamSelectorComponent implements OnInit {

  private _source: string;
  private teams: Observable<Array<TeamId>>;

  constructor(private store: Store<State>) {

  }

  ngOnInit(): void {
    this.teams = InitialSelectors.selectTeams(this.store);

    OptionSelectors.selectDefensiveTeam(this.store, this._source)
      .subscribe(v => {
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
    this.store.dispatch(new OptionActions.SetDefenseTeam(team, this._source));
  }

}
