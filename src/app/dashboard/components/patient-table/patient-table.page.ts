import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientListDatewiseItem } from 'src/app/shared/interfaces/patient-list/patient-list-date-wise-item';
import { CommonService } from 'src/app/shared/services/common.service';
import { PatientlistService } from 'src/app/shared/services/patientlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { CustomToastService } from 'src/app/shared/services/custom-toast.service';
import { SectionDet } from 'src/app/shared/interfaces/lookup/sectiondet';
 import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-patient-table',
  templateUrl: './patient-table.page.html',
  styleUrls: ['./patient-table.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule]
})
export class PatientTablePage implements OnInit {

  // selectedDate:any

    tableHeads = [
    'Token', 'Visit Time', 'Patient #', 'Patient Name', '',
    'Vitals', 'Sex/Age', 'Allergy', 'Comments', 'Insurance', 'Over', 'Call'
  ];
     tableColumns = [
    'tockeN_NO', 'Visit Time', 'Patient #', 'Patient Name', '',
    'Vitals', 'Sex/Age', 'Allergy', 'Comments', 'Insurance', 'Over', 'Call'
  ];

  iconColumns: { [key: string]: string } = {

    'Vitals': 'assets/icon/vitals.png',
    'Allergy': 'assets/icon/allergy.png',
    'Comments': 'assets/icon/comment.png',
    'Insurance': 'assets/icon/insurance.png',
    'Over': 'assets/icon/mark.png',
    'Call': 'assets/icon/call.png'
  };
  columnMap: { [key: string]: keyof PatientListDatewiseItem } = {
  'Token': 'tockeN_NO',
  'Visit Time': 'vsT_TIME',
  'Patient #': 'patI_OPNO',
  'Patient Name': 'patientname',
  'Sex/Age': 'gender',
  'Vitals': 'vitalS_SAVED',
  'Allergy': 'allergy',
  'Comments': 'remarks',
  'Insurance': 'insurance',
  'Over': 'tokeN_WAR',
  'Call': 'tokeN_CALL_STS'
};

  sessionList = ['Morning', 'Evening'];
  doctorList = ['Dr. A', 'Dr. B', 'Dr. C'];

  /* -------------------- STATUS COUNTERS -------------------- */
  counts = {
    booked: 0,
    confirmed: 0,
    cancelled: 0,
    arrived: 0,
    waitlisted: 0
  };

  /* -------------------- PATIENT DATA -------------------- */
  outPatients: any[] = [];
  consultedPatients: any[] = [];

  // Backup original list (for search filtering)
  rawOutPatients: any[] = [];
  rawConsultedPatients: any[] = [];



  encryptionpass: string = 'tedsystechnologiesekm'
  departments: any[] = []
  sessions: any[] = []
  selectedsessions: any[] = []
  categories: any[] = []
  //doctors:any[]=[]
  doctors: SectionDet[] = []

  EmpId: string = ''
  bmprocdone: any
  DeptId: string = ''
  SessionId: string = ''
  EmpName: string = ''
  Def_page: string = ''
  SctId: string = ''
  fromDate: string = '';
  toDate: string = '';
  Today: any
  fromdate: any
  patientName: any = ''
  mobile: any = ''
  opno: any = ''
  // Branch: Branch | undefined;
  PatientList: any[] = []
  PatientListDup: any[] = []
  ConsulPatientList: any[] = []
  ConsulPatientListDup: any[] = []
  // appointmentstatus:any[]=[]
  appointmentstatus: any
  patientsummary: any
  searchText: any
  searchText1: any
  searchconText: any
  listType: string = 'T';
  Branch: any = '1010000001';
  // statsData = [];
  hideContactNo: boolean = false



  EMRPatientsList: PatientListDatewiseItem[] = []

  constructor(private comser: CommonService,
    private patient: PatientlistService,
    private router: Router,
    private route: ActivatedRoute,
    private authser: AuthService,
    private tokenservice: TokenService,
    private datePipe: DatePipe,
    private notificationService: NotificationService,
    private cts: CustomToastService) {
    this.Today = this.datePipe.transform(new Date());
    this.HideContactNo()
    this.LoadingFns()
  }



