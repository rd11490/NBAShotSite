import {Component} from '@angular/core';
import {State} from '../../app.state'
import {Store} from "@ngrx/store";
import {GetPlayers, GetSeasons, GetTeams} from "../../actions/initial.action";

@Component({
  selector: 'home-component',
  template: `  
    <h1>Welcome to Shot Chart Compare!</h1>
    <b>
      This is an app designed to allow you to view and compare shot charts using various parameters such as players 
      on and off the court, time remaining in the period, defending team, etc.
    </b>
 
    `,
  styleUrls: ['../../css/general.css']
})
export class HomeComponent {

  constructor(store: Store<State>) {
    store.dispatch(new GetPlayers());
    store.dispatch(new GetTeams());
    store.dispatch(new GetSeasons());
  }
}
