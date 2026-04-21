import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NpaService {

  constructor(
    private apiService: ApiService,
  ) { }

  getCCModuleConfigs() {
    return this.apiService.get('ccmodule/cc-module-configs');
  }

  submitNpa(payload: any) {
    return this.apiService.post('ccmodule/npa-submit', payload);
  }

   GetAssessmentAsync(emrDocId: any) {
    return this.apiService.get('ccmodule/exisitng-npa-form', {emrDocId:emrDocId});
  }
}
