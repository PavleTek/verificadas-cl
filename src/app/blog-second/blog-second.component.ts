import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-second',
  standalone: true,
  imports: [TagModule],
  templateUrl: './blog-second.component.html',
  styleUrl: './blog-second.component.scss',
})
export class BlogSecondComponent {
  constructor(private titleService: Title, private metaService: Meta) {}
  ngOnInit() {
    this.titleService.setTitle('Escorts Santiago Oriente');
    this.metaService.updateTag({
      name: 'description',
      content: 'Descubre por qué Santiago Oriente es la zona más premium de Santiago, destacando por su exclusividad y servicios de alta calidad.',
    });
    this.metaService.updateTag({
      name: 'description',
      content: 'Explora cómo las escorts verificadas ofrecen mayor seguridad y confianza, gracias a un riguroso proceso de verificación.',
    });
  }
}
