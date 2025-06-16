import { CommonModule } from '@angular/common';
import { Component, Injectable, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OffDates } from 'src/app/interface/offDates';
import { MONTHS, NUM_CAL_YEARS } from 'src/app/config/constants';

@Component({
  selector: 'app-day-off-calendar',
  templateUrl: './day-off-calendar.component.html',
  standalone: true,
  styleUrls: ['./day-off-calendar.component.css'],
  imports: [CommonModule, FormsModule],
})

@Injectable()
export class DayOffCalendarComponent {

  @Input() startDate: string = "";
  @Input() offDates: OffDates[] = [];

  currentMonth: number = 0;
  currentYear: number = 0;
  workDays = 0;
  offDays = 0;
  weeks: any[][] = [];
  displayedMonth: string = '';
  monthYearControl: number = 0; // 0 - month, 1 - year
  numberOfYesrsCalculated: number = NUM_CAL_YEARS; // Number of years to calculate from the start date

  constructor() {
    this.onInit();
  }

  onInit() {
  }
  
  ngOnChanges(changes: any) {

    if (this.startDate === '') {
      return;
    }

    const startDateObj = this.parseDate(this.startDate)
    this.currentMonth = startDateObj.getMonth(); // 0-11
    this.currentYear = startDateObj.getFullYear();

    if (this.offDates.length > 0) {
      this.generateCalendar();
    }
  }

  changeControl(control: number) {
    this.monthYearControl = control;
  }

  generateCalendar() {
    this.weeks = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0); // last day of month
    const startDay = firstDay.getDay(); // 0 (Sun) to 6 (Sat)

    let currentDate = new Date(this.currentYear, this.currentMonth, 1 - startDay);
    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        weekDays.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      this.weeks.push(weekDays);
    }

    this.tidyUpMonthArray();
  }

  tidyUpMonthArray() {
    let tempWeeks: any[][] = [];

    for (let x = 0; x < this.weeks.length; x++) {
      let wrongMonth: number = 0;

      for (let y = 0; y < this.weeks[x].length; y++) {
        if (this.weeks[x][y].getMonth() != this.currentMonth) {
          wrongMonth++;
        }
      }
      
      if (wrongMonth != 7) {
        tempWeeks.push(this.weeks[x])
      }
    }

    this.weeks = tempWeeks;
  }

  checkDateIsNotOff(date: Date) {
    // Check if the date is before the start date
    const startDateObj = this.parseDate(this.startDate)
    const endDateObj = this.parseDate(this.offDates[this.offDates.length - 1].endDate);
                          
    const lastDateToEndMonthObj = this.getLastDayOfMonth(endDateObj);

    let isNotOff: string = 'assets/icons/duty_day/icons_duty_day_50.png'; // Default icon for off day
    
    if (date < startDateObj || date > endDateObj) {
      isNotOff = 'assets/icons/not_calculated/not-calculated-48.png'; // Date is outside the range of the calendar
    }

    if (this.offDates.length != 0) {
      
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const year = date.getFullYear();
      const dateStr = day + '/' + month + '/' + year;
    
      this.offDates.forEach((oro) => {

        if (this.isDateInRange(dateStr, oro.startDate, oro.endDate)) {
          isNotOff = 'assets/icons/off_day/icons_off_day_64.png'; // Icon for duty day
        }
      });
    }

    return isNotOff;
  }

  // Helper function to parse "dd/mm/yyyy" into a Date object
  parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    
    // Note: In JavaScript Date, months are 0-based
    return new Date(year, month - 1, day);
  }

  isDateInRange(
    dateStr: string,
    startDateStr: string,
    endDateStr: string
  ): boolean {
    const date = this.parseDate(dateStr);
    const startDate = this.parseDate(startDateStr);
    const endDate = this.parseDate(endDateStr);
  
    // Check if date is within range (inclusive)
    return date >= startDate && date <= endDate;
  }

  getLastDayOfMonth(date: Date): Date {
    const year = date.getFullYear();
    const month = date.getMonth();
  
    // First day of next month
    const firstDayNextMonth = new Date(year, month + 1, 1);
    // Last day of current month
    const lastDay = new Date(firstDayNextMonth.getTime() - 1);
    // Set time to midnight
    lastDay.setHours(0, 0, 0, 0);
    return lastDay;
  }

  previousMonthYear() {
    // Create a date object based on the current year, month, and start date
    const date = new Date(this.currentYear, this.currentMonth, this.parseDate(this.startDate).getDate());
    const startDateObj = this.parseDate(this.startDate)

    // Decrement the month or year based on the control
    if (this.monthYearControl == 0) {
      date.setMonth(date.getMonth() - 1); // decrement by one month

      // Ensure the month does not go below the start date
      if (date >= startDateObj) {
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();
      }
    } else if (this.monthYearControl == 1) {
      date.setFullYear(date.getFullYear() - 1); // decrement by one year

      // Ensure the year does not go below the start date
      if (date >= startDateObj) {
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();
      } else {
        this.currentMonth = startDateObj.getMonth();
        this.currentYear = startDateObj.getFullYear();
      }
    }

    this.generateCalendar();
  }

  nextMonthYear() {
    // Create a date object based on the current year, month, and start date
    const date = new Date(this.currentYear, this.currentMonth, this.parseDate(this.startDate).getDate());

    // Calculate the maximum date based on the start date
    const startDateObj = this.parseDate(this.startDate)
    const maxDate = new Date(startDateObj.getFullYear(), startDateObj.getMonth(), startDateObj.getDay());
    maxDate.setFullYear(maxDate.getFullYear() + NUM_CAL_YEARS);
    maxDate.setMonth(maxDate.getMonth());

    // Increment the month or year based on the control
    if (this.monthYearControl == 0) {
      date.setMonth(date.getMonth() + 1); // increment by one month

      // Ensure the month does not exceed the maximum date
      if (date <= maxDate) {
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();
      }
    } else if (this.monthYearControl == 1) {
      date.setFullYear(date.getFullYear() + 1); // increment by one year

      // Ensure the year does not exceed the maximum date
      if (date <= maxDate) {
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();
      } else {
        this.currentMonth = maxDate.getMonth();
        this.currentYear = maxDate.getFullYear();
      }
    }

    this.generateCalendar();
  }

  getLastDayCalculated(): Date {
    const startDateObj = this.parseDate(this.startDate)
    return  new Date(
                      startDateObj.getFullYear() + NUM_CAL_YEARS, 
                      startDateObj.getMonth() -1, 
                      startDateObj.getDate()
                    );
  }

  getMonths() {
    return MONTHS;
  }

  getCurrentDisplayMonth(monthIndex: number): string {
    const months = this.getMonths();
    return months[monthIndex];
  }


}
