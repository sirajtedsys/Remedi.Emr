import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* Ionic Standalone Components */
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon, IonBadge } from '@ionic/angular/standalone';
import {
  searchOutline, fileTrayOutline
} from 'ionicons/icons';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

// import { AuthService } from 'src/services/Auth.service';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';

import { ActivatedRoute } from '@angular/router';
// import { EmrPatientInfo } from 'src/app/interfaces/patient-list/emr-patient-info';
import { addIcons } from 'ionicons';
import { CommonService } from 'src/app/shared/services/common.service';
import { PatientlistService } from 'src/app/shared/services/patientlist.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { CustomToastService } from 'src/app/shared/services/custom-toast.service';
import { BookingVisitReport } from 'src/app/shared/interfaces/remedi.cc/appoitnment-details/booking-visit-report';
import { DateFormat } from 'src/app/shared/class/DateFormat';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.page.html',
  styleUrls: ['./appointment-details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DateFormat },
  ]
})
export class AppointmentDetailsPage implements OnInit {
  // BookingVisitReportList:BookingVisitReport[]=[]
  fromDate: string = '';
  toDate: string = '';
  Today: any
  appData: BookingVisitReport[] = [];
  selectedType: string ="0";
  searchOutline = searchOutline;
  constructor(private comser: CommonService,
    private patient: PatientlistService,
    private router: Router,
    private route: ActivatedRoute,
    private authser: AuthService,
    private tokenservice: TokenService,
    private datePipe: DatePipe,
    private notificationService: NotificationService,
    private cts: CustomToastService) {
    addIcons({ fileTrayOutline, searchOutline });

  }

  ngOnInit() {
    this.Today = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    this.fromDate = this.Today
    this.toDate = this.Today
    console.log('a')
  }

  onDateChange(event: any) {
    console.log(event._d);
  }
  onTypeChange() {
    // this.showActions = !!this.selectedType;
    // this.showAccordion = !!this.selectedType;
  }


  async appointmentData() {

    console.log('aa')
    if (!this.fromDate || !this.toDate) {
      this.notificationService.showNotification('Please select From and To date', 'warning');
      return;
    }

    if (this.toDate < this.fromDate) {
      this.notificationService.showNotification('To Date should be greater than From Date', 'warning');
      return;
    }

    const formattedFromDate = this.datePipe.transform(this.fromDate, 'dd/MMM/yyyy');
    const formattedToDate = this.datePipe.transform(this.toDate, 'dd/MMM/yyyy');

    console.log('From:', formattedFromDate);
    console.log('To:', formattedToDate);
    console.log('Visit Type:', this.selectedType);



    (await this.patient.getBookingNotVisitedReport(formattedFromDate, formattedToDate, this.selectedType)).subscribe(
      (data: any) => {
        console.log(data); // Inspect structure

        if (data && data.length > 0) {
          this.appData = data; // 👈 Since it's an array with one object
          // this.updateStatsData();
        } else {
          this.appData = []
        }
      },
      (error: any) => {
        console.error('Error fetching pAppointment Data:', error);
      }
    );
    // Call API here
    // this.getBookingNotVisitedReport(formattedFromDate, formattedToDate, this.selectedType);
  }



}
