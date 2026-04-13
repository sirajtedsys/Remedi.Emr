import { Injectable } from '@angular/core';
// import { AppConfig } from '../class/app-config';
import { ApiService } from '../api.service';
import { AppConfig } from '../../class/app-config';
import { PatientMsg } from '../../class/remedi.cc/patientmsg';
import { ProgressNote } from '../../class/remedi.cc/progressnote';
@Injectable({
  providedIn: 'root'
})
export class ProcrequestService {

  appconfig = new AppConfig()

  constructor(
    private apiService: ApiService) { }


  async getPrescProcedure(emrDocid: any, patId: any) {
    console.log(emrDocid)
    let endpoint = 'procrequest/order-details'
    const queryParams = {
      emrDocid: emrDocid,
      patId: patId

    };
    return await this.apiService.get(endpoint, queryParams);
  }

 

  async getMedicineDet(emrDocid: any, patId: any) {
    console.log(emrDocid)
    let endpoint = 'procrequest/medicines-details'
    const queryParams = {
      emrDocid: emrDocid,
      patId: patId
    };
    return await this.apiService.get(endpoint, queryParams);
  }


  async getPrevisitdetails(patId: any, eDocid: any, empId: any, strwhere: any, strcnt: any) {
    console.log(patId)
    let endpoint = 'procrequest/previsit-details'
    const queryParams = {
      patId: patId,
      eDocid: eDocid,
      empId: empId,
      strwhere: strwhere,
      strcnt: strcnt
    };
    return await this.apiService.get(endpoint, queryParams);
  }

  async getPatientType() {
    let endpoint = 'procrequest/patient-type'
    return await this.apiService.get(endpoint);

  }
  async getPatientTypeByPatiId(patId: any) {
    let endpoint = 'procrequest/patient-type-id'
    const queryParams = {
      patId: patId
    };
    return await this.apiService.get(endpoint, queryParams);
  }

  async savePatientMessage(lv: PatientMsg) {
    let endpoint = 'procrequest/patient-message-save'
    return await this.apiService.post(endpoint, lv)
  }
  async UpdatePatientType(patId: any, oldTypeId: any, newTypeId: any) {
    console.log(patId)
    console.log(newTypeId)
    console.log(oldTypeId)
    let endpoint = 'procrequest/update-patient-type'
    const payload = {
      patientId: patId,
      oldTypeId: oldTypeId,
      newTypeId: newTypeId
    };

    return await this.apiService.get(endpoint, payload);
  }
  async getPatientMessageDates(patId: any) {
    console.log(patId);

    let endpoint = 'procrequest/get-Dates'
    const queryParams = {
      patId: patId
    };
    return await this.apiService.get(endpoint, queryParams);
  }

  async GetDatedetails(selectedDate: any, patId: any) {
    console.log(patId);

    let endpoint = 'procrequest/date-details'
    const queryParams = {
      selectedDate: selectedDate,
      patId: patId
    };
    return await this.apiService.get(endpoint, queryParams);
  }

  async saveProgressNote(data: ProgressNote) {
    let endpoint = 'procrequest/progressnote-save';
    return await this.apiService.post(endpoint, data);
  }
  // Get list of progress notes
  async getProgressNoteList(emrDocId: any) {
    let endpoint = 'procrequest/progressnoteList'
    const queryParams = {
      emrDocId: emrDocId
    };
    return await this.apiService.get(endpoint, queryParams);
  }

  async submitPatientMessageEditRequest(messageId: any, patId: any, message: any, editstatus: any, remarks: any) {

    console.log(messageId)

    let endpoint = 'ccmodule/update-patient-request'
    const queryParams = {
      messageId: messageId,
      patId: patId,
      message: message,
      editstatus: editstatus,
      remarks: remarks
    };
    return await this.apiService.get(endpoint, queryParams);

  }


}
