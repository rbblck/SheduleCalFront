import { CommonModule } from '@angular/common';
import { Component, Injectable, Input } from '@angular/core';
import { OffDates } from 'src/app/interface/offDates';

@Component({
  selector: 'app-day-off-calendar',
  templateUrl: './day-off-calendar.component.html',
  standalone: true,
  styleUrls: ['./day-off-calendar.component.css'],
  imports: [CommonModule],
})

@Injectable()
export class DayOffCalendarComponent {

  @Input() startDate: string = "";
  @Input() offDates: OffDates[] = [];
  @Input() currentMonth: number = 0;
  @Input() currentYear: number = 0;

  weeks: any[][] = [];

  constructor() {
    this.onInit();
  }

  onInit() {}
  
  ngOnChanges(changes: any) {
      this.generateCalendar();
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
    if (date < this.parseDate(this.startDate)) {
      return false;
    }
    
    let isNotOff: boolean = true;

    if (this.offDates.length != 0) {
      
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const year = date.getFullYear();
      const dateStr = day + '/' + month + '/' + year;
    
      this.offDates.forEach((oro) => {
        if (this.isDateInRange(dateStr, oro.startDate, oro.endDate)) {
          isNotOff = false;
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
}
