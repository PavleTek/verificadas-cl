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
    this.titleService.setTitle('Escorts Santiago Oriente');
    this.metaService.updateTag({
      name: 'description',
      content: 'Descubre por qué Santiago Oriente es la zona más premium de Santiago, destacando por su exclusividad y servicios de alta calidad.',
    });
  }
}
