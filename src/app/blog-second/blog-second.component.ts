import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-blog-second',
  standalone: true,
  imports: [TagModule],
  templateUrl: './blog-second.component.html',
  styleUrl: './blog-second.component.scss',
})
export class BlogSecondComponent {}
