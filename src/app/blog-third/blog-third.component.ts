import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-third',
  standalone: true,
  imports: [TagModule],
  templateUrl: './blog-third.component.html',
  styleUrl: './blog-third.component.scss',
})
export class BlogThirdComponent {
  constructor(private titleService: Title, private metaService: Meta) {}
  ngOnInit() {
    this.titleService.setTitle('Seguridad en escorts');
    this.metaService.updateTag({
      name: 'description',
      content: 'Explora cómo las escorts verificadas ofrecen mayor seguridad y confianza, gracias a un riguroso proceso de verificación.',
    });
  }
}
