import { Injectable } from '@angular/core';
// import { AppConfig } from '../class/app-config';
import { ApiService } from './api.service';
import { AppConfig } from '../class/app-config';
@Injectable({
  providedIn: 'root'
})
export class PatientlistService {

  appconfig = new AppConfig()

  constructor(
    private apiService: ApiService) { }



  GetEmrPatientsAsync(fromdate: any, todate: any) {
    console.log(fromdate)
    let endpoint = 'ccmodule/patient-list'
    const queryParams = {
      fromdate: fromdate,
      todate: todate
    };
    return this.apiService.get(endpoint, queryParams);
  }

  GetPatientListDatewiseAsync(name: any, mobile: any, cprNo: any, visitType: any, groupId: any, date: any, listType: any, levelId: any, branchId: any) {
    // console.log(fromdate)
    let endpoint = 'ccmodule/doc-wise-patient-list'
    const queryParams = {
      name: name,
      mobile: mobile,
      cprNo: cprNo,
      visitType: visitType,
      groupId: groupId,
      date: date,
      listType: listType,
      levelId: levelId,
      branchId: branchId,
    };
    return this.apiService.get(endpoint, queryParams);
  }


  async getDoctor() {
    let endpoint = 'remediemr/doctor-list'
    return await this.apiService.get(endpoint);

  }

  async HideContactNo() {
    let endpoint = 'remediemr/mobile-no-hide'
    return await this.apiService.get(endpoint);

  }



  async getDepDoctor(depId: any) {
    let endpoint = 'remediemr/depdoctor-list'
    const queryParams = {
      depId: depId
    };
    return await this.apiService.get(endpoint, queryParams);
  }



  async getpatientReviewDate(EmrDocId: any) {
    let endpoint = 'remediemr/get-patient-review-date'
    const queryParams = {
      EmrDocId: EmrDocId
    };
    return await this.apiService.get(endpoint, queryParams);
  }
  //    async getDepartment() 
  // {
  //   let endpoint = 'remediemr/department-list'
  //   return await this.apiService.get(endpoint);

  // }


  async getSelectedSession(branchId: string) {
    const endpoint = 'remediemr/selectedsession-list';
    const queryParams = { branchId };
    return this.apiService.get(endpoint, queryParams); // returns Observable<any>
  }
  async getSession(branchId: string) {
    const endpoint = 'remediemr/session-list';
    const queryParams = { branchId };
    return this.apiService.get(endpoint, queryParams); // returns Observable<any>
  }

  async getEmpdetails(empId: string) {
    const endpoint = 'auth/empdetails';
    const queryParams = { empId };
    return this.apiService.get(endpoint, queryParams); // returns Observable<any>
  }
  //   async getpatientList(fromdate:any,todate:any,deptId:any,empId:any,patientname:any,opno:any) 
  // {
  //   console.log(empId)
  // const queryParams = {
  //   fromdate: fromdate,
  //   todate: todate,
  //   deptId:deptId,
  //   empId:empId,
  //   patientname:patientname,
  //   opno:opno
  // };
  //   let endpoint = 'remediemr/patient-list'
  //   return await this.apiService.get(endpoint,queryParams);
  // }

  async getpatientList(empId: any, sctId: any, name: any, mobile: any, cprNo: any, visitType: any, groupId: any, dat: any, listType: any, levelId: any, branchId: any) {
    console.log(empId)
    const queryParams = {
      empId: empId,
      sctId: sctId,
      name: name,
      mobile: mobile,
      cprNo: cprNo,
      visitType: visitType,
      groupId: groupId,
      dat: dat,
      listType: listType,
      levelId: levelId,
      branchId: branchId
    };
    let endpoint = 'remediemr/patient-list'
    return await this.apiService.get(endpoint, queryParams);
  }


