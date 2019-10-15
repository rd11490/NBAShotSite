import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../app.state";
import {ZonedShot} from "../../models/shots.models";
import * as customShots from "../../utils/constants";
import * as d3Select from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Color from 'd3-scale-chromatic';
import { saveAs } from 'file-saver';



@Component({
  selector: 'frequency-shot-chart',
  template: `
      <div>
          <button class="save" (click)="this.exportImage()">Save Image</button>
      </div>
      <div>
          <svg class="shot-chart" id="shot-chart" width="750" height="705"></svg>
      </div>
  `,
  styleUrls: ['../../css/general.css']
})
export class FrequencyShotsComponent implements OnInit {

  _shots: Array<ZonedShot> = [];
  svg: any;
  scaleXPoint: any;
  scaleYPoint: any;
  width: number;
  height: number;
  colorByFreq: boolean;
  invertColor: boolean;


  constructor(private store: Store<State>) {

  }

  ngOnInit(): void {
    this.initSvg();
    this.drawCourt();
  }


  @Input("shots")
  set shots(shotInput: Array<ZonedShot>) {
    this._shots = shotInput;
    if (this.svg != null) {
      this.clearShots();
      this.drawShots();
    }
  }

  @Input("color")
  set color(colorByFreq: boolean) {
    this.colorByFreq = colorByFreq;
    if (this.svg != null && this._shots != null && this._shots.length > 0) {
      this.clearShots();
      this.drawShots();
    }
  }

  @Input("invertColor")
  set invert(invert: boolean) {
    this.invertColor = invert;
    if (this.svg != null && this._shots != null && this._shots.length > 0) {
      this.clearShots();
      this.drawShots();
    }
  }

  private clearShots = (): void => {
    this.svg.selectAll("#SHOT").remove()
  };

  private drawText = (x: number, y: number, shot: ZonedShot): void => {
    const rectWidth = 80;
    const rectHeight = 20;
    this.svg
      .append("rect")
      .attr('x', this.scaleXPoint(x))
      .attr('y', this.scaleYPoint(y))
      .attr("width", this.scaleX(rectWidth))
      .attr("height", this.scaleY(rectHeight))
      .attr("fill", 'gray')
      .attr('id', "SHOT")
      .style("opacity", 1.0);

    var text = this.svg.append('text')
      .attr('x', this.scaleXPoint(x))
      .attr('y', this.scaleYPoint(y))
      .attr('fill', 'white')
      .style("font", "10px times")
      .attr('id', "SHOT")
      .text(function () {
        return;  // Value of the text
      });

    const pps = shot.shotAttempts == 0 ? "0.00" : (shot.shotValue * shot.shotMade / shot.shotAttempts).toFixed(2);

    text.append("tspan")
      .attr("dy", "1em")
      .attr("x", this.scaleXPoint(x + (rectWidth / 2)))
      .attr("text-anchor", "middle")
      .text(function () {
        return "PPS: " + pps + " Freq: " + (100.0 * shot.frequency).toFixed(2) + "%"
      });

    text.append("tspan")
      .attr("dy", "1.25em")
      .attr("x", this.scaleXPoint(x + (rectWidth / 2)))
      .attr("text-anchor", "middle")
      .text(function () {
        return "Shots: " + shot.shotAttempts.toLocaleString() + " Made: " + shot.shotMade.toLocaleString()
      });
  };

