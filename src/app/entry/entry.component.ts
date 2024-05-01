import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class EntryComponent {
  @Output() entryConfirmedEvent = new EventEmitter<boolean>();
  userPassword: string = '';
  confirmEntry() {
    this.entryConfirmedEvent.emit();
  }
}