  async getpatientListParam(empId: any, sctId: any, name: any, mobile: any, cprNo: any, visitType: any, groupId: any, dat: any, listType: any, levelId: any, branchId: any) {
    console.log(dat)
    const queryParams = {
      empId: empId,
      sctId: sctId,
      name: name,
      mobile: mobile,
      cprNo: cprNo,
      visitType: visitType,
      groupId: groupId,
      dat: dat,
      listType: listType,
      levelId: levelId,
      branchId: branchId
    };
    console.log(queryParams)
    let endpoint = 'remediemr/patient-list-param'
    return await this.apiService.get(endpoint, queryParams);
  }

  async getpatientListParamEmr(empId: any, sctId: any, name: any, mobile: any, cprNo: any, visitType: any, groupId: any, dat: any, listType: any, levelId: any, branchId: any) {
    console.log(empId)
    const queryParams = {
      empId: empId,
      sctId: sctId,
      name: name,
      mobile: mobile,
      cprNo: cprNo,
      visitType: visitType,
      groupId: groupId,
      dat: dat,
      listType: listType,
      levelId: levelId,
      branchId: branchId
    };
    let endpoint = 'remediemr/patient-list-paramemr'
    return await this.apiService.get(endpoint, queryParams);
  }



  async ConsulPatientList(empId: any, sctId: any, name: any, mobile: any, cprNo: any, visitType: any, groupId: any, dat: any, listType: any, levelId: any, branchId: any) {
    console.log(empId)
    const queryParams = {
      empId: empId,
      sctId: sctId,
      name: name,
      mobile: mobile,
      cprNo: cprNo,
      visitType: visitType,
      groupId: groupId,
      dat: dat,
      listType: listType,
      levelId: levelId,
      branchId: branchId
    };
    let endpoint = 'remediemr/consulted-patient-list'
    return await this.apiService.get(endpoint, queryParams);
  }

  async consulPatientListParam(empId: any, sctId: any, name: any, mobile: any, cprNo: any, visitType: any, groupId: any, dat: any, listType: any, levelId: any, branchId: any) {
    console.log(empId)
    const queryParams = {
      empId: empId,
      sctId: sctId,
      name: name,
      mobile: mobile,
      cprNo: cprNo,
      visitType: visitType,
      groupId: groupId,
      dat: dat,
      listType: listType,
      levelId: levelId,
      branchId: branchId
    };
    let endpoint = 'remediemr/consulted-patient-list-param'
    return await this.apiService.get(endpoint, queryParams);
  }

  async getPatientDetails(patientid: any) {
    console.log(patientid)
    const queryParams = {
      patientid: patientid
    };
    let endpoint = 'remediemr/patient-details-patientid'
    return await this.apiService.get(endpoint, queryParams);
  }

  //  async getPatientDetails(emrdocid:any) 
  // {
  //   console.log(emrdocid)
  // const queryParams = {
  //   emrdocid: emrdocid
  // };
  //   let endpoint = 'remediemr/patient-details-emrdocid'
  //   return await this.apiService.get(endpoint,queryParams);
  // }

  async getappointmentstatus(fromdate: any, todate: any, docId: any) {
    console.log(fromdate)
    let endpoint = 'remediemr/appointmentstatus'
    const queryParams = {
      fromdate: fromdate,
      todate: todate,
      docId: docId
    };
    return await this.apiService.get(endpoint, queryParams);
  }

  async getEmrRecordsAsync(patId: any, doctid: any, patientName: any, cpr: any,
    smode: any, chkFilter: any) {
    console.log(patId)
    const queryParams = {
      patId: patId,
      doctid: doctid,
      patientName: patientName,
      cpr: cpr,
      smode: smode,
      chkFilter: chkFilter
    };
    let endpoint = 'remediemr/emr-records'
    return await this.apiService.get(endpoint, queryParams);
  }

  async getEmrRecordsAsyncall(patId: any, doctid: any, patientName: any, cpr: any,
    smode: any, chkFilter: any) {
    console.log(patId)
    const queryParams = {
      patId: patId,
      doctid: doctid,
      patientName: patientName,
      cpr: cpr,
      smode: smode,
      chkFilter: chkFilter
    };
    let endpoint = 'remediemr/emr-recordsall'
    return await this.apiService.get(endpoint, queryParams);
  }


