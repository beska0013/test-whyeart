import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-run-image-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './run-image-modal.component.html',
  styleUrls: ['./run-image-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RunImageModalComponent {
    @Input() mediaUrl: string | null | undefined;
    @Output() onClose = new EventEmitter<void>();

    modalHideState = false;

    onCloseClick = () => {
      this.modalHideState = true;
      setTimeout(() => this.onClose.emit(),500);
    }
}
