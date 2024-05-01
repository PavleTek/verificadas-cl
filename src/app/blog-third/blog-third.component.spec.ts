import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogThirdComponent } from './blog-third.component';

describe('BlogThirdComponent', () => {
  let component: BlogThirdComponent;
  let fixture: ComponentFixture<BlogThirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogThirdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