  private drawCornerText = (x: number, y: number, shot: ZonedShot): void => {
    const rectWidth = 40;
    const rectHeight = 40;
    this.svg
      .append("rect")
      .attr('x', this.scaleXPoint(x))
      .attr('y', this.scaleYPoint(y))
      .attr("width", this.scaleX(rectWidth))
      .attr("height", this.scaleY(rectHeight))
      .attr("fill", 'gray')
      .attr('id', "SHOT")
      .style("opacity", 1.0);

    var text = this.svg.append('text')
      .attr('x', this.scaleXPoint(x))
      .attr('y', this.scaleYPoint(y))
      .attr('fill', 'white')
      .style("font", "10px times")
      .attr('id', "SHOT")
      .text(function () {
        return;  // Value of the text
      });

    const pps = shot.shotAttempts == 0 ? "0.00" : (shot.shotValue * shot.shotMade / shot.shotAttempts).toFixed(2);

    text.append("tspan")
      .attr("dy", "1em")
      .attr("x", this.scaleXPoint(x + (rectWidth / 2)))
      .attr("text-anchor", "middle")
      .text(function () {
        return "PPS: " + pps
      });

    text.append("tspan")
      .attr("dy", "1.25em")
      .attr("x", this.scaleXPoint(x + (rectWidth / 2)))
      .attr("text-anchor", "middle")
      .text(function () {
        return "Freq: " + (100.0 * shot.frequency).toFixed(2) + "%"
      });


    text.append("tspan")
      .attr("dy", "1.5em")
      .attr("x", this.scaleXPoint(x + (rectWidth / 2)))
      .attr("text-anchor", "middle")
      .text(function () {
        return "Shots: " + shot.shotAttempts.toLocaleString()
      });

    text.append("tspan")
      .attr("dy", "1.75em")
      .attr("x", this.scaleXPoint(x + (rectWidth / 2)))
      .attr("text-anchor", "middle")
      .text(function () {
        return "Made: " + shot.shotMade.toLocaleString()
      });

  };

  private drawMidArc = (shot: ZonedShot, theta1: number, theta2: number, innerRad: number, outerRad: number): void => {
    const arc = d3Shape.arc()
      .innerRadius(this.scaleX(innerRad))
      .outerRadius(this.scaleX(outerRad))
      .startAngle(theta1 * (Math.PI / 180)) //converting from degs to radians
      .endAngle(theta2 * (Math.PI / 180)); //just radians

    // bouding
    this.svg
      .append("path")
      .attr("d", arc)
      .attr("fill", 'none')
      .attr('pointer-events', 'all')
      .attr('stroke', 'black')
      .style("opacity", 0.7)
      .attr('id', "SHOT")
      .attr("transform", "translate(" + this.scaleXPoint(0) + "," + this.scaleYPoint(0) + ")");

    // fill
    this.svg
      .append("path")
      .attr("d", arc)
      .attr("fill", this.chooseColor(shot))
      .attr('pointer-events', 'all')
      .attr('stroke', 'black')
      .style("opacity", 0.3)
      .attr('id', "SHOT")
      .attr("transform", "translate(" + this.scaleXPoint(0) + "," + this.scaleYPoint(0) + ")");
  };

  private drawRestricted = (shot: ZonedShot) => {
    //bounding
    this.svg
      .append("circle")
      .attr("cx", this.scaleXPoint(0))
      .attr("cy", this.scaleYPoint(0))
      .attr("r", this.scaleX(40))
      .attr("fill", 'none')
      .attr('pointer-events', 'all')
      .attr('stroke', 'black')
      .attr('id', "SHOT")
      .style("opacity", 0.7);

    //Fill
    this.svg
      .append("circle")
      .attr("cx", this.scaleXPoint(0))
      .attr("cy", this.scaleYPoint(0))
      .attr("r", this.scaleX(40))
      .attr("fill", this.chooseColor(shot))
      .attr('pointer-events', 'all')
      .attr('stroke', 'black')
      .attr('id', "SHOT")
      .style("opacity", 0.3);
  };

  private drawCorner = (shot: ZonedShot, start: number) => {
    this.svg
      .append("rect")
      .attr("x", this.scaleXPoint(start))
      .attr("y", this.scaleYPoint(-47.5))
      .attr("width", this.scaleX(30))
      .attr("height", this.scaleY(140))
      .attr("fill", 'none')
      .attr('stroke', 'black')
      .attr('id', "SHOT")
      .style("opacity", 0.7);

    // fill
    this.svg
      .append("rect")
      .attr("x", this.scaleXPoint(start))
      .attr("y", this.scaleYPoint(-47.5))
      .attr("width", this.scaleX(30))
      .attr("height", this.scaleY(140))
      .attr("fill", this.chooseColor(shot))
      .attr('stroke', 'black')
      .attr('id', "SHOT")
      .style("opacity", 0.3);
  };

