import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../app.state";
import {RawShot} from "../../models/shots.models";
import * as d3 from 'd3';
import * as d3Select from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';


@Component({
  selector: 'raw-shot-chart',
  template: `
    <svg class="shot-chart" width="750" height="705"></svg>
  `,
  styleUrls: ['../../css/general.css']
})
export class RawShotsComponent implements OnInit {

  _shots: Array<RawShot> = [];
  private svg: any;
  private scaleXPoint: any;
  private scaleYPoint: any;
  private width: number;
  private height: number;

  constructor(private store: Store<State>) {

  }

  ngOnInit(): void {
    this.initSvg();
    this.drawCourt();
  }


  @Input("shots")
  set shots(shotInput: Array<RawShot>) {
    this._shots = shotInput;
    if (this.svg != null) {
      this.clearShots();
      this.drawShots();
    }
  }

  private clearShots = (): void => {
    this.svg.selectAll("#SHOT").remove()
  };


  private drawShots = (): void => {
    this.svg
      .selectAll("circle")
      .data(this._shots)
      .enter()
      .append("circle")
      .attr("cx", (shot) => {
        return this.scaleXPoint(shot.xCoordinate);
      })
      .attr("cy", (shot) => {
        return this.scaleYPoint(shot.yCoordinate);
      })
      .attr('r', this.scaleR(5))
      .attr('fill', this.madeToColor)
      .attr('id', "SHOT")
      //.on('mouseover', this.handleMouseOver)
      //.on('mouseout', this.handleMouseOut)

  };

  private madeToColor = (shot: RawShot): string => {
    if (shot.shotMadeFlag == 1) {
      return 'green';
    }
    return 'red';
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
  private handleMouseOver = (shot: RawShot, i: number): void => {  // Add interactivity

    this.svg
      .append("rect")
      .attr('id', "x" + shot.xCoordinate + "-" + shot.yCoordinate + "-" + i + "box")
      .attr("x", this.scaleXPoint(this.shitX(shot.xCoordinate)))
      .attr("y", this.scaleYPoint(this.shiftY(shot.yCoordinate)))
      .attr("width", this.scaleX(60))
      .attr("height", this.scaleY(50))
      .attr("fill", 'black')
      .attr("stroke", 'black');

    // Specify where to put label of text
    var text = this.svg
      .append("text")
      .attr('id', "x" + shot.xCoordinate + "-" + shot.yCoordinate + "-" + i)
      .attr('x', this.scaleXPoint(this.shiftXText(shot.xCoordinate)))
      .attr('y', this.scaleYPoint(this.shiftYText(shot.yCoordinate)))
      .attr('fill', 'white')
      .text(function () {
        return;  // Value of the text
      });

    text.append("tspan")
      .attr("dy", "0em")
      .attr("text-anchor", "middle")
      .attr("x", this.scaleXPoint(this.shiftXText(shot.xCoordinate)))
      .text(function() {return  shot.xCoordinate + ", " + shot.yCoordinate;});

  };

  private shitX = (x: number): number => {
    if ((x - 30) <= -250) {
      return x + 30
    } else if (x + 30 >= 250) {
      return x - 90
    }
    return x - 30
  };

  private shiftXText = (x: number): number => {
    if ((x - 30) <= -250) {
      return x + 60
    } else if (x + 30 >= 250) {
      return x - 60
    }
    return x
  };

  private shiftY = (y: number): number => {
    if ((y - 60) <= -47.5) {
      return y + 20
    }
    return y - 60
  };

  private shiftYText = (y: number): number => {
    if ((y - 60) <= -47.5) {
      return y + 40
    }
    return y - 40
  };

  private handleMouseOut = (shot: RawShot, i: number): void => {
    // Select text by id and then remove
    this.svg.select("#x" + shot.xCoordinate + "-" + shot.yCoordinate + "-" + i + "box").remove();  // Remove text location
    this.svg.select("#x" + shot.xCoordinate + "-" + shot.yCoordinate + "-" + i).remove();  // Remove text location
  };

}
