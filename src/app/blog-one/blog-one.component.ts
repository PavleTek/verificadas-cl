import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-blog-one',
  standalone: true,
  imports: [TagModule],
  templateUrl: './blog-one.component.html',
  styleUrl: './blog-one.component.scss',
})
export class BlogOneComponent {}
