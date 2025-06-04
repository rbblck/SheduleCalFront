import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysOffListComponent } from './days-off-list.component';

describe('DaysOffListComponent', () => {
  let component: DaysOffListComponent;
  let fixture: ComponentFixture<DaysOffListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DaysOffListComponent]
    });
    fixture = TestBed.createComponent(DaysOffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
