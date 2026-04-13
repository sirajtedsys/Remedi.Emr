import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonFooter, IonButton, IonIcon, IonItem, IonInput,
  IonLabel, IonSelect, IonSelectOption, IonTextarea, IonSegment,
  IonSegmentButton, IonRadio, IonRadioGroup, IonRow, IonCol,
  IonAvatar,
  ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveOutline } from 'ionicons/icons';
import { TokenTime } from 'src/app/shared/interfaces/remedi.cc/doctor-wise-appointment/token-time';
import { PatientSearchCombined } from 'src/app/shared/interfaces/remedi.cc/doctor-wise-appointment/patient-search-dto-combined';
import { LookUp } from 'src/app/shared/interfaces/lookup/lookup';
import { AppointmentType } from 'src/app/shared/interfaces/lookup/token-type';
import { LookUpWithStatus } from 'src/app/shared/interfaces/lookup/lookup-with-status';
import { EmrPatientInfo } from 'src/app/shared/interfaces/patient-list/emr-patient-info';
import { BkDateDetails, Booking } from 'src/app/shared/class/remedi.cc/doc-wise-appointment/booking';
import { DocWiseAppointmentService } from 'src/app/shared/services/remedi.cc/doc-wise-appointment.service';
import { LookupService } from 'src/app/shared/services/lookup.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { CommonService } from 'src/app/shared/services/common.service';
@Component({
  selector: 'app-patient-booking-registration',
  standalone: true,
  templateUrl: './patient-booking-registration.page.html',
  styleUrls: ['./patient-booking-registration.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonFooter,
    IonButton,
    IonIcon,
    IonItem,
    IonInput,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonSegment,
    IonSegmentButton,
    IonRadio,
    IonRadioGroup,
    IonRow,
    IonCol,
    IonAvatar
]
})
export class PatientBookingRegistrationPage implements OnInit, OnChanges {


  patientData!: EmrPatientInfo;
  menuOpen = false;

  IdCardList: LookUpWithStatus[] = []
  TokenTypeList: AppointmentType[] = []
  AppointmentProcedureList: LookUp[] = []
  TokenTimeList: TokenTime[] = []

  patientList: PatientSearchCombined[] = [];
  searchTimer: any;
  SearchValue: string = ''

  SearchBy: 'op' | 'name' | 'id' = 'name'

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


  // DoctorId: string = "UCHM000001"
  // BranchId: string = "1010000001"

  @Input() DoctorId: string = ''
  @Input() BranchId: string = ''
  @Input() doctorName = '';
  @Input() selectedDate: any;
  @Input() selectedTime: string = '';
  @Input() tokenNumber: number = 0;
  @Input() EmpId: string = '';
  @Output() closePopup = new EventEmitter<any>();

  patientType: 'registered' | 'new' = 'registered';

  bd = new Booking()


  bookingData: any = {
    searchBy: 'op',
    hospitalNo: '',
    name: '',
    age: null,
    gender: 'male',
    idType: '',
    idNo: '',
    mobile: '',
    address: '',
    // mobile:'',
    appointmentType: 'single',
    procedure: [],
    doctorMessage: ''
  };

  constructor(
    private dwaService: DocWiseAppointmentService,
    private lookUpService: LookupService,
    private datePipe: DatePipe,
    private notification:NotificationService,
    private modalCtrl:ModalController,
    private comser:CommonService
  ) {
    addIcons({ saveOutline, });
    
  }

  ngOnInit(): void {
    this.getIdCardTypes()
    this.GetActiveAppointmentTokenTypesAsync()
    this.GetDoctorAppointmentProceduresAsync()
    this.GetDoctorFdAppTokensAsync()
    
    console.log(this.selectedDate,this.selectedTime);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pushTokenNumber();
  }

  clear() {
    Object.keys(this.bookingData).forEach(k => this.bookingData[k] = '');
    this.bookingData.gender = 'male';
    this.bookingData.appointmentType = 'single';
    this.bookingData.procedure = [];
  }

  pushTokenNumber(){

    this.bd.TokenNosSelected.push(this.tokenNumber)
  }

