import {
  AfterViewInit,
  Component,
  EventEmitter, Inject,
  Input,
  OnChanges,
  OnInit,
  Output, PLATFORM_ID,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {ActivatedRoute, Route, Router, RouterLink} from "@angular/router";
import {LoaderComponent} from "../../../../../components-ui/loader/loader.component";

@Component({
  selector: 'app-exp-list-ui',
  standalone: true,
    imports: [CommonModule, RouterLink, LoaderComponent],
  templateUrl: './exp-list-ui.component.html',
  styleUrls: ['./exp-list-ui.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExpListUiComponent implements OnInit, AfterViewInit {

constructor(
  @Inject(PLATFORM_ID) private platformId: any,
) {}

  @Input() data: any;
  @Output() copyOutput = new EventEmitter();

  tagColorConf:any = {
    policy: new tagColorUI('#fa0808', '#FFFFFF'),
    product: new tagColorUI('#00d126', '#FFFFFF'),
    ['personal decision']: new tagColorUI('#5AC0E5', '#FFFFFF'),
    service: new tagColorUI('#888785', '#FFFFFF'),
  }

  trackby(index: number, item: any) {
    return item;
  }

  copyLink(run_id:string, exp_id:string) {
    const copy_url = `${window.location.origin}/experiments/shinyApp/${run_id}/${exp_id}`;
    this.copyOutput.emit(copy_url);
    return navigator.clipboard.writeText(copy_url);
  }

  onRunningExperiment(){
    this.data.forEach((item: { run_state: string; }) =>{
      if(item.run_state === 'running'){
        console.log(item);
      }
    })
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.onRunningExperiment()
  }




}

 class tagColorUI {
  bgColor: string;
  color: string;
      constructor(bg:string, color:string) {
        this.bgColor = bg;
        this.color = color;
      }
}


