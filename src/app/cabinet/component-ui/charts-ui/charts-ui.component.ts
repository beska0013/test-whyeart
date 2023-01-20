import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
  WaterfallChartComponent
} from "../../components/experiment-by-id/component-ui/charts/waterfall-chart/waterfall-chart.component";
import {
    HorizontalBarChartComponent
} from "../../components/experiment-by-id/component-ui/charts/horizontal-bar-chart/horizontal-bar-chart.component";

@Component({
  selector: 'app-charts-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './charts-ui.component.html',
  styleUrls: ['./charts-ui.component.scss']
})
export class ChartsUiComponent implements OnInit {

  constructor() { }

  @Input() type!:string;

  ngOnInit(): void {
  }

}
