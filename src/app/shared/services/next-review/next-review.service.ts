import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class NextReviewService {

  constructor(
    private apiService: ApiService,

  ) { }

  GetPatientReviewDetailsAsync(emrDocId: string) {
    return this.apiService.get('nextreview/review-list', { emrDocId: emrDocId })

  }

  SavePatientReviewAsync(dto: any) {
    return this.apiService.post('nextreview/review-ins', dto)

  }

}
