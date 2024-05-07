import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  constructor(private titleService: Title, private metaService: Meta) {}
  ngOnInit() {
    this.titleService.setTitle('Blog Escorts Veririficadas');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Explora el mundo de las escorts verificadas con nuestro blog. Consejos, experiencias y todo lo que necesitas saber para encuentros seguros y memorables.',
    });
  }
}
