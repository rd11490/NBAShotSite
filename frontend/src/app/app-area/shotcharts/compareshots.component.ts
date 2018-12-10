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
  selector: 'compare-shot-chart',
  template: `
    <svg class="shot-chart" width="750" height="705"></svg>
  `,
  styleUrls: ['../../css/general.css']
})
export class CompareShotsComponent implements OnInit {

  _shots1: Array<ZonedShot> = [];
  _shots2: Array<ZonedShot> = [];
  svg: any;
  scaleXPoint: any;
  scaleYPoint: any;
  width: number;
  height: number;
  colorByFreq: boolean;

  constructor(private store: Store<State>) {

  }

  ngOnInit(): void {
    this.initSvg();
    this.drawCourt();
  }


  @Input("shots1")
  set shots1(shotInput: Array<ZonedShot>) {
    this._shots1 = shotInput;
    if (this.svg != null && this._shots1 != null && this._shots2 != null && this._shots1.length > 0 && this._shots2.length > 0) {
      this.clearShots();
      this.drawShots();
    }
  }

  @Input("shots2")
  set shots2(shotInput: Array<ZonedShot>) {
    this._shots2 = shotInput;
    if (this.svg != null && this._shots1 != null && this._shots2 != null && this._shots1.length > 0 && this._shots2.length > 0) {
      this.clearShots();
      this.drawShots();
    }
  }

  @Input("color")
  set color(colorByFreq: boolean) {
    this.colorByFreq = colorByFreq;
    if (this.svg != null && this._shots1 != null && this._shots2 != null && this._shots1.length > 0 && this._shots2.length > 0) {
      this.clearShots();
      this.drawShots();
    }
  }

  private clearShots = (): void => {
    this.svg.selectAll("#SHOT").remove()
  };

  private drawText = (x:number, y:number, shot1: ZonedShot, shot2: ZonedShot): void => {
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

    const pps1 = shot1.shotAttempts == 0 ? "0.00" : (shot1.shotValue * shot1.shotMade / shot1.shotAttempts).toFixed(2);
    const freq1 = (100.0*shot1.frequency).toFixed(2);
    const pps2 = shot2.shotAttempts == 0 ? "0.00" : (shot2.shotValue * shot2.shotMade / shot2.shotAttempts).toFixed(2);
    const freq2 = (100.0*shot2.frequency).toFixed(2);


    text.append("tspan")
      .attr("dy", "1em")
      .attr("x", this.scaleXPoint(x+(rectWidth/2)))
      .attr("text-anchor", "middle")
      .text(function() {return "PPS1: " + pps1 + " Freq1: " + freq1 + "%"});

    text.append("tspan")
      .attr("dy", "1.25em")
      .attr("x", this.scaleXPoint(x+(rectWidth/2)))
      .attr("text-anchor", "middle")
      .text(function() {return "PPS2: " + pps2 + " Freq2: " + freq2 + "%"});
  };

  private drawCornerText = (x:number, y:number, shot1: ZonedShot, shot2: ZonedShot): void => {
    const rectWidth = 45;
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

    const pps1 = shot1.shotAttempts == 0 ? "0.00" : (shot1.shotValue * shot1.shotMade / shot1.shotAttempts).toFixed(2);
    const pps2 = shot2.shotAttempts == 0 ? "0.00" : (shot2.shotValue * shot2.shotMade / shot2.shotAttempts).toFixed(2);

    const freq1 = (100.0*shot1.frequency).toFixed(2);
    const freq2 = (100.0*shot2.frequency).toFixed(2);



    text.append("tspan")
      .attr("dy", "1.25em")
      .attr("x", this.scaleXPoint(x+(rectWidth/2)))
      .attr("text-anchor", "middle")
      .text(function() {return "PPS1: " + pps1 });

    text.append("tspan")
      .attr("dy", "1.25em")
      .attr("x", this.scaleXPoint(x+(rectWidth/2)))
      .attr("text-anchor", "middle")
      .text(function() {return "PPS2: " + pps2 });

    text.append("tspan")
      .attr("dy", "1.25em")
      .attr("x", this.scaleXPoint(x+(rectWidth/2)))
      .attr("text-anchor", "middle")
      .text(function() {return "Freq1: " + freq1 + "%"});

    text.append("tspan")
      .attr("dy", "1.25em")
      .attr("x", this.scaleXPoint(x+(rectWidth/2)))
      .attr("text-anchor", "middle")
      .text(function() {return "Freq2: " + freq2 + "%"});

  };

  private drawMidArc = (shot1: ZonedShot, shot2: ZonedShot, theta1: number, theta2: number, innerRad: number, outerRad: number): void => {
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
      .attr("fill", this.chooseColor(shot1, shot2))
      .attr('pointer-events', 'all')
      .attr('stroke', 'black')
      .style("opacity", 0.3)
      .attr('id', "SHOT")
      .attr("transform", "translate(" + this.scaleXPoint(0) + "," + this.scaleYPoint(0) + ")");
    };

