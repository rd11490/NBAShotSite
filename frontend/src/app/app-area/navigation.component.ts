import {Component} from '@angular/core';

@Component({
  selector: 'navigation',
  template: `    
    <div class="top">
      <div class="bar black card">
        <a class="bar-item button padding-large" href="/home">HOME</a>
        <a class="bar-item button padding-large" href="/raw">RAW SHOTS</a>
        <a class="bar-item button padding-large" href="/zoned">ZONED SHOTS</a>
        <a class="bar-item button padding-large" href="/compare">COMPARE</a>
        <a class="bar-item button padding-large" href="/rapm">RAPM</a>
        <a class="bar-item button padding-large" href="/rapm3">3 YEAR RAPM</a>
        <a class="bar-item button padding-large" href="/rapm5">5 YEAR RAPM</a>
      </div>
    </div>`,
  styleUrls: ['../css/general.css']
})
export class NavigationComponent {

  constructor() {
  }
}
