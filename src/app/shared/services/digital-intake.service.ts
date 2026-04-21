import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DigitalIntakeService {

  constructor(
    private apiService: ApiService
  ) { }

  SaveDigitalIntakeAssessmentAsync(dto: any) {
    return this.apiService.post('digitalintake/save-digital-intake', dto)
  }



  GetDigitalIntakeAsync(emrDocId: any) {
    return this.apiService.get('digitalintake/exisitng-digital-intake', {emrDocId:emrDocId})
  }
}
