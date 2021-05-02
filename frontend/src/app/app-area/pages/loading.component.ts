import {Component} from '@angular/core';
import {State} from '../../app.state'
import {Store} from "@ngrx/store";

@Component({
  selector: 'loading-component',
  template: `  
    <h1>Loading...</h1>
    If you spend more than 30 seconds loading, please reload the page
    `,
  styleUrls: ['../../css/general.css']
})
export class LoadingComponent {


  constructor(store: Store<State>) {}

}