  private drawCustom = (shot: ZonedShot, data) => {

    const adjusted = data.map(v => {
      const [i, j] = v;
      return [this.scaleXPoint(i), this.scaleYPoint(j)]
    });

    this.svg
      .datum(adjusted)
      .append("path")
      .attr("d", d3Shape.line())
      .attr("fill", 'none')
      .attr('stroke', 'black')
      .attr('id', "SHOT")
      .style("opacity", 0.7);

    this.svg
      .datum(adjusted)
      .append("path")
      .attr("d", d3Shape.line())
      .attr("fill", this.chooseColor(shot))
      .attr('stroke', 'red')
      .attr('id', "SHOT")
      .style("opacity", 0.3);
  };


  private drawShots = (): void => {

    const restricted = this._shots.find(shot => {
      return shot.bin == 'RestrictedArea';
    });

    const rightCorner = this._shots.find(shot => {
      return shot.bin == 'RightCorner';
    });

    const leftCorner = this._shots.find(shot => {
      return shot.bin == 'LeftCorner';
    });

    const rightBase11Ft = this._shots.find(shot => {
      return shot.bin == 'RightBaseline11FT';
    });

    const right11Ft = this._shots.find(shot => {
      return shot.bin == 'Right11FT';
    });

    const leftBase11Ft = this._shots.find(shot => {
      return shot.bin == 'LeftBaseline11FT';
    });

    const left11Ft = this._shots.find(shot => {
      return shot.bin == 'Left11FT';
    });

    const rightBase18Ft = this._shots.find(shot => {
      return shot.bin == 'RightBaseline18FT';
    });

    const right18Ft = this._shots.find(shot => {
      return shot.bin == 'Right18FT';
    });

    const leftBase18Ft = this._shots.find(shot => {
      return shot.bin == 'LeftBaseline18FT';
    });

    const left18Ft = this._shots.find(shot => {
      return shot.bin == 'Left18FT';
    });

    const rightBase23Ft = this._shots.find(shot => {
      return shot.bin == 'RightBaseline23FT';
    });

    const right23Ft = this._shots.find(shot => {
      return shot.bin == 'Right23FT';
    });

    const leftBase23Ft = this._shots.find(shot => {
      return shot.bin == 'LeftBaseline23FT';
    });

    const left23Ft = this._shots.find(shot => {
      return shot.bin == 'Left23FT';
    });

    const left27Ft = this._shots.find(shot => {
      return shot.bin == 'Left27FT';
    });

    const right27Ft = this._shots.find(shot => {
      return shot.bin == 'Right27FT';
    });

    const leftLongShot = this._shots.find(shot => {
      return shot.bin == 'LeftLong3';
    });

    const rightLongShot = this._shots.find(shot => {
      return shot.bin == 'RightLong3';
    });

    // Restricted
    this.drawRestricted(restricted);

    // 11 Ft
    this.drawMidArc(leftBase11Ft, 247, 360, 40, 110);
    this.drawMidArc(left11Ft, 180, 247, 40, 110);
    this.drawMidArc(right11Ft, 113, 180, 40, 110);
    this.drawMidArc(rightBase11Ft, 0, 113, 40, 110);


    // 18 Ft
    this.drawMidArc(leftBase18Ft, 247, 360, 110, 180);
    this.drawMidArc(left18Ft, 180, 247, 110, 180);
    this.drawMidArc(right18Ft, 113, 180, 110, 180);
    this.drawMidArc(rightBase18Ft, 0, 113, 110, 180);

    // 23 Ft
    this.drawCustom(leftBase23Ft, customShots.leftBase23);
    this.drawMidArc(left23Ft, 180, 247, 180, 238.5);
    this.drawMidArc(right23Ft, 113, 180, 180, 238.5);
    this.drawCustom(rightBase23Ft, customShots.rightBase23);


    // 3 Corners
    this.drawCorner(leftCorner, -250);
    this.drawCorner(rightCorner, 220);

    // 3 Pt Line
    this.drawCustom(left27Ft, customShots.left27);
    this.drawCustom(right27Ft, customShots.right27);
    this.drawCustom(leftLongShot, customShots.leftLong);
    this.drawCustom(rightLongShot, customShots.rightLong);

    //Labels:
    this.drawText(-40, -30, restricted);

    this.drawCornerText(-90, -35, leftBase11Ft);
    this.drawCornerText(-55, 45, left11Ft);
    this.drawCornerText(15, 45, right11Ft);
    this.drawCornerText(50, -35, rightBase11Ft);

    this.drawCornerText(-165, -25, leftBase18Ft);
    this.drawCornerText(-80, 105, left18Ft);
    this.drawCornerText(40, 105, right18Ft);
    this.drawCornerText(125, -25, rightBase18Ft);

    this.drawCornerText(-218, -40, leftBase23Ft);
    this.drawCornerText(-145, 145, left23Ft);
    this.drawCornerText(105, 145, right23Ft);
    this.drawCornerText(178, -40, rightBase23Ft);

    this.drawCornerText(-250, 25, leftCorner);
    this.drawCornerText(-155, 205, left27Ft);
    this.drawCornerText(115, 205, right27Ft);
    this.drawCornerText(210, 25, rightCorner);

    this.drawCornerText(-175, 260, leftLongShot);
    this.drawCornerText(135, 260, rightLongShot);

  };

