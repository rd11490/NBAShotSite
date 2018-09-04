import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../app.state";
import {RawShot} from "../../models/shots.models";
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';


@Component({
  selector: 'raw-shot-chart',
  template: `    
    <svg width="600"></svg>
  `,
  styleUrls: ['../../css/general.css']
})
export class RawShotChartComponent implements OnInit {

  private shots: Array<RawShot>;
  private svg: any;     // TODO replace all `any` by the right type
  private width: number;
  private height: number;

  constructor(private store: Store<State>) {

  }

  ngOnInit(): void {
    this.initSvg();
    this.drawCourt();
  }


  @Input("shots")
  set shots(shots: Array<RawShot>) {
    this.shots = shots;
    this.drawShots()
  }

  private drawShots = (): void => {

  };

  private initSvg = (): void => {
    this.svg = d3.select('svg');
    this.width = +this.svg.attr('width');
    this.height = +this.svg.attr('height');


  };

}
