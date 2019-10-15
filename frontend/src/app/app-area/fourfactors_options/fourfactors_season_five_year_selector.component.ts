import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../app.state";
import * as OptionActions from './../../actions/fourfactors_options.action'
import * as OptionSelectors from './../../selectors/fourfactors_options.selectors'
import {Observable} from "rxjs/Observable";
import * as InitialSelectors from "../../selectors/initial.selectors";
import {NgSelectComponent} from "@ng-select/ng-select";

@Component({
  selector: 'fourfactors-5-season-select',
  template: `
    <div>
      Seasons
      <ng-select [items]="this.seasons | async"
                 [multiple]="true"
                 placeholder="Season"
                 [virtualScroll]="true"
                 (change)="selectSeason($event)">
      </ng-select>
    </div>
  `,
  styleUrls: ['../../css/general.css']
})
export class FourFactorsFiveSeasonSelectorComponent implements OnInit {

  seasons: Observable<Array<string>>;

  constructor(private store: Store<State>) {

  }

  ngOnInit(): void {
    this.seasons = InitialSelectors.selectFiveYearSeasons(this.store);
    OptionSelectors.selectSeasons(this.store).subscribe(selectedSeasons => {
      if (selectedSeasons != null) {
        selectedSeasons.forEach(season => {
          if (this.ngSelect.selectedItems.filter(v => v.value == season).length < 1) {
            this.ngSelect.select({
              name: [season],
              label: season,
              value: season
            })
          }
        })
      }
    })
  }

  @ViewChild(NgSelectComponent)
  ngSelect: NgSelectComponent;

  selectSeason(season: Array<string>) {
    this.store.dispatch(new OptionActions.SetSeasons(season));
  }

}
