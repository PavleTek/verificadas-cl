import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnounceComponent } from './anounce.component';

describe('AnounceComponent', () => {
  let component: AnounceComponent;
  let fixture: ComponentFixture<AnounceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnounceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
