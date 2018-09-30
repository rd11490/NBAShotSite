import {Component} from '@angular/core';
import {State} from '../../app.state'
import {Store} from "@ngrx/store";
import {GetPlayers, GetSeasons, GetTeams} from "../../actions/initial.action";

@Component({
  selector: 'loading-component',
  template: `  
    <h1>Loading...</h1>
    `,
  styleUrls: ['../../css/general.css']
})
export class LoadingComponent {


  constructor(store: Store<State>) {}

}
