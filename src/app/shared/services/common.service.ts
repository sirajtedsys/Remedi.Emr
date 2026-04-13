import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, retry, throwError } from 'rxjs';
// import { AppConfig } from 'src/Class/AppConfig';
// import { AuthService } from './auth.service';
import { LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
// import { AppConfig } from 'src/class/AppConfig';
import { Router } from '@angular/router';
// import { AppConfig } from 'src/app/class/AppConfig';
// import { AuthService } from './Auth.service';

// import Swal from 'sweetalert2';
// import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { AppConfig } from '../class/app-config';
// import { AuthService } from './Auth.service';
// import { AuthService } from './Auth.service';
// import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

import { NotificationService } from 'src/app/shared/services/notification/notification.service';
declare var bootstrap: any
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // GetUserDetails() {
  //   throw new Error('Method not implemented.');
  // }
  appconfig = new AppConfig()
  decryptiondata: any




  constructor(private http: HttpClient, private authser: AuthService, private loadingCtrl: LoadingController,
    private datePipe: DatePipe, private router: Router, private notificationService: NotificationService) { }
  isLoading: boolean = false
  async presentLoading() {
    this.isLoading = true;
    const loading = await this.loadingCtrl.create({
      cssClass: 'custom-loading', // Optional: Apply custom CSS class for styling
      message: 'Loading...', // Optional: Custom message
      spinner: 'dots', // Optional: Choose a spinner
      // duration: 2000 // Optional: Set a duration after which the loader will automatically dismiss
    });
    await loading.present();

    // Uncomment below line to auto-hide the loader after 2 seconds (duration)
    // setTimeout(() => loading.dismiss(), 2000);
  }


  openBootstrapModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  closeBootstrapModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  }








  CheckForUnAuthorised(error: any) {
    if (error.status == 401) {
      // window.location.reload()
      this.authser.logOutMethod()
      this.router.navigate(['login'])
    }

  }

  CheckFor404(error: any) {
    if (error.status == 404) {
      // window.location.reload()
      // Swal.fire("Oops! The requested resource was not found.",'','error')
      this.notificationService.showNotification('Oops! The requested resource was not found', 'error');
      // this.authser.LogOutMethod()
      // this.router.navigate(['login'])
    }

  }

  CheckForSt0(error: any) {
    if (error.status == 0) {
      // window.location.reload()
      // Swal.fire("Request failed! The server may be down or unavailable",'','error')
      this.notificationService.showNotification('"Request failed! The server may be down or unavailable', 'error');
      // this.authser.LogOutMethod()
      // this.router.navigate(['login'])
    }

  }

  //  "Request failed! The server may be down or unavailable."

  async dismissLoading() {
    this.isLoading = false;
    await this.loadingCtrl.dismiss();
  }

  formatDate(date: string): string {
    const transformedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return transformedDate ? transformedDate : ''; // Handle null case
  }

  getFirstDayOfMonth(date: Date): Date {
    // Create a new date object based on the provided date
    const firstDay = new Date(date);

    // Set the date to 1, which will automatically adjust the month
    firstDay.setDate(1);

    // Return the first day of the month
    return firstDay;
  }


  getLastDateOfMonth(date: string | Date): Date {
    const inputDate = new Date(date);
    return new Date(inputDate.getFullYear(), inputDate.getMonth() + 1, 0);
  }



  GetDecryptedData() {
    // this.decryptiondata= this.authser.DecryptToken()
  }

  calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    // console.log(birthDate);

    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    // console.log(age);

    return age;
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  isUrlOrIp(input: string): boolean {
    // Updated regular expression for URLs, including localhost and optional port numbers
    const urlRegex = /^(https?:\/\/)?((localhost|([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,63})|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/.*)?$/;

    // Regular expression for IPv4 addresses
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    // Check if the input matches either the updated URL regex or the IP regex
    return urlRegex.test(input) || ipRegex.test(input);
  }

  // convertToDate(dateStr: string): Date {
  //   const [day, month, year] = dateStr.split('-').map(Number);

  //   // month - 1 because JS months are 0-based
  //   return new Date(year, month - 1, day);
  // }

  convertToDate(dateInput: any): Date {

    if (!dateInput) return new Date();

    // if already Date object
    if (dateInput instanceof Date) {
      return dateInput;
    }

    // if string like "Fri Feb 20 2026"
    if (!dateInput.includes('-')) {
      const d = new Date(dateInput);
      if (!isNaN(d.getTime())) return d;
    }

    // if dd-MM-yyyy
    const parts = dateInput.split('-');
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      return new Date(year, month - 1, day);
    }

    // fallback
    const fallback = new Date(dateInput);
    return isNaN(fallback.getTime()) ? new Date() : fallback;
  }


  combineDateAndTime(dateStr: string, timeStr: string): Date {
    console.log(dateStr, timeStr);

    if (!dateStr || !timeStr) return new Date();

    // split date
    const [day, month, year] = dateStr.split('-').map(Number);

    // split time
    let [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier?.toLowerCase() === 'pm' && hours < 12) {
      hours += 12;
    }

    if (modifier?.toLowerCase() === 'am' && hours === 12) {
      hours = 0;
    }

    return new Date(year, month - 1, day, hours, minutes, 0);
  }




  getSumByKey<T>(arr: T[], key: keyof T): number {
    return arr.reduce((sum, obj) => sum + (Number(obj[key]) || 0), 0);
  }
  // SaveOrUpdateDevice(string deviceId, string fcmToken, string name, string dispLocationId


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    return window.innerWidth < 767;
    // console.log('Is Mobile:', this.isMobile);

    // let v = { mob: this.isMobile };
    // localStorage.setItem('viewsize', JSON.stringify(v));
  }


  hasAnyValue(control: any): boolean {

    if (!control) return false;

    // If FormControl
    if (control.value !== null && control.value !== '' && control.value !== false) {
      if (typeof control.value === 'string' && control.value.trim() === '') {
        return false;
      }
      return true;
    }

    // If FormGroup
    if (control.controls) {
      return Object.values(control.controls).some((ctrl: any) =>
        this.hasAnyValue(ctrl)
      );
    }

    // If FormArray
    if (Array.isArray(control.controls)) {
      return control.controls.some((ctrl: any) =>
        this.hasAnyValue(ctrl)
      );
    }

    return false;
  }



}
