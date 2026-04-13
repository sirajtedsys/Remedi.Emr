import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, throwError, Observable } from 'rxjs';
import { TokenService } from './token.service';
import { AppConfig } from '../class/app-config';
import { Router } from '@angular/router';
import { NotificationService } from './notification/notification.service';
// import { AppConfig } from '../class/app-config';

@Injectable({ providedIn: 'root' })
export class ApiService {
  appConfig = new AppConfig()
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
        private router: Router,
        private notification:NotificationService
    // private appConfig: AppConfig
  ) {}

  private async getHeaders(): Promise<HttpHeaders> {
    const token = await this.tokenService.getToken();
    return new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  private handleError(context: string) {
    return (error: any) => {
      console.error(`Error in ${context}:`, error);
      this.notification.showNotification(error.Details,'error')
      if(error.status === 401){
        this.LogOutMethod()
      }
      return throwError(() => error);
    };
  }
    LogOutMethod() {


    this.router.navigate(['login'])
    this.tokenService.removeToken()
    this.tokenService.clearStorage()


  }

  async get(endpoint: string, queryParams?: any): Promise<Observable<any>> {
    const headers = await this.getHeaders();

    let params = new HttpParams();
    if (queryParams) {
      Object.keys(queryParams).forEach(key => {
        params = params.set(key, queryParams[key]);
      });
    }

    const url = `${this.appConfig.url}/v1/${endpoint}`;
    return this.http.get(url, { headers, params }).pipe(
      catchError(this.handleError(endpoint))
    );
  }

  async post(endpoint: string, body: any): Promise<Observable<any>> {
    const headers = await this.getHeaders();
    const url = `${this.appConfig.url}/v1/${endpoint}`;
    return this.http.post(url, body, { headers }).pipe(
      catchError(this.handleError(endpoint))
    );
  }

  // Optional: put, delete methods...
}
