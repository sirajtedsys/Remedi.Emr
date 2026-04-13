import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
// import { AppConfig } from '../class/app-config';
import { TokenService } from '../token.service';
import { ApiService } from '../api.service';
import { AppConfig } from '../../class/app-config';

@Injectable({
  providedIn: 'root'
})
export class CashCollectionService {

    appconfig =new AppConfig()

 constructor(
  private http:HttpClient,
  private authser:AuthService,
  private tokenService:TokenService,
  private apiService:ApiService,
    private router:Router
  ) {}

    

 async getSectionDetails() 
  {
    let endpoint = 'cashcollection/section-details'
    return await this.apiService.get(endpoint);

  }


async getCashCollectionDetails(colStatus: string, cond: string, branchId: any) {
  const endpoint = 'cashcollection/cash-collection-details';
  
  const queryParams = {
    colStatus: colStatus,
    cond: cond,
    branchId: branchId
  };

  return this.apiService.get(endpoint, queryParams);
}


  async searchPatientsByOpNoOrMobile(keyword:string) 
  {
    let endpoint = 'cashcollection/search-patient';
     const queryParams = {
        keyword: keyword
      };
    // let queryParams = 'keyword='+keyword
    return await this.apiService.get(endpoint,queryParams);

  }


  
 




}














