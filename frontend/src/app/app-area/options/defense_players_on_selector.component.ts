import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PlayerId} from "../../models/options.models";
import {Store} from "@ngrx/store";
import {State} from "../../app.state";
import * as OptionActions from './../../actions/options.action'
import * as OptionSelectors from './../../selectors/options.selectors'
import {Observable} from "rxjs/Observable";
import * as InitialSelectors from "../../selectors/initial.selectors";
import {NgSelectComponent} from "@ng-select/ng-select";

@Component({
  selector: 'defensive-players-on-select',
  template: `
    <div>
      Defensive Players On Court
      <ng-select [items]="this.players | async"
                 bindLabel="name"
                 bindValue="id"
                 [multiple]="true"
                 maxSelectedItems="5"
                 placeholder="Defensive Players"
                 [virtualScroll]="true"
                 (change)="selectPlayers($event)">
      </ng-select>
    </div>
  `,
  styleUrls: ['../../css/general.css']
})
export class DefensePlayersOnSelectorComponent implements OnInit {

  _source: string;
  players: Observable<Array<PlayerId>>;

  constructor(private store: Store<State>) {

  }

  ngOnInit(): void {
    this.players = InitialSelectors.selectPlayers(this.store);

    OptionSelectors.selectDefensivePlayersOn(this.store, this._source).subscribe(players => {
      if (players != null) {
        players.forEach(player => {
          if (this.ngSelect.selectedItems.filter(v => v.value == player).length < 1) {
            this.ngSelect.select({
              name: [player.name],
              label: player.name,
              value: player
            })
          }
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

  selectPlayers(players: Array<PlayerId>) {
    this.store.dispatch(new OptionActions.SetDefensePlayersOn(players, this._source));
  }

}
