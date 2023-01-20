import {AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';
// import {Chart} from "chart.js/auto";

@Component({
  selector: 'app-horizontal-bar-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.scss']
})
export class HorizontalBarChartComponent implements OnInit,AfterViewInit, AfterContentInit {

  constructor() { }
  @ViewChild('horizontal_bar') barChart!:ElementRef;


  chartEl!:Chart;


  createChart(){
    this.chartEl = new Chart(this.barChart.nativeElement, {
    type: 'bar',
    data: {
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [
        {
          label: "Population (millions)",
          //backgroundColor: ["#ff0000", "#8e5ea2","#3cba9f","#454545","#c45850"],
          data: [2478,5267,734,784,433]
        }
      ]
    },
    options: {
      indexAxis: 'y',
      plugins:{
        legend: { display: false },
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        }
      },

    }
  });

}

  ngOnInit(): void {



  }

  ngAfterViewInit(): void {
    setTimeout(() => this.createChart(), 100)
    //console.log(this.barChart.nativeElement);

  }

  ngAfterContentInit(): void {


  }

}
