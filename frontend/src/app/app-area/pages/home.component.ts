import {Component} from '@angular/core';
import {State} from '../../app.state'
import {Store} from "@ngrx/store";
import {GetPlayers, GetSeasons, GetTeams} from "../../actions/initial.action";

@Component({
  selector: 'home-component',
  template: `  
    <h1>Welcome to Shot Chart WOWY!</h1>
    <b>
      This is an app designed to allow you to build shot charts based on who is on the court, who is off the court
      <br>
      <h2>Common Issues:</h2>
      <ul>
        <li>
          Requesting too many shots for a Raw Shot Chart: The endpont is limited in how many shots it can return. 
          Limit your request to get results
        </li>
      </ul>
      
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
