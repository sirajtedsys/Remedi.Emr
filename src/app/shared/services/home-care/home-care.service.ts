
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class HomeCareService {

  private readonly endpoint = 'HomeCare';

  constructor(private apiService: ApiService) {}

  // ============================================================
  // GET HOME CARE FUNCTIONAL DETAILS
  // ============================================================

  GetHomeCareFunctionalDetails(params: { hcsId: number }) {
    return this.apiService.get(
      `${this.endpoint}/home-care-functional-details`,
      params
    );
  }

  // ============================================================
  // GET HOME CARE SERVICE
  // ============================================================

  GetHomeCareService(params: {
    patiId: string;
    emrDocId: string;
  }) {
    return this.apiService.get(
      `${this.endpoint}/get-home-care-service`,
      params
    );
  }

  // ============================================================
  // GET HOME CARE SERVICE DETAILS
  // ============================================================

  GetHomeCareServiceDetails(params: { hcsId: number }) {
    return this.apiService.get(
      `${this.endpoint}/get-home-care-service-details`,
      params
    );
  }

  // ============================================================
  // GET HOME CARE SYSTEM DETAILS
  // ============================================================

  GetHomeCareSystemDetails(params: { hcsId: number }) {
    return this.apiService.get(
      `${this.endpoint}/get-home-care-system-details`,
      params
    );
  }

  // ============================================================
  // GET HOME FUNCTIONAL DETAILS
  // ============================================================

  GetHomeFunctionalDetails(params: { hcsId: number }) {
    return this.apiService.get(
      `${this.endpoint}/get-home-functional-details`,
      params
    );
  }

  // ============================================================
  // SAVE HOME CARE SERVICE
  // ============================================================

  SaveHomeCareService(request: any) {
    return this.apiService.post(
      `${this.endpoint}/save-home-care-service`,
      request
    );
  }

  // ============================================================
  // SAVE HOME CARE SYSTEM DETAILS
  // ============================================================

  SaveHomeCareSystemDetails(params: {
    hcsId: number;
    sysData: string | null;
  }) {
    return this.apiService.post(
      `${this.endpoint}/save-home-care-system-details?hcsId=${params.hcsId}`,
      params.sysData
    );
  }

  // ============================================================
  // SAVE HOME FUNCTIONAL DETAILS
  // ============================================================

  SaveHomeFunctionalDetails(params: {
    hcsId: number;
    funcData: string | null;
  }) {
    return this.apiService.post(
      `${this.endpoint}/save-home-functional-details?hcsId=${params.hcsId}`,
      params.funcData
    );
  }

  // ============================================================
  // SAVE HOME CARE SERVICE DETAILS
  // ============================================================

  SaveHomeCareServiceDetails(params: {
    hcsId: number;
    homeCareMIds: string | null;
  }) {
    return this.apiService.post(
      `${this.endpoint}/save-home-care-service-details?hcsId=${params.hcsId}`,
      params.homeCareMIds
    );
  }

  // ============================================================
  // GET HOME CARE FUNCTIONAL
  // ============================================================

  GetHomeCareFunctional() {
    return this.apiService.get(
      `${this.endpoint}/get-home-care-functional`
    );
  }

  // ============================================================
  // GET HOME CARE SERVICES
  // ============================================================

  GetHomeCareServices(params?: { homeType?: string | null }) {
    return this.apiService.get(
      `${this.endpoint}/get-home-care-services`,
      params
    );
  }

  // ============================================================
  // GET HOME CARE SYSTEMS EXAM
  // ============================================================

  GetHomeCareSystemsExam() {
    return this.apiService.get(
      `${this.endpoint}/get-home-care-systems-exam`
    );
  }

  
  GetActiveHomeCareServicesAsync() {
    return this.apiService.get(
      `${this.endpoint}/get-home-care-service-masters`
    );
  }


}