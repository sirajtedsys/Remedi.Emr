import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/angular/standalone';
import { PAHistoryPage } from "./p-a-history/p-a-history.page";

@Component({
  selector: 'app-psychiatry-adult',
  templateUrl: './psychiatry-adult.page.html',
  styleUrls: ['./psychiatry-adult.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonAccordionGroup, IonAccordion, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, PAHistoryPage]
})
export class PsychiatryAdultPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