  async GetPatientListDatewiseAsync() {
    const fromDateRaw = this.fromDate || '';
    const ToDateRaw = this.toDate || '';

    const fromDateFormatted = fromDateRaw ? this.datePipe.transform(fromDateRaw, 'dd/MMM/yyyy') || '' : '';
    const toDateFormatted = ToDateRaw ? this.datePipe.transform(ToDateRaw, 'dd/MMM/yyyy') || '' : '';

    (await this.patient.GetPatientListDatewiseAsync(null, null,
      null, null, 0, fromDateFormatted, "D", null, null)).subscribe(
        (data: any) => {
          console.log(data); // Inspect structure

          if (data && data.length > 0) {
            this.EMRPatientsList = data; // 👈 Since it's an array with one object
            // this.updateStatsData();
          } else {
            this.EMRPatientsList = []
          }
        },
        (error: any) => {
          console.error('Error fetching patient summary:', error);
        }
      );
  }



  LoadingFns() {
    this.Today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.fromDate = this.Today
    this.toDate = this.Today

    const routeId = this.route.snapshot.paramMap.get('id') || '0';
    this.Def_page = routeId;
    console.log('Received ID:', this.Def_page);

    sessionStorage.setItem('empId', this.Def_page);
    this.GetPatientListDatewiseAsync()
    // if (this.Def_page == "0") {
    //   this.GetSelectedSession(this.Branch)
    // }
    // else {
    //   this.getEmpdetails(this.Def_page)
    // }
    // this.getSession(this.Branch)
    // this.getDoctor()
    // this.setListTypeBasedOnDate();
  }
  async GetSelectedSession(branchId: string) {
    (await this.patient.getSelectedSession(branchId)).subscribe({
      next: (data: any) => {
        console.log('selected Session data:', data);
        this.selectedsessions = Array.isArray(data) ? data : [];
        const sessionId = this.selectedsessions[0].id;
        this.SctId = this.selectedsessions[0].id;
        console.log('Session ID:', this.SctId);
        // this.GetAllPatients();
        this.GetConsultPatients();
        this.getappointmentstatus();
        this.getPatientSummary();
      },
      error: (err: any) => {
        console.error('Error fetching sessions:', err);
        this.selectedsessions = [];
      }
    });
  }
  async getEmpdetails(empId: string) {
    (await this.patient.getEmpdetails(empId)).subscribe({
      next: (data: any) => {
        console.log('Emp data:', data);
        this.tokenservice.setToken(data.token);
        this.EmpId = empId
        sessionStorage.setItem('EmpId', this.EmpId); // ✅ store EmpId
        // this.bmprocdone=
        this.GetSelectedSession(this.Branch)
        // this.GetAllPatients();
        //   this.GetConsultPatients();
        //   this.getappointmentstatus();

      },
      error: (err: any) => {
        console.error('Error fetching Empdata:', err);
        this.sessions = [];
      }
    });
  }
  async getSession(branchId: string) {
    (await this.patient.getSession(branchId)).subscribe({
      next: (data: any) => {
        console.log('Session data:', data);
        this.sessions = Array.isArray(data) ? data : [];

      },
      error: (err: any) => {
        console.error('Error fetching sessions:', err);
        this.sessions = [];
      }
    });
  }
  async getDoctor() {
    (await this.patient.getDoctor()).subscribe((data: any) => {
      console.log(data);
      if (data.length > 0 && data != null) {
        this.doctors = data

      }
      else {
        this.doctors = []
      }
    }, (error: any) => {
    })
  }

  async listall() {
    // this.getappointmentstatus()
    // this.getPatientSummary();
    // this.GetAllPatientsParam()
    // this.GetConsultPatientsParam()
    this.GetPatientListDatewiseAsync()
  }


  onDateChange(events: any) {
    let event = events.target.value
    console.log(event);

    const eventDateStr = this.datePipe && event ? this.datePipe.transform(event, 'yyyy-MM-dd') : null;
    const todayStr = this.datePipe ? this.datePipe.transform(new Date(), 'yyyy-MM-dd') : null;
    if (eventDateStr && todayStr && eventDateStr <= todayStr) {
      console.log('yes');
      this.listall()
      this.fromDate = eventDateStr

    }
    else {
      this.notificationService.showNotification("Date should not be greater than today's date", 'error');
    }

  }





  // async GetAllPatients() {

