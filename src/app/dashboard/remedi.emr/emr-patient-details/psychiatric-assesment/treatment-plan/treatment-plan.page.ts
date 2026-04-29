import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-treatment-plan',
  templateUrl: './treatment-plan.page.html',
  styleUrls: ['./treatment-plan.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TreatmentPlanPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
