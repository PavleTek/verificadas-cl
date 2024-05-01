import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSecondComponent } from './blog-second.component';

describe('BlogSecondComponent', () => {
  let component: BlogSecondComponent;
  let fixture: ComponentFixture<BlogSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogSecondComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