  //   const fromDateRaw = this.fromDate || '';
  //   const toDateRaw = this.toDate || '';
  //   //  this.SctId="UCHM000001";
  //   console.log(this.selectedsessions[0].id)
  //   console.log(this.SctId);
  //   // this.SctId=this.selectedsessions;
  //   const fromDateFormatted = fromDateRaw ? this.datePipe.transform(fromDateRaw, 'dd/MM/yyyy') : '';
  //   const toDateFormatted = toDateRaw ? this.datePipe.transform(toDateRaw, 'dd/MM/yyyy') : '';
  //   console.log(this.EmpId);
  //   console.log(this.DeptId);
  //   (await this.patient.getpatientList(this.EmpId, this.SctId, '', '',
  //     '', '', 0, "", "T", null, this.Branch)).subscribe({
  //       next: (response: any) => {
  //         console.log('Patient List:', response);

  //         // response[0].rgB_COLOR = "255,33,22"
  //         // response[0].opvisiT_CANCEL ='Cancelled'
  //         this.PatientList = response;
  //         this.PatientListDup = response;
  //       },
  //       error: (error: any) => {
  //         console.error('Error fetching patient list:', error);
  //         this.cts.showCustomToast('Something went wrong!', 'red');
  //       }
  //     });

  // }
  async GetAllPatientsParam() {
    const fromDateRaw = this.fromDate || '';
    // const fromDateFormatted = fromDateRaw ? this.datePipe.transform(fromDateRaw, 'dd/MM/yyyy') : '';
    const fromDateFormatted = fromDateRaw
      ? this.datePipe.transform(fromDateRaw, 'MM/dd/yyyy')
      : '';
    //   const fromDateFormatted = fromDateRaw
    // ? this.datePipe.transform(fromDateRaw, 'yyyy-MM-dd')
    // : null;

    console.log(this.SctId);
    console.log(this.EmpId);
    console.log(this.DeptId);
    console.log(this.mobile);
    console.log(this.fromDate);
    console.log(fromDateFormatted);
    // (await this.patient.getpatientListParam(this.EmpId,this.SctId,this.patientName,this.mobile,
    //   '','',0,  new Date(this.fromDate).toISOString(),this.listType,null,this.Branch)).subscribe({
    (await this.patient.getpatientListParam(this.EmpId, this.SctId, this.patientName, this.mobile,
      '', '', 0, fromDateFormatted, this.listType, null, this.Branch)).subscribe({
        next: (response: any) => {
          console.log('Patient List:', response);
          this.PatientList = response;
          this.PatientListDup = response;
        },
        error: (error: any) => {
          console.error('Error fetching patient list:', error);
          this.cts.showCustomToast('Something went wrong!', 'red');
        }
      });

  }


  async GetConsultPatients() {

    const fromDateRaw = this.fromDate || '';
    const toDateRaw = this.toDate || '';
    //  this.SctId="UCHM000001";
    console.log(this.SctId);
    // const fromDateFormatted = fromDateRaw ? this.datePipe.transform(fromDateRaw, 'dd/MM/yyyy') : '';
    const fromDateFormatted = fromDateRaw
      ? this.datePipe.transform(fromDateRaw, 'MM/dd/yyyy')
      : '';
    const toDateFormatted = toDateRaw ? this.datePipe.transform(toDateRaw, 'dd/MM/yyyy') : '';
    console.log(this.EmpId);
    console.log(this.DeptId);
    (await this.patient.ConsulPatientList(this.EmpId, this.SctId, '', '',
      '', '', 0, "", "T", null, this.Branch)).subscribe({
        next: (response: any) => {
          console.log('Patient List:', response);
          this.ConsulPatientList = response;
          this.ConsulPatientListDup = response;
        },
        error: (error: any) => {
          console.error('Error fetching patient list:', error);
          this.cts.showCustomToast('Something went wrong!', 'red');
        }
      });

  }

  async GetConsultPatientsParam() {

    const fromDateRaw = this.fromDate || '';
    const toDateRaw = this.toDate || '';
    //  this.SctId="UCHM000001";
    console.log(this.SctId);
    // const fromDateFormatted = fromDateRaw ? this.datePipe.transform(fromDateRaw, 'dd/MM/yyyy') : '';
    const fromDateFormatted = fromDateRaw
      ? this.datePipe.transform(fromDateRaw, 'MM/dd/yyyy')
      : '';
    // const toDateFormatted = toDateRaw ? this.datePipe.transform(toDateRaw, 'dd/MM/yyyy') : '';
    console.log(this.EmpId);
    console.log(this.DeptId);
    (await this.patient.consulPatientListParam(this.EmpId, this.SctId, this.patientName, this.mobile,
      '', '', 0, fromDateFormatted, this.listType, null, this.Branch)).subscribe({
        next: (response: any) => {
          console.log('Patient List:', response);
          this.ConsulPatientList = response;
          this.ConsulPatientListDup = response;
        },
        error: (error: any) => {
          console.error('Error fetching consulted patient list:', error);
          this.cts.showCustomToast('Something went wrong!', 'red');
        }
      });

  }

