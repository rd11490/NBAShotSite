import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../app.state";
import {ZonedShot} from "../../models/shots.models";
import * as customShots from "../../utils/constants";
import * as d3Select from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Color from 'd3-scale-chromatic';


@Component({
  selector: 'frequency-shot-chart',
  template: `
    <svg class="shot-chart" width="750" height="705"></svg>
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

  private clearShots = (): void => {
    this.svg.selectAll("#SHOT").remove()
  };

  private drawText = (x:number, y:number, shot: ZonedShot): void => {
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

    var text = this.svg.
    append('text')
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
      .attr("x", this.scaleXPoint(x+(rectWidth/2)))
      .attr("text-anchor", "middle")
      .text(function() {return "PPS: " + pps + " Freq: " + (100.0*shot.frequency).toFixed(2) + "%"});

    text.append("tspan")
      .attr("dy", "1.25em")
      .attr("x", this.scaleXPoint(x+(rectWidth/2)))
      .attr("text-anchor", "middle")
      .text(function() {return "Shots: " + shot.shotAttempts.toLocaleString() + " Made: " + shot.shotMade.toLocaleString()});
  };

  private drawCornerText = (x:number, y:number, shot: ZonedShot): void => {
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

    var text = this.svg.
    append('text')
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
      .attr("x", this.scaleXPoint(x+(rectWidth/2)))
      .attr("text-anchor", "middle")
      .text(function() {return "PPS: " + pps });

    text.append("tspan")
      .attr("dy", "1.25em")
      .attr("x", this.scaleXPoint(x+(rectWidth/2)))
      .attr("text-anchor", "middle")
      .text(function() {return "Freq: " + (100.0*shot.frequency).toFixed(2) + "%"});


    text.append("tspan")
      .attr("dy", "1.5em")
      .attr("x", this.scaleXPoint(x+(rectWidth/2)))
      .attr("text-anchor", "middle")
      .text(function() {return "Shots: " + shot.shotAttempts.toLocaleString()});

    text.append("tspan")
      .attr("dy", "1.75em")
      .attr("x", this.scaleXPoint(x+(rectWidth/2)))
      .attr("text-anchor", "middle")
      .text(function() {return "Made: " + shot.shotMade.toLocaleString()});

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
      .attr("fill", this.frequencyToColor(shot))
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
      .attr("fill", this.frequencyToColor(shot))
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
      .attr("fill", this.frequencyToColor(shot))
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
      .attr("fill", this.frequencyToColor(shot))
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

  private frequencyToColor = (shot: ZonedShot): string => {
    if (shot != null && shot.shotAttempts > 0) {
      return d3Color.interpolateRdYlGn((shot.shotMade * shot.shotValue) / shot.shotAttempts / 2);
    }
    return 'none'
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
    this.svg = d3Select.select('svg');
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

}
