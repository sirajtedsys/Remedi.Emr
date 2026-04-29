import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-psychiatry-child',
  templateUrl: './psychiatry-child.page.html',
  styleUrls: ['./psychiatry-child.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PsychiatryChildPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
