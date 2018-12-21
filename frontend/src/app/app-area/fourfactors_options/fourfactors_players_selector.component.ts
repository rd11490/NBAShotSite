import {Component, OnInit, ViewChild} from '@angular/core';
import {PlayerId} from "../../models/options.models";
import {Store} from "@ngrx/store";
import {State} from "../../app.state";
import * as OptionActions from './../../actions/fourfactors_options.action'
import * as OptionSelectors from './../../selectors/fourfactors_options.selectors'
import {Observable} from "rxjs/Observable";
import * as InitialSelectors from "../../selectors/initial.selectors";
import {NgSelectComponent} from "@ng-select/ng-select";

@Component({
  selector: 'fourfactors-players-select',
  template: `
    <div>
      Player
      <ng-select [items]="this.players | async"
                 bindLabel="name"
                 bindValue="id"
                 [multiple]="true"
                 placeholder="Player"
                 [virtualScroll]="true"
                 (change)="selectPlayer($event)">
      </ng-select>
    </div>
  `,
  styleUrls: ['../../css/general.css']
})
export class FourFactorsPlayerSelectorComponent implements OnInit {

  players: Observable<Array<PlayerId>>;

  @ViewChild(NgSelectComponent)
  ngSelect: NgSelectComponent;

  constructor(private store: Store<State>) {

  }

  ngOnInit(): void {
    this.players = InitialSelectors.selectPlayers(this.store);
    OptionSelectors.selectPlayers(this.store).subscribe(selectedPlayers => {
      if (selectedPlayers != null) {
        selectedPlayers.forEach(player => {
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


  selectPlayer(players: Array<PlayerId>) {
    this.store.dispatch(new OptionActions.SetPlayers(players));
  }

}
