import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  constructor(
    private apiService: ApiService
  ) { }


  getEmployeeBranches() {
    return this.apiService.get('common/employee-branches');
  }


}
