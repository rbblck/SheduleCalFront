import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOffCalendarComponent } from './day-off-calendar.component';

describe('DayOffCalendarComponent', () => {
  let component: DayOffCalendarComponent;
  let fixture: ComponentFixture<DayOffCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayOffCalendarComponent]
    });
    fixture = TestBed.createComponent(DayOffCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