  async getOpnolist(key: any, key1: any, typ: any) {
    console.log(key)
    const queryParams = {
      key: key,
      key1: key1,
      typ: typ
    };
    let endpoint = 'remediemr/opnolist'
    return await this.apiService.get(endpoint, queryParams);
  }

  async getMoblelist(key: any, key1: any, typ: any) {
    console.log(key)
    const queryParams = {
      key: key,
      key1: key1,
      typ: typ
    };
    let endpoint = 'remediemr/mobilelist'
    return await this.apiService.get(endpoint, queryParams);
  }
  async getCPRnolist(key: any) {
    console.log(key)
    const queryParams = {
      key: key
    };
    let endpoint = 'remediemr/cprnolist'
    return await this.apiService.get(endpoint, queryParams);
  }
  async getNamelist(key: any) {
    console.log(key)
    const queryParams = {
      key: key
    };
    let endpoint = 'remediemr/namelist'
    return await this.apiService.get(endpoint, queryParams);
  }
  async getPatientSummary(selectedDate: any, doctId: any) {
    console.log(selectedDate)
    let endpoint = 'remediemr/patient-summary'
    const queryParams = {
      selectedDate: selectedDate,
      doctId: doctId
    };
    return await this.apiService.get(endpoint, queryParams);
  }




  async GetServiceRequestsAsync(fromDate: any, toDate: any, sectionId: any, departmentId: any, statusId: any) {

    const queryParams = {
      fromDate: fromDate,
      toDate: toDate,
      statusId: statusId,
      departmentId: departmentId,
      sectionId: sectionId
    };
    let endpoint = 'remediemr/complaint-details'
    return await this.apiService.get(endpoint, queryParams);
  }


  async getServiceRequestLog(requestId: any) {

    const queryParams = {
      requestId: requestId
    };
    let endpoint = 'remediemr/get-service-request-log'
    return await this.apiService.get(endpoint, queryParams);
  }
  async getCancellationAsync(fromdate: any, todate: any) {

    const queryParams = {
      fromdate: fromdate,
      todate: todate
    };
    let endpoint = 'remedioperations/cancel-list'
    return await this.apiService.get(endpoint, queryParams);
  }

  async getSalesBillAsync(salesbillId: any) {

    const queryParams = {
      salesbillId: salesbillId
    };
    let endpoint = 'remedioperations/sales-bill'
    return await this.apiService.get(endpoint, queryParams);
  }



  async getSalesBillDetAsync(salesbillId: any) {
    const queryParams = {
      salesbillId: salesbillId
    };
    let endpoint = 'remedioperations/sales-billdet'
    return await this.apiService.get(endpoint, queryParams);

  }

  async getPatientMessageRequest(fromDate: string, toDate: string, reqStatus: string) {
    console.log(fromDate)

    const queryParams = {
      fromDate: fromDate,
      toDate: toDate, reqStatus: reqStatus
    };
    let endpoint = 'proceduredetails/patient-message-request'
    return await this.apiService.get(endpoint, queryParams);
  }

  async updatePatientMessage(reqId: string, approvedRemarks: string, status: string, opnmsgId: any, newMsg: any, modalAction: any) {
    if (!reqId) {
      throw new Error('REQ_ID is required');
    }
    console.log(opnmsgId)
    console.log(newMsg)
    console.log(status)
    const queryParams = {
      reqId: reqId,
      approvedRemarks: approvedRemarks ?? '',
      status: status,
      opnmsgId: opnmsgId,
      newMsg: newMsg,
      modalAction: modalAction
    };

    let endpoint = 'ccmodule/update-patientmessage';
    return await this.apiService.get(endpoint, queryParams);
  }

  async getclaimselection(patientId: any, eDocId: any) {

    const queryParams = {
      patientId: patientId,
      eDocId: eDocId
    };
    let endpoint = 'ccmodule/claim-selection'
    return await this.apiService.get(endpoint, queryParams);
  }

