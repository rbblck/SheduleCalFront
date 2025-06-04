import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOffControlsComponent } from './day-off-controls.component';

describe('DayOffControlsComponent', () => {
  let component: DayOffControlsComponent;
  let fixture: ComponentFixture<DayOffControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayOffControlsComponent]
    });
    fixture = TestBed.createComponent(DayOffControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
