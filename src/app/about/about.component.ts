import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  constructor(private titleService: Title, private metaService: Meta) {}
  ngOnInit() {
    this.titleService.setTitle('Verificadas.cl');
    this.metaService.updateTag({
      name: 'description',
      content: 'Acerca de verificadas CL, quienes somos, cual es nuestro objetivo en el mercado de escrots Premium en zonas premium',
    });
  }
}
