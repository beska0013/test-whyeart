import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {environment} from "../../../../../../environments/environment";
import {EMPTY, map, Observable, Subscription, switchMap, tap} from "rxjs";
import {FirebaseService} from "../../../../../utils/firebase/firebase.service";
import {CrudService} from "../../../../../utils/crud/crud.service";
import {saveAs} from "file-saver";
import {Router} from "@angular/router";

@Component({
  selector: 'app-exp-by-id-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exp-by-id-ui.component.html',
  styleUrls: ['./exp-by-id-ui.component.scss']
})
export class ExpByIdUiComponent {
  constructor(
    private srvFirebase: FirebaseService,
    private srvCrud: CrudService,
    private route: Router
  ) {}

  @Input() data: any;
  @Output() cardClickOutput = new EventEmitter()

  mediaUrl = (mediaUrl: string):string => `${environment.runs_endpoint}/${this.data.id}/file?file_name=${mediaUrl}`;

  mediaUrlExist = (mediaUrl: string|undefined|null):boolean => {
    return !!mediaUrl;
  }

  onCardClick(mediaUrl: string|undefined|null) {
    return this.cardClickOutput.emit(mediaUrl as string);
  }

  downloadSurvey():Subscription {
    return this.getRunSurvey().pipe(
      tap((data:any) => {
        console.log(data);
        this.saveAsCSV(data.survey_results_1, 'survey_results_1.csv');
        this.saveAsJSON(data.survey_results_2, 'survey_results_2.json');
        return EMPTY
      })
    ).subscribe()
  }

  getExperimentDesign(){
    this.downloadSurvey();
    return this.srvFirebase.getExperimentById(this.data.id)
      .pipe(
        tap(data =>{
          this.saveAsCSV(data.at(-1).experiment_results, 'experiment_results.csv');
          this.saveAsJSON(data.at(-1).experiment_information.survey_choices, 'survey_choices.json');
          return EMPTY
        })
      )
      .subscribe()
  }

  sendSurveyToShinyApp(){
    // console.log(this.route);
    return this.route.navigate(['cabinet/shinyApp'])
  }

  private getRunSurvey():Observable<any> {
    const pathExist = !!this.data.summary['Survey Results_1']?.path && !!this.data.summary['Survey Results_2']?.path;
    console.log(pathExist);
    return this.srvCrud.httpGet(`${environment.runs_endpoint}/${this.data.id}/file?file_name=${this.data.summary['Survey Results_1']?.path}`)
      .pipe(
        switchMap(res1 => this.srvCrud.httpGet(`${environment.runs_endpoint}/${this.data.id}/file?file_name=${this.data.summary['Survey Results_2']?.path}`)
          .pipe(
            map(res2 => ({
              survey_results_1: res1,
              survey_results_2: res2
            })),
          ))
      )
  }

  private saveAsCSV(data:any, filename:string):void {
    //const csv = data['columns'].join(',') + '\n' + data.data.map((row: any[]) => row.join(',')).join('\n');
    saveAs(new Blob( [data], {type: 'text/csv;charset=utf-8'}), filename);
  }

  private saveAsJSON(survey_results:any, filename:string):void {
    const json = JSON.stringify(survey_results);
    saveAs(new Blob( [json], {type: 'application/json;charset=utf-8'}), filename);
  }
}
