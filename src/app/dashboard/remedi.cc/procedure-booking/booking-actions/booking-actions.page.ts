import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-booking-actions',
  templateUrl: './booking-actions.page.html',
  styleUrls: ['./booking-actions.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class BookingActionsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
