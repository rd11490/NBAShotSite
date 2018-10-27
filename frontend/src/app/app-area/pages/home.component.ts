import {Component} from '@angular/core';
import {State} from '../../app.state'
import {Store} from "@ngrx/store";
import {GetPlayers, GetSeasons, GetTeams} from "../../actions/initial.action";

@Component({
  selector: 'home-component',
  template: `  
    <h1>Welcome to NBA Shot Charts</h1>
    <b>
      This is an app designed to allow you to build shot charts based on who is on the court, who is off the court, the season, 
      and/or the teams playing.
      <br>
      This site is still a work in progress. Please report any issues, suggestions, or complaints to @rd11490 on twitter or
      rd11490@gmail.com
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
