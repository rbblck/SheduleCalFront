import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';
import { DatepickerPopupComponent } from '../datepicker-popup/datepicker-popup.component';
import { OffDates } from 'src/app/interface/offDates';
import { PostService } from 'src/app/service/post.service';
import { ScheduleRequest } from 'src/app/interface/scheduleRequest';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-day-off-controls',
  templateUrl: './day-off-controls.component.html',
  styleUrls: ['./day-off-controls.component.css'],
  standalone: true,
  imports: [CommonModule, DatepickerPopupComponent, FormsModule],
})

@Injectable()
export class DayOffControlsComponent {

  scheduleRequest: ScheduleRequest =  {
    'workingDays': 24,
    'daysOff': 12,
    'startDate': '15/06/2025'
  }

  currentMonth!: number; // 0-11
  startYear!: number;
  endYear!: number;
  years: number[] = [];
  offDates: OffDates[] = [];

  @Input() currentYear!: number;
  @Input() displayedMonth: string = 'January';

  @Output() offDatesChange = new EventEmitter<OffDates[]>();
  @Output() resetOffDates = new EventEmitter<OffDates[]>();
  @Output() monthChange = new EventEmitter<number>();
  @Output() yearChange = new EventEmitter<number>();

  constructor(
    private postService: PostService
  ) {
    this.onInit();
  }

  onInit() {
    this.currentYear = new Date().getFullYear();
    const startYear = this.currentYear - 5;
    const endYear = this.currentYear + 10;

    for (let year = startYear; year <= endYear; year++) {
      this.years.push(year);
    }
  }

  getOffDates() {
    this.offDates = []; // Reset offDates before fetching new ones
        
    this.postService.create(this.scheduleRequest).subscribe(
      {
        next: (responce) => {
          (responce as OffDates[]).forEach((dateRangeObj) => {
            this.offDates.push(dateRangeObj);
          });
          this.offDatesChange.emit(this.offDates); // Emit the updated offDates
        },
        error(error: any) {
          console.error('an error occurred...');
        },
        complete: () => {
          // this.generateCalendar();
        }
      }
    );
  }

  reset() {
    this.offDates = [];
    this.resetOffDates.emit(this.offDates); // Emit an event to reset off dates in the parent component
  }

  changeMonth(month: string) {
    const months = this.getMonths();
    this.currentMonth = months.indexOf(month);
    this.monthChange.emit(this.currentMonth); // Emit the new month to the parent component
  }

  changeYear(year: number) {
    this.currentYear = year;
    this.yearChange.emit(this.currentYear); // Emit the new year to the parent component
  }

  getMonths() {
    return [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  }

  getYears() {
    const years = [];
    const startYear = this.currentYear - 2;
    for (let i = 0; i < 10; i++) {
      years.push(startYear + i);
    }
    return years;
  }

  getOffDays() :number[] {
    return [
      10, 12, 14, 21
    ];
  }

  getWorkingDays() : number[] {
    return [
      20, 21, 24
    ];
  }
}

