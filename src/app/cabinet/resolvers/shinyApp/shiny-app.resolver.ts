import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';

import {CrudService} from "../../../utils/crud/crud.service";
import {combineLatest, EMPTY, map, switchMap} from "rxjs";
import {environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ShinyAppResolver implements Resolve<any> {

  constructor(
    private srvCrud: CrudService,
    private papa: Papa,
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.getDataFromWanDb(route)
  }

  private getMappingAnndJson(surveyResults:any, surveyChoises:any){
    console.log(surveyResults);
    console.log(surveyChoises);
    surveyResults.columns[0]='';
    const csv = this.papa.unparse({fields: surveyResults.columns, data: surveyResults.data});
    const mapJson = JSON.stringify(surveyChoises);

    return  {csv, mapJson}
  }

  private getDataFromWanDb(route: ActivatedRouteSnapshot){
    const expId = route.params['expId'];
    const runId = route.params['runId'];
    const artifact_link = `${environment.runs_endpoint}/artifact`;
    return this.srvCrud.getRunById(runId)
      .pipe(
        map((run:any) => run.run_details.configs.experiments.find((exp: { id: any; }) => exp.id === expId)),
        switchMap(exp => {
          // console.log(exp);
          const csvLink = exp.artifacts[2][Object.keys(exp.artifacts[2])[0]];
          const mapJsonLink = exp.artifacts[1][Object.keys(exp.artifacts[1])[0]];
          return combineLatest([
            this.srvCrud.httpGet(`${artifact_link}/${csvLink}`),
            this.srvCrud.httpGet(`${artifact_link}/${mapJsonLink}`),
          ]).pipe(
             map(([surveyResults, surveyChoises]) => this.getMappingAnndJson( surveyResults, surveyChoises))
          )
        })
      )
  }




}
