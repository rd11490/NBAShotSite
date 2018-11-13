import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PlayerId} from "../../models/options.models";
import {Store} from "@ngrx/store";
import {State} from "../../app.state";
import * as OptionActions from './../../actions/options.action'
import * as OptionSelectors from './../../selectors/options.selectors'
import {Observable} from "rxjs/Observable";
import * as InitialSelectors from "../../selectors/initial.selectors";
import {NgSelectComponent} from "@ng-select/ng-select";
import {NgOption} from "@ng-select/ng-select/ng-select/ng-select.types";

@Component({
  selector: 'shooter-select',
  template: `
    <div>
      Shooter
      <ng-select [items]="this.players | async"
                 bindLabel="name"
                 bindValue="id"
                 [multiple]="true"
                 placeholder="Shooter"
                 [virtualScroll]="true"
                 (change)="selectShooter($event)">
      </ng-select>
    </div>
  `,
  styleUrls: ['../../css/general.css']
})
export class ShooterSelectorComponent implements OnInit {

  _source: string;
  players: Observable<Array<PlayerId>>;

  @ViewChild(NgSelectComponent)
  ngSelect: NgSelectComponent;

  constructor(private store: Store<State>) {

  }

  ngOnInit(): void {
    this.players = InitialSelectors.selectPlayers(this.store);
    OptionSelectors.selectShooter(this.store, this._source).subscribe(shooters => {
      if (shooters != null) {
        shooters.forEach(shooter => {
          if (this.ngSelect.selectedItems.filter(v => v.value == shooter).length < 1) {
            this.ngSelect.select({
              name: [shooter.name],
              label: shooter.name,
              value: shooter
            })
          }
        })
      }
      })
  }

  @Input("source")
  set source(source: string) {
    this._source = source;
  }

  selectShooter(player: Array<PlayerId>) {
    this.store.dispatch(new OptionActions.SetShooter(player, this._source));
  }

}