  onSessionChange(event: any) {
    const selectedSessionId = event.target.value;
    console.log(selectedSessionId)
    this.SessionId = selectedSessionId
    // this.SctId=selectedSessionId
    //  this.getDepDoctor(this.DeptId)
    // this.GetAllPatients()

  }
  async getDepDoctor(depId: any) {
    (await this.patient.getDepDoctor(depId)).subscribe((data: any) => {
      console.log(data);
      if (data.length > 0 && data != null) {
        this.doctors = data

      }
      else {
        this.doctors = []
      }
    }, (error: any) => {
    })
  }

  onDoctorChange(event: any) {
    console.log(event)
    const selecteddoctorId = event.target.value;
    console.log(selecteddoctorId)
    const selectedDoctor = this.doctors.find(doc => doc.id === selecteddoctorId);
    console.log('Full doctor object:', selectedDoctor);
    //   const hrid =
    // console.log(hrid);  

    //  this.EmpId = selectedDoctor?.hrId || ''; 
    this.EmpId = selectedDoctor?.id || '';
    console.log(this.EmpId)
    //this.EmpId = selectedDoctor?.hrid;
    this.getappointmentstatus()
    this.getPatientSummary();
    this.GetAllPatientsParam()
    this.GetConsultPatientsParam()


  }

  NavigatetPatientdetails(patient: PatientListDatewiseItem): void {
    console.log(this.patient)
    let remedicc = false
    let remediemr = true

    if (remedicc) {
      this.router.navigate(['/dashboard/patient-data'], {
        state: {
          patientData: patient
        }
      });
    }

    if (remediemr) {
      this.router.navigate(['/dashboard/emr-patient-details'], {
        state: {
          patientData: patient
        }
      });
    }
  }

  async getappointmentstatus() {
    const fromDateRaw = this.fromDate || '';
    const toDateRaw = this.toDate || '';

    const fromDateFormatted = fromDateRaw ? this.datePipe.transform(fromDateRaw, 'dd/MM/yyyy') : '';
    const toDateFormatted = toDateRaw ? this.datePipe.transform(toDateRaw, 'dd/MM/yyyy') : '';

    (await this.patient.getappointmentstatus(fromDateFormatted, toDateFormatted, this.EmpId)).subscribe(
      (data: any) => {
        console.log(data); // Inspect structure

        if (data && data.length > 0) {
          this.appointmentstatus = data[0]; // 👈 Since it's an array with one object
        } else {
          // this.appointmentstatus = {
          //   booked: 0,
          //   confirmed: 0,
          //   cancelled: 0,
          //   arrived: 0,
          //   waiting_LIST: 0
          // };
          //  this.appointmentstatus=[]
        }
      },
      (error: any) => {
        console.error('Error fetching appointment status:', error);
      }
    );
  }

  openTreatmentSummary(patient: any, event: MouseEvent): void {
    event.stopPropagation(); // Prevent row click

    console.log('Opening treatment summary for:', patient);
    const encryptedData = this.authser.encrypt(patient);
    const encoded = encodeURIComponent(encryptedData);
    this.router.navigate([`/dashboard/patient-details/${encoded}}/treatment-summary`]);
  }

  onFromDateChange(event: any): void {
    this.setListTypeBasedOnDate();
  }
  // onFromDateChange(date: Date): void {
  //   if (!date) {
  //     this.fromDate = '';
  //     return;
  //   }

  //   const day = ('0' + date.getDate()).slice(-2);
  //   const month = ('0' + (date.getMonth() + 1)).slice(-2);
  //   const year = date.getFullYear();

  //   this.fromDate = `${day}/${month}/${year}`; // ✅ dd/MM/yyyy

  //   this.setListTypeBasedOnDate();
  // }
  // setListTypeBasedOnDate(): void {
  //   const today = new Date();

