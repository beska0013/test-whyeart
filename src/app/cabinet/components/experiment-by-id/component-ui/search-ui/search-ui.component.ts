import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MeilisearchComponent} from "../../../../../components/meilisearch/meilisearch.component";
import {EMPTY, Subject, tap} from "rxjs";

@Component({
  selector: 'app-search-ui',
  standalone: true,
  imports: [CommonModule, MeilisearchComponent],
  templateUrl: './search-ui.component.html',
  styleUrls: ['./search-ui.component.scss']
})
export class SearchUiComponent {

  @Output() chosenItem = new EventEmitter();

  private $searchStr = new Subject<any>();
          $searchRes = new Subject<any>();

  onChoose(itemId: string, title: string) {
    this.$searchRes.next([]);
    return this.chosenItem.emit(itemId);
  }



  onMeiliOutput(data:any){
    return this.$searchStr.pipe(
      tap( str => !!str ? this.$searchRes.next(data) : this.$searchRes.next([]))
    ).subscribe();
  }

  onSearchStrChange(str:string){
    return this.$searchStr.next(str);
  }

}
