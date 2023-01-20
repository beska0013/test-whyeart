import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoaderComponent} from "../../../../../components-ui/loader/loader.component";

@Component({
  selector: 'app-runing-exp',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './runing-exp.component.html',
  styleUrls: ['./runing-exp.component.scss']
})
export class RuningExpComponent {

  @Input() runningExp: any;

  checkState(runState:string){
    return runState === 'running'
  }
}
