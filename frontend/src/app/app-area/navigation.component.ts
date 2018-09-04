import {Component} from '@angular/core';

@Component({
  selector: 'navigation',
  template: `    
    <div class="top">'
      <div class="bar black card">
        <a class="bar-item button padding-large" routerLink="/home">HOME</a>
        <a class="bar-item button padding-large" routerLink="/raw">RAW SHOTS</a>
        <a class="bar-item button padding-large" routerLink="/frequency">SHOT FREQUENCY</a>
        <a class="bar-item button padding-large" routerLink="/compare">COMPARE</a>
      </div>
    </div>`,
  styleUrls: ['../css/general.css']
})
export class NavigationComponent {

  constructor() {
  }
}
