import { formatDate, FormatWidth, getLocaleDateFormat, getLocaleDayNames } from '@angular/common';
import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbAlertModule, NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
	readonly DELIMITER = '/';

	fromModel(value: string | null): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}



	toModel(date: NgbDateStruct | null): string | null {
		return date ? date.day + this.DELIMITER + date.month.toString().padStart(2, '0') + this.DELIMITER + date.year : null;
	}
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
	readonly DELIMITER = '/';

	parse(value: string): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

	format(date: NgbDateStruct | null): string {
		return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
	}
}

@Component({
  selector: 'app-datepicker-popup',
  templateUrl: './datepicker-popup.component.html',
  standalone: true,
  imports: [
    NgbDatepickerModule, 
    NgbAlertModule, 
    FormsModule
  ],
  styleUrls: ['./datepicker-popup.component.css'],
  providers: [
		{ provide: NgbDateAdapter, useClass: CustomAdapter },
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
	],
})

@Injectable()
export class DatepickerPopupComponent {
  model: NgbDateStruct | undefined;
  displayDate: String = "Pick Start Date";
  @Output() change = new EventEmitter();

  constructor(
		private ngbCalendar: NgbCalendar,
		private dateAdapter: NgbDateAdapter<string>,
  ) {
  }

  hasChanged(value: any) {
    this.change.emit(this.model);
  }

  convertToReadableDate(dateString: string): string {
    const date = new Date(dateString);
    // Customize options as needed for your locale and preferences
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
  }

  get today() {
		return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
	}
}


