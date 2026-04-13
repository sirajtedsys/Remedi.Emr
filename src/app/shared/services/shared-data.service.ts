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

  setPatient(data: PatientListDatewiseItem) {
    this.patientData = data;
  }

  getPatient(): PatientListDatewiseItem {
    return this.patientData;
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
