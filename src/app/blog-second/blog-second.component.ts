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
    this.titleService.setTitle('Seguridad en escorts');
    this.metaService.updateTag({
      name: 'description',
      content: 'Explora cómo las escorts verificadas ofrecen mayor seguridad y confianza, gracias a un riguroso proceso de verificación.',
    });
  }
}
