import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';

import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonInput, IonSelect, IonSelectOption, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonList, IonItem, IonLabel, IonTextarea, IonCheckbox, IonAccordionGroup, IonAccordion, IonText, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { LookupService } from 'src/app/shared/services/lookup.service';
import { LookUp } from 'src/app/shared/interfaces/lookup/lookup';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {
  calendarOutline,
  eyeOutline,
  searchOutline, eyeSharp, closeOutline, documentOutline, personCircleOutline, closeCircle, chatbubblesOutline, createOutline, alertCircleOutline, trashOutline,
  addCircle, add
} from 'ionicons/icons';
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
import { CustomToastService } from 'src/app/shared/services/custom-toast.service';
import { PatientListDatewiseItem } from 'src/app/shared/interfaces/patient-list/patient-list-date-wise-item';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
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
    IonAccordionGroup,
    IonAccordion,
    IonText,
    IonFab,
    IonFabButton
  ]
})
export class OrdersPage implements OnInit {
paitentData!: PatientListDatewiseItem

  emrDocid: any
 doctorId:any
  patId: any
  Today: any
  formattedOrderDate: string = '';
  fromDate: any;
  ismobile: boolean = false;
  claimId: any;
  term: any;
  procType: any;

  labTests: any[] = [];
  selectAllLab: boolean = false;
  procedures: any[] = [
    this.createProcedureRow()
  ];

  selectAllProcedure = false;
  patentId: any;
  edocId: any;
  claimList: any[] = [];
  procList: any[] = [];

  radiologyTests: any[] = [];
selectAllRadiology = false;
injections: any[] = [];
treatment: any[] = [this.createEmptyTreatmentRow()];

selectAllInjection = false;
  dosageList: any[]=[];
  frequencyList: any[]=[];
  routeList: any[]=[];
__saved?: boolean;

otherLabInvestigation = '';
labComments = '';

otherRadiologyInvestigation = '';
radiologyComments = '';
  prescAdvice: any;
  investAdv: any;
  radioAdv: any;
  systemicAdv: any;
  localExAdv: any;
  labDoctorRemarks: any;
  radDoctorRemarks: any;

  createProcedureRow() {
    return {
      selected: false,
      procedure: '',
      rate: 0,
      discountPercent: 0,
      discountAmount: 0,
      qty: 1,
      date: new Date().toISOString().substring(0, 10),
      remarks: '',
      urgent: false,
            procList: []   // 👈 important
    };
  }
createEmptyRadiologyRow() {
  return {
    selected: false,
    test: '',
    id: null,
    qty: 1,
    date: this.Today,
    remarks: '',
    urgent: false,
    radList: []
  };
}

createEmptyInjectionRow() {
  return {
    selected: false,
    injection: '',
    id: null,
    dosage: '',
    route: '',
    frequency: '',
    qty: 1,
    date: this.Today,
    remarks: '',
    urgent: false,
    td: false,
    injList: []   // 🔥 REQUIRED
  };
}
createEmptyLabRow() {
  return {
    selected: false,
    test: '',
    qty: 1,
    date: this.Today,
    remarks: '',
    urgent: false,
    labList: []
  };
}
createEmptyTreatmentRow() {
  return {
    selected: false,
    packageName: '',
    id: null,
    rate: 0,
    remarks: '',
    date: this.Today,
    urgent: false,
    packageList: [],
    blPlanSlno: null,
    __saved: false
  };
}




orderSections = {
  lab: false,
  radiology: false,
  procedure: false,
  injection: false,
  treatment:false
};


  constructor(private comser: CommonService,
    private patient: PatientlistService,
    private router: Router,
    private route: ActivatedRoute,
    private authser: AuthService,
    private datePipe: DatePipe,
    private cts: CustomToastService, private shared: SharedDataService,
    private notificationService: NotificationService) {
    addIcons({
      calendarOutline,
      eyeOutline,
      searchOutline,
      closeOutline,
      documentOutline,
      personCircleOutline,
      closeCircle,
      chatbubblesOutline,
      createOutline,
      alertCircleOutline,
      trashOutline,   // 👈 REQUIRED
      addCircle,
      add
      
    });
    this.Today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.fromDate = this.Today
    this.getPatientDataFromShared()

  }
  getPatientDataFromShared() {
    this.paitentData = this.shared.getPatient()
    console.log(this.paitentData)
    this.emrDocid = this.paitentData.emR_DOC_ID;
    this.patId = this.paitentData.patI_ID;
    this.claimselection();
    this.loadOnlineProcedures();
    this.loadOnlineLabs();
    this.loadOnlineRadiology();
    this.loadOnlineInjections();
    this.loadAdvice();
     this.loadOnlineTreatment();
  }

