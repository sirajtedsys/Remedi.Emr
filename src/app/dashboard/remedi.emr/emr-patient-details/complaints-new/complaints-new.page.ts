import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonCheckbox,
  IonHeader,
  
  IonToolbar,
  IonTextarea,
  IonButton,
  IonIcon,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonCard
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  saveOutline,
  eyeOutline,
  locationOutline,
  alertCircleOutline,
  callOutline,
  personOutline,
  calendarOutline,
  homeOutline,
  medicalOutline,
  documentTextOutline,
  alertCircle,
  playSkipBackOutline,
  gitNetworkOutline,
  printOutline,
  personCircleOutline,
  notificationsOutline,
  save,
  eye,
  micCircleOutline,

  
  gridOutline,
  addCircleOutline,
  copyOutline,
  desktopOutline,
  tvOutline

} from 'ionicons/icons';

@Component({
  selector: 'app-complaints-new',
  standalone: true,
  templateUrl: './complaints-new.page.html',
  styleUrls: ['./complaints-new.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
   
    IonHeader,
    IonToolbar,
    IonTextarea,
    IonButton,
    IonCheckbox,
    IonIcon,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonCard,
  ]
})

export class ComplaintsNewPage implements OnInit {

  constructor() {

    addIcons({

      saveOutline,
      eyeOutline,
      locationOutline,
      alertCircleOutline,
      callOutline,
      personOutline,
      calendarOutline,
      homeOutline,
      medicalOutline,
      documentTextOutline,
      alertCircle,
      playSkipBackOutline,
      gitNetworkOutline,
      printOutline,
      personCircleOutline,
      notificationsOutline,
      save,
      eye,
      micCircleOutline,

      // New
      gridOutline,
      addCircleOutline,
      copyOutline,
      desktopOutline,
      tvOutline

    });

  }

  ngOnInit(): void { }

  /*====================================================
                  PATIENT
  ====================================================*/

  patient = {
    id: 'BH-109504',
    name: 'THANKAMANI',
    gender: 'Female',
    age: 63,
    dob: '28/07/1962',
    mobile: '9633021389',
    address: 'SREERANGAM KOOTHRAPPALLY P O KOTTAYAM',
    emergency: true
  };

  /*====================================================
                  TOP TABS
  ====================================================*/

  selectedTab = 'treatment';

  tabs = [

    {
      id: 'treatment',
      name: 'Treatment Summary'
    },

    {
      id: 'complaints',
      name: 'Complaints / Exam'
    },

    {
      id: 'orders',
      name: 'Orders'
    },

    {
      id: 'results',
      name: 'Results'
    },

    {
      id: 'medicine',
      name: 'Medicine Prescription'
    },

    {
      id: 'admission',
      name: 'Admission'
    },

    {
      id: 'cross',
      name: 'Cross Reference'
    }

  ];

  changeTab(tab: string): void {
    this.selectedTab = tab;
  }

  /*====================================================
                TEMPLATE DROPDOWNS
  ====================================================*/

  complaintTemplates = [
    'Template 1',
    'Template 2',
    'Template 3'
  ];

  generalTemplates = [
    'General Exam'
  ];

  systemTemplates = [
    'System Exam'
  ];

  localTemplates = [
    'Local Exam'
  ];

  familyTemplates = [
    'Family History'
  ];

  selectedComplaintTemplate = '';
  selectedGeneralTemplate = '';
  selectedSystemTemplate = '';
  selectedLocalTemplate = '';
  selectedFamilyTemplate = '';

  /*====================================================
                  FORM DATA
  ====================================================*/

  knowCase = '';

  symptoms = '';

  comments = '';

  chiefComplaints = '';

  generalExamination = '';

  impression = '';

  systemExamination = '';

  localExamination = '';

  familyHistory = '';

  followUp = false;

  /*====================================================
                  BUTTON EVENTS
  ====================================================*/

  save() {
    console.log('Save clicked');
  }

  preview() {
    console.log('Preview clicked');
  }

  createComplaint() {
    console.log('Create Complaint');
  }

  createGeneral() {
    console.log('Create General Examination');
  }

  createSystem() {
    console.log('Create System Examination');
  }

  createLocal() {
    console.log('Create Local Examination');
  }

  createFamily() {
    console.log('Create Family History');
  }

  copyChiefComplaint() {
    console.log('Copy Chief Complaint');
  }

}