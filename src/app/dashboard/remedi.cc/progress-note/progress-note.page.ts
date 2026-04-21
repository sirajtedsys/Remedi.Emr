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
  IonIcon,IonGrid,IonRow,IonCol,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonCardSubtitle,
  IonList,IonItem,IonLabel, IonTextarea,
  IonCheckbox
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
import { IonicModule } from "@ionic/angular";
import { ProgressNote } from 'src/app/shared/class/progressnote';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { EmrPatientInfo } from 'src/app/shared/interfaces/patient-list/emr-patient-info';
import { PatientListDatewiseItem } from 'src/app/shared/interfaces/patient-list/patient-list-date-wise-item';@Component({
  selector: 'app-progress-note',
  templateUrl: './progress-note.page.html',
  styleUrls: ['./progress-note.page.scss'],
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
    IonCheckbox,
        MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
]
})
export class ProgressNotePage implements OnInit {

  paitentData!:PatientListDatewiseItem

   emrDocid:any
patId:any
doc:any
patientTypeId:any
  patTypeList:Section[]=[]
  patmsg=new  PatientMsg()
  isAlertChecked: boolean = false;
  DateList:any[]=[]
  selectedDateString: string = '';
  newTypeId:any;
  oldTypeId:any;
  create_dt:any;
  progressNote = new ProgressNote();
progressNoteList: any[] = [];
  isEditMode: boolean =false;
  fromDate: string = '';  
   Today:any
     ismobile: boolean = false;
  constructor(private lookupService: LookupService,
      private authser: AuthService,
      private shared:SharedDataService,
      private datePipe: DatePipe,
      private route: ActivatedRoute,
      private proc: ProcrequestService,private notificationService: NotificationService) {
         this.pageLoaders()
          this.Today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.fromDate=this.Today
       }

      async pageLoaders() {
  //  this.getDocFromGrandparent()
  this.getPatientDataFromShared()
 
  }


  getPatientDataFromShared(){
    this.paitentData = this.shared.getPatient()
    console.log( this.paitentData)
        this.emrDocid = this.paitentData.emR_DOC_ID;
      // console.log(this.emrDocid, 'EmrdocId');
      this.patId = this.paitentData.patI_ID;
      // console.log(this.patId, 'PatientId');
      this.progressNote.emR_DOC_ID = this.emrDocid;
      // this.progressNote.emR_PA_ID=this.patId;
      //  this.progressNote.EMR_PA_ID = this.paitentData.patI_ID; 
       console.log(this.progressNote.EMR_PA_ID)
      // this.progressNote.emR_DOC_ID = this.emrDocid;
this.getProgressNoteList();  // Fetch notes
  }


async Submit() {

  if (!this.progressNote.progress_Note && !this.progressNote.advice) {
    this.notificationService.showNotification('Please enter Progress Note or Advice');
    return;
  }
console.log(this.progressNote);
  (await this.proc.saveProgressNote(this.progressNote))
    .subscribe(
      (res: any) => {
        if (res > 0) {
                  this.isEditMode = false;
          this.notificationService.showNotification('Progress Note saved successfully');
          this.progressNote.progress_Note = '';
          this.progressNote.advice = '';
          //  this.progressNote = []
        this.getProgressNoteList();
        }
      },
      (error: any) => {
        this.notificationService.showNotification('Error saving Progress Note');
      }
    );
}

async getProgressNoteList() {
  if (!this.emrDocid) return;

  (await this.proc.getProgressNoteList(this.emrDocid))
    .subscribe(
      (res: any[]) => {
        this.progressNoteList = res.map(x => ({
          EMR_PA_ID: x.emR_PA_ID,
          emR_DOC_ID: x.emR_DOC_ID,
          progressNote: x.progresS_NOTE,
          advice: x.advice,
          createDate: this.datePipe.transform(x.creatE_DATE, 'yyyy-MM-dd') // ✅ IMPORTANT
        }));
      },
      () => {
        this.notificationService.showNotification('Error fetching Progress Notes');
      }
    );
}

isTodayNote(item: any): boolean {
  return item.createDate === this.Today;
}


editNote(item: any) {
  this.progressNote.EMR_PA_ID = item.EMR_PA_ID;   // ✅ REQUIRED
  this.progressNote.emR_DOC_ID = item.emR_DOC_ID;
  this.progressNote.progress_Note = item.progressNote;
  this.progressNote.advice = item.advice;

  this.isEditMode = true;
}

onFromDateChange(event: any): void {
}
  ngOnInit() {
      this.checkScreenSize();
  }
onResize() {
  this.checkScreenSize();
}

checkScreenSize() {
  this.ismobile = window.innerWidth < 992;
}

clearForm() {
  this.progressNote.progress_Note = '';
  this.progressNote.advice = '';

  // IMPORTANT: reset edit state
  this.progressNote.EMR_PA_ID = undefined;
  this.isEditMode = false;
}

}