  ngOnInit() {
     this.loadOrderSections(); 
    this.formattedOrderDate = this.datePipe.transform(this.fromDate, 'dd/MM/yyyy')!;
    console.log("Formatted Date:", this.formattedOrderDate);
    this.checkScreenSize()
    this.addRow(); // start with one row
    this.addProcedureRow();     // PROCEDURE
  this.addRadiologyRow();     // ✅ RADIOLOGY (FIX)
// this.addTreatmentRow();
  this.injections.push(this.createEmptyInjectionRow());

  this.getDosage();
  this.getFrequency();
  this.getRoute();

    // const today = new Date();

  }
  // addRow() {
  //   this.labTests.push({
  //     selected: false,
  //     test: '',
  //     qty: 1,
  //     date: new Date().toISOString().substring(0, 10),
  //     remarks: '',
  //     urgent: false
  //   });
  // }
  addRow() {
  this.labTests.push({
    selected: false,
    test: '',
    qty: 1,
    date: new Date().toISOString().substring(0, 10),
    remarks: '',
    urgent: false,
    labList: []   // ✅ REQUIRED
  });
}


addRadiologyRow() {
  this.radiologyTests.push(this.createEmptyRadiologyRow());
}
addTreatmentRow() {
  this.treatment.push(this.createEmptyTreatmentRow());
}

removeRadiologyRow(index: number) {
  this.radiologyTests.splice(index, 1);
}

toggleAllRadiology() {
  this.radiologyTests.forEach(row => {
    row.selected = this.selectAllRadiology;
  });
}

  removeRow(index: number) {
    this.labTests.splice(index, 1);
  }

  deleteLabRow() {
    console.log('Lab row deleted');
    // later: remove row from array
  }

  deleteRadiologyRow() {
    console.log('Radiology row deleted');
    // later: remove row from array
  }
  checkScreenSize() {
    this.ismobile = window.innerWidth < 992;
  }

  toggleAllLab() {
    this.labTests.forEach(row => {
      row.selected = this.selectAllLab;
    });
  }
  addProcedureRow() {
    this.procedures.push(this.createProcedureRow());
  }

  removeProcedureRow(index: number) {
    this.procedures.splice(index, 1);
  }

  toggleAllProcedure() {
    this.procedures.forEach(row => row.selected = this.selectAllProcedure);
  }

  async claimselection() {
    console.log(this.emrDocid)
    try {
      // Subscribe directly without using await
      (await
        // Subscribe directly without using await
        this.patient.getclaimselection(this.patId, this.emrDocid)).subscribe(
          (res: any) => {
            console.log('API response:', res);

            // Assign an array to PatientList to avoid NG0900
            // If your API returns { data: [...] }, use res.data, otherwise use res directly
            if (Array.isArray(res)) {
              this.claimList = res;
            } else if (res?.data && Array.isArray(res.data)) {
              this.claimList = res.data;
            } else {
              this.claimList = [];
            }
            if (this.claimList.length > 0) {
              this.claimId = this.claimList[0].claiM_ID;
              console.log('Claim ID:', this.claimId);
            }
          },
          (err: any) => {
            console.error('Error fetching claim data:', err);
            this.cts.showToast('Failed to load claim dta');
            this.claimList = [];
          }
        );
    } catch (err) {
      console.error('Unexpected error:', err);
      this.cts.showToast('An unexpected error occurred');
      this.claimList = [];
    } finally {
      // this.loading = false;
    }
  }


  async procselection(term: string, rowIndex: number,typ:number) {
    console.log(term);

    console.log(this.claimId);
    console.log(typ);
    //this.procType = 3
    (await this.patient.getprocselection(term.trim(), this.claimId, 3))
      .subscribe(
        (res: any) => {
          console.log('API response:', res);

          if (Array.isArray(res)) {
            this.procedures[rowIndex].procList = res;
          } else if (res?.data && Array.isArray(res.data)) {
            this.procedures[rowIndex].procList = res.data;
          } else {
            this.procedures[rowIndex].procList = [];
          }
        },
        (err: any) => {
          console.error('Error fetching proc selection:', err);
          this.procedures[rowIndex].procList = [];
        }
      );
  }



  selectProcedure(proc: any, index: number) {
    const row = this.procedures[index];

    row.procedure = proc.name;          // ✔ correct field
    row.id = proc.id,
      row.rate = proc.prC_RATE ?? 0;      // ✔ correct field
    row.discountPercent = proc.ratE_DISC ?? 0;
    row.discountAmount = proc.disC_AMT ?? 0;

    row.procList = [];                  // hide dropdown
  }




