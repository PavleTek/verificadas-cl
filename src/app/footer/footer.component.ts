import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  baseAccessUrl = environment.baseAccessUrl;
  currentYear: number = 2024;
  description: string =
    'Verificadas.cl es un sitio web de modalidad unicamente publicitaria\n Toda Escort y/o Masajista presente en la pagina fue verificada presencialmente y es mayor de 18 años';
  constructor(private router: Router) {}

  goToAbout() {
    this.router.navigate(['/about']);
  }

  goToBlog() {
    this.router.navigate(['/blog']);
  }

  goToPricing() {
    this.router.navigate(['/prices']);
  }

  goToAnounce() {
    this.router.navigate(['/anunciate']);
  }

  goToContact() {
    this.router.navigate(['/contact']);
  }

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
  }
}
