import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSegmentButton, IonLabel, IonSegment } from '@ionic/angular/standalone';
import { Router, RouterOutlet } from '@angular/router';
// import { RouterOutlet } from "../../../../../../node_modules/@angular/router/router_module.d";

@Component({
  selector: 'app-psychiatric-assesment',
  templateUrl: './psychiatric-assesment.page.html',
  styleUrls: ['./psychiatric-assesment.page.scss'],
  standalone: true,
  imports: [IonSegment, IonLabel, IonSegmentButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterOutlet]
})
export class PsychiatricAssesmentPage implements OnInit {

  currentUrl:any;
  constructor(
    private router:Router
  ) { }

  ngOnInit() {
    this. getCurrentUrl();
  }

  
    getCurrentUrl(){
    // this.currentUrl
   
    // let url1 = 'localhost:1000/home/psychiatric-assessment/page1/page2/psychiatric-assessment/'

    let url   = this.router.url.split('psychiatric-assesment')[0]
    console.log(url);
    
   this.currentUrl = url+'psychiatric-assesment'
   console.log(this.currentUrl);
   
  }

  Adult(){
    this.router.navigate([this.currentUrl + '/psychiatry-adult']);
  }
  Child(){
   this.router.navigate([this.currentUrl + '/psychiatry-child']);
  }
  Complaints(){
   this.router.navigate([this.currentUrl + '/complaints']);
  }
  OrderTest(){
   this.router.navigate([this.currentUrl + '/order-test']);
  }
  MedicinePrescription(){
   this.router.navigate([this.currentUrl + '/medicine-prescription']);
  }
  TreatmentPlan(){
   this.router.navigate([this.currentUrl + '/treatment-plan']);
  }
   Summary(){
   this.router.navigate([this.currentUrl + '/summary']);
  }


}