  getprocselection(term: any, claimId: any, procType: any) {
    console.log(term)
    const queryParams = {
      term: term,
      claimId: claimId,
      procType: procType
    };
    let endpoint = 'ccmodule/procedure-list'
    return this.apiService.get(endpoint, queryParams);
  }

  saveOnlineDocTest(payload: any) {
    console.log(payload)
    const endpoint = 'ccmodule/save-doctest';
    return this.apiService.post(endpoint, payload);
  }
  // inside PatientlistService
  getOnlineDocTestGrid(patiId: string, emrDocId: string) {
    console.log(patiId)
    const queryParams = {
      patiId: patiId,
      emrDocId: emrDocId
    };
    const endpoint = 'ccmodule/doctest-List';
    return this.apiService.get(endpoint, queryParams); // returns Observable<any>
  }

  async getDosage() {
    console.log('r')
    let endpoint = 'ccmodule/dosage'
    return await this.apiService.get(endpoint);
  }
  async getFrequency() {
    console.log('r')
    let endpoint = 'ccmodule/frequency'
    return await this.apiService.get(endpoint);
  }

  async getRoute() {
    console.log('r')
    let endpoint = 'ccmodule/route'
    return await this.apiService.get(endpoint);
  }

  saveAdvice(payload: any) {
    console.log('Save Advice Payload:', payload);
    const endpoint = 'ccmodule/save-advice';
    return this.apiService.post(endpoint, payload);
  }


  getAdvice(emrDocId: string) {
    console.log('Fetching advice for:', emrDocId);

    const queryParams = {
      emrDocId: emrDocId
    };

    const endpoint = 'ccmodule/get-advice';  // your API endpoint
    return this.apiService.get(endpoint, queryParams); // returns Observable<any>
  }
  // inside PatientlistService

  deleteOrder(emrDocId: string, patiId: string, planSlno: number) {

    const queryParams = {
      emrDocId: emrDocId,
      patiId: patiId,
      planSlno: planSlno
    };

    const endpoint = 'ccmodule/deleteOrder';

    // IMPORTANT: use DELETE
    return this.apiService.get(endpoint, queryParams);
  }
  getOrderSections() {
    return this.apiService.get('ccmodule/order-sections');
  }

  getOnlineTreatmentPackages(emrDocId: any) {
    console.log(emrDocId)
    const queryParams = {
      emrDocId: emrDocId,
    };
    let endpoint = 'ccmodule/package-list'
    return this.apiService.get(endpoint, queryParams);
  }



  getPackageList() {

    let endpoint = 'ccmodule/loadpackage-list'
    return this.apiService.get(endpoint);
  }

  saveTreatmentPackage(payload: any) {
    console.log(payload)
    const endpoint = 'ccmodule/save-package';
    return this.apiService.post(endpoint, payload);
  }

  deleteTreatmentPackage(emrDocId: string, pkgId: string) {

    const queryParams = {
      emrDocId: emrDocId,
      pkgId: pkgId
    };

    const endpoint = 'ccmodule/delete-package';

    // IMPORTANT: use DELETE
    return this.apiService.get(endpoint, queryParams);
  }



  GetEmployeePageSettings() {

    let endpoint = 'ccmodule/page-settings'
    return this.apiService.get(endpoint);
  }


  GetBillingReport(fromDate: any, toDate: any, prcIds: any) {
    let endpoint = 'ccmodule/billing-report';

    const body = {
      fromDate: fromDate,
      toDate: toDate,
      prcIds: prcIds
    };

    return this.apiService.post(endpoint, body);
  }

  getBookingNotVisitedReport(fromDate: any, toDate: any, visitType: any) {
    console.log(fromDate)
    const queryParams = {
      fromDate: fromDate,
      toDate: toDate,
      visitType: visitType
    };
    let endpoint = 'ccmodule/booking-not-visited-report'
    return this.apiService.get(endpoint, queryParams);
  }

}