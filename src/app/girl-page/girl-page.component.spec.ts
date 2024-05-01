import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GirlPageComponent } from './girl-page.component';

describe('GirlPageComponent', () => {
  let component: GirlPageComponent;
  let fixture: ComponentFixture<GirlPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GirlPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GirlPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
