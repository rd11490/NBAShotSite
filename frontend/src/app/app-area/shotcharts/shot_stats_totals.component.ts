import {Component, Input, OnInit} from '@angular/core';
import {State} from '../../app.state'
import {Store} from "@ngrx/store";
import {GetPlayers, GetSeasons, GetTeams} from "../../actions/initial.action";
import {Observable} from "rxjs/Observable";
import {ShotStatisticsContainer} from "../../models/response.models";
import {selectZonedShotStatistics} from "../../selectors/shotchart.selectors";

@Component({
  selector: 'stats-totals-component',
  template: `
    <table>
      <td>
        <div class="shot-stats-content">
          <h4>Totals:</h4>
          <table>
            <tr>
              <th align="left">Attempts</th>
              <td>{{this._shotStatistics.total.attempts}}</td>
            </tr>
            <tr>
              <th align="left">Made</th>
              <td>{{this._shotStatistics.total.made}}</td>
            </tr>
            <tr>
              <th align="left">PPS</th>
              <td>{{this._shotStatistics.total.pointsPerShot.toFixed(2)}}</td>
            </tr>
          </table>
          <hr>
          <h4>Shot Value:</h4><br>
          <h4>3 Pt Shots</h4>
          <table>
            <tr>
              <th align="left">Attempts</th>
              <td>{{this._shotStatistics.threes.attempts}}</td>
            </tr>
            <tr>
              <th align="left">Made</th>
              <td>{{this._shotStatistics.threes.made}}</td>
            </tr>
            <tr>
              <th align="left">Freq</th>
              <td>{{this._shotStatistics.threes.frequency.toFixed(2)}}</td>
            </tr>
            <tr>
              <th align="left">PPS</th>
              <td>{{this._shotStatistics.threes.pointsPerShot.toFixed(2)}}</td>
            </tr>
          </table>
          <hr>
          <h4>2 Pt Shots</h4>
          <table>
            <tr>
              <th align="left">Attempts</th>
              <td>{{this._shotStatistics.twos.attempts}}</td>
            </tr>
            <tr>
              <th align="left">Made</th>
              <td>{{this._shotStatistics.twos.made}}</td>
            </tr>
            <tr>
              <th align="left">Freq</th>
              <td>{{this._shotStatistics.twos.frequency.toFixed(2)}}</td>
            </tr>
            <tr>
              <th align="left">PPS</th>
              <td>{{this._shotStatistics.twos.pointsPerShot.toFixed(2)}}</td>
            </tr>
          </table>
        </div>
      </td>
      <td>
        <div class="shot-stats-content">
          <h4>Zones:</h4><br>
          <h4>3 Pt Shots</h4>
          <table>
            <tr>
              <th align="left">Attempts</th>
              <td>{{this._shotStatistics.threes.attempts}}</td>
            </tr>
            <tr>
              <th align="left">Made</th>
              <td>{{this._shotStatistics.threes.made}}</td>
            </tr>
            <tr>
              <th align="left">Freq</th>
              <td>{{this._shotStatistics.threes.frequency.toFixed(2)}}</td>
            </tr>
            <tr>
              <th align="left">PPS</th>
              <td>{{this._shotStatistics.threes.pointsPerShot.toFixed(2)}}</td>
            </tr>
          </table>
          <hr>
          <h4>Mid-Range</h4>
          <table>
            <tr>
              <th align="left">Attempts</th>
              <td>{{this._shotStatistics.midrange.attempts}}</td>
            </tr>
            <tr>
              <th align="left">Made</th>
              <td>{{this._shotStatistics.midrange.made}}</td>
            </tr>
            <tr>
              <th align="left">Freq</th>
              <td>{{this._shotStatistics.midrange.frequency.toFixed(2)}}</td>
            </tr>
            <tr>
              <th align="left">PPS</th>
              <td>{{this._shotStatistics.midrange.pointsPerShot.toFixed(2)}}</td>
            </tr>
          </table>
          <hr>
          <h4>At Rim</h4>
          <table>
            <tr>
              <th align="left">Attempts</th>
              <td>{{this._shotStatistics.rim.attempts}}</td>
            </tr>
            <tr>
              <th align="left">Made</th>
              <td>{{this._shotStatistics.rim.made}}</td>
            </tr>
            <tr>
              <th align="left">Freq</th>
              <td>{{this._shotStatistics.rim.frequency.toFixed(2)}}</td>
            </tr>
            <tr>
              <th align="left">PPS</th>
              <td>{{this._shotStatistics.rim.pointsPerShot.toFixed(2)}}</td>
            </tr>
          </table>
        </div>
      </td>
    </table>
  `,
  styleUrls: ['../../css/general.css']
})
export class ShotStatsTotalsComponent {

  _shotStatistics: ShotStatisticsContainer;

  constructor(private store: Store<State>) {
  }

  @Input("stats")
  set source(stats: ShotStatisticsContainer) {
    this._shotStatistics = stats;
  }


}
