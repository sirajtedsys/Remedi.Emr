import { Injectable } from '@angular/core';
import { EmrPatientInfo } from '../interfaces/patient-list/emr-patient-info';
import { PatientListDatewiseItem } from '../interfaces/patient-list/patient-list-date-wise-item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }


  private patientData!: PatientListDatewiseItem;

setPatient(data: PatientListDatewiseItem ) {
  this.patientData = data;
  localStorage.setItem('Emr-patient', JSON.stringify(data));
}

 getPatient(): PatientListDatewiseItem {
  if (this.patientData) return this.patientData;

  const stored = localStorage.getItem('Emr-patient');
  return stored ? JSON.parse(stored) : {} as PatientListDatewiseItem;
}

clearPatient() {
  this.patientData = {} as PatientListDatewiseItem;
  localStorage.removeItem('Emr-patient');
}



  DoctorId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  
  DoctorId$ = this.DoctorId.asObservable();

  setDoctId(data: string) {
    this.DoctorId.next(data);
  }

  // getDoctId(): string {
  //   return this.DoctorId;
  // }


}
