import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerPopupComponent } from './datepicker-popup.component';

describe('DatepickerPopupComponent', () => {
  let component: DatepickerPopupComponent;
  let fixture: ComponentFixture<DatepickerPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerPopupComponent]
    });
    fixture = TestBed.createComponent(DatepickerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
