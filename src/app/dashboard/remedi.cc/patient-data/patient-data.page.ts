import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAccordion,
  IonAccordionGroup,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonRow,
  IonTitle,
  IonToolbar, IonRouterOutlet, IonApp, IonIcon, IonButton, 
  IonFab,
  IonFabButton} from '@ionic/angular/standalone';
   import {
  createOutline,
  informationCircleOutline,
  closeCircle,
  chatbubblesOutline,
  call, print, shareSocial ,
  chevronUpOutline,closeOutline, person,documentText,pulse,medkit,menuOutline, flask, clipboard } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router, RouterOutlet } from '@angular/router';
import { EmrPatientInfo } from 'src/app/shared/interfaces/patient-list/emr-patient-info';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { PatientListDatewiseItem } from 'src/app/shared/interfaces/patient-list/patient-list-date-wise-item';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.page.html',
  styleUrls: ['./patient-data.page.scss'],
  standalone: true,
 imports: [IonButton, IonIcon, IonApp, IonRouterOutlet,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonAccordionGroup,
    IonAccordion,
    IonItem,
    IonGrid,
    IonCol,
    IonRow,
    IonRouterOutlet,
    IonFab,
    IonFabButton, RouterOutlet],
})
export class PatientDataPage implements OnInit {
patientData!: PatientListDatewiseItem;

  constructor(private router: Router,private shared:SharedDataService) {
      addIcons({menuOutline,closeOutline,pulse,medkit,flask,clipboard,createOutline,informationCircleOutline,closeCircle,chatbubblesOutline,call,print,shareSocial,chevronUpOutline,person,documentText});
    this.fetchDataFromState();
  }

  ngOnInit() {}
   menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


  fetchDataFromState() {
    // Access the navigation state
    // const navigation = window.history.state;
    const navigation = this.router.getCurrentNavigation();
    this.patientData = navigation?.extras?.state?.['patientData'];
    console.log(this.patientData);
    this.setPatientDataToService(this.patientData)
  }


  setPatientDataToService(data:PatientListDatewiseItem){
    // store in service for child access
    this.shared.setPatient(data);
  }

  

NavigateTo(route:string){
  const baseString = '/dashboard/patient-data/'
  const finaString = baseString+route
  this.router.navigate([finaString])

}



}