  async save() {
    console.log('BOOKING DATA', this.bd);
    console.log('BOOKING DATA', this.bookingData);
    this.bd.BranchId = Number(this.BranchId)
    this.bd.DoctId = this.DoctorId
    this.bd.EmpId = this.DoctorId
    this.bd.BkVisitDate = this.selectedDate
    this.bd.BkDate = new Date();
    this.bd.BkNewReg = this.patientType == 'new' ? 'Y' : 'N';
    this.bd.ActiveYear = Number(this.datePipe.transform(new Date(), 'yyyy'))
    // this.bd.BkPatGender = 
    this.bd.TokenNos=[]
    if(this.bd.TokenNosSelected.length>0)
    {
      for(let i = 0 ; i < this.bd.TokenNosSelected.length; i++)
      {
        let tokenDetails = new BkDateDetails()
        // tokenDetails.Book Date = this.selectedDate
        // tokenDetails.BookTime = this.TokenTimeList.filter(x=>x.token==this.bd.TokenNosSelected[i])[0].tim
        tokenDetails.BookTime = this.datePipe.transform((this.comser.combineDateAndTime(this.datePipe.transform(this.selectedDate,'dd-MM-yyyy')??'', this.TokenTimeList.filter(x => x.token == this.bd.TokenNosSelected[i])[0].tim)).toString(),'dd/MMM/yyyy hh:mm a')
        tokenDetails.TokenNo = this.bd.TokenNosSelected[i]
        this.bd.TokenNos.push(tokenDetails)
      }
    }
   console.log(this.bd);
   
    // this.bd.toke
    // return 
    ;(await this.dwaService.SubmitOrUpdatePatientBookingRegistration(this.bd)).subscribe((data: any) => {
      console.log(data);

      if(data.status==200)
      {
        
        this.notification.showNotification(data.message??'Booking successful','success')
        this.close()

      }
      else
      {
        this.notification.showNotification(data.message??'Booking failed','error')
      }

    })
  }

  onSearchByChange(event: any) {
    console.log(event);
    if (this.SearchValue != '') {
      let event = {
        target: {
          value: this.SearchValue
        }
      };
      this.onSearchChange(event)
    }


  }


  async getIdCardTypes() {
    (await this.lookUpService.GetActiveIdentityCardsAsync()).subscribe((data: any) => {
      console.log(data);
      this.IdCardList = data

    })
  }

  async GetActiveAppointmentTokenTypesAsync() {
    (await this.lookUpService.GetActiveAppointmentTokenTypesAsync()).subscribe((data: any) => {
      console.log(data);
      this.TokenTypeList = data
      this.bd.AttId = this.TokenTypeList.filter((x:AppointmentType)=>x.defaulT_STATUS=="Y")[0].atT_ID

    })
  }

  async GetDoctorAppointmentProceduresAsync() {
    (await this.lookUpService.GetDoctorAppointmentProceduresAsync(this.DoctorId, this.BranchId)).subscribe((data: any) => {
      console.log(data);
      this.AppointmentProcedureList = data

    })
  }



  async GetDoctorFdAppTokensAsync() {
    (await this.dwaService.GetDoctorFdAppTokensAsync(this.DoctorId, this.BranchId, this.datePipe.transform(new Date()))).subscribe((data: any) => {
      console.log(data);
      // this.AppointmentProcedureList = data
      this.TokenTimeList = data

    })
  }


  async SearchPatientByNameAsync(name: string) {
    (await this.dwaService.SearchPatientByNameAsync(name)).subscribe((data: any) => {
      console.log(data);
      // this.AppointmentProcedureList = data
      // this.TokenTimeList=data
      this.patientList = data

    })
  }

  async SearchPatientAsync(name: string) {
    (await this.dwaService.SearchPatientAsync(name)).subscribe((data: any) => {
      console.log(data);
      this.patientList = data
      // this.AppointmentProcedureList = data
      // this.TokenTimeList=data

    })
  }





  onSearchChange(ev: any) {
    console.log(ev);

    const val = ev.target.value;

    clearTimeout(this.searchTimer);

    if (!val || val.length < 2) {
      this.patientList = [];
      return;
    }

    // debounce 400ms typing
    this.searchTimer = setTimeout(() => {
      this.searchPatient(val);
    }, 400);
  }

  async searchPatient(text: string) {
    if (this.SearchBy == 'name') {
      this.SearchPatientByNameAsync(text)
    }
    else {
      this.SearchPatientAsync(text)
    }

    // CALL YOUR API HERE
    // (await this.dwaService.SearchPatientAsync(text))
    //   .subscribe((data: any) => {

    //     console.log("PATIENT SEARCH", data);
    //     this.patientList = data || [];

    //   });
  }



  selectPatient(p: PatientSearchCombined) {

    console.log("SELECTED", p);


    // this.patientData = p;
    this.bd.BkPatName = p.pati_Name??p.patiName;
    this.bd.BkPatAge  = (p.pati_Age)?.replace("Y","")??''
    this.bd.BkContactNo = p.mobNo
    this.bd.BrIdNo = p.idCardNo??''
    this.bd.BrIdType = Number(p.idCard_Id)
    this.bd.PatiId = p.patiId
    this.bd.BkPatAddr1 = p.address
    this.bd.BkPatGender = p.pati_Gender=="Male"?"M":p.pati_Gender=="Female"?"F":"O"

    // this.bd.BkPatAge = p.patI_AGE;
    // this.bd.BkContactNo = p.mobile;
    // this.bookingData.hospitalNo = p.opnumber;

    this.patientList = []; // close dropdown
  }




   close(){
    this.closePopup.emit();
  }


  onPatientTypeChange(event:any){
    this.bd = new Booking() // reset booking data on patient type change
    this.pushTokenNumber();
    this.ngOnInit()
    

  
    

  }

}

