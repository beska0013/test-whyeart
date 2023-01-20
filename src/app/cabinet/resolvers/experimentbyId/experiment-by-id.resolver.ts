import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {map} from 'rxjs';
import {CrudService} from "../../../utils/crud/crud.service";
import {environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ExperimentByIdResolver implements Resolve<any> {
  constructor(private srvCrud: CrudService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const link = `${environment.runs_endpoint}/${route.params['id']}`;
    return this.srvCrud.httpGet(link).pipe(
      map((data:any) => {
        console.log(data);
        data.run_details.configs.experiments = this.checkValidExpArray(data.run_details.configs.experiments);
        return data.run_details
      })
    );
  }

  private checkValidExpArray(exp:any[]){
   return exp.map((item: any) => {
      let hasKeys = Object.keys(item).length <= 1;
      return hasKeys ? item[Object.keys(item)[0]] : item;
    })
  }

}

