import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {CrudService} from "../../../utils/crud/crud.service";
import {BehaviorSubject, EMPTY, map, Observable, Subject, Subscription, switchMap, tap} from "rxjs";
import {saveAs} from "file-saver";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FirebaseService} from "../../../utils/firebase/firebase.service";
import {RunImageModalComponent} from "./component-ui/run-image-modal/run-image-modal.component";
import {ExpByIdUiComponent} from "./component-ui/exp-by-id-ui/exp-by-id-ui.component";
import {SearchUiComponent} from "./component-ui/search-ui/search-ui.component";

@Component({
  selector: 'app-experiment-by-id',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, RunImageModalComponent, ExpByIdUiComponent, SearchUiComponent],
  templateUrl: './run-by-id.component.html',
  styleUrls: ['./run-by-id.component.scss']
})
export class RunByIdComponent implements OnInit, AfterViewInit {

  constructor(
    private activeRoute: ActivatedRoute,
    private srvFirebase: FirebaseService,
    private srvCrud: CrudService,
  ) {
    this.expdata[this.current_index].active.next(true);
  }
  run_btnState:boolean = true;
  audit_btnState:boolean = true;
  data = this.activeRoute.snapshot.data['run'];
  expdata = this.data['configs']['experiments'].map((item: any) => ({...item, active:new Subject()}));
  $url = new BehaviorSubject<string| undefined>(undefined);
  current_index = 0


  // private getRunSurvey():Observable<any> {
  //    const pathExist = !!this.data.summary['Survey Results_1'].path && !!this.data.summary['Survey Results_2'].path;
  //   console.log(pathExist);
  //   return this.srvCrud.httpGet(`${environment.runs_endpoint}/${this.data.id}/file?file_name=${this.data.summary['Survey Results_1'].path}`)
  //     .pipe(
  //       switchMap(res1 => this.srvCrud.httpGet(`${environment.runs_endpoint}/${this.data.id}/file?file_name=${this.data.summary['Survey Results_2'].path}`)
  //         .pipe(
  //           map(res2 => ({
  //             survey_results_1: res1,
  //             survey_results_2: res2
  //           })),
  //         ))
  //     )
  // }
  // private saveAsCSV(data:any, filename:string):void {
  //   //const csv = data['columns'].join(',') + '\n' + data.data.map((row: any[]) => row.join(',')).join('\n');
  //   saveAs(new Blob( [data], {type: 'text/csv;charset=utf-8'}), filename);
  // }
  private saveAsJSON(survey_results:any, filename:string):void {
    const json = JSON.stringify(survey_results);
    saveAs(new Blob( [json], {type: 'application/json;charset=utf-8'}), filename);
  }

  onExperimentChoose(index: number){
    this.expdata[this.current_index].active.next(false);
    this.expdata[index].active.next(true);
    this.current_index = index;
    console.log(this.expdata);

  }

  // const choselLiEl = event.currentTarget as HTMLLIElement;
  // choselLiEl.classList.add('active_exp');
  // console.log(index);
  // console.log(this.expdata[index]);
  // this.expdata[index].active.next(true);

  onItemChoose(id:string){
    const link = `${environment.runs_endpoint}/${id}`;
    return this.srvCrud.httpGet(link).pipe(
      map((data:any) => ({id: id, ...data['run_details']})),
      tap(res => this.data = res)
    ).subscribe()
  }


  onCardClick(mediaUrl: string|undefined|null):void {
    this.$url.next(mediaUrl as string);
  }


  // downloadSurvey():Subscription {
  //   return this.getRunSurvey().pipe(
  //     tap((data:any) => {
  //       console.log(data);
  //       this.saveAsCSV(data.survey_results_1, 'survey_results_1.csv');
  //       this.saveAsJSON(data.survey_results_2, 'survey_results_2.json');
  //       return EMPTY
  //     })
  //   ).subscribe()
  // }

  // sendSurveyToShinyApp(){
  //   // console.log(this.route);
  //   return this.route.navigate(['cabinet/shinyApp'])
  // }

  onSendReqClick(){
    return this.srvCrud.httpGetFile('../assets/test/1-survey_results.csv',{ responseType: 'blob' })
      .pipe(
        switchMap((csvBlob: any) =>
          this.srvCrud.httpGetFile('../assets/test/test.json',{ responseType: 'blob' })
            .pipe(
              tap((jsonBlob:any) =>{
                const csvFile = new File([csvBlob], 'csv-file.csv', { type: 'text/csv' });
                const jsonFile = new File([jsonBlob], 'json-file.json', { type: 'application/json' });
                this.sendReq(csvFile, jsonFile).pipe(
                  tap(res => {
                    console.log(res)
                    return res
                  })
                )
              })
            )
          )
      ).subscribe()
  }

  private sendReq(csvFile: File, jsonFile: File){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const formData = new FormData();
    formData.append('csv', csvFile);
    formData.append('json', jsonFile);
    return this.srvCrud.httpPost('https://datamotusproject.shinyapps.io/Conjoint_App/', formData, httpOptions)

  }


  // getExperimentDesign(){
  //   this.downloadSurvey();
  //   return this.srvFirebase.getExperimentById(this.data.id)
  //     .pipe(
  //       tap(data =>{
  //         this.saveAsCSV(data.at(-1).experiment_results, 'experiment_results.csv');
  //         this.saveAsJSON(data.at(-1).experiment_information.survey_choices, 'survey_choices.json');
  //         return EMPTY
  //       })
  //     )
  //     .subscribe()
  // }

  onModalCloseClisk(){
    this.$url.next(undefined);
  }

  ngOnInit(): void {
    console.log(this.data);


   //  this.downloadSurvey()

  }

  ngAfterViewInit(): void {
   // this.onExperimentChoose(0)
    this.expdata[this.current_index].active.next(true);
  }





}
