import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class EntryComponent {
  userPassword: string = '';
  constructor(private router: Router, private titleService: Title, private metaService: Meta) {}
  confirmEntry(): void {
    localStorage.setItem('ageVerified', 'true');
    this.router.navigate(['/escorts']);
  }
  ngOnInit() {
    this.titleService.setTitle('Confirmación de Edad - Verificadas.cl');
    this.metaService.updateTag({
      name: 'description',
      content: 'Verificación de edad requerida para ingresar a Verificadas.cl Confirme mayoría de edad para acceder de forma segura y discreta a nuestra plataforma',
    });
  }
}
