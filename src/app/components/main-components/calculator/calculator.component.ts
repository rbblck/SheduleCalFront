import { Component } from '@angular/core';
import { ScheduleRequest } from 'src/app/interface/scheduleRequest';
import { PostService } from 'src/app/service/post.service';
import { OffDates } from 'src/app/interface/offDates';
import { DaysOffListComponent } from "../../standalone-components/days-off-list/days-off-list.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DayOffCalendarComponent } from "../../standalone-components/day-off-calendar/day-off-calendar.component";
import { DayOffControlsComponent } from "../../standalone-components/day-off-controls/day-off-controls.component";

@Component({
  selector: 'app-calculator',
  standalone: true,
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    DaysOffListComponent,
    DayOffCalendarComponent,
    DayOffControlsComponent
  ],
})

export class CalculatorComponent {

  scheduleRequest: ScheduleRequest =  {
    'workingDays': 24,
    'daysOff': 12,
    'startDate': '15/06/2025'
  }

  currentMonth: number = 0;
  currentYear: number = 0;
  // workDays: number;
  // offDays: number;
  // weeks: any[][] = [];
  offDates: OffDates[] = [];
  // dateModel: string | undefined;

  constructor(
      private postService: PostService
  ) { 
    this.onInit();
  }

  onInit() {
    const today = new Date();
    this.currentMonth = today.getMonth(); // 0-11
    this.currentYear = today.getFullYear();
  }

  offDatesChange(event: any) {
    this.offDates = event;
  }

  updateOffDates(dates: OffDates[]) {
    this.offDates = dates;
  }

  changeMonth(monthIndex: number) {
    this.currentMonth = monthIndex;
  }

  changeYear(year: number) {
    this.currentYear = year;
  }

  // onDateChanged(dateModel: string) {
  //   this.dateModel = dateModel;
  //   this.scheduleRequest.startDate = this.dateModel;
  // }

//   setWorkingDays(event: any) {
//     this.workDays = event;
//     this.scheduleRequest.workingDays = this.getWorkingDays()[event];
//   }

//   setDaysOff(event: any) {
//     this.offDays = event;
//     this.scheduleRequest.daysOff = this.getOffDays()[event];
//   }

  // getOffDates(): void {

  //   this.offDates = []; // Reset offDates before fetching new ones
    
  //   this.postService.create(this.scheduleRequest).subscribe(
  //     {
  //       next: (responce) => {
  //         (responce as OffDates[]).forEach((dateRangeObj) => {
  //           this.offDates.push(dateRangeObj);
  //         });
  //       },
  //       error(error: any) {
  //         console.error('an error occurred...');
  //       },
  //       complete: () => {
  //         // this.generateCalendar();
  //       }
  //     }
  //   );
  // }

  reset() {
    this.offDates = [];
  }

  getMonths() {
    return [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  }

  

  // isDateInRange(
  //   dateStr: string,
  //   startDateStr: string,
  //   endDateStr: string
  // ): boolean {
  
  //   const date = this.parseDate(dateStr);
  //   const startDate = this.parseDate(startDateStr);
  //   const endDate = this.parseDate(endDateStr);
  
  //   // Check if date is within range (inclusive)
  //   return date >= startDate && date <= endDate;
  // }

//   // Helper function to parse "dd/mm/yyyy" into a Date object
//   parseDate(dateString: string): Date {
//     const [day, month, year] = dateString.split('/').map(Number);
//     // Note: In JavaScript Date, months are 0-based
//     return new Date(year, month - 1, day);
//   }

  // generateCalendar() {
  //   this.weeks = [];
  //   const firstDay = new Date(this.year, this.month, 1);
  //   const lastDay = new Date(this.year, this.month + 1, 0); // last day of month
  //   const startDay = firstDay.getDay(); // 0 (Sun) to 6 (Sat)

  //   let currentDate = new Date(this.year, this.month, 1 - startDay);
  //   for (let week = 0; week < 6; week++) {
  //     const weekDays = [];
  //     for (let day = 0; day < 7; day++) {
  //       weekDays.push(new Date(currentDate));
  //       currentDate.setDate(currentDate.getDate() + 1);
  //     }
  //     this.weeks.push(weekDays);
  //   }

  //   this.tidyUpMonthArray();
  // }

  // tidyUpMonthArray() {

  //   let tempWeeks: any[][] = [];

  //   for (let x = 0; x < this.weeks.length; x++) {
  //     let wrongMonth: number = 0;

  //     for (let y = 0; y < this.weeks[x].length; y++) {
  //       if (this.weeks[x][y].getMonth() != this.month) {
  //         wrongMonth++;
  //       }
  //     }
      
  //     if (wrongMonth != 7) {
  //       tempWeeks.push(this.weeks[x])
  //     }
  //   }

  //   this.weeks = tempWeeks;
  // }

//   onMonthChange(event: any) {
//     this.month = +event.target.value;
//     this.generateCalendar();
//   }

//   onYearChange(event: any) {
//     this.year = +event.target.value;
//     this.generateCalendar();
//   }

  
}
