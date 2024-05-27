import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysWateredComponent } from './days-watered.component';

describe('DaysWateredComponent', () => {
  let component: DaysWateredComponent;
  let fixture: ComponentFixture<DaysWateredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaysWateredComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DaysWateredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