  private drawRestricted = (shot1: ZonedShot, shot2: ZonedShot) => {
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
      .attr("fill", this.chooseColor(shot1, shot2))
      .attr('pointer-events', 'all')
      .attr('stroke', 'black')
      .attr('id', "SHOT")
      .style("opacity", 0.3);
  };

  private drawCorner = (shot1: ZonedShot, shot2: ZonedShot, start: number) => {
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
      .attr("fill", this.chooseColor(shot1, shot2))
      .attr('stroke', 'black')
      .attr('id', "SHOT")
      .style("opacity", 0.3);
  };

  private drawCustom = (shot1: ZonedShot, shot2: ZonedShot, data) => {

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
      .attr("fill", this.chooseColor(shot1, shot2))
      .attr('stroke', 'red')
      .attr('id', "SHOT")
      .style("opacity", 0.3);
  };


  private drawShots = (): void => {

    const restricted1 = this._shots1.find(shot => {
      return shot.bin == 'RestrictedArea';
    });
    const restricted2 = this._shots2.find(shot => {
      return shot.bin == 'RestrictedArea';
    });

    const rightCorner1 = this._shots1.find(shot => {
      return shot.bin == 'RightCorner';
    });
    const rightCorner2 = this._shots2.find(shot => {
      return shot.bin == 'RightCorner';
    });

    const leftCorner1 = this._shots1.find(shot => {
      return shot.bin == 'LeftCorner';
    });
    const leftCorner2 = this._shots2.find(shot => {
      return shot.bin == 'LeftCorner';
    });

    const rightBase11Ft1 = this._shots1.find(shot => {
      return shot.bin == 'RightBaseline11FT';
    });

    const rightBase11Ft2 = this._shots2.find(shot => {
      return shot.bin == 'RightBaseline11FT';
    });

    const right11Ft1 = this._shots1.find(shot => {
      return shot.bin == 'Right11FT';
    });

    const right11Ft2 = this._shots2.find(shot => {
      return shot.bin == 'Right11FT';
    });

    const leftBase11Ft1 = this._shots1.find(shot => {
      return shot.bin == 'LeftBaseline11FT';
    });
    const leftBase11Ft2 = this._shots2.find(shot => {
      return shot.bin == 'LeftBaseline11FT';
    });

    const left11Ft1 = this._shots1.find(shot => {
      return shot.bin == 'Left11FT';
    });

    const left11Ft2 = this._shots2.find(shot => {
      return shot.bin == 'Left11FT';
    });

    const rightBase18Ft1 = this._shots1.find(shot => {
      return shot.bin == 'RightBaseline18FT';
    });

    const rightBase18Ft2 = this._shots2.find(shot => {
      return shot.bin == 'RightBaseline18FT';
    });

    const right18Ft1 = this._shots1.find(shot => {
      return shot.bin == 'Right18FT';
    });
    const right18Ft2 = this._shots2.find(shot => {
      return shot.bin == 'Right18FT';
    });
    const leftBase18Ft1 = this._shots1.find(shot => {
      return shot.bin == 'LeftBaseline18FT';
    });
    const leftBase18Ft2 = this._shots2.find(shot => {
      return shot.bin == 'LeftBaseline18FT';
    });

    const left18Ft1 = this._shots1.find(shot => {
      return shot.bin == 'Left18FT';
    });
    const left18Ft2 = this._shots2.find(shot => {
      return shot.bin == 'Left18FT';
    });

    const rightBase23Ft1 = this._shots1.find(shot => {
      return shot.bin == 'RightBaseline23FT';
    });
    const rightBase23Ft2 = this._shots2.find(shot => {
      return shot.bin == 'RightBaseline23FT';
    });

    const right23Ft1 = this._shots1.find(shot => {
      return shot.bin == 'Right23FT';
    });
    const right23Ft2 = this._shots2.find(shot => {
      return shot.bin == 'Right23FT';
    });

    const leftBase23Ft1 = this._shots1.find(shot => {
      return shot.bin == 'LeftBaseline23FT';
    });
    const leftBase23Ft2 = this._shots2.find(shot => {
      return shot.bin == 'LeftBaseline23FT';
    });

    const left23Ft1 = this._shots1.find(shot => {
      return shot.bin == 'Left23FT';
    });
    const left23Ft2 = this._shots2.find(shot => {
      return shot.bin == 'Left23FT';
    });

    const left27Ft1 = this._shots1.find(shot => {
      return shot.bin == 'Left27FT';
    });
    const left27Ft2 = this._shots2.find(shot => {
      return shot.bin == 'Left27FT';
    });

    const right27Ft1 = this._shots1.find(shot => {
      return shot.bin == 'Right27FT';
    });
    const right27Ft2 = this._shots2.find(shot => {
      return shot.bin == 'Right27FT';
    });

    const leftLongShot1 = this._shots1.find(shot => {
      return shot.bin == 'LeftLong3';
    });

    const leftLongShot2 = this._shots2.find(shot => {
      return shot.bin == 'LeftLong3';
    });

    const rightLongShot1 = this._shots1.find(shot => {
      return shot.bin == 'RightLong3';
    });
    const rightLongShot2 = this._shots2.find(shot => {
      return shot.bin == 'RightLong3';
    });

    // Restricted
    this.drawRestricted(restricted1, restricted2);

    // 11 Ft
    this.drawMidArc(leftBase11Ft1, leftBase11Ft2, 247, 360, 40, 110);
    this.drawMidArc(left11Ft1, left11Ft2, 180, 247, 40, 110);
    this.drawMidArc(right11Ft1,right11Ft2, 113, 180, 40, 110);
    this.drawMidArc(rightBase11Ft1,rightBase11Ft2, 0, 113, 40, 110);


    // 18 Ft
    this.drawMidArc(leftBase18Ft1, leftBase18Ft2, 247, 360, 110, 180);
    this.drawMidArc(left18Ft1, left18Ft2, 180, 247, 110, 180);
    this.drawMidArc(right18Ft1, right18Ft2, 113, 180, 110, 180);
    this.drawMidArc(rightBase18Ft1, rightBase18Ft2, 0, 113, 110, 180);

    // 23 Ft
    this.drawCustom(leftBase23Ft1, leftBase23Ft2, customShots.leftBase23);
    this.drawMidArc(left23Ft1, left23Ft2, 180, 247, 180, 238.5);
    this.drawMidArc(right23Ft1, right23Ft2, 113, 180, 180, 238.5);
    this.drawCustom(rightBase23Ft1, rightBase23Ft2, customShots.rightBase23);


    // 3 Corners
    this.drawCorner(leftCorner1, leftCorner2, -250);
    this.drawCorner(rightCorner1, rightCorner2, 220);

    // 3 Pt Line
    this.drawCustom(left27Ft1, left27Ft2, customShots.left27);
    this.drawCustom(right27Ft1, right27Ft2, customShots.right27);
    this.drawCustom(leftLongShot1, leftLongShot2, customShots.leftLong);
    this.drawCustom(rightLongShot1, rightLongShot2, customShots.rightLong);

    //Labels:
    this.drawText(-40, -30, restricted1, restricted2);

    this.drawCornerText(-90, -35, leftBase11Ft1, leftBase11Ft2);
    this.drawCornerText(-55, 45, left11Ft1, left11Ft2);
    this.drawCornerText(15, 45, right11Ft1,right11Ft2);
    this.drawCornerText(50, -35, rightBase11Ft1,rightBase11Ft2);

    this.drawCornerText(-165, -25, leftBase18Ft1,leftBase18Ft2);
    this.drawCornerText(-80, 105, left18Ft1,left18Ft2);
    this.drawCornerText(40, 105, right18Ft1,right18Ft2);
    this.drawCornerText(125, -25, rightBase18Ft1,rightBase18Ft2);

    this.drawCornerText(-218, -40, leftBase23Ft1,leftBase23Ft2);
    this.drawCornerText(-145, 145, left23Ft1,left23Ft2);
    this.drawCornerText(105, 145, right23Ft1,right23Ft2);
    this.drawCornerText(178, -40, rightBase23Ft1,rightBase23Ft2);

    this.drawCornerText(-250, 25, leftCorner1,leftCorner2);
    this.drawCornerText(-155, 205, left27Ft1,left27Ft2);
    this.drawCornerText(115, 205, right27Ft1,right27Ft2);
    this.drawCornerText(210, 25, rightCorner1,rightCorner2);

    this.drawCornerText(-175, 260, leftLongShot1,leftLongShot2);
    this.drawCornerText(135, 260, rightLongShot1,rightLongShot2);

  };

  private chooseColor = (shot1: ZonedShot,shot2: ZonedShot): string => {
    if (this.colorByFreq) {
      return this.frequencyToColor(shot1, shot2)
    } else {
      return this.ppsToColor(shot1, shot2)
    }
  };

  private frequencyToColor = (shot1: ZonedShot,shot2: ZonedShot): string => {
    const freq1 = this.calculateFreq(shot1);
    const freq2 = this.calculateFreq(shot2);

    const diff = 100 * (freq1 - freq2);
    return d3Color.interpolateRdYlGn((diff/5.0)+.5);
  };

  private ppsToColor = (shot1: ZonedShot,shot2: ZonedShot): string => {
    const freq1 = this.calculatePPS(shot1);
    const freq2 = this.calculatePPS(shot2);

    const diff = freq1 - freq2;

    return d3Color.interpolateRdYlGn(0.5 + (diff*2));
  };

  private calculateFreq = (shot: ZonedShot): number => {
    if (shot != null && shot.shotAttempts > 0) {
      return shot.frequency
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
