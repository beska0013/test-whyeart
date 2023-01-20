import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { CommonModule } from "@angular/common";

import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MeilisearchService} from "./meilisearch.service";
import {map, switchMap, tap} from "rxjs";



@Component({
  selector: 'app-meilisearch',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
       <form [formGroup]="meilisearchFm">
        <input type="text" formControlName="searchStr" [placeholder]="placeHolder">
      </form>
  `,
  styleUrls: ['./meilisearch.component.scss'],
  // providers: [MeilisearchService]
})
export class MeilisearchComponent implements OnInit {


  @Output() meiliOutput = new EventEmitter();
  @Output() searchStr = new EventEmitter();

  @Input() placeHolder = 'Search...';
  @Input() searchStral: string | undefined; //?
  @Input() searchIndexName: string | undefined;
  @Input() searchOptions: any;

  constructor(
    private meiliSrv: MeilisearchService
  ) {}

  meilisearchFm = new FormGroup({
    searchStr: new FormControl(''),
  })


  private searchStrVal(val: string){
      this.meilisearchFm.patchValue({searchStr: val});
  }

  private searchDoc(){
    return this.meilisearchFm.valueChanges
     .pipe(
        tap(res => this.searchStr.emit(res.searchStr)),
       switchMap( (res) => this.meiliSrv.searchIndex(this.searchIndexName as string, res.searchStr, this.searchOptions)
         .pipe(
           tap(res => {
             console.log(res);
             return this.meiliOutput.emit( res.hits.map( (hit: { id: any; _formatted: any; state: any; question:string; type:string;run_id:string }) => ({
               id: hit._formatted.id,
               question: hit._formatted.question,
               type: hit.type,
               run_id: hit.run_id,
               run_state: hit.state,
               origin:{
                 id: hit.id,
                 question: hit.question,
                 type: hit.type,
               }
             })))
           })
         )
       )).subscribe()
 }

  ngOnInit(): void {
    this.searchDoc();
  }


}
