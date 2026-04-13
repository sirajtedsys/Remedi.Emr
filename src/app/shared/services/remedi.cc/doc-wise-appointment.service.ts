import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class DocWiseAppointmentService {

  constructor(
    private apiService: ApiService
  ) { }

  GetDepartmentsForOnlineAppointmentAsync(branchId: string) {
    const endpoint = "docwiseappointment/appnt-depts"
    return this.apiService.get(endpoint, { branchId: branchId })
  }


  GetOnlineAppointmentDoctorsAsync(deptId: number, branchId: string) {
    const endpoint = "docwiseappointment/appnt-docts"
    return this.apiService.get(endpoint, { branchId: branchId, deptId: deptId == 0 ? '' : deptId })
  }


  GetBranchesByEmployeeIdAsync() {
    const endpoint = "docwiseappointment/appnt-branches"
    return this.apiService.get(endpoint)
  }


  GetDoctorBookingCountByMonthAsync(month: number, year: number) {
    const endpoint = "docwiseappointment/doc-booking-count"
    return this.apiService.get(endpoint, { month: month, year: year })
  }

  GetDoctorLeaveCountByMonthAsync(month: number, year: number) {
    const endpoint = "docwiseappointment/doc-leave-count"
    return this.apiService.get(endpoint, { month: month, year: year })
  }

  GetDoctorScheduleTokensAsync(doctorId: string, branchId: string, month: number, year: number) {
    const endpoint = "docwiseappointment/doc-schedule-token"
    return this.apiService.get(endpoint, { doctorId: doctorId, branchId: branchId, month: month, year: year })
  }







  GetDoctorScheduleByDateAsync(branchId: string, doctorId: string, date: any) {
    const endpoint = "docwiseappointment/doc-schedule-by-date"
    return this.apiService.get(endpoint, { branchId: branchId, doctorId: doctorId, date: date })
  }
  GetDoctorTokenListAsync(branchId: string, doctorId: string, date: any) {
    const endpoint = "docwiseappointment/doc-token-list"
    return this.apiService.get(endpoint, { branchId: branchId, doctorId: doctorId, date: date })
  }
  GetDoctorLeaveCountByDateAsync(branchId: string, doctorId: string, date: any) {
    const endpoint = "docwiseappointment/doc-leave-by-date"
    return this.apiService.get(endpoint, { branchId: branchId, doctorId: doctorId, date: date })
  }
  GetWaitingListBookingCountByDateAsync(branchId: string, doctorId: string, date: any) {
    const endpoint = "docwiseappointment/waiting-list-booking"
    return this.apiService.get(endpoint, { branchId: branchId, doctorId: doctorId, date: date })
  }
  GetOnlineDoctorAvailabilityByDateAsync(branchId: string, doctorId: string, date: any) {
    const endpoint = "docwiseappointment/doc-online-availability"
    return this.apiService.get(endpoint, { branchId: branchId, doctorId: doctorId, date: date })
  }
  GetDoctorNonAvailabilityByDateAsync(branchId: string, doctorId: string, date: any) {
    const endpoint = "docwiseappointment/doc-non-availabitity"
    return this.apiService.get(endpoint, { branchId: branchId, doctorId: doctorId, date: date })
  }




  GetDoctorFdAppTokensAsync(doctorId: string, branchId: string, date: any) {
    const endpoint = "docwiseappointment/doc-app-token"
    return this.apiService.get(endpoint, { branchId: branchId, doctorId: doctorId, date: date })
  }

  SearchPatientByNameAsync(name: string) {
    const endpoint = "docwiseappointment/patient-search-by-name"
    return this.apiService.get(endpoint, { name: name })
  }

  SearchPatientAsync(name: string) {
    const endpoint = "docwiseappointment/patient-search"
    return this.apiService.get(endpoint, { name: name })
  }


  SubmitOrUpdatePatientBookingRegistration(booking: any) {
    const endpoint = "docwiseappointment/patient-booking-reg"
    return this.apiService.post(endpoint, booking)
  }


  AppointmentCancel(bookingId: string, cancelStatusId: string, visitDate: any, BranchId: string, cancelReason: string, DoctorId: string, TokenNo: string) {
    const endpoint = "docwiseappointment/appnmt-cancel"
    return this.apiService.get(endpoint, { bookingId: bookingId, cancelStatusId: cancelStatusId, visitDate: visitDate, BranchId: BranchId, cancelReason: cancelReason, DoctorId: DoctorId, TokenNo: TokenNo })
  }


  ConfirmAppointmentAsync(bookingId: string, remarks: string) {
    const endpoint = "docwiseappointment/appnmt-confirm"
    return this.apiService.get(endpoint, { bookingId: bookingId, remarks: remarks })
  }

  InsertBookingCallLogAsync(bookingId: string, remarks: string, connectStatus: string) {
    const endpoint = "docwiseappointment/booking-call-ins"
    return this.apiService.get(endpoint, { bookingId: bookingId, remarks: remarks, connectStatus: connectStatus })
  }

  GetBookingCallHistoryAsync(bookingId: string) {
    const endpoint = "docwiseappointment/booking-call-history"
    return this.apiService.get(endpoint, { bookingId: bookingId })
  }



  ReallocateAppointment(bookingId: string, branchId: string, doctorId: any, tokenNo: number, visitDate: any, RescheduledDate: any) {
    const endpoint = "docwiseappointment/appnmt-reallocation"
    return this.apiService.get(endpoint, { bookingId: bookingId, branchId: branchId, doctorId: doctorId, tokenNo: tokenNo, visitDate: visitDate, RescheduledDate: RescheduledDate })
  }
}
