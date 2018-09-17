import {Component} from '@angular/core';

@Component({
  selector: 'navigation',
  template: `    
    <div class="top">'
      <div class="bar black card">
        <a class="bar-item button padding-large" href="/home">HOME</a>
        <a class="bar-item button padding-large" href="/raw">RAW SHOTS</a>
        <a class="bar-item button padding-large" href="/frequency">ZONED SHOTS</a>
        <!--<a class="bar-item button padding-large" href="/compare">COMPARE</a> -->
      </div>
    </div>`,
  styleUrls: ['../css/general.css']
})
export class NavigationComponent {

  constructor() {
  }
}
