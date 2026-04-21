import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle,
  IonList, IonItem, IonLabel, IonTextarea,
  IonCheckbox,IonModal
} from '@ionic/angular/standalone';
import { LookupService } from 'src/app/shared/services/lookup.service';
import { LookUp } from 'src/app/shared/interfaces/lookup/lookup';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
// import { AuthService } from 'src/services/auth.service';
// import { ModalController, IonicModule } from '@ionic/angular'
import { PatientVisitInfo } from 'src/app/shared/interfaces/PatientListpage';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { PatientInfo1 } from 'src/app/shared/interfaces/PatientDetailsPage';
import { Section } from 'src/app/shared/interfaces/lookup/section';
// import { PatientListService } from 'src/app/shared/services/patient-list.service';
import { PatientlistService } from 'src/app/shared/services/patientlist.service';
import { PatientProceduresDto } from 'src/app/shared/interfaces/patient-list/patient-procedure-dto';
import { ProcrequestService } from 'src/app/shared/services/procrequest.service';
import { ModalPage } from 'src/app/shared/modal/modal.page';
import { bmrequest } from 'src/app/shared/class/bmrequest';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { bmchecking } from 'src/app/shared/class/bmchecking';
import { PatientMsg } from 'src/app/shared/class/patientmsg';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { EmrPatientInfo } from 'src/app/shared/interfaces/patient-list/emr-patient-info';
import { PatientListDatewiseItem } from 'src/app/shared/interfaces/patient-list/patient-list-date-wise-item';
@Component({
  selector: 'app-patient-message',
  templateUrl: './patient-message.page.html',
  styleUrls: ['./patient-message.page.scss'],
  standalone: true,
 imports: [
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
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle,
    IonList, IonItem, IonLabel, IonTextarea,
    IonCheckbox,IonModal
  ]
})
export class PatientMessagePage implements OnInit {
paitentData!:PatientListDatewiseItem

  emrDocid: any
  patId: any
  doc: any
  patientTypeId: any
  patTypeList: Section[] = []
  patmsg = new PatientMsg()
  isAlertChecked: boolean = false;
  DateList: any[] = []
  selectedDateString: string = '';
  newTypeId: any;
  oldTypeId: any;
  create_dt: any;
    showMewsModal = false;
selectedMessageId: any;
opn_msgId:any;
opn_message:any;
editMsg = {
  ORIGINAL_MESSAGE: '',
  OPN_MESSAGE: '',
  REMARKS: '',
  EDIT_STATUS: 'E'
};

  constructor(private lookupService: LookupService,
    private authser: AuthService,
    private shared: SharedDataService,
    // private modalController: ModalController,
    private commonService: CommonService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private proc: ProcrequestService, private notificationService: NotificationService) {
    this.pageLoaders()
  }

  ngOnInit() {
  }
  async pageLoaders() {
    this.getPatientDataFromShared()
    // this.getDocFromGrandparent()
    this.getPatientType()
  }


  getPatientDataFromShared() {
    this.paitentData = this.shared.getPatient()
        // console.log(decrypted);
      this.emrDocid = this.paitentData.emR_DOC_ID;
      console.log(this.emrDocid, 'EmrdocId');
      this.patId = this.paitentData.patI_ID;
      console.log(this.patId, 'PatientId');
      this.getPatientTypeByPatiId(this.patId);
      this.getPatientMessageDates(this.patId);
  }


