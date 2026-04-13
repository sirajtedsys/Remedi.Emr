import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  constructor(private apiservice: ApiService) { }

  GetBloodGroups() {
    return this.apiservice.get('emrcomplaint/blood-group');
  }

  GetPatientMedicalHistory(patiId: any, doctId: any) {
    return this.apiservice.get('emrcomplaint/patient-medical-hist', {
      patiId,
      doctId,
    });
  }
  GetPatientSymptoms(emrDocId: any) {
    return this.apiservice.get('emrcomplaint/patient-symptoms', { emrDocId });
  }
  GetPatientCases(emrDocId: any) {
    return this.apiservice.get('emrcomplaint/patient-cases', { emrDocId });
  }
  GetPastMedicalSurgeryHistory(emrDocId: any) {
    return this.apiservice.get('emrcomplaint/past-med-sur-hist', { emrDocId });
  }
  GetVisitIcdDetails(emrDocId: any) {
    return this.apiservice.get('emrcomplaint/visit-icd-details', { emrDocId });
  }
  GetPatientVitals(emrDocId: any) {
    return this.apiservice.get('emrcomplaint/patient-vitals', { emrDocId });
  }
  GetFullEmrAssessment(emrDocId: any) {
    return this.apiservice.get('emrcomplaint/full-assesment', { emrDocId });
  }
  SearchIcd(type: any, code: any) {
    return this.apiservice.get('emrcomplaint/icd-search', {
      type,
      code,
    });
  }


  SaveComplaint(cd: any) {

    return this.apiservice.post('emrcomplaint/save-complaint', cd)
  }



  ExecuteSpOnlineVitalStatusUpd(cd: any) {

    return this.apiservice.post('emrcomplaint/ExecuteSpOnlineVitalStatusUpd', cd.vital)



  }

}
