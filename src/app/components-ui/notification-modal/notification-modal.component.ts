import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-notification-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NotificationModalComponent implements  OnChanges {
constructor(private cdr: ChangeDetectorRef ) { }

  totalAniationTime = 2500;
  showTime = this.totalAniationTime * 0.8;
  closeTime = this.totalAniationTime - this.showTime;

  @Input() message: any;
  @Output() close = new EventEmitter();

  state = false
  private closeModal(){
    this.state = false;
    this.cdr.markForCheck();
    setTimeout(() => this.close.emit(),  this.closeTime)
  }

  private openModal(){
    this.state = true;
    setTimeout(() => this.closeModal(), this.showTime)
  }



  ngOnChanges(changes: SimpleChanges): void {
    changes['message'] ? this.openModal() : null;

  }
}
