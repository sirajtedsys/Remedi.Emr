// import { HttpHeaders } from '@angular/common/module.d';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../class/app-config';
import { TokenService } from './token.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  appconfig = new AppConfig()

  constructor(
    private http: HttpClient,
    private authser: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private apiService: ApiService
  ) {

  }

  async GetDoctorIdByEmployeeAsync() {
    let endpoint = 'common/fetch-doctid'
    return await this.apiService.get(endpoint)
  }


  async getActiveWallets() {
    let endpoint = 'lookup/wallets'
    return await this.apiService.get(endpoint)
  }

  async GetActiveCardTypes() {
    let endpoint = 'lookup/card-types'
    return await this.apiService.get(endpoint)
  }



  async getAllFilteredBanks() {
    let endpoint = 'lookup/banks'
    return await this.apiService.get(endpoint)

  }
  async GetAllDoctors() {
    let endpoint = 'lookup/doctors'
    return await this.apiService.get(endpoint)

  }


  async GetServiceAvailabelSections() {
    let endpoint = 'remediemr/service-sections'
    return await this.apiService.get(endpoint)

  }



  async GetServiceAvailabelDept() {
    let endpoint = 'remediemr/service-depts'
    return await this.apiService.get(endpoint)

  }

  async GetAllServiceStatus() {
    let endpoint = 'lookup/service-status'
    return await this.apiService.get(endpoint)

  }


  async GetAllRooms() {
    let endpoint = 'lookup/rooms'
    return await this.apiService.get(endpoint)

  }

  async GetAllLevels() {
    let endpoint = 'lookup/levels'
    return await this.apiService.get(endpoint)

  }

  async GetAllRoomByLevel() {
    let endpoint = 'lookup/room-by-level'
    return await this.apiService.get(endpoint)

  }

  async GetAllRoomByLevelId(level: number) {
    let endpoint = 'lookup/room-by-levelid'
    return await this.apiService.get(endpoint, { levelId: level })

  }

  GetActiveIdentityCardsAsync() {
    const endpoint = "lookup/identity-cards"
    return this.apiService.get(endpoint)
  }

  GetActiveAppointmentTokenTypesAsync() {
    const endpoint = "lookup/appointment-token-types"
    return this.apiService.get(endpoint)
  }
  GetDoctorAppointmentProceduresAsync(doctorId: string, branchId: string) {
    const endpoint = "lookup/doc-appointment-procedures"
    return this.apiService.get(endpoint, { doctorId: doctorId, branchId: branchId })
  }

  GetDoctorTokenListAsync(doctorId: string, branchId: string, date: any) {
    const endpoint = "lookup/doc-token-list"
    return this.apiService.get(endpoint, { branchId: branchId, doctorId: doctorId, date: date })
  }


  GetAppointmentCancelStatusAsync() {
    const endpoint = "lookup/appointment-cancel-sts"
    return this.apiService.get(endpoint)
  }


  GetActiveProcedures() {
    const endpoint = "lookup/active-procedures"
    return this.apiService.get(endpoint)
  }


  GetMachines() {
    const endpoint = "lookup/machines"
    return this.apiService.get(endpoint)
  }






  GetUserDetails() {
    const endpoint = "common/user-details"
    return this.apiService.get(endpoint)
  }

}