  saveProcedures() {

    const rowsToSave = this.procedures.filter(
      r => r.selected || r.procedure   // 👈 save if selected OR has data
    );

    if (!rowsToSave.length) {
      this.cts.showToast('No procedure to save');
      return;
    }

 

    rowsToSave.forEach(async row => {

      console.log('Saving row:', row);

      const payload = {
        LBMSLNO: 0,
        EDOCID: this.emrDocid,
        DOCID: this.emrDocid,
        TSTID: row.id,
        RMRKS: row.remarks,
        PATI: this.patId,
        CLAIMID: this.claimId,
        READYTOBILL: 'Y',
        RESULT_URGENT: row.urgent ? 'Y' : 'N',
        ACT_PRCRATE: row.rate,
        DOCT_PRCRATE: row.rate,
        GRPSTATUS: 'A',
        PROC_TYPE: 3,
        P_BILLING_ON: row.date,
        P_QTY: row.qty,
        P_DISC_PER: row.discountPercent,
        P_DISC_AMOUNT: row.discountAmount,
        P_STATUS: 'O'
      };

      (await this.patient.saveOnlineDocTest(payload)).subscribe(
        (res: any) => {
          console.log('API response:', res);
          // this.cts.showToast('Procedure saved', 'success');
          this.notificationService.showNotification('Procedure Saved');
          row.selected = false;
        },
      );
      this.procedures.push(this.createProcedureRow());
    });
  }


  async saveLab() {

  const row = this.labTests[this.labTests.length - 1];
console.log(row)
  if (!row.test || !row.id) {
    this.cts.showToast('Please select Lab Test');
    return;
  }

  await this.saveSingleRow(row, 1,0); // PROC_TYPE = 1

  this.notificationService.showNotification('Lab Saved');

  // ✅ ADD ONLY ONE EMPTY ROW
  this.labTests.push(this.createEmptyLabRow());
}

  async loadOnlineProcedures() {
  if (!this.patId || !this.emrDocid) {
    return;
  }

  (await this.patient.getOnlineDocTestGrid(this.patId, this.emrDocid))
    .subscribe(
      (res: any[]) => {
       console.log('procedure Tests:', res);
        if (!Array.isArray(res)) {
          this.procedures = [this.createProcedureRow()];
          return;
        }

        // 🔥 FILTER ONLY PROCEDURES
        const procData = res.filter(item =>
          item.emR_PROC_TYPE === 3 || item.pr_TYPE === 'P'
        );

      
        this.procedures = procData.map(item => ({
  selected: false,

  blPlanSlno: item.lbm_PLAN_SLNO ?? item.lbM_PLAN_SLNO ?? null,
  __saved: true,

  procedure: item.prC_NAME ?? '',
  id: item.prC_ID ?? null,

  rate: item.actuaL_PRC_RATE ?? item.prC_RATE ?? 0,
  discountPercent: item.disC_PER ?? 0,
  discountAmount: item.disC_AMOUNT ?? 0,

  qty: item.quantity ?? 1,
  date: item.billinG_ON ? this.convertDate(item.billinG_ON) : this.Today,
  remarks: item.remarks ?? '',
  urgent: item.resulT_REQD_URGENT === 'Y',

  procList: []
}));

  this.procedures.push(this.createProcedureRow());
        // ✅ Always keep one empty row
        if (this.procedures.length === 0) {
          this.procedures.push(this.createProcedureRow());
        }
      },
      err => {
        console.error('Error loading procedures', err);
        this.procedures = [this.createProcedureRow()];
      }
    );
}

  convertDate(dateStr: string): string {
    const [d, m, y] = dateStr.split(' ')[0].split('/');
    return `${y}-${m}-${d}`;
  }

selectLabTest(test: any, index: number) {
  const row = this.labTests[index];

  row.test = test.name;
  row.id = test.id;

  row.labList = []; // ✅ hide dropdown
}
async loadOnlineLabs() {
  if (!this.patId || !this.emrDocid) {
    return;
  }

  (await this.patient.getOnlineDocTestGrid(this.patId, this.emrDocid))
    .subscribe(
      (res: any[]) => {
        console.log('Online Lab Tests:', res);

        if (!Array.isArray(res)) {
          this.labTests = [this.createEmptyLabRow()];
          return;
        }

        // 🔹 FILTER ONLY LAB TESTS
        const labData = res.filter(item =>
          item.emR_PROC_TYPE === 1 || item.pr_TYPE === 'I'
        );

        this.labTests = labData.map(item => ({
          selected: false,
            blPlanSlno: item.lbm_PLAN_SLNO ?? item.lbM_PLAN_SLNO ?? null,
         __saved: true,
          // DISPLAY
          test: item.prC_NAME ?? '',

          // ID
          id: item.prC_ID ?? null,

          // QTY
          qty: item.quantity ?? 1,

          // DATE (DD/MM/YYYY → YYYY-MM-DD)
          date: item.billinG_ON
            ? this.convertDate(item.billinG_ON)
            : this.Today,

          // REMARKS
          remarks: item.remarks ?? '',

          // URGENT
          urgent: item.resulT_REQD_URGENT === 'Y',

          labList: []
        }));

        // ✅ Always keep one empty row
        //  this.labTests.push(this.createEmptyLabRow());

          if (this.labTests.length === 0) {
        this.addRow();
      }
      },
      err => {
        console.error('Error loading lab tests', err);
        this.labTests = [this.createEmptyLabRow()];
      }
    );
}

