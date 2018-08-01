import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <navigation></navigation>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./css/general.css']
})
export class AppComponent {
}
