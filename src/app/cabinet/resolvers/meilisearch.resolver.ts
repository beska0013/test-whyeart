import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {MeilisearchService} from "../../components/meilisearch/meilisearch.service";

@Injectable({
  providedIn: 'root'
})
export class MeilisearchResolver implements Resolve<any> {
  constructor(private meiliSrv: MeilisearchService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.meiliSrv.initExperimentsDocs();
  }
}
