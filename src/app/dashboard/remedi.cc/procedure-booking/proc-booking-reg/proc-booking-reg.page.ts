import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-proc-booking-reg',
  templateUrl: './proc-booking-reg.page.html',
  styleUrls: ['./proc-booking-reg.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonButton, IonIcon]
})
export class ProcBookingRegPage implements OnInit {

  constructor(private fb: FormBuilder) { }

  // ==========================================
  // PATIENT DATA
  // ==========================================
  patient = {
    id: 'PT-2026-001',
    name: 'Azlam',
    age: 32,
    gender: 'Male',
    phone: '9876543210',
    bloodGroup: 'B+',
    op: '3',
    department: 'Ortho',
    doctor: 'Alexxy',
    visitTime: '10.30am',
    address: 'Kochi, Kerala',
    visitDate: new Date()
  };

  activeAccordion: string | undefined = 'patient';

  // ==========================================
  // PRESCRIPTION FORM
  // ==========================================
  prescriptionForm!: FormGroup;

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.prescriptionForm = this.fb.group({
      diagnosis: ['', Validators.required],
      advice: [''],
      followUpDate: [''],
      medicines: this.fb.array([])
    });

    this.addMedicine(); // Default medicine row
  }

  // ==========================================
  // FORM ARRAY GETTER
  // ==========================================
  get medicines(): FormArray {
    return this.prescriptionForm.get('medicines') as FormArray;
  }

  // ==========================================
  // ADD MEDICINE
  // ==========================================
  addMedicine() {
    const medicineGroup = this.fb.group({
      name: ['', Validators.required],
      morning: [false],
      afternoon: [false],
      night: [false],
      duration: [''],
      notes: ['']
    });

    this.medicines.push(medicineGroup);
  }

  // ==========================================
  // REMOVE MEDICINE
  // ==========================================
  removeMedicine(index: number) {
    this.medicines.removeAt(index);
  }

  // ==========================================
  // ACCORDION TOGGLE
  // ==========================================
  toggleAccordion(value: string) {
    this.activeAccordion =
      this.activeAccordion === value ? undefined : value;
  }

  // ==========================================
  // SAVE PRESCRIPTION
  // ==========================================
  savePrescription() {
    if (this.prescriptionForm.invalid) {
      this.prescriptionForm.markAllAsTouched();
      return;
    }

    const finalPrescription = {
      patient: this.patient,
      prescription: this.prescriptionForm.value,
      createdAt: new Date()
    };

    console.log('Final Prescription:', finalPrescription);

    this.isEditMode = false;
  }

  // ==========================================
  // EDIT MODE TOGGLE
  // ==========================================
  isEditMode = true;

  enableEdit() {
    this.isEditMode = true;
  }

  // ==========================================
  // PREVIEW MODAL SECTION
  // ==========================================
  isPreviewOpen = false;

/* ---------------- MODAL ---------------- */

openPreview() {
  this.isPreviewOpen = true;
}

closePreview() {
  this.isPreviewOpen = false;
}
// tab active
activeTab: 'registered' | 'new' = 'registered';

setTab(tab: 'registered' | 'new') {
  this.activeTab = tab;
}
// tab active
/* ---------------- AUTOCOMPLETE SEARCH ---------------- */

searchText: string = '';

showPatientTable: boolean = false;


/* Patient Data (Example) */

patients = [

  {
    op: 'EM-706',
    name: 'Finn Allen',
    gender: 'Male',
    age: '29 Y',
    id: '1234',
    mobile: '9998887771',
    address: 'New Zeland'
  },

  {
    op: 'EM-707',
    name: 'ANU JOSE',
    gender: 'Female',
    age: '32 Y',
    id: '5678',
    mobile: '9898989898',
    address: 'KOCHI'
  },

  {
    op: 'EM-708',
    name: 'ARUN BABU',
    gender: 'Male',
    age: '41 Y',
    id: '7412',
    mobile: '9000000000',
    address: 'ERNAKULAM'
  },
  {
    op: 'EM-709',
    name: 'ASHWIN',
    gender: 'Male',
    age: '35 Y',
    id: '7415',
    mobile: '7899876542',
    address: 'TAMILNADU'
  }

];


/* Filtered Patient List */

filteredPatients = [...this.patients];


/* Filter Search */

filterPatients() {

  const value = this.searchText.toLowerCase();

  this.filteredPatients = this.patients.filter(p =>
    p.op.toLowerCase().includes(value) ||
    p.name.toLowerCase().includes(value) ||
    p.mobile.includes(value) ||
    p.id.toLowerCase().includes(value)
  );

}


/* Select Patient */

selectPatient(patient: any) {

  this.searchText = patient.name;

  this.showPatientTable = false;

  console.log("Selected Patient:", patient);

}


/* Hide Table When Clicking Outside */

hideTable() {

  setTimeout(() => {
    this.showPatientTable = false;
  }, 200);

}
 

}  