 async labSelection(term: string, rowIndex: number) {
  if (!term || term.length < 1) {
    this.labTests[rowIndex].labList = [];
    return;
  }

  (await this.patient.getprocselection(term.trim(), this.claimId, 1))
    .subscribe(
      (res: any) => {
        this.labTests[rowIndex].labList =
          Array.isArray(res) ? res : res?.data ?? [];
      },
      () => this.labTests[rowIndex].labList = []
    );
}


async radiologySelection(term: string, rowIndex: number) {
  if (!term || term.length < 1) {
    this.radiologyTests[rowIndex].radList = [];
    return;
  }

  (await this.patient.getprocselection(term.trim(), this.claimId, 1))
    .subscribe(
      (res: any) => {
        this.radiologyTests[rowIndex].radList =
          Array.isArray(res) ? res : res?.data ?? [];
      },
      () => this.radiologyTests[rowIndex].radList = []
    );
}

selectRadiologyTest(test: any, index: number) {
  const row = this.radiologyTests[index];

  row.test = test.name;
  row.id = test.id;
  row.radList = [];
}
// saveRadiology() {

//   const rowsToSave = this.radiologyTests.filter(
//     r => r.selected || r.test
//   );

//   if (!rowsToSave.length) {
//     this.cts.showToast('No radiology test to save');
//     return;
//   }

//   rowsToSave.forEach(async row => {

//     const payload = {
//       LBMSLNO: 0,
//       EDOCID: this.emrDocid,
//       DOCID: this.emrDocid,
//       TSTID: row.id,
//       RMRKS: row.remarks,
//       PATI: this.patId,
//       CLAIMID: this.claimId,
//       READYTOBILL: 'Y',
//       RESULT_URGENT: row.urgent ? 'Y' : 'N',
//       ACT_PRCRATE: 0,
//       DOCT_PRCRATE: 0,
//       GRPSTATUS: 'P',
//       PROC_TYPE: 2,          // 🔥 RADIOLOGY
//       P_BILLING_ON: row.date,
//       P_QTY: row.qty,
//       P_DISC_PER: 0,
//       P_DISC_AMOUNT: 0,
//       P_STATUS: 'O'
//     };

//     (await this.patient.saveOnlineDocTest(payload)).subscribe(
//       () => {
//         this.notificationService.showNotification('Radiology Test Saved');
//         row.selected = false;
//       },
//       () => this.cts.showToast('Failed to save radiology test')
//     );
//   });

//   this.radiologyTests.push(this.createEmptyRadiologyRow());
// }
async saveRadiology() {

  const row = this.radiologyTests[this.radiologyTests.length - 1];
  console.log(row);

  // ❌ validation (same as lab)
  if (!row.test || !row.id) {
    this.cts.showToast('Please select Radiology Test');
    return;
  }

  // 🔥 PROC_TYPE = 2 for Radiology
  await this.saveSingleRow(row, 2, 0);

  this.notificationService.showNotification('Radiology Saved');

  // ✅ ADD ONLY ONE EMPTY ROW
  this.radiologyTests.push(this.createEmptyRadiologyRow());
}


async loadOnlineRadiology() {
  if (!this.patId || !this.emrDocid) {
    return;
  }

  (await this.patient.getOnlineDocTestGrid(this.patId, this.emrDocid))
    .subscribe(
      (res: any[]) => {

        if (!Array.isArray(res)) {
          this.radiologyTests = [this.createEmptyRadiologyRow()];
          return;
        }

        const radData = res.filter(item =>
          item.emR_PROC_TYPE === 2 || item.pr_TYPE === 'R'
        );

        this.radiologyTests = radData.map(item => ({
          selected: false,
          
            // blPlanSlno: item.lbm_PLAN_SLNO ?? null,
              blPlanSlno: item.lbm_PLAN_SLNO ?? item.lbM_PLAN_SLNO ?? null,
          __saved: true,
          test: item.prC_NAME ?? '',
          id: item.prC_ID ?? null,
          qty: item.quantity ?? 1,
          date: item.billinG_ON
            ? this.convertDate(item.billinG_ON)
            : this.Today,
          remarks: item.remarks ?? '',
          urgent: item.resulT_REQD_URGENT === 'Y',
          radList: []
        }));
        if (this.radiologyTests.length === 0) {
        this.addRadiologyRow();
      }

      },
      () => this.radiologyTests = [this.createEmptyRadiologyRow()]
    );
}
async loadOnlineInjections() {
  if (!this.patId || !this.emrDocid) {
    return;
  }

  (await this.patient.getOnlineDocTestGrid(this.patId, this.emrDocid))
    .subscribe(
      (res: any[]) => {
        console.log('Online Injections:', res);

        if (!Array.isArray(res)) {
          this.injections = [this.createEmptyInjectionRow()];
          return;
        }

        // 🔥 FILTER ONLY INJECTIONS
        const injData = res.filter(item =>
          item.emR_PROC_TYPE === 4 || item.pr_TYPE === 'J'
        );

        this.injections = injData.map(item => ({
          selected: false,
            // blPlanSlno: item.lbm_PLAN_SLNO ?? null,
              blPlanSlno: item.lbm_PLAN_SLNO ?? item.lbM_PLAN_SLNO ?? null,
          __saved: true,

          // DISPLAY
          injection: item.prC_NAME ?? '',

          // ID
          id: item.prC_ID ?? null,

          // INJECTION FIELDS
          // dosage: item.p_DOSAGE ?? '',
          // route: item.p_ROUTE ?? '',
          // frequency: item.p_FREQUENCY ?? '',
            dosage: item.dosage ?? '',
  route: item.route ?? '',
  frequency: item.frequency ?? '',

          qty: item.quantity ?? 1,

          date: item.billinG_ON
            ? this.convertDate(item.billinG_ON)
            : this.Today,

          remarks: item.remarks ?? '',
          urgent: item.resulT_REQD_URGENT === 'Y',

          td: item.tD_FLAG === 'Y',

          injList: []
        }));

        // ✅ Always keep one empty row
        if (this.injections.length === 0) {
          this.injections.push(this.createEmptyInjectionRow());
        }
      },
      err => {
        console.error('Error loading injections', err);
        this.injections = [this.createEmptyInjectionRow()];
      }
    );
}



saveInjection() {

  const rowsToSave = this.injections.filter(
    r => r.selected || r.injection
  );

  if (!rowsToSave.length) {
    this.cts.showToast('No injection to save');
    return;
  }

  rowsToSave.forEach(async row => {
console.log(row);
    if (!row.injection) {
      this.cts.showToast('Please enter injection name');
      return;
    }

    const payload = {
      LBMSLNO: 0,
      EDOCID: this.emrDocid,
      DOCID: this.emrDocid,
      TSTID: row.id,              // optional
      RMRKS: row.remarks ?? '',
      PATI: this.patId,
      CLAIMID: this.claimId,
      READYTOBILL: 'Y',
      RESULT_URGENT: row.urgent ? 'Y' : 'N',
      ACT_PRCRATE: 0,
      DOCT_PRCRATE: 0,
      GRPSTATUS: 'A',
      PROC_TYPE: 4,               // 🔥 INJECTION
      P_BILLING_ON: row.date,
      P_QTY: row.qty,
      P_DISC_PER: 0,
      P_DISC_AMOUNT: 0,
      P_STATUS: 'O',

      // 🔹 Injection specific (if backend supports)
      P_DOSAGE: row.dosage,
      P_ROUTE: row.route,
      P_FREQUENCY: row.frequency,
      TD_FLAG: row.td ? 'Y' : 'N'
    };

    (await this.patient.saveOnlineDocTest(payload)).subscribe(
      () => {
        this.notificationService.showNotification('Injection Saved');
        row.selected = false;
      },
      () => this.cts.showToast('Failed to save injection')
    );
  });

  // ✅ Keep one empty row
  this.injections.push(this.createEmptyInjectionRow());
}

