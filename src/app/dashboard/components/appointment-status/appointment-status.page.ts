import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment-status',
  templateUrl: './appointment-status.page.html',
  styleUrls: ['./appointment-status.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AppointmentStatusPage implements OnInit {
  @Input() listItems: any[] = [];
  constructor() { }

  ngOnInit() {
  }

}