  //   const day = ('0' + today.getDate()).slice(-2);
  //   const month = ('0' + (today.getMonth() + 1)).slice(-2);
  //   const year = today.getFullYear();

  //   const systemDate = `${day}/${month}/${year}`; // dd/MM/yyyy

  //   this.listType = this.fromDate === systemDate ? 'T' : 'D';

  //   console.log(this.listType);
  // }


  setListTypeBasedOnDate(): void {
    const today = new Date();
    const systemDate = today.toISOString().split('T')[0]; // 'yyyy-MM-dd'
    console.log(systemDate)
    console.log(this.fromDate)
    if (this.fromDate === systemDate) {
      this.listType = 'T';
    } else {
      this.listType = 'D';
    }
    console.log(this.listType)
  }

  navigateToEmrRecordList() {
    this.router.navigate(['/home/emr-record-list']);
  }
  navigateToAllPatientList() {
    this.router.navigate(['/home/all-patient-list']);
  }

  navigateTo(route: any) {
    this.router.navigate([route]);
  }

  async getPatientSummary() {
    const fromDateRaw = this.fromDate || '';

    const fromDateFormatted = fromDateRaw ? this.datePipe.transform(fromDateRaw, 'dd/MM/yyyy') : '';

    (await this.patient.getPatientSummary(fromDateFormatted, this.EmpId)).subscribe(
      (data: any) => {
        console.log(data); // Inspect structure

        if (data && data.length > 0) {
          this.patientsummary = data[0]; // 👈 Since it's an array with one object
          this.updateStatsData();
        } else {

        }
      },
      (error: any) => {
        console.error('Error fetching patient summary:', error);
      }
    );
  }
  statsData: any[] = [];

  updateStatsData() {
    this.statsData = [
      {
        title: 'OP Visits',
        value: this.patientsummary?.oP_VISIT || 0,
        label: 'Total',
        type: 'op'
      },
      {
        title: 'Consulted',
        value: this.patientsummary?.oP_VISIT_CONSULTED || 0,
        label: 'Completed',
        type: 'consulted'
      },
      {
        title: 'Waiting',
        value: this.patientsummary?.waiting || 0,
        label: 'In Queue',
        type: 'waiting'
      }
    ];
  }

  // updateStatsBoxesFromSummary() {
  //   this.statsData = [
  //     {
  //       title: 'OP Visits',
  //       value: this.patientsummary.oP_VISIT || 0,
  //       label: 'Total',
  //       type: 'op'
  //     },
  //     {
  //       title: 'Consulted',
  //       value: this.patientsummary.oP_VISIT_CONSULTED || 0,
  //       label: 'Completed',
  //       type: 'consulted'
  //     },
  //     {
  //       title: 'Waiting',
  //       value: this.patientsummary.waiting || 0,
  //       label: 'In Queue',
  //       type: 'waiting'
  //     }
  //   ];
  // }




  async HideContactNo() {

    (await this.patient.HideContactNo()).subscribe(
      (data: any) => {
        console.log(data); // Inspect structure

        this.hideContactNo = Boolean(data.hideContactNo)
        console.log(this.hideContactNo);

      },
      (error: any) => {
        console.error('Error fetching patient summary:', error);
      }
    );
  }

  ngOnInit() {
    // this.loadPatients();
    // this.updateStatusCounts();
    // this.updateStatsBoxes();
    this.updateStats();
  }
  updateStats() {
    this.statsData = [
      {
        title: 'OP Visits',
        value: this.patientsummary?.oP_VISIT || 0,
        label: 'Total',
        type: 'op'
      },
      {
        title: 'Consulted',
        value: this.patientsummary?.oP_VISIT_CONSULTED || 0,
        label: 'Completed',
        type: 'consulted'
      },
      {
        title: 'Waiting',
        value: this.patientsummary?.waiting || 0,
        label: 'In Queue',
        type: 'waiting'
      }
    ];
  }
  goToEmr() {
    this.router.navigate(['dashboard/emr-record-list']);
  }



  selectedDate: Date = new Date();

setToday() {
  this.selectedDate = new Date();
  // this.loadPatientsByDate(this.selectedDate);
}

setYesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  this.selectedDate = d;
  // this.loadPatientsByDate(d);
}

setLast7Days() {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  // this.loadPatientsByDate(d);
}

  
// onDateChange(event: any) {
//   // this.loadPatientsByDate(event.value);
// }

}

