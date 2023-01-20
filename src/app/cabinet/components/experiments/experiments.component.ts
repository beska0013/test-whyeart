import {AfterViewInit, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CrudService} from "../../../utils/crud/crud.service";
import {MeilisearchComponent} from "../../../components/meilisearch/meilisearch.component";
import {ExpListUiComponent} from "./components-ui/exp-list-ui/exp-list-ui.component";
import {delay, EMPTY, of, Subject, tap} from "rxjs";
import {NotificationModalComponent} from "../../../components-ui/notification-modal/notification-modal.component";
import {RuningExpComponent} from "./components-ui/runing-exp/runing-exp.component";






@Component({
  selector: 'app-experiments',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MeilisearchComponent,
    ExpListUiComponent,
    NotificationModalComponent,
    RuningExpComponent,
  ],
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.scss']
})
export class ExperimentsComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute,
    private srvCrud: CrudService,
    @Inject(PLATFORM_ID) private platformId: any,
    ) { }
  iframeData$ = new Subject();
  runingExp = this.activeRoute.snapshot.data['data'].myExp
  experiment_list = this.activeRoute.snapshot.data['data'].exp.length > 0 ? of(this.activeRoute.snapshot.data['data'].exp) : EMPTY ;
  $notification = new Subject();

  experimentsSearchOpt = {
    attributesToHighlight: ["*"],
    limit: 1000,
    // offset: 0,
  }
  expIndexName = 'experiments';

  onMeiliOutput(event: any){
    //console.log(event);
    this.experiment_list = event.length > 0 ? of(event) : EMPTY ;
  }

  onCopyOutput(event: string) {
    this.openNotificationModal(event);

  }

  onModalClose(){
    this.$notification.next(null)
  }


  private openNotificationModal(message: string) {
    this.$notification.next(message);
  }

  ngOnInit(): void {
    //console.log(this.runingExp);
  }

}

