import {Component} from '@angular/core';
import {PlayerId} from "../../models/options.models";
import {Store} from "@ngrx/store";
import {Options} from "../../app.state";
import * as OptionActions from './../../actions/options.action'
import * as OptionSelectors  from './../../selectors/options.selectors'
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'shooter-select',
  template: `
    <div>
      Shooter
      <ng-select [items]="shooters"
                 bindLabel="name"
                 [bindValue]="selectedItem | async"
                 bindValue="id"
                 [multiple]="false"
                 placeholder="Shooter"
                 (change)="selectShooter($event)">
      </ng-select>
    </div>
  `,
  styleUrls: ['../../css/general.css']
})
export class ShooterSelectorComponent {

  private shooters: PlayerId[];
  selectedItem: Observable<PlayerId>;

  constructor(private store: Store<Options>) {
    this.shooters = [{name: "Test1", id: 1}, {name: "Test2", id: 2}, {name: "Test3", id: 3}, {name: "Test4", id: 4}, {name: "Random Name", id: 5}];
    this.selectedItem = OptionSelectors.selectShooter(this.store);
  }

  selectShooter(player: PlayerId) {
    this.store.dispatch(new OptionActions.SetShooter(player));
  }

}
