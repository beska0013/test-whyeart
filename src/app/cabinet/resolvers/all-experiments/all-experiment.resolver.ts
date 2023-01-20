import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {map, of, switchMap} from 'rxjs';
import {CrudService} from "../../../utils/crud/crud.service";
import {MeilisearchService} from "../../../components/meilisearch/meilisearch.service";


@Injectable({
  providedIn: 'root'
})
export class AllExperimentResolver implements Resolve<any> {
  constructor(
    private crud: CrudService,
    private meiliSrv: MeilisearchService
  ) {}
  resolve(route: ActivatedRouteSnapshot) {
    return this.meiliSrv.getAllExperiments('experiments')
      .pipe(
        switchMap(data => route.params['id'] ?
          this.crud.getRunById(route.params['id']).pipe(
            map((exp:any) => ({exp: data.results, myExp: exp.run_details}))
          ) : of(({exp: data.results, myExp: null}))
        ))
  }
}
