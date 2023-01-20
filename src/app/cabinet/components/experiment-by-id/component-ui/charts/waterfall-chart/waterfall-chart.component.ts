import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// import {Chart} from "chart.js/auto";
import {CommonModule} from "@angular/common";
import {UtilsService} from "../../../../../../utils/utils.service";
import { Chart } from 'chart.js';


@Component({
  selector: 'app-waterfall-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './waterfall-chart.component.html',
  styleUrls: ['./waterfall-chart.component.scss']
})
export class WaterfallChartComponent implements OnInit,AfterViewInit {


  constructor(private utilSrv: UtilsService) { }
  @ViewChild('waterfall_chart') barChart!:ElementRef;

   DATA_COUNT = 7;
   NUMBER_CFG = {count: this.DATA_COUNT, min: -100, max: 100};
   labels = this.utilSrv.months({count: 7});
   data = {
    labels: this.labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: this.utilSrv.numbers(this.NUMBER_CFG),
        borderColor: this.utilSrv.CHART_COLORS.red,
        backgroundColor: this.utilSrv.transparentize(this.utilSrv.CHART_COLORS.red, 0.5),
      },
      {
        label: 'Dataset 2',
        data: this.utilSrv.numbers(this.NUMBER_CFG),
        borderColor: this.utilSrv.CHART_COLORS.blue,
        backgroundColor: this.utilSrv.transparentize(this.utilSrv.CHART_COLORS.blue, 0.5),
      }
    ]
  };
   chartEl!:Chart;



  createChart(){
    this.chartEl = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: this.data,
      options: {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Attribute Levels Part Worth'
          }
        },
      }
    });
  }

  ngOnInit(): void {
    //this.createChart();
  }

  ngAfterViewInit(): void {
    // this.createChart();
    setTimeout(() => this.createChart(), 100)
  }



}
