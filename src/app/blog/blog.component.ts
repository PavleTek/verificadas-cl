import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { MainService } from '../main.service';
import { CommonModule } from '@angular/common';
import { Blog } from '../types';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  blogs: Blog[] = [];
  constructor(private titleService: Title, private metaService: Meta, private mainService: MainService) {}

  async getAllBlogs() {
    const response = await this.mainService.getAllBlogs();
    if (response.status === 200) {
      this.blogs = response.data;
    }
  }

  ngOnInit() {
    this.getAllBlogs();
    this.titleService.setTitle('Blog Escorts Veririficadas');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Explora el mundo de las escorts verificadas con nuestro blog. Consejos, experiencias y todo lo que necesitas saber para encuentros seguros y memorables.',
    });
  }
}
