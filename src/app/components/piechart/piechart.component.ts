import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as D3 from "d3";
import IData from "../../models/IDATA.interface";
import { PiedataService } from "../../services/piedata.service";

@Component({
  selector: 'piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  @ViewChild("containerPieChart") element: ElementRef;

  private host: D3.Selection;
  private svg: D3.Selection;
  private width: number;
  private height: number;
  private radius: number;
  private htmlElement: HTMLElement;
  private pieData:IData[];

  constructor(private piedataService:PiedataService) { }

  ngOnInit() {
     
  }

  ngAfterViewInit() {
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.htmlElement);
    this.piedataService.$data.subscribe(data => {
            this.pieData = data;
            this.setup();
            this.buildSVG();
            this.buildPie();
        });
}

private setup(): void {
    this.width = 250;
    this.height = 250;
    this.radius = Math.min(this.width, this.height) / 2;
}

private buildSVG(): void {
    this.host.html("");
    this.svg = this.host.append("svg")
        .attr("viewBox", `0 0 ${this.width} ${this.height}`)
        .append("g")
        .attr("transform", `translate(${this.width / 2},${this.height / 2})`);
}

private buildPie(): void {
    let pie = D3.layout.pie();
    let values = this.pieData.map(data => data.value);
    let arcSelection = this.svg.selectAll(".arc")
        .data(pie(values))
        .enter()
        .append("g")
        .attr("class", "arc");

    this.populatePie(arcSelection);
}

private populatePie(arcSelection: D3.Selection<D3.layout.pie.Arc>): void {
  let innerRadius = this.radius - 50;
  let outerRadius = this.radius - 10;
  let pieColor = D3.scale.category20c();
  let arc = D3.svg.arc<D3.layout.pie.Arc>()
      .outerRadius(outerRadius);
  arcSelection.append("path")
      .attr("d", arc)
      .attr("fill", (datum, index) => {
          return pieColor(this.pieData[index].label);
      });

  arcSelection.append("text")
      .attr("transform", (datum: any) => {
          datum.innerRadius = 0;
          datum.outerRadius = outerRadius;
          return "translate(" + arc.centroid(datum) + ")";
      })
      .text((datum, index) => this.pieData[index].label)
      .style("text-anchor", "middle");
}

}
