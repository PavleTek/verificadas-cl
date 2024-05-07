import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-one',
  standalone: true,
  imports: [TagModule],
  templateUrl: './blog-one.component.html',
  styleUrl: './blog-one.component.scss',
})
export class BlogOneComponent {
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle('Primer Encuentro con una Escort');
    this.metaService.updateTag({
      name: 'description',
      content: 'Conoce los mejores consejos para un primer encuentro con una escort y asegura una experiencia inolvidable.',
    });
  }
}