  getDocFromGrandparent() {
    const grandparentSnapshot = this.route.snapshot.parent;
    console.log(grandparentSnapshot);
    if (grandparentSnapshot) {
      this.doc = grandparentSnapshot.params['patI_OPNO'] || null;
      console.log(this.doc);

      this.GetdecryptedData(this.doc)
      // console.log('Extracted doc token from grandparent:', this.doc);
    } else {
      console.error('Grandparent route is not available or does not contain "doc" parameter.');
    }
  }
  GetdecryptedData(val: any) {
    try {
      const decoded = decodeURIComponent(val);
      const decrypted = this.authser.Decrypt(decoded);

      console.log(decrypted);
      this.emrDocid = decrypted.emR_DOC_ID;
      console.log(this.emrDocid, 'EmrdocId');
      this.patId = decrypted.patI_ID;
      console.log(this.patId, 'PatientId');
      this.getPatientTypeByPatiId(this.patId);
      this.getPatientMessageDates(this.patId);

    } catch (error) {
      console.error('Decryption failed:', error);
    }

  }
  async getPatientType() {
    (await this.proc.getPatientType()).subscribe((data: any) => {
      console.log(data);
      if (data.length > 0 && data != null) {
        this.patTypeList = data

      }
      else {
        this.patTypeList = []
      }
    }, (error: any) => {
    })
  }
  async getPatientTypeByPatiId(patId: any) {
    (await this.proc.getPatientTypeByPatiId(patId)).subscribe((data: any) => {
      console.log(data);

      if (data && data.length > 0) {
        // this.patTypeList = data;

        // ✅ Set selected patient type ID from the first item
        this.patientTypeId = data[0].id; // Assuming the first one is selected
        this.oldTypeId = data[0].id;
      } else {
        this.patTypeList = [];
      }
    }, (error: any) => {
      console.error('Error loading patient type by ID', error);
    });
  }

  onPatientTypeChange(event: any) {
    const selectedPatientTypeId = event.target.value;
    console.log(selectedPatientTypeId)
    if (selectedPatientTypeId) {
      this.patientTypeId = selectedPatientTypeId
      this.newTypeId = selectedPatientTypeId
      // this.CheckPayType(selectedLeaveTypeId);
    }
  }
  async UpdatePatientType() {
    (await this.proc.UpdatePatientType(this.patId, this.oldTypeId, this.newTypeId)).subscribe(async (data: any) => {

      console.log(data);

      if (data > 0) {
        this.notificationService.showNotification('Patient  type Updated successfully!');
        //  Swal.fire({icon: 'success',title: 'Success',text: data.Message || 'Patient  type Updated successfully!',});
        //  this.pageLoaders()
      }
      else {
        this.notificationService.showNotification('warning');
        //  Swal.fire(data.Message,'','warning')
      }
    }, (error: any) => {
      // this.toast.showCustomToast(error.message,'red')
    })
  }
  async Submit() {
    console.log(this.patmsg)
    console.log(this.DateList)
    // Validation
    if (!this.patmsg.OPN_MESSAGE || this.patmsg.OPN_MESSAGE.trim() === '') {
      // Swal.fire('Validation Error', 'Message is required.', 'warning');
      this.notificationService.showNotification('Proc Request Deletion successfully!');
      return;
    }
    this.patmsg.PATI_ID = this.patId;
    this.patmsg.EMR_DOC_ID = this.emrDocid;

    // If alert checkbox is selected, update alert message
    const alertCheckbox = (document.getElementById('alertMsg') as HTMLInputElement);
    if (alertCheckbox?.checked) {
      this.patmsg.ALERT_MSG = 'Y';
    } else {
      this.patmsg.ALERT_MSG = 'N';
    }
    (await this.proc.savePatientMessage(this.patmsg)).subscribe(async (data: any) => {

      console.log(data);

      if (data > 0) {
        this.notificationService.showNotification('Patient Message submitted successfully!');
        //  Swal.fire({icon: 'success',title: 'Success',text: data.Message || 'Patient Message submitted successfully!',});
        //  this.pageLoaders()
        // 🧠 Conditionally update patient type
        if (this.oldTypeId !== this.newTypeId) {
          await this.UpdatePatientType();  // Call the update function
        }
        this.getPatientMessageDates(this.patId);
        // this.onDateClick(this.create_dt)

      }
      else {
        this.notificationService.showNotification('warning');
        //  Swal.fire(data.Message,'','warning')
      }
    }, (error: any) => {
      // this.toast.showCustomToast(error.message,'red')
    })
  }


  allMessagesByDate: { [date: string]: any[] } = {}; // 🆕 Add this property


