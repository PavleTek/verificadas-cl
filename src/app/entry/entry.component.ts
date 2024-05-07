import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class EntryComponent {
  userPassword: string = '';
  constructor(private router: Router) {}
  confirmEntry(): void {
    localStorage.setItem('ageVerified', 'true');
    this.router.navigate(['/escorts']);
  }
}
