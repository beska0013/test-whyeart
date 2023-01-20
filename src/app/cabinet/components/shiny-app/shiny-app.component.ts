import {AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {CrudService} from "../../../utils/crud/crud.service";
import {environment} from "../../../../environments/environment";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-shiny-app',
  standalone: true,
  imports: [CommonModule],
  template: `<iframe #shinyFrame [src]="link" frameborder="0"></iframe>`,
  styles: [`
    @import '../../../../assets/scss/link';

    iframe {
      @include square(100%)
    }
  `]
})
export class ShinyAppComponent implements  AfterViewInit{

  @ViewChild('shinyFrame') shinyFrame: ElementRef | undefined;

  constructor(
    private srvCrud: CrudService,
    @Inject(PLATFORM_ID) private platformId: any,
    private sanitizer:DomSanitizer,
    private activeRoute: ActivatedRoute,
    ) {}

  link = this.sanitizer.bypassSecurityTrustResourceUrl(environment.shinyApp_link);

 private onFrameLoad() {
   const data = this.activeRoute.snapshot.data['data'];
   const jsonDataTransfer = new DataTransfer();
   const csvDataTransfer = new DataTransfer();

   const jsonfile = new File([data.mapJson], 'mapping.json', { type: 'json' });
   const csvfile = new File([data.csv], 'result.csv', { type: 'text/csv' });

   jsonDataTransfer.items.add(jsonfile);
   csvDataTransfer.items.add( csvfile);
   this.saveAsCSV(data.csv, 'result.csv');
   this.saveAsJSON(data.mapJson, 'mapping.json');

   window.addEventListener('message', (event: any) => {
     event.source.postMessage({
       message: {
         csv : csvDataTransfer.files,
         json: jsonDataTransfer.files
       }
     }, '*');
   })
 }


  private saveAsCSV(data:any, filename:string):void {
    //const csv = data['columns'].join(',') + '\n' + data.data.map((row: any[]) => row.join(',')).join('\n');
    saveAs(new Blob( [data], {type: 'text/csv;charset=utf-8'}), filename);
  }
  private saveAsJSON(survey_results:any, filename:string):void {
    // const json = JSON.stringify(survey_results);
    saveAs(new Blob( [survey_results], {type: 'application/json;charset=utf-8'}), filename);
  }

 ngAfterViewInit(): void {
    if(isPlatformBrowser(this.platformId)){
      console.log('downloading data',this.activeRoute.snapshot.data['data']);
      this.onFrameLoad()
    }

  }


}