  async getPatientMessageDates(patId: any) {
    (await this.proc.getPatientMessageDates(patId)).subscribe(async (data: any[]) => {
      if (data?.length > 0) {
        this.DateList = data;

        // For each date, fetch messages and store them
        for (const dateItem of this.DateList) {
          const formattedDate = this.datePipe.transform(dateItem, 'dd/MM/yy');
          if (!formattedDate) continue;

          (await this.proc.GetDatedetails(formattedDate, this.patId)).subscribe((msgs: any[]) => {
            this.allMessagesByDate[formattedDate] = msgs || [];
          }, (error: any) => {
            console.error(`Error fetching messages for ${formattedDate}`, error);
          });
        }
      } else {
        this.DateList = [];
      }
    }, (error: any) => {
      console.error('Error loading patient message dates', error);
    });
  }

  selectedMessages: any[] = [];

  async onDateClick(dateItem: any) {
    const selectedDate = this.datePipe.transform(dateItem, 'dd/MM/yy'); // format correctly
    if (!selectedDate || !this.patId) {
      this.notificationService.showNotification('Patient ID or date is missing!');
      // Swal.fire('Missing Info', 'Patient ID or date is missing.', 'warning');
      return;
    }
    this.selectedDateString = selectedDate;

    try {
      (await this.proc.GetDatedetails(selectedDate, this.patId)).subscribe((data: any[]) => {
        this.selectedMessages = data || [];
        console.log(this.selectedMessages)
      }, (error: any) => {
        console.error('Error fetching message details', error);
        this.notificationService.showNotification('Failed to load message details!');
        // Swal.fire('Error', 'Failed to load message details.', 'error');
      });
    } catch (err) {
      console.error(err);
    }
  }
  

  onEdit(message: any) {
    this.selectedMessageId = message.opN_MESSAGE_ID;
  this.editMsg = {
    ORIGINAL_MESSAGE: message.opN_MESSAGE, // 👈 this is the key
    OPN_MESSAGE: '',                       // new message empty by default
    REMARKS: '',
    EDIT_STATUS: 'E'
  };

  this.showMewsModal = true;
}

  openMewsModal() {
    this.showMewsModal = true;
  }

  closeMewsModal() {
    this.showMewsModal = false;
  }// Modal

async submitEditRequest() {

  // 🔐 Validation
  if (this.editMsg.EDIT_STATUS === 'E' && !this.editMsg.OPN_MESSAGE?.trim()) {
    this.notificationService.showNotification('New message is required for Edit');
    return;
  }

  if (this.editMsg.EDIT_STATUS === 'D' && !this.editMsg.REMARKS?.trim()) {
    this.notificationService.showNotification('Remarks are required for Delete');
    return;
  }
  // this.opn_msgId=this.selectedMessageId;
  // pat_Id=this.patId;

  const payload = {
    OPN_MESSAGE_ID: this.selectedMessageId,
    PATI_ID: this.patId,
    OPN_MESSAGE: this.editMsg.EDIT_STATUS === 'E'
      ? this.editMsg.OPN_MESSAGE
      : null,
    EDIT_STATUS: this.editMsg.EDIT_STATUS, // E / D
    REMARKS: this.editMsg.REMARKS
  };

this.opn_message=this.editMsg.EDIT_STATUS === 'E'? this.editMsg.OPN_MESSAGE: null;
 

  (await this.proc.submitPatientMessageEditRequest(this.selectedMessageId,this.patId,this.opn_message,this.editMsg.EDIT_STATUS ,this.editMsg.REMARKS))
    .subscribe((res: any) => {

      if (res > 0) {
        this.notificationService.showNotification(
          'Edit request submitted successfully!'
        );

        this.closeMewsModal();
        this.getPatientMessageDates(this.patId); // refresh list
      } else {
        this.notificationService.showNotification('Failed to submit request');
      }

    }, (error: any) => {
      console.error(error);
      this.notificationService.showNotification('Something went wrong');
    });
}


}