      async getDosage() {
    (await this.patient.getDosage()).subscribe({
      next: (data: any) => {
        console.log('Dosage List:', data);
        this.dosageList = data;
        // this.FilteredList = data;
      },
      error: (error: any) => {
        console.error('Error fetching dsage', error);
      }
    });
  }
  
      async getFrequency() {
    (await this.patient.getFrequency()).subscribe({
      next: (data: any) => {
        console.log('frequency List:', data);
        this.frequencyList = data;
        // this.FilteredList = data;
      },
      error: (error: any) => {
        console.error('Error fetching frequency', error);
      }
    });
  }
       async getRoute() {
    (await this.patient.getRoute()).subscribe({
      next: (data: any) => {
        console.log('route List:', data);
        this.routeList = data;
        // this.FilteredList = data;
      },
      error: (error: any) => {
        console.error('Error fetching route', error);
      }
    });
  }

  toggleAllInjection() {
  this.injections.forEach(row => row.selected = this.selectAllInjection);
}


selectInjection(test: any, index: number) {
  console.log(test);
  const row = this.injections[index];

  row.injection = test.name;
  row.id = test.id;

  row.injList = []; // ✅ hide dropdown
}



 async injSelection(term: string, rowIndex: number) {
  if (!term || term.length < 1) {
    this.injections[rowIndex].injList = [];
    return;
  }

  (await this.patient.getprocselection(term.trim(), this.claimId, 1))
    .subscribe(
      (res: any) => {
        this.injections[rowIndex].injList =
          Array.isArray(res) ? res : res?.data ?? [];
      },
      () => this.injections[rowIndex].injList = []
    );
}


async saveOrder() {

  const grids = [
    { procType: 3, rows: this.procedures },
    { procType: 4, rows: this.injections },
    { procType: 1, rows: this.labTests },
    { procType: 2, rows: this.radiologyTests },
      { procType: 5, rows: this.treatment } 
  ];

  for (const grid of grids) {
    for (const row of grid.rows) {

      // ❌ skip empty rows
      if (!row.id) continue;

      // ❌ skip already saved & not edited rows
      if (row.__saved && row.blPlanSlno) continue;

      await this.saveSingleRow(row, grid.procType,1);
    }
  }
   await this.saveAdvice();

  this.notificationService.showNotification('Order Saved Successfully');
}

async saveAdvice() {

  // LAB / INVESTIGATION ADVICE
  if (this.otherLabInvestigation || this.labComments) {

    (await
      this.patient.saveAdvice({
        EDOCID: this.emrDocid,
        PRESC_ADV: this.labComments ?? '',
        INVEST_ADV: this.otherLabInvestigation ?? '',
        RADIO_ADV: null,
        AdviceType: 2
      })).subscribe({
  next: () => console.log('Lab advice saved'),
  error: err => console.error('Advice save failed', err)
});
  }

  // RADIOLOGY ADVICE
  if (this.otherRadiologyInvestigation || this.radiologyComments) {
    await (await this.patient.saveAdvice({
      EDOCID: this.emrDocid,
      PRESC_ADV: this.radiologyComments ?? '',
      INVEST_ADV: null,
      RADIO_ADV: this.otherRadiologyInvestigation ?? '',
      AdviceType: 3
    })).subscribe({
  next: () => console.log('Lab advice saved'),
  error: err => console.error('Advice save failed', err)
});
  }
}


async saveSingleRow(row: any, procType: number,flg:number) {
 console.log(row);
  const payload: any = {

    // 🔥 THIS IS THE KEY
    LBMSLNO: row.blPlanSlno ? row.blPlanSlno : 0,
    

    EDOCID: this.emrDocid,
 DOCID: this.doctorId, 
    PATI: this.patId,

    TSTID: row.id,
    RMRKS: row.remarks ?? '',

    P_QTY: row.qty ?? 1,
    P_BILLING_ON: row.date,

    P_FREQUENCY: row.frequency ?? null,
    P_ROUTE: row.route ?? null,
    P_DOSAGE: row.dosage ?? null,

    CLAIMID: this.claimId,
    RESULT_URGENT: row.urgent ? 'Y' : 'N',

    ACT_PRCRATE: row.actualRate ?? 0,
    DOCT_PRCRATE: row.doctorRate ?? row.actualRate ?? 0,

    PROC_TYPE: procType,
    READYTOBILL: 'Y',
    P_STATUS: 'O',
    flg:flg
  };

  const res = await (await this.patient.saveOnlineDocTest(payload)).toPromise();

  // ✅ STORE ID AFTER FIRST SAVE
  if (res?.LBMSLNO) {
    row.blPlanSlno = res.LBMSLNO;
    row.__saved = true;     // 🔥 mark as saved
  }
}


getReadyToBill(row: any): 'Y' | 'N' {

  if (row.approvalTypeId === 1 || row.approvalTypeId === 3) {
    return 'Y';
  }

  if (row.groupStatus === 'G') {
    return 'Y';
  }

  return 'N';
}
onRowChange(row: any) {
  console.log(row);
  row.__saved = false;
}
async loadAdvice() {
  try {
    if (!this.patId || !this.emrDocid) {
      console.warn('Patient ID or EMR Doc ID missing');
      return;
    }

    // Call your backend API that SELECTs from EMR_PRESCRIPTION_ADVICE
(await this.patient.getAdvice(this.emrDocid))
  .subscribe(
    (res: any[]) => {       // res is an array
      console.log('Advice loaded:', res);

      if (res.length > 0) {
        const advice = res[0]; // first item in the array

        // Assign values for textareas
        this.otherLabInvestigation = advice.invesT_ADV ?? '';
        this.labComments = advice.presC_ADV ?? '';

        // Assign other variables if needed
        this.otherRadiologyInvestigation = advice.radiO_ADV ?? '';
        this.systemicAdv = advice.systemic ?? '';
        this.localExAdv = advice.localex ?? '';
        this.labDoctorRemarks = advice.labdoctorremarks ?? '';
        this.radDoctorRemarks = advice.raddoctorremarks ?? '';
      } else {
        // If array is empty, clear fields
        this.otherLabInvestigation = '';
        this.labComments = '';
        this.otherRadiologyInvestigation = '';
        this.systemicAdv = '';
        this.localExAdv = '';
        this.labDoctorRemarks = '';
        this.radDoctorRemarks = '';
      }
    },
    (err: any) => {
      console.error('Error loading advice:', err);
      this.cts.showToast('Failed to load advice');
    }
  );


  } catch (error) {
    console.error('Unexpected error in loadAdvice:', error);
    this.cts.showToast('Unexpected error loading advice');
  }
}


async deleteRow(list: any[], index: number, label: string) {

  const row = list[index];
console.log(row)
  // 🔹 Unsaved row → UI only
  if (!row?.blPlanSlno) {
    list.splice(index, 1);
    return;
  }

  // 🔹 Backend delete
  (await this.patient.deleteOrder(
    this.emrDocid,
    this.patId,
    row.blPlanSlno
  )).subscribe({
    next: () => {
      this.notificationService.showNotification(`${label} deleted`);
      list.splice(index, 1);
          //  this.ngOnInit() 
          console.log(label)
          if(label="Lab")
          {
               this.addRow(); 
          }
          else if(label="Radiology")
          {
                 this.addRadiologyRow(); 
          }
           else if(label="Procedure")
          {
                  this.addProcedureRow();
          }
             else if(label="Injection")
          {
                this.injections.push(this.createEmptyInjectionRow());
          }
          
    },
    error: () => {
      this.cts.showToast(`Failed to delete ${label}`);
    }
  });
}

