import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-p-a-formulation',
  templateUrl: './p-a-formulation.page.html',
  styleUrls: ['./p-a-formulation.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PAFormulationPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
