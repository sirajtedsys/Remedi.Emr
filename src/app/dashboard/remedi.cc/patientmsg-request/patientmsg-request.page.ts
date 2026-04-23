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
  IonButtons,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonIcon,IonItem, IonLabel, IonModal } from '@ionic/angular/standalone';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonService } from 'src/app/shared/services/common.service';
// import { AuthService } from 'src/services/Auth.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomToastService } from 'src/app/shared/services/custom-toast.service';
import { TokenService } from 'src/app/shared/services/token.service';

import { PatientlistService } from 'src/app/shared/services/patientlist.service';
import { DatePipe } from '@angular/common';

import { ActivatedRoute } from '@angular/router';
import { DateFormat } from 'src/app/shared/class/DateFormat';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { DateAdapter, MAT_DATE_FORMATS,MAT_DATE_LOCALE } from '@angular/material/core';
  import { 
  calendarOutline,
  eyeOutline ,
  searchOutline,eyeSharp,closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-patientmsg-request',
  templateUrl: './patientmsg-request.page.html',
  styleUrls: ['./patientmsg-request.page.scss'],
  standalone: true,
 imports: [IonModal, IonLabel,
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonIcon,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    IonItem, IonModal],
providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DateFormat },
]
})
export class PatientmsgRequestPage implements OnInit {
   calendar = calendarOutline;
  eyeOutline=eyeOutline;
  searchOutline=searchOutline;
eyeSharp=eyeSharp;
closeOutline=closeOutline;
modalAction: 'e' | 'd' = 'e'; // default Edit

 toDate: string = '';
 Today:any
  fromDate:any
  PatientList: any[] = [];
loading = false;
patientMsgList: any[] = [];
  showMewsModal = false;
  reqId: any;
newRemarks: any;
  status: string='';
  reqStatus:string='R';
  opnmsgId: any;
  newMsg: any;
  ismobile: boolean = false;
  constructor(private comser:CommonService,
    private patient:PatientlistService,
    private router:Router,
      private route: ActivatedRoute,
     private authser:AuthService,
    private tokenservice:TokenService,
   private datePipe:DatePipe,
    private cts:CustomToastService, private notificationService: NotificationService) { 
       this.Today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.fromDate=this.Today
     this.toDate=this.Today
     this.viewPatientRequest() ;
    }

async viewPatientRequest() {
  if (!this.fromDate || !this.toDate) {
    this.cts.showToast('Please select From and To date');
    return;
  }

  this.loading = true;

  try {
    // Subscribe directly without using await
    (await
      // Subscribe directly without using await
      this.patient.getPatientMessageRequest(this.fromDate, this.toDate,this.reqStatus)).subscribe(
      (res: any) => {
        console.log('API response:', res);

        // Assign an array to PatientList to avoid NG0900
        // If your API returns { data: [...] }, use res.data, otherwise use res directly
        if (Array.isArray(res)) {
          this.PatientList = res;
        } else if (res?.data && Array.isArray(res.data)) {
          this.PatientList = res.data;
        } else {
          this.PatientList = [];
        }
      },
      (err) => {
        console.error('Error fetching patient messages:', err);
        this.cts.showToast('Failed to load patient messages');
        this.PatientList = [];
      }
    );
  } catch (err) {
    console.error('Unexpected error:', err);
    this.cts.showToast('An unexpected error occurred');
    this.PatientList = [];
  } finally {
    this.loading = false;
  }
}

editPatientMessage(item: any, actionFlag: 'e' | 'd') {
  console.log('Editing patient message:', item, 'Action:', actionFlag);

  // this.reqId = item.req_Id;
    this.reqId = Number(item.req_Id); 
    this.opnmsgId=item.opn_Message_Id;
    
    this.newMsg=item.new_Msg;
    console.log(this.newMsg)
    this.newRemarks=item.remarks;

  console.log('req_Id:', this.reqId);
  // Store selected message and action
  this.selectedMessage = { ...item }; // clone
   this.modalAction = actionFlag; // 'e' = Edit, 'd' = Delete
  // if(actionFlag=='d')
  // {

  // }

    // Reset remarks and new message ONLY on 1st modal open
  this.selectedMessage.remarks = '';
  if (actionFlag === 'e') {
    //  this.selectedMessage.new_Msg = '';
  }

  // Open modal
  this.showMewsModal = true;
}


  openMewsModal() {
    this.showMewsModal = true;
  }

  closeMewsModal() {
    this.showMewsModal = false;
  }// Modal control variables
isEditModalOpen = false;
selectedMessage: any = null;


// Close modal without saving
closeEditModal() {
  this.isEditModalOpen = false;
  this.selectedMessage = null;
}

// Save edited message
  async saveEdit() {
  if (!this.selectedMessage) return;
console.log(this.selectedMessage.approvedRemarks);

  if (this.selectedMessage.status !== 'Approved' && this.selectedMessage.status !== 'Rejected') {
  this.notificationService.showNotification('Please select Approved or Rejected status');
  return;
}


  // Validation: Remarks cannot be empty
  if (!this.selectedMessage.remarks || this.selectedMessage.remarks.trim() === '') {
    this.notificationService.showNotification('Please enter remarks');
    return;
  } 

  const status = this.selectedMessage.status; // 'A' or 'J'
  console.log(this.selectedMessage.status);
  const newMsg = this.selectedMessage.new_Msg; // get edited message

  console.log(this.modalAction);
console.log( this.selectedMessage.remarks );
  

  (await this.patient.updatePatientMessage(
    this.reqId,
    this.selectedMessage.remarks ?? '',status ,this.opnmsgId,newMsg,this.modalAction
   
  )).subscribe({
    next: (res) => {
      console.log('Update result:', res);

       if(res>0)
      {
          this.notificationService.showNotification('Patient message updated successfully');
            // this.cts.showToast('Patient message updated successfully');
            this.viewPatientRequest() ;
            this.closeMewsModal();
      }
    },
    error: (err: any) => {
      console.error('Error updating patient message', err);
      // this.cts.showToast('Failed to update message');
         this.notificationService.showNotification('Failed to Update message');
    }
  });
}

onStatusChange() {
  console.log('Status changed to:', this.reqStatus);
  this.viewPatientRequest();
}

 


ngOnInit() {
  this.checkScreenSize();
}

// @HostListener('window:resize', ['$event'])
onResize() {
  this.checkScreenSize();
}

checkScreenSize() {
  this.ismobile = window.innerWidth < 992;
}


}


