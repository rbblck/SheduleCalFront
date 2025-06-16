import { Component } from '@angular/core';
import { ScheduleRequest } from 'src/app/interface/scheduleRequest';
import { PostService } from 'src/app/service/post.service';
import { OffDates } from 'src/app/interface/offDates';
import { DaysOffListComponent } from "../standalone-components/days-off-list/days-off-list.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DayOffCalendarComponent } from "../standalone-components/day-off-calendar/day-off-calendar.component";
import { DayOffControlsComponent } from "../standalone-components/day-off-controls/day-off-controls.component";

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

  scheduleRequest!: ScheduleRequest;
  offDates: OffDates[] = [];

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
    };
  }

  changeSchedulerRequest(newScheduler: ScheduleRequest) {

    if (
      newScheduler.startDate == '' 
      || newScheduler.workingDays == 0 
      || newScheduler.daysOff == 0) 
    {
      this.offDates = []; // Reset offDates if all fields are empty
    }

    this.scheduleRequest = newScheduler;
    this.getOffDates();
  }

  getOffDates() {
    this.offDates = []; // Reset offDates before fetching new ones

    const tempOffDates: OffDates[] = []
        
    this.postService.create(this.scheduleRequest).subscribe(
      {
        next: (responce) => {
          (responce as OffDates[]).forEach((dateRangeObj) => {
            tempOffDates.push(dateRangeObj);
          });
        },
        error(error: any) {
          console.error('an error occurred...');
        },
        complete: () => {
          this.offDates = tempOffDates;
        }
      }
    );
  }
}
