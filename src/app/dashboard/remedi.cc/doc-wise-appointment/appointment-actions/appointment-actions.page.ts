import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonFooter, IonButton, IonIcon, IonItem, IonInput,
  IonLabel, IonSelect, IonSelectOption, IonTextarea, IonSegment,
  IonSegmentButton, IonRadio, IonRadioGroup, IonRow, IonCol,
  IonAccordionGroup, IonAccordion, IonGrid
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, today } from 'ionicons/icons';
import { DoctorListDto } from 'src/app/shared/interfaces/remedi.cc/doctor-wise-appointment/doctor-list-dto';
import { TokenTime } from 'src/app/shared/interfaces/remedi.cc/doctor-wise-appointment/token-time';
import { LookUpWithDefault } from 'src/app/shared/interfaces/lookup/lookup-with-default';
import { AppointmentCallLogHistory } from 'src/app/shared/interfaces/remedi.cc/doctor-wise-appointment/appnmt-call-log-histry';
import { DocWiseAppointmentService } from 'src/app/shared/services/remedi.cc/doc-wise-appointment.service';
import { LookupService } from 'src/app/shared/services/lookup.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { DialogService } from 'src/app/shared/services/notification/dialog.service';
import { CommonService } from 'src/app/shared/services/common.service';


@Component({
  selector: 'app-appointment-actions',
  templateUrl: './appointment-actions.page.html',
  styleUrls: ['./appointment-actions.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonFooter, IonButton, IonIcon, IonItem, IonInput, IonLabel, IonSelect, IonSelectOption, IonTextarea, IonSegment, IonSegmentButton, IonRadio, IonRadioGroup, IonRow, IonCol, IonAccordionGroup, IonAccordion, IonGrid]

})
export class AppointmentActionsPage implements OnInit, OnChanges {

  @Input() patientData: any;
  // @Input() tokenNumber: number = 0;
  // @Input() selectedDate: Date = new Date();


  @Input() DoctorId: string = ''
  @Input() BranchId: string = ''
  @Input() doctorName = '';
  @Input() selectedDate: any;
  @Input() selectedTime: string = '';
  @Input() tokenNumber: number = 0;
  @Input() EmpId: string = '';
  @Input() bookingId: string = '';
  @Output() closePopup = new EventEmitter<any>();

  activeTab: string = 'reallocate';
  currentStatus: string = 'NOT CONFIRMED';

  actionData = {
    reallocateDate: '',
    targetDoctor: '',
    callStatus: 'picked',
    cancelReason: '',
    remarks: ''
  };


  Today: any
  CancelReason: string = ''
  CancelRemarks: string = ''
  RADate: string = '';
  RADoctor: string = '';
  RAToken: string = '';
  CallConnectStatus: "Y" | 'N' | '' = '';
  CallRemarks: string = '';
  REANewDate: any
  READoctor: string = '';
  REAToken: number = 0;
  // doctors = [
  //   { id: '1', name: 'ADARSH SASIDHARAN' },
  //   { id: '2', name: 'ANJANA MOHAN' }
  // ];

  DoctorList: DoctorListDto[] = [];
  TokenTimeList: TokenTime[] = [];
  CancelStatusList: LookUpWithDefault[] = [];
  CallhistoryList: AppointmentCallLogHistory[] = [];

  constructor(
    private dwaService: DocWiseAppointmentService,
    private datePipe: DatePipe,
    private lookupService: LookupService,
    private notification: NotificationService,
    private dialogService: DialogService,
    private commonService: CommonService

  ) {
    this.Today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    addIcons({ checkmarkCircleOutline });
  }

  async processAction() {
    // console.log(`Processing ${this.activeTab} for patient:`, this.patientData.patient);
    console.log('Action Details:', this.actionData);
    // Add logic for API call here
    if (this.activeTab === 'cancel') {

      if (this.CancelReason == '') {
        // Show error message for required cancellation reason
        console.error('Cancellation reason is required');
        this.notification.showNotification('Reason is required', 'warning');
        return;
      }

      const alert = await this.dialogService.showAlert({
        header: 'Are you sure?',
        message: `Do you want to Cancel?`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              // let the user edit
              // this.Url = this.storedUrl?.toString()??'';
            },
          },
          {
            text: 'Confirm Cancellation',
            handler: async () => {


              this.appointmentCancel();
              // this.continueWithUrl(); // safe non-null

            },
          },
        ],
        backdropDismiss: false,
      });

    }
    else if (this.activeTab === 'call') {
      this.SubmitBookingCallLogAsync()
    }
    else if (this.activeTab === 'reallocate') {
      // this.processConfirmInCancelTab();
      this.realocateSubission()
    }
  }

  dismiss() {
    // Logic to close modal
   this.CancelReason = ''
  this.CancelRemarks = ''
  this.RADate = '';
  this.RADoctor = '';
  this.RAToken = '';
  this.CallConnectStatus= '';
  this.CallRemarks = '';
  this.REANewDate= ''
  this.READoctor = '';
  this.REAToken = 0;
  this.onchangesMethods()
  }

  ngOnInit(): void {


  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onchangesMethods()
  }


  onchangesMethods(){
      this.getAllDoctors(this.BranchId);
    this.GetAppointmentCancelStatusAsync()
    this.GetBookingCallHistoryAsync()
    this.READoctor = this.DoctorId
    this.REANewDate = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');

    this.GetDoctorFdAppTokensAsync()
  }


  async appointmentCancel() {
    (await this.dwaService.AppointmentCancel(this.bookingId, this.CancelReason, this.datePipe.transform(this.selectedDate,'dd/MMM/yyyy hh:mm a'), this.BranchId, this.CancelRemarks, this.DoctorId, (this.tokenNumber).toString())).subscribe((response) => {
      console.log('Cancellation Response:', response);
      // Handle response and show success message
      // this.closePopup.emit();
      if (response.status == 200) {
        this.notification.showNotification(response.message ?? 'Cancellation successful', 'success')
        this.closePopup.emit();
      }
      else {
        this.notification.showNotification(response.message ?? 'Cancellation failed', 'error')
      }
    }, (error: any) => {
      console.error('Cancellation Error:', error);
      // Handle error and show error message
    });
  }



  async getAllDoctors(branchId: string, departmentId: number = 0) {
    (await this.dwaService.GetOnlineAppointmentDoctorsAsync(departmentId, branchId)).subscribe((data: any) => {
      console.log(data);
      this.DoctorList = data
      // console.log(
      //   this.DoctorList
      //     .map((x: DoctorListDto) => `'${x.employee_Id}'`)
      //     .join(',')
      // );


    })
  }


  async GetDoctorFdAppTokensAsync() {
    console.log(this.REANewDate, this.Today);

    if (this.REANewDate < this.Today) {
      this.notification.showNotification('Please select a valid date', 'warning')
      return;
    }
    (await this.dwaService.GetDoctorFdAppTokensAsync(this.READoctor, this.BranchId, this.datePipe.transform(this.REANewDate))).subscribe((data: any) => {
      console.log(data);
      // this.AppointmentProcedureList = data
      this.TokenTimeList = data

      if(this.TokenTimeList.length==0)
      {
        this.notification.showNotification('No tokens available for the selected date and doctor', 'info')
      }

    })
  }


  async GetAppointmentCancelStatusAsync() {
    (await this.lookupService.GetAppointmentCancelStatusAsync()).subscribe((data: any) => {
      console.log(data);
      // this.AppointmentProcedureList = data
      this.CancelStatusList = data
      const defaultCancelStatus = this.CancelStatusList.filter((x: LookUpWithDefault) => x.DefaultValue == "Y");
      this.CancelReason = defaultCancelStatus.length > 0 ? defaultCancelStatus[0].id ?? '' : '';
      console.log(this.CancelReason);


    })
  }



  async processConfirmInCancelTab() {
    const alert = await this.dialogService.showAlert({
      header: 'Are you sure?',
      message: `Do you want to Confirm?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // let the user edit
            // this.Url = this.storedUrl?.toString()??'';
          },
        },
        {
          text: 'Confirm',
          handler: async () => {
            // this.continueWithUrl(); // safe non-null

            this.onConfirm();

          },
        },
      ],
      backdropDismiss: false,
    });
  }


  async onConfirm() {
    (await this.dwaService.ConfirmAppointmentAsync(this.bookingId, this.CancelRemarks)).subscribe((response) => {
      console.log('Confirmation Response:', response);
      if (response.status == 200) {
        this.notification.showNotification(response.message ?? 'Confirmation successful', 'success')
        this.closePopup.emit();
      }
      else {
        this.notification.showNotification(response.message ?? 'Confirmation failed', 'error')
      }
    })
  }


  async GetBookingCallHistoryAsync() {
    (await this.dwaService.GetBookingCallHistoryAsync(this.bookingId)).subscribe((data: any) => {
      console.log(data);
      this.CallhistoryList = data
      // this.AppointmentProcedureList = data
      // this.TokenTimeList = data

    })
  }

  async SubmitBookingCallLogAsync() {
    if (this.CallConnectStatus != '') {

      (await this.dwaService.InsertBookingCallLogAsync(this.bookingId, this.CallRemarks, this.CallConnectStatus)).subscribe((response) => {
        console.log('Call Log Insert Response:', response);
        if (response.status == 200) {
          this.notification.showNotification(response.message ?? 'Call log inserted successfully', 'success')
          // Optionally refresh call history or perform other actions
          this.GetBookingCallHistoryAsync();
        }
        else {
          this.notification.showNotification(response.message ?? 'Failed to insert call log', 'error')
        }
      })
    }
    else {
      this.notification.showNotification('Please select call status', 'warning')
    }

  }



  onDocOrDateSelect() {
    if (this.REANewDate != '' && this.READoctor != '') {
      this.GetDoctorFdAppTokensAsync()
    }

  }


  async realocateSubission() {
    if (this.REANewDate == '') {
      this.notification.showNotification('Please select a Date', 'warning')
      return;
    }

    if (this.REANewDate < this.Today) {
      this.notification.showNotification('Please select a valid Date', 'warning')
      return;
    }
    if (this.READoctor == '') {
      this.notification.showNotification('Please select a Doctor', 'warning')
      return;
    }
    if (this.REAToken == 0) {
      this.notification.showNotification('Please select a Token', 'warning')
      return;
    }
    let selectedToken = this.TokenTimeList.filter(x => x.token == this.REAToken)[0].tim;
    await (await this.dwaService.ReallocateAppointment(
      this.bookingId,
      this.BranchId,
      this.READoctor,
      this.REAToken,
      this.datePipe.transform(this.selectedDate),
      this.datePipe.transform(this.commonService.combineDateAndTime(this.datePipe.transform(this.REANewDate, 'dd-MM-yyyy') ?? '', selectedToken), 'dd/MMM/yyyy hh:mm a'))).subscribe((response) => {
        console.log('Reallocation Response:', response);
        if(response.status == 200) {
          this.notification.showNotification(response.message ?? 'Reallocation successful', 'success')
          this.closePopup.emit();
        }
      })


  }
}
