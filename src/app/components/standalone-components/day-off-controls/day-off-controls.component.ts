import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';
import { DatepickerPopupComponent } from '../datepicker-popup/datepicker-popup.component';
import { OffDates } from 'src/app/interface/offDates';
import { PostService } from 'src/app/service/post.service';
import { ScheduleRequest } from 'src/app/interface/scheduleRequest';
import { FormsModule } from '@angular/forms';
import { DAYS_OFF, DAYS_WORKING, LOWER_YEAR_RANGE, MONTHS, UPPER_YEAR_RANGE } from 'src/app/config/constants';

@Component({
  selector: 'app-day-off-controls',
  templateUrl: './day-off-controls.component.html',
  styleUrls: ['./day-off-controls.component.css'],
  standalone: true,
  imports: [CommonModule, DatepickerPopupComponent, FormsModule],
})

@Injectable()
export class DayOffControlsComponent {

  scheduleRequest!: ScheduleRequest;
  years!: number[];
  resetReady!: boolean;
  calculationNotReady!: boolean;
  
  @Output() resetOffDates = new EventEmitter<OffDates[]>();
  @Output() scheduleResquestChange = new EventEmitter<ScheduleRequest>();

  constructor(
    private postService: PostService
  ) {
    this.onInit();
  }

  onInit() {
    this.scheduleRequest =  {
      'workingDays': 0,
      'daysOff': 0,
      'startDate': ''
    }

    const date = new Date();
    const currentYear = date.getFullYear();
    const startYear = currentYear + LOWER_YEAR_RANGE;
    const endYear = currentYear + UPPER_YEAR_RANGE;
    this.years = [];

    for (let year = startYear; year <= endYear; year++) {
      this.years.push(year);
    }

    this.resetReady = false;
    this.calculationNotReady = true;
  }

  reset() {
    
    this.scheduleRequest = {
      'workingDays': 0,
      'daysOff': 0,
      'startDate': ''
    };

    this.scheduleResquestChange.emit(this.scheduleRequest); // Emit an event to reset off dates in the parent component
    this.setResetReady(); // Check if the calculation is ready after changing days off
    this.calculationNotReady = true;
  }

  calculateOffDates() {

    if (this.scheduleRequest.startDate == '') {
      return;
    }

    if (this.scheduleRequest.workingDays == 0) {
      return;
    }

    if (this.scheduleRequest.daysOff == 0) {
      return;
    }
    
    this.scheduleResquestChange.emit(this.scheduleRequest); // Emit the current schedule request to the parent component
    this.calculationNotReady = true;
  }

  changeDaysOff(daysOffDis: number) {
    this.scheduleRequest.daysOff = daysOffDis;
    this.setResetReady(); // Check if the calculation is ready after changing days off
    this.setCalculationReady(); // Check if the calculation is ready after changing days off
  }

  changeWorkDays(workDaysDis: number) {
    this.scheduleRequest.workingDays = workDaysDis;
    this.setResetReady(); // Check if the calculation is ready after changing days off
    this.setCalculationReady(); // Check if the calculation is ready after changing days off
  }

  changeStartDate(newStartDate: string) {
    
    if (typeof newStartDate != 'string') {
      return;
    }
    
    const [day, month, year] = newStartDate.split('/').map(Number);
    const newFormattedDate = 
        day.toString().padStart(2, '0') + '/'  +  
        month.toString().padStart(2, '0') + '/'  + 
        year.toString().padStart(2, '0');
      
    this.scheduleRequest.startDate = newFormattedDate;
    this.scheduleRequest.workingDays = 0;
    this.scheduleRequest.daysOff = 0;

    this.scheduleResquestChange.emit(this.scheduleRequest);
    this.setResetReady(); // Check if the calculation is ready after changing days off
    this.setCalculationReady(); // Check if the calculation is ready after changing days off
  }

  getOffDays() :number[] {
    return DAYS_OFF;
  }

  getWorkingDays() : number[] {
    return DAYS_WORKING;
  }

  setCalculationReady() {
    if (this.scheduleRequest.startDate == '' 
        || this.scheduleRequest.workingDays == 0 
        || this.scheduleRequest.daysOff == 0) {
      this.calculationNotReady = true; // Disable calculation if any field is empty
      return;
    }
    this.calculationNotReady = false;
  }

  setResetReady() {
    if (this.scheduleRequest.startDate == '' 
        || this.scheduleRequest.workingDays == 0 
        || this.scheduleRequest.daysOff == 0) {
      this.resetReady = false; // Disable calculation if any field is empty
      return;
    }
    this.resetReady = true;
  }
}

