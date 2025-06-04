import { CommonModule } from '@angular/common';
import { Component, Injectable, Input } from '@angular/core';
import { OffDates } from 'src/app/interface/offDates';

@Component({
  selector: 'app-days-off-list',
  templateUrl: './days-off-list.component.html',
  standalone: true,
  styleUrls: ['./days-off-list.component.css'],
  imports: [CommonModule],
})

@Injectable()
export class DaysOffListComponent {

  @Input() offDates: OffDates[] = [];

  constructor() {
    this.onInit();
  }

  onInit() {}
}