  async loadOrderSections() {
  (await this.patient.getOrderSections()).subscribe({
    next: (res: any) => {
      this.orderSections = res;

      // 🔥 optional: clear arrays if disabled
      if (!res.lab) this.labTests = [];
      if (!res.radiology) this.radiologyTests = [];
      if (!res.procedure) this.procedures = [];
      if (!res.injection) this.injections = [];
       if (!res.treatment) this.treatment = [];
    },
    error: () => {
      // fallback → show all
      this.orderSections = {
        lab: true,
        radiology: true,
        procedure: true,
        injection: true,
        treatment: true
      };
    }
  });
}

// async treatmentSelection(term: string, rowIndex: number) {

//   if (!term || term.length < 1) {
//     this.treatment[rowIndex].packageList = [];
//     return;
//   }

//   // 🔥 pass PROC_TYPE = 5 (or whatever backend uses)
//   (await this.patient.getprocselection(term.trim(), this.claimId, 4))
//     .subscribe(
//       (res: any) => {
//         this.treatment[rowIndex].packageList =
//           Array.isArray(res) ? res : res?.data ?? [];
//       },
//       () => this.treatment[rowIndex].packageList = []
//     );
// }

async treatmentSelection(term: string, rowIndex: number) {
  if (!term || term.length < 1) {
    this.treatment[rowIndex].packageList = [];
    return;
  }

  try {
    // 🔹 Call the new package-list API
    (await this.patient.getPackageList())
      .subscribe(
        (res: any[]) => {
           console.log(res)
          // Optional: filter by term if you want search-as-you-type
          const filtered = res.filter(pkg =>
            pkg.pkG_NAME?.toLowerCase().includes(term.toLowerCase())
          );

          this.treatment[rowIndex].packageList = filtered;
        },
        (err: any) => {
          console.error('Error fetching package list', err);
          this.treatment[rowIndex].packageList = [];
        }
      );
  } catch (err) {
    console.error('Unexpected error in treatmentSelection', err);
    this.treatment[rowIndex].packageList = [];
  }
}




// selectTreatment(pkg: any, index: number) {

//   const row = this.treatment[index];

//   row.PKG_NAME = pkg.PKG_NAME;
//   row.id = pkg.PKG_ID;   // use correct id field
//   row.rate = pkg.RATE || 0;

//   row.packageList = [];  // hide dropdown
// }

// selectTreatment(pkg: any, index: number) {

//   const row = this.treatment[index];

//   row.packageName = pkg.pkG_NAME;     // ✅ show name in input
//   row.id = pkg.pkG_ID;                // ✅ store ID
//   row.rate = pkg.pkG_AMOUNT || 0;     // ✅ amount from API
//   row.remarks = pkg.REMARKS || '';

//   row.packageList = [];               // close dropdown
// }

// selectTreatment(pkg: any, index: number) {

//   const row = this.treatment[index];

//   row.packageName = pkg.PKG_NAME;     // ✅ CORRECT
//   row.id = pkg.PKG_ID;                // ✅ CORRECT
//   row.rate = pkg.PKG_AMOUNT || 0;     // ✅ CORRECT
//   row.remarks = pkg.REMARKS || '';

//   row.packageList = [];               // close dropdown
// }

selectTreatment(pkg: any, index: number) {

  const row = this.treatment[index];

  row.packageName = pkg.pkG_NAME;
  row.pkgId = pkg.pkG_ID;
  row.rate = pkg.pkG_AMOUNT;

  row.packageList = [];
}


async saveTreatment() {
console.log(this.treatment)

  const rowsToSave = this.treatment.filter(
    r => r.selected || r.packageName
  );
console.log(rowsToSave)
  if (!rowsToSave.length) {
    this.cts.showToast('No treatment package to save');
    return;
  }

  for (const row of rowsToSave) {

    if (!row.pkgId) {
      this.cts.showToast('Please select a valid package');
      continue;
    }
   console.log(row)

    const payload = {
      P_PKG_ID: row.pkgId,
      P_EMR_DOC_ID: this.emrDocid,
      P_PATI_ID: this.patId,
      P_REMARKS: row.remarks || ''
    };
    console.log(payload)


    try {
      (await this.patient.saveTreatmentPackage(payload))
        .subscribe((res: any) => {

          if (res.status === 200) {
            this.notificationService.showNotification('Treatment Saved');
            row.selected = false;
          } else {
            this.cts.showToast(res.message);
          }

        });
    } catch (error) {
      console.error(error);
    }
  }

  // Add new empty row
  this.treatment.push(this.createEmptyTreatmentRow());
}

async loadOnlineTreatment() {

  if (!this.patId || !this.emrDocid) {
    return;
  }

  (await this.patient.getOnlineTreatmentPackages(this.emrDocid))
    .subscribe(
      (res: any[]) => {

        console.log('Online Treatment Packages:', res);

        if (!Array.isArray(res)) {
          this.treatment = [this.createEmptyTreatmentRow()];
          return;
        }

        this.treatment = res.map(item => ({
          selected: false,
          __saved: true,

          blPlanSlno: item.lbM_PLAN_SLNO ?? null,

          packageName: item.pkG_NAME ?? '',
          pkgId: item.pkG_ID ?? null,
          rate: item.pkG_AMOUNT ?? 0,

          remarks: item.remarks ?? '',
          date: item.billinG_ON
            ? this.convertDate(item.billinG_ON)
            : this.Today,

          // urgent: false,
          packageList: []
        }));

        // Always keep one empty row
        if (this.treatment.length === 0) {
          this.treatment.push(this.createEmptyTreatmentRow());
        }
      },
      err => {
        console.error('Error loading treatment packages', err);
        this.treatment = [this.createEmptyTreatmentRow()];
      }
    );
}

  async deleteTreatment(row: any, index: number) {
//     console.log(row)
// console.log(row[0].pkgId)
// console.log(this.emrDocid)

  // if (!row.pkgId) {
  //   this.treatment.splice(index, 1);
  //   return;
  // }

  // if (!confirm('Are you sure you want to delete this treatment package?')) {
  //   return;
  // }

  (await this.patient.deleteTreatmentPackage(this.emrDocid, row[0].pkgId))
    .subscribe(
      (res: any) => {

        if (res.status === 200) {
          this.notificationService.showNotification('Deleted Successfully');
          this.treatment.splice(index, 1);
        } else {
          this.cts.showToast(res.message);
        }

      },
      err => {
        console.error(err);
        this.cts.showToast('Delete failed');
      }
    );
}



}
