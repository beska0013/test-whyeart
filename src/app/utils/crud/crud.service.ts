import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor( private http: HttpClient) { }


  httpPost = (path:string, body:any, header: any) => this.http.post(path, body, header)

  httpGet = (path:string) => this.http.get(path);

  httpGetFile = (path:string, type:any) => this.http.get(path);

  getRunById(id:string){
    const link = `${environment.runs_endpoint}/${id}`;
    return this.httpGet(link)
  }
}
