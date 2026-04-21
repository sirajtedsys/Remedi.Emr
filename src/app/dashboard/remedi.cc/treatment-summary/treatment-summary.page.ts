import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { CommonModule, DatePipe } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { LookupService } from 'src/app/shared/services/lookup.service';
import { LookUp } from 'src/app/shared/interfaces/lookup/lookup';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
// import { AuthService } from 'src/services/auth.service';
// import { ModalController, IonicModule } from '@ionic/angular'
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonInput, IonSelect, IonSelectOption, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonList, IonItem, IonText } from '@ionic/angular/standalone';
import { PatientVisitInfo } from 'src/app/shared/interfaces/PatientListpage';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { PatientInfo1 } from 'src/app/shared/interfaces/PatientDetailsPage';
// import { PatientListService } from 'src/app/services/patient-list.service';
import { PatientlistService } from 'src/app/shared/services/patientlist.service';
import { PatientProceduresDto } from 'src/app/shared/interfaces/patient-list/patient-procedure-dto';
// import { ProcrequestService } from 'src/app/shared/services/procrequest.service';
import { ModalPage } from 'src/app/shared/modal/modal.page';
import { bmrequest } from 'src/app/shared/class/bmrequest';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmrPatientInfo } from 'src/app/shared/interfaces/patient-list/emr-patient-info';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { PatientListDatewiseItem } from 'src/app/shared/interfaces/patient-list/patient-list-date-wise-item';
import { ProcrequestService } from 'src/app/shared/services/procrequest.service';
@Component({
  selector: 'app-treatment-summary',
  templateUrl: './treatment-summary.page.html',
  styleUrls: ['./treatment-summary.page.scss'],
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
    IonList, IonItem,
    IonText
]
})
export class TreatmentSummaryPage implements OnInit {
emrDocid:any
patId:any
doc:any
empId:any
strwhere:any
strcnt:any
 hideContactNo:boolean=false
  patientDetails: any;
  previsitlist:any[]=[]
    medDetList:any[]=[]
    presProcedurelist:any[]=[]
      assessmentForm!: FormGroup;
  patientData!: PatientListDatewiseItem;
    ismobile: boolean = false;

  // .,.,
  //prevVisitList:any[]=[]
  constructor(private lookupService: LookupService,
    private authser: AuthService,
        private patient:PatientlistService,
        private shared:SharedDataService,
    // private modalController: ModalController,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private proc: ProcrequestService, 
    private notificationService: NotificationService) {
      
      this.fetchPatientDataFromShared()
          this.HideContactNo()
       this.pageLoaders()
     }

 async pageLoaders() {
  // this.getDocFromGrandparent()
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
         this.patientDetails = decrypted;
         console.log(this.patientDetails);
      this.getPrevisitdetails(this.patId, this.emrDocid ,this.empId,this.strwhere,this.strcnt)


    } catch (error) {
      console.error('Decryption failed:', error);
    }

  }

   async getPrevisitdetails(patId:any,eDocid:any,empId:any,strwhere:any,strcnt:any){
     (await this.proc.getPrevisitdetails(patId,eDocid,empId,strwhere,strcnt)).subscribe((data:any)=>{
      console.log(data);
      if(data.length>0 && data!=null)
      {
        this.previsitlist  = data
        
      }
      else
      {
        this.previsitlist=[]
      }
    },(error:any)=>{
    })
  }

   async getMedicineDet(emrDocid:any,patId:any){
     (await this.proc.getMedicineDet(emrDocid,patId)).subscribe((data:any)=>{
      console.log(data);
      if(data.length>0 && data!=null)
      {
        this.medDetList  = data
        
      }
      else
      {
        this.medDetList=[]
      }
    },(error:any)=>{
    })
  }

  selectedPrevisitItem: any = null;

onVisit(item: any) {
  this.selectedPrevisitItem = item;
  console.log('Selected:', item);
   const selectedDocId = item?.emR_DOC_ID;
  const selectedPatId = item?.patI_ID || this.patId; // Use existing if not present

  console.log(selectedDocId)

  if (selectedDocId && selectedPatId) {
      this.getMedicineDet( selectedDocId,selectedPatId)
        this.getPrescProcedure( selectedDocId,selectedPatId)
  }
}

  onVisitClick(item: any): void {
  const selectedDocId = item?.emR_DOC_ID;
  const selectedPatId = item?.patI_ID || this.patId; // Use existing if not present

  console.log(selectedDocId)

  if (selectedDocId && selectedPatId) {
      this.getMedicineDet( selectedDocId,selectedPatId)
        this.getPrescProcedure( selectedDocId,selectedPatId)
  }
}

 async getPrescProcedure(emrDocid:any,patId:any){
     (await this.proc.getPrescProcedure(emrDocid,patId)).subscribe((data:any)=>{
      console.log(data);
      if(data.length>0 && data!=null)
      {
        this.presProcedurelist  = data
        
      }
      else
      {
        this.presProcedurelist=[]
      }
    },(error:any)=>{
    })
  }
splitVisitText(text: string): string[] {
  if (!text) return [];

  // supports | OR -------
  return text.split(/-------|\|/);
}

  async HideContactNo() {

  (await this.patient.HideContactNo()).subscribe(
    (data: any) => {
      console.log(data); // Inspect structure

      this.hideContactNo =Boolean(data.hideContactNo)
      console.log(this.hideContactNo);
      
    },
    (error: any) => {
      console.error('Error fetching patient summary:', error);
    }
  );
}
  fetchPatientDataFromShared() {
    this.patientData = this.shared.getPatient()
    console.log(this.patientData);


    
      // console.log(decrypted);
      this.emrDocid = this.patientData.emR_DOC_ID;
      console.log(this.emrDocid, 'EmrdocId');
      this.patId = this.patientData.patI_ID;
      console.log(this.patId, 'PatientId');
         this.patientDetails = this.patientData;
         console.log(this.patientDetails);
      this.getPrevisitdetails(this.patId, this.emrDocid ,this.empId,this.strwhere,this.strcnt)
    
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


}