  private chooseColor = (shot: ZonedShot): string => {
    if (this.colorByFreq) {
      return this.frequencyToColor(shot)
    } else {
      return this.ppsToColor(shot)
    }
  };

  private frequencyToColor = (shot: ZonedShot): string => {
    const freq = this.calculateFreq(shot);
    if (shot == null || shot.shotAttempts == 0) {
      return 'white'
    }

    switch (shot.bin) {
      case 'RestrictedArea' : {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(freq, 25.0, 35.0));
      }
      case 'Left11FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(freq, 4.0, 8.0));
      }
      case 'Right11FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(freq, 4.0, 8.0));
      }
      case 'Left18FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(freq, 2.0, 7.0));
      }
      case 'Right18FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(freq, 2.0, 7.0));
      }
      case 'Left23FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(freq, 1.0, 6.0));
      }
      case 'Right23FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(freq, 1.0, 6.0));
      }
      case 'LeftCorner': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(freq, 3.0, 6.0));
      }
      case 'RightCorner': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(freq, 3.0, 6.0));
      }
      case 'RightBaseline11FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(freq, 0.0, 3.0));
      }
      case 'LeftBaseline11FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(freq, 0.0, 3.0));
      }
      case 'RightBaseline18FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(freq, 0.0, 3.0));
      }
      case 'LeftBaseline18FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(freq, 0.0, 3.0));
      }
      case 'RightBaseline23FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(freq, 0.0, 1.0));
      }
      case 'LeftBaseline23FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(freq, 0.0, 1.0));
      }
      case 'Right27FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(freq, 5.0, 15.0));
      }
      case 'Left27FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(freq, 5.0, 15.0));
      }
      case 'RightLong3': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(freq, 1.0, 3.0));
      }
      case 'LeftLong3':
      default: {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(freq, 1.0, 3.0));
      }
    }
  };

  private normalizeWithRange = (value: number, min: number, max: number): number => {
    return this.invertColor ? 1.0 - (value - min) / (max - min) : (value - min) / (max - min)
  };

  private ppsToColor = (shot: ZonedShot): string => {
    const pps = this.calculatePPS(shot);
    if (shot == null || shot.shotAttempts == 0) {
      return 'white'
    }

    switch (shot.bin) {
      case 'RestrictedArea' : {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(pps, 1.0, 1.5));
      }
      case 'Left11FT':
      case 'Right11FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(pps, 0.75, 1.0));
      }
      case 'Left18FT':
      case 'Right18FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(pps, 0.75, 1.0));
      }
      case 'Left23FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(pps, 0.75, 1.0));
      }
      case 'Right23FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(pps, 0.75, 1.0));
      }
      case 'LeftCorner': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(pps, 1.0, 1.25));
      }
      case 'RightCorner': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(pps, 1.0, 1.25));
      }
      case 'RightBaseline11FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(pps, 0.5, 1.0));
      }
      case 'LeftBaseline11FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(pps, 0.5, 1.0));
      }
      case 'RightBaseline18FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(pps, 0.5, 1.0));
      }
      case 'LeftBaseline18FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(pps, 0.5, 1.0));
      }
      case 'RightBaseline23FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(pps, 0.5, 1.0));
      }
      case 'LeftBaseline23FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(pps, 0.5, 1.0));
      }
      case 'Right27FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(pps, .75, 1.25));
      }
      case 'Left27FT': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(pps, .75, 1.25));
      }
      case 'RightLong3': {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(pps, 0.5, 1.25));
      }
      case 'LeftLong3':
      default: {
        return d3Color.interpolateRdYlGn(this.normalizeWithRange(pps, 0.5, 1.25));
      }
    }
  };

  private calculateFreq = (shot: ZonedShot): number => {
    if (shot != null && shot.shotAttempts > 0) {
      return shot.frequency * 100
    }
    return 0.0
  };

  private calculatePPS = (shot: ZonedShot): number => {
    if (shot != null && shot.shotAttempts > 0) {
      return (shot.shotMade * shot.shotValue) / shot.shotAttempts
    }
    return 0.0
  };


  private drawCourt = (): void => {
    // Draw hoop
    this.svg
      .append("circle")
      .attr("cx", this.scaleXPoint(0))
      .attr("cy", this.scaleYPoint(0))
      .attr("r", this.scaleR(7.5))
      .attr("fill", 'none')
      .attr("stroke", 'black');

    // Draw backboard
    this.svg
      .append("line")
      .attr("x1", this.scaleXPoint(-30))
      .attr("x2", this.scaleXPoint(30))
      .attr("y1", this.scaleYPoint(-7.5))
      .attr("y2", this.scaleYPoint(-7.5))
      .attr("stroke", 'black');

    // Draw Paint
    this.svg
      .append("rect")
      .attr("x", this.scaleXPoint(-80))
      .attr("y", this.scaleYPoint(-47.5))
      .attr("width", this.scaleX(160))
      .attr("height", this.scaleY(190))
      .attr("fill", 'none')
      .attr("stroke", 'black');

    this.svg
      .append("rect")
      .attr("x", this.scaleXPoint(-60))
      .attr("y", this.scaleYPoint(-47.5))
      .attr("width", this.scaleX(120))
      .attr("height", this.scaleY(190))
      .attr("fill", 'none')
      .attr("stroke", 'black');


    const freeThrowArcTop = d3Shape.arc()
      .innerRadius(this.scaleX(60))
      .outerRadius(this.scaleX(60))
      .startAngle(90 * (Math.PI / 180)) //converting from degs to radians
      .endAngle(270 * (Math.PI / 180)); //just radians

    const freeThrowArcBottom = d3Shape.arc()
      .innerRadius(this.scaleX(60))
      .outerRadius(this.scaleX(60))
      .startAngle(-90 * (Math.PI / 180)) //converting from degs to radians
      .endAngle(90 * (Math.PI / 180)); //just radians

    this.svg
      .append("path")
      .attr("d", freeThrowArcTop)
      .attr("stroke", "black")
      .attr("transform", "translate(" + this.scaleXPoint(0) + "," + this.scaleYPoint(142.5) + ")");

    this.svg
      .append("path")
      .attr("d", freeThrowArcBottom)
      .attr("stroke", "black")
      .style("stroke-dasharray", ("24, 24"))
      .attr("transform", "translate(" + this.scaleXPoint(0) + "," + this.scaleYPoint(142.5) + ")");

    const restrictedZone = d3Shape.arc()
      .innerRadius(this.scaleX(40))
      .outerRadius(this.scaleX(40))
      .startAngle(90 * (Math.PI / 180)) //converting from degs to radians
      .endAngle(270 * (Math.PI / 180)); //just radians

    this.svg
      .append("path")
      .attr("d", restrictedZone)
      .attr("stroke", "black")
      .attr("transform", "translate(" + this.scaleXPoint(0) + "," + this.scaleYPoint(0) + ")");

    // Draw 3 Line
    this.svg
      .append("line")
      .attr("x1", this.scaleXPoint(-220))
      .attr("x2", this.scaleXPoint(-220))
      .attr("y1", this.scaleYPoint(-47.5))
      .attr("y2", this.scaleYPoint(92.5))
      .attr("stroke", 'black');

    this.svg
      .append("line")
      .attr("x1", this.scaleXPoint(220))
      .attr("x2", this.scaleXPoint(220))
      .attr("y1", this.scaleYPoint(-47.5))
      .attr("y2", this.scaleYPoint(92.5))
      .attr("stroke", 'black');

    const threePointArc = d3Shape.arc()
      .innerRadius(this.scaleX(238.25))
      .outerRadius(this.scaleX(238.25))
      .startAngle((22.5 + 90) * (Math.PI / 180)) //converting from degs to radians
      .endAngle((157.5 + 90) * (Math.PI / 180)); //just radians

    this.svg
      .append("path")
      .attr("d", threePointArc)
      .attr("stroke", "black")
      .attr("transform", "translate(" + this.scaleXPoint(0) + "," + this.scaleYPoint(0) + ")");

    // Center Court

    const centerCourtArcInner = d3Shape.arc()
      .innerRadius(this.scaleX(20))
      .outerRadius(this.scaleX(20))
      .startAngle(-90 * (Math.PI / 180)) //converting from degs to radians
      .endAngle(90 * (Math.PI / 180)); //just radians

    const centerCourtArcOuter = d3Shape.arc()
      .innerRadius(this.scaleX(60))
      .outerRadius(this.scaleX(60))
      .startAngle(-90 * (Math.PI / 180)) //converting from degs to radians
      .endAngle(90 * (Math.PI / 180)); //just radians

    this.svg
      .append("path")
      .attr("d", centerCourtArcInner)
      .attr("stroke", "black")
      .attr("transform", "translate(" + this.scaleXPoint(0) + "," + this.scaleYPoint(422.5) + ")");

    this.svg
      .append("path")
      .attr("d", centerCourtArcOuter)
      .attr("stroke", "black")
      .attr("transform", "translate(" + this.scaleXPoint(0) + "," + this.scaleYPoint(422.5) + ")");

    this.svg
      .append("rect")
      .attr("x", this.scaleXPoint(-250))
      .attr("y", this.scaleYPoint(-47.5))
      .attr("width", this.scaleX(500))
      .attr("height", this.scaleY(470))
      .attr("fill", 'none')
      .attr("stroke", 'black');
  };

  private scaleR = (radius: number): number => {
    return radius * (this.width / 470.0);
  };

  private scaleX = (radius: number): number => {
    return radius * (this.width / 500.0);
  };

  private scaleY = (radius: number): number => {
    return radius * (this.height / 470.0);
  };

  private initSvg = (): void => {
    this.svg = d3Select.select('#shot-chart');
    this.width = +this.svg.attr('width');
    this.height = +this.svg.attr('height');
    this.scaleXPoint = d3Scale.scaleLinear().domain([-250, 250]).range([0, this.width]);
    this.scaleYPoint = d3Scale.scaleLinear().domain([-47.5, 422.5]).range([0, this.height]);
  };

  // Create Event Handlers for mouse
  private handleMouseOver = (shot: ZonedShot, x: number, y: number): void => {  // Add interactivity
    // console.log("Mouseover");
    // Specify where to put label of text
    this.svg
      .append("text")
      .attr('id', "x" + shot.bin)
      .attr('x', this.scaleXPoint(x))
      .attr('y', this.scaleYPoint(y))
      .text(function () {
        return [shot.shotValue, shot.shotAttempts, shot.shotMade]//["Shot Value: " + shot.shotValue + "\nShots Attempted: " + shot.shotAttempts + "\nShots Made: "+ shot.shotAttempts + "\nShot Frequency: " + shot.frequency];  // Value of the text
      });
  };

  private handleMouseOut = (shot: ZonedShot): void => {
    // console.log("MouseOut")

    // Select text by id and then remove
    this.svg.select("#x" + shot.bin).remove();  // Remove text location
  };

  getSVGString = ( svgNode ) => {
    svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
    var cssStyleText = getCSSStyles( svgNode );
    appendCSS( cssStyleText, svgNode );

    var serializer = new XMLSerializer();
    var svgString = serializer.serializeToString(svgNode);
    svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
    svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

    return svgString;

    function getCSSStyles( parentElement ) {
      var selectorTextArr = [];

      // Add Parent element Id and Classes to the list
      selectorTextArr.push( '#'+parentElement.id );
      for (var c = 0; c < parentElement.classList.length; c++)
        if ( !contains('.'+parentElement.classList[c], selectorTextArr) )
          selectorTextArr.push( '.'+parentElement.classList[c] );

      // Add Children element Ids and Classes to the list
      var nodes = parentElement.getElementsByTagName("*");
      for (var i = 0; i < nodes.length; i++) {
        var id = nodes[i].id;
        if ( !contains('#'+id, selectorTextArr) )
          selectorTextArr.push( '#'+id );

        var classes = nodes[i].classList;
        for (var c = 0; c < classes.length; c++)
          if ( !contains('.'+classes[c], selectorTextArr) )
            selectorTextArr.push( '.'+classes[c] );
      }

      // Extract CSS Rules
      var extractedCSSText = "";
      for (var i = 0; i < document.styleSheets.length; i++) {
        var s = <CSSStyleSheet>document.styleSheets[i];

        try {
          if(!s.cssRules) continue;
        } catch( e ) {
          if(e.name !== 'SecurityError') throw e; // for Firefox
          continue;
        }

        var cssRules = s.cssRules;
        for (var r = 0; r < cssRules.length; r++) {
          if ( contains( (<CSSStyleRule>cssRules[r]).selectorText, selectorTextArr ) )
            extractedCSSText += cssRules[r].cssText;
        }
      }


      return extractedCSSText;

      function contains(str,arr) {
        return arr.indexOf(str) !== -1;
      }

    }

    function appendCSS( cssText, element ) {
      var styleElement = document.createElement("style");
      styleElement.setAttribute("type","text/css");
      styleElement.innerHTML = cssText;
      var refNode = element.hasChildNodes() ? element.children[0] : null;
      element.insertBefore( styleElement, refNode );
    }
  }

  exportImage = () => {
    var svgString = this.getSVGString(this.svg.node());
    this.svgString2Image( svgString, 2*this.width, 2*this.height, 'png', save ); // passes Blob and filesize String to the callback

    function save( dataBlob, filesize ){
      saveAs( dataBlob, 'ShotChart.png' ); // FileSaver.js function
    }
  };


  svgString2Image = ( svgString, width, height, format, callback ) => {
    var format = format ? format : 'png';

    var imgsrc = 'data:image/svg+xml;base64,'+ btoa( unescape( encodeURIComponent( svgString ) ) ); // Convert SVG string to data URL

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    var image = new Image();
    image.onload = function() {
      context.clearRect ( 0, 0, width, height );
      context.drawImage(image, 0, 0, width, height);

      canvas.toBlob( function(blob: Blob) {
        var filesize = Math.round( blob.size/1024 ) + ' KB';
        if ( callback ) callback( blob, filesize );
      });


    };

    image.src = imgsrc;
  }

}
