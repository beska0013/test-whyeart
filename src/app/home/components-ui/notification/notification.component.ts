import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p *ngIf="msg"
    [ngClass]="{
    'successMsg': !error,
    'errorMsg' : error
    }">
      {{msg}}
    </p>`,
  styleUrls: ['./notification.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit, OnChanges {

  constructor() { }

 @Input() notification_type: any;

 error: boolean | undefined;
 errorMsg = "Wrong email format, please try again";
 unknownError = "Something go wrong, please try again";
 successMsg = "Thanks for joining us. We'll get in touch soon.";
 msg: string | undefined






  ngOnInit(): void {
    //console.log(this.notification_type);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['notification_type']){
      this.onTypeChanges()
    }
  }

  onTypeChanges(){
    switch (this.notification_type){
      case 'success':
        this.error = false
        return this.msg = this.successMsg;
      case 'error':
        this.error = true;
        return this.msg = this.errorMsg;
      case 'unknown':
        this.error = true;
        return this.msg = this.unknownError;
    }
    return this.msg = undefined;
  }

}
