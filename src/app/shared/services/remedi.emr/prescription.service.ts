import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  constructor(
    private apiservice: ApiService

  ) {

  }


  GetPatientDetails(patiId: any, pEdocId: any, edocId: any) {
    return this.apiservice.get('emrprescription/emr-patient-details', { patiId, pEdocId, edocId })
  }


  GetMedicinePlanForPatient(patiId: any, emrDocId: any) {
    return this.apiservice.get('emrprescription/medicine-plan', { patiId, emrDocId })
  }

  GetOnlineMedicineAndGeneric(term: any, claimId: any, branchId: any) {
    return this.apiservice.get('emrprescription/medicine-and-generic', { term, branchId, claimId })
  }

  GetOnlineGenericNamesAsync(term: any, claimId: any, branchId: any) {
    return this.apiservice.get('emrprescription/generic-name-search', { term, claimId, branchId })
  }

  GetDosagesByEmployeeAsync() {
    return this.apiservice.get('emrprescription/employee-dosages')
  }

  GetFrequencyByEmployeeAsync() {
    return this.apiservice.get('emrprescription/employee-freequency')
  }

  GetRoutesByEmployeeAsync() {
    return this.apiservice.get('emrprescription/employee-routes')
  }

   ExecuteOnlineDocMediIns(pr: any) {
 
    return this.apiservice.post('emrprescription/prescription-ins', pr)
    
  }


}
