import { Injectable } from '@angular/core';
import {Index, MeiliSearch} from "meilisearch";
import {defer, EMPTY, filter, map, Observable, switchMap, tap} from "rxjs";
import {CrudService} from "../../utils/crud/crud.service";
import {environment} from "../../../environments/environment";
import {FirebaseService} from "../../utils/firebase/firebase.service";
import {HttpHeaders} from "@angular/common/http";

type meiliDoc = {
  indexName:string;
  data:any[];
}

@Injectable({
  providedIn: 'root'
})
export class MeilisearchService {

  constructor(
    private crud: CrudService,
  ) {
    this.client = new MeiliSearch({
      host: environment.meilisearch_endpoint,
      apiKey: environment.MEILISEARCH_API_KEY,
    });
  }

  private client: MeiliSearch;

  public searchIndex(indexName:string, str: string | null | undefined, search_options:any){
    console.log(search_options);
    const index = this.getIndex(indexName);
    return defer(async () => await index?.search(str, search_options))  as unknown as Observable<any>;
  }

  public initExperimentsDocs(){
    const indexName = 'experiments';
    //return this.client.deleteIndex(indexName)
    return this.crud.httpGet(`${environment.runs_endpoint}`)
        .pipe(
          map((data: any) => this.transformRunsToExperiments(data)),
          switchMap( data => this.initMeiliDoc({indexName: indexName, data: data as any[]})
          )
        )
  }

  public getAllExperiments(indexName:string){
    const index = this.getIndex(indexName);
    return defer(async () => await index?.getDocuments({ limit: 1000, offset: 0}))  as unknown as Observable<any>;
 }

  private getIndex(indexName:string){
    const client = new MeiliSearch({
      host: environment.meilisearch_endpoint,
      apiKey: environment.MEILISEARCH_API_KEY,
    })
    return this.client.index(indexName);
  }

  private transformRunsToExperiments(data: any){
    const expArr: any[] = [];
    data.runs
      .filter((item:  any[]) => (item[2] === 'finished' || item[2] === 'running') && !!item[3].experiments && item[3].experiments.length > 0 )
      .map((run: any[]) => ({run_state: run[2], ...run[3]}))
      .forEach((run: { experiments: any[]; run_state: any; wandb_id: any; wandb_name: any; }) =>
        run.experiments.forEach((exp: any) => expArr.push({
          ...exp,
          run_state: run.run_state,
          run_id: run.wandb_id,
          run_name: run.wandb_name,
        })))
    return expArr.map(expItem => ({
      id: expItem.id,
      type: expItem.Experiment_Design.question_type,
      question: expItem.Question_Prompt,
      run_state: expItem.run_state,
      run_id: expItem.run_id,
      run_name: expItem.run_name,
      artifacts: expItem.artifacts,
      //survey_choices: !!expItem.Experiment_Information ? expItem.Experiment_Information.survey_choices : null,
    }))
  }

  private initMeiliDoc(arg: meiliDoc){
    const index = this.getIndex(arg.indexName);
    return defer(async () => await index?.addDocuments(arg.data)
    //   .then(() => index.updateSearchableAttributes([
    //   'question',
    //   'id'
    // ]))
    )  as unknown as Observable<any>;
  }

}

//exampale
// client.index('movies').updateSettings({
//   searchableAttributes: [
//     'title',
//     'overview',
//     'genres'
//   ]
// })
