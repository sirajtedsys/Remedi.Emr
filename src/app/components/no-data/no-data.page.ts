import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.page.html',
  styleUrls: ['./no-data.page.scss'],
  standalone: true,
  imports: [IonIcon, CommonModule, FormsModule]
})
export class NoDataPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
