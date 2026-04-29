import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-p-a-examination',
  templateUrl: './p-a-examination.page.html',
  styleUrls: ['./p-a-examination.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PAExaminationPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
