import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-medicine-prescription',
  templateUrl: './medicine-prescription.page.html',
  styleUrls: ['./medicine-prescription.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MedicinePrescriptionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
