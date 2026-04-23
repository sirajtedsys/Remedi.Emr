import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonCheckbox,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { Prescription } from 'src/app/shared/class/remedi.emr/Prescription/Prescription';
import { LookUp } from 'src/app/shared/interfaces/lookup/lookup';
import { FrequencyDto } from 'src/app/shared/interfaces/remedi.emr/prescription/freequecy-sto';
import { AppConfig } from 'src/app/shared/class/app-config';
import { PatientListDatewiseItem } from 'src/app/shared/interfaces/patient-list/patient-list-date-wise-item';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { LookupService } from 'src/app/shared/services/lookup.service';
import { PrescriptionService } from 'src/app/shared/services/remedi.emr/prescription.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserDetails } from 'src/app/shared/interfaces/user-details';
import { PrescriptionPlan } from 'src/app/shared/interfaces/remedi.emr/prescription/prescription-plan';
import { ItemListTablePage } from 'src/app/shared/item-list-table/item-list-table.page';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.page.html',
  styleUrls: ['./prescription.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
    IonIcon,
    IonInput,
    IonButton,
    IonCheckbox,
    IonSelect,
    IonSelectOption,
    ItemListTablePage
],
})
export class PrescriptionPage implements OnInit {
  medicineForms: Prescription[] = []
  BranchId: string = ''

  pf = new Prescription()

  DosageList: LookUp[] = []
  FrequencyList: FrequencyDto[] = []
  RouteList: LookUp[] = []

  appconfig = new AppConfig()
  pid: any;
  pEdocId: any;
  edocId: any;
  alllist: any;
  encrypteddata: any;
  DoctorId: string = ''
  EmployeeId: string = ''


  patientData!: PatientListDatewiseItem | null;

  constructor(
    private notificationService: NotificationService,
    private lookupService: LookupService,
    private prescriptionService: PrescriptionService,
    private shared: SharedDataService,
    private comser: CommonService,
    private authser: AuthService,
    private route: ActivatedRoute,
  ) {
    addIcons({ trash })
    this.getPatientDataFromShared()
    // this.getBranch()/
    this.GetDosagesByEmployeeAsync()
    this.GetFrequencyByEmployeeAsync()
    this.GetRoutesByEmployeeAsync()
    this.PAtientData()
  }

  ngOnInit() {
    // this.medicineForms.push(new Prescription())
  }

  getBranch() {
    if (localStorage.getItem('Branch')) {
      let e = JSON.parse(`${localStorage.getItem('Branch')}`)
      let ddata = this.authser.Decrypt(e)
      this.BranchId = ddata.BRANCH_ID
      console.log(this.BranchId);


    }
  }

  PAtientData() {


    const grandparentSnapshot = this.route.snapshot.parent;
    console.log(this.route);


    if (grandparentSnapshot) {
      this.encrypteddata = grandparentSnapshot.params['Id'] || null;
      this.GetdecryptedData(this.encrypteddata)
      // console.log('Extracted doc token from grandparent:', this.doc);
    } else {
      console.error('Grandparent route is not available or does not contain "doc" parameter.');
    }

  }

  async getPatientDataFromShared() {
    // const state = window.history.state;
    this.patientData = this.shared.getPatient()
    console.log(this.patientData);
    this.pid = this.patientData?.patI_ID
    this.edocId = this.patientData?.opvdtlS_DOCTOR_ID
    this.pEdocId = this.patientData?.emR_DOC_ID
    // this.BranchId = this.patientData.br
    // this.getExistingForm(this.patientData.emR_DOC_ID)

    await this.GetPatientDetails()
    await this.GetuserDetails()

  }


  async GetdecryptedData(val: any) {
    let dat = this.authser.Decrypt(val)
    console.log(dat);
    this.pid = dat.Pid
    // this.pEdocId=dat.DocId
    this.edocId = dat.DocId





    // this.den.EmrDocId = this.pEdocId
    // this.den.Type ='I'
    // this.getdoctorassessmentlist()

  }

  async GetuserDetails() {

    (await this.lookupService.GetUserDetails()).subscribe((data: UserDetails[]) => {

      console.log(data);

      if (data) {

        this.DoctorId = data[0].docT_ID ?? ''
        this.EmployeeId = data[0].emP_ID ?? ''
        this.BranchId = (data[0].brancH_ID ?? '').toString()        // console.log);

        this.Addnewform()
        this.GetPateintExistinfMedicine(this.pid, this.edocId)

      }
      else {
        // this.alllist=[]
        this.DoctorId = ""
        this.EmployeeId = ''
      }
    }, (error: any) => {
    })
  }



  async GetPatientDetails() {

    (await this.prescriptionService.GetPatientDetails(this.pid, this.pEdocId, this.edocId)).subscribe((data: any) => {

      console.log(data);

      if (data) {

        this.alllist = data.strouT1
        console.log(this.alllist);

      }
      else {
        this.alllist = []
      }
    }, (error: any) => {
    })
  }

  async GetPateintExistinfMedicine(patiid: any, EmrDocId: any) {

    (await this.prescriptionService.GetMedicinePlanForPatient(patiid, EmrDocId)).subscribe((val: any) => {

      console.log(val, 'exisitng patientmedin');
      // let val :PrescriptionPlan = res.data[0]

      if (val.data.length > 0) {

        let data: PrescriptionPlan[] = val.data.filter((x: PrescriptionPlan) => x.creatE_USER == this.EmployeeId && x.iteM_MS_TYPE == 'M' || 'O' || "N")

        if (data.length > 0) {
          //   {
          //     "MED_PLAN_SLNO": 14431,
          //     "DUNIT_ID": 0,
          //     "DUNIT_NAME": null,
          //     "DOSAGE_VAL": "0",
          //     "ITEM_ID": "PORT002484",
          //     "FREQ_ID": "1",
          //     "CLAIM_PERCENT": 0,
          //     "MED_ROUTE_ID": "UCHM000001",
          //     "MED_DOS_ID": "0",
          //     "MED_DOS_NAME": "0",
          //     "FREQ_NAME": "0-2-0",
          //     "MED_ROUTE_NAME": "INTRA AURAL",
          //     "DISC_PERCENT": 0,
          //     "APRVL_TYPE_ID": 0,
          //     "TOT_UNIT_ID": "0",
          //     "DURATION": 0,
          //     "REMARKS": null,
          //     "ITEM_NAME": "DERIPHYLLIN RET 150mg TAB 30'S",
          //     "BEFORE_FOOD": "N",
          //     "AFTER_FOOD": "N",
          //     "DO_NOT_BILL": "N",
          //     "TOT_QTY": 20,
          //     "MGEN_ID": "UCHM000266",
          //     "MGEN_NAME": "ETOPHYLLINE & THEOPHYLLINE",
          //     "SALE_RATE": 1.12,
          //     "ITEM_MS_TYPE": "M",
          //     "SALE_BRK_QTY": 0,
          //     "TEST_DOSE": "N",
          //     "CLAIM_ID": 0,
          //     "MODE_ID": "Day",
          //     "CREATE_USER": "UCHM000013",
          //     "DURATION_MODE": 1
          // }
          this.medicineForms = []
          for (let i = 0; i < data.length; i++) {
            this.pf = new Prescription()
            this.pf.Af = data[i].afteR_FOOD
            this.pf.MedPslno = data[i].meD_PLAN_SLNO
            this.pf.EdocId = this.edocId
            this.pf.DocId = this.DoctorId
            this.pf.MedId = data[i].iteM_ID
            this.pf.MedName = data[i].iteM_NAME
            this.pf.FreqId = data[i].freQ_ID
            this.pf.FreqName = data[i].freQ_NAME
            this.pf.MedRouteId = data[i].meD_ROUTE_ID
            this.pf.RouteName = data[i].meD_ROUTE_NAME
            this.pf.Dur = data[i].duration
            this.pf.PTestDose = data[i].tesT_DOSE
            this.pf.QtyTotal = data[i].toT_QTY
            this.pf.Bf = data[i].beforE_FOOD
            this.pf.DoNotBill = data[i].dO_NOT_BILL
            this.pf.Rmrks = data[i].remarks
            this.pf.PatI = this.pid
            this.pf.ClaimId = data[i].claiM_ID
            this.pf.GenricName = data[i].mgeN_NAME


            this.pf.ClaimPercent = data[i].claiM_PERCENT
            this.pf.DosId = data[i].meD_DOS_ID
            this.pf.DosNAme = data[i].meD_DOS_NAME
            this.pf.DiscPercent = data[i].disC_PERCENT
            this.pf.AprvlTypeId = data[i].aprvL_TYPE_ID
            this.pf.PSaleBrkQty = data[i].salE_BRK_QTY
            this.pf.TotUnit = data[i].toT_UNIT_ID
            this.pf.PDUnitId = data[i].duniT_ID.toString()
            this.pf.PDosageVal = data[i].dosagE_VAL
            this.pf.DurType = data[i].duratioN_MODE

            this.medicineForms.push(this.pf)


          }

        }

        // this.alllist = data.STROUT1
        // console.log(this.alllist);

      }
      else {
        // this.alllist=[]
      }
    }, (error: any) => {
    })
  }


  Addnewform() {

    this.pf = new Prescription()
    this.pf.EdocId = this.edocId
    this.pf.PatI = this.pid
    this.pf.DocId = this.DoctorId
    this.medicineForms.push(this.pf)
  }


  DeleteRow(index: any) {
    this.medicineForms.splice(index, 1)
  }




  InputField: string = ''  //fre   //medicine  //Dos   //Generic    //route

  DropdownData: any[] = []
  dropdownPosition = { top: '0px', left: '0px' }
  SelectedIndex: number = 0

  Field1: string = ''
  Field2: string = ''
  Field3: string = ''
  Header1: string = ''
  Header2: string = ''
  Header3: string = ''
  DropSearch: boolean = false
  DropDownSearchTerm: string = ''


  onDropSelected(selected: any) {
    console.log(selected);

    if (this.InputField == 'medicine') {
      this.medicineForms[this.SelectedIndex].MedId = selected.id
      this.medicineForms[this.SelectedIndex].MedName = selected.name
      this.medicineForms[this.SelectedIndex].GenricName = selected.gname
    }
    else if (this.InputField == 'fre') {
      this.medicineForms[this.SelectedIndex].FreqId = selected.freQ_ID
      this.medicineForms[this.SelectedIndex].FreqName = selected.freQ_NAME

    }
    else if (this.InputField == 'Dos') {
      this.medicineForms[this.SelectedIndex].DosId = selected.id
      this.medicineForms[this.SelectedIndex].DosNAme = selected.name

    }
    else if (this.InputField == 'route') {
      this.medicineForms[this.SelectedIndex].MedRouteId = selected.id
      this.medicineForms[this.SelectedIndex].RouteName = selected.name

    }
    else if (this.InputField == 'Generic') {
      // this.medicineForms[this.SelectedIndex].FreqId= selected.FREQ_ID
      this.medicineForms[this.SelectedIndex].GenricName = selected.gname

    }



    this.medicineForms[this.SelectedIndex].firstRowSearch = false
  }


  SearchHeaders: string[] = []
  SearchFileds: string[] = []
  SearchWebGrids: string = '5fr 5fr'

  async getMedicineDetails(term: any) {
    (await this.prescriptionService.GetOnlineMedicineAndGeneric(term, 0, this.BranchId)).subscribe((data: any) => {
      console.log(data.data);

      if (data.status == 200 && data.data.length > 0) {
        console.log(data);
        this.SearchHeaders = ['Generic', 'Medicine', 'Stock']
        this.SearchFileds = ['gname', 'name', 'stock']
        this.SearchWebGrids = "6fr 5fr 1fr"

        // this.Header1 = 'Generic'
        // this.Header2 = 'Medicine'
        // this.Header3 = 'Stock'
        // this.Field1 = 'gname'
        // this.Field2 = 'name'
        // this.Field3 = 'stock'
        // this.DropSearch = false
        // this.DropDownSearchTerm = ''

        this.DropdownData = [...data.data];
        // this.isLocationDropdownVisible = true; // Ensure dropdown visibility
        // this.cdr.detectChanges(); // Manually trigger change detection
      }
      else {


        this.SearchHeaders = []
        this.SearchFileds = []
        this.SearchWebGrids = ""
        this.DropdownData = []

        // this.Header1 = ''
        // this.Header2 = ''
        // this.Header3 = ''
        // this.Field1 = ''
        // this.Field2 = ''
        // this.Field3 = ''
        // this.DropdownData = []
        // this.DropSearch = false
        // this.DropDownSearchTerm = ''
        // this.cdr.detectChanges()
      }
    });
  }

  async getGenericDetails(term: any) {
    (await this.prescriptionService.GetOnlineGenericNamesAsync(term, 0, this.BranchId)).subscribe((data: any) => {
      console.log(data);

      if (data.status == 200 && data.data.length > 0) {
        console.log(data);

        this.SearchHeaders = ['Generic', 'Medicine', 'Stock']
        this.SearchFileds = ['gname', 'mname', 'stock']
        this.SearchWebGrids = "6fr 5fr 1fr"


        // this.Header1 = 'Generic'
        // this.Header2 = 'Medicine'
        // this.Header3 = 'Stock'
        // this.Field1 = 'gname'
        // this.Field2 = 'name'
        // this.Field3 = 'stock'
        // this.DropSearch = false
        // this.DropDownSearchTerm = ''

        this.DropdownData = [...data.data];
        // this.isLocationDropdownVisible = true; // Ensure dropdown visibility
        // this.cdr.detectChanges(); // Manually trigger change detection
      }
      else {


        this.SearchHeaders = []
        this.SearchFileds = []
        this.SearchWebGrids = ""
        this.DropdownData = []
        // this.cdr.detectChanges()
      }
    });
  }

  inputDosage(event: any, i: any) {

    this.InputField = 'Dos'
    // const inputElement = event.target as HTMLInputElement;
    // const rect = inputElement.getBoundingClientRect();

    // // Set the position for the dropdown
    // this.dropdownPosition = {
    //   top: `${rect.bottom + window.scrollY}px`, // Calculate position below the input field
    //   left: this.appconfig.EnvType == 'mobile' ? '1px' : `${rect.bottom + window.scrollX}px` // Align with the input field
    //   // top:'10px',
    //   // left:'10px'
    // };
    let val = event.target.value
    this.SelectedIndex = i
    this.medicineForms[i].firstRowSearch = true

    if (val != '') {
      //   {
      //     "FREQ_ID": "1",
      //     "FREQ_NAME": "0-2-0",
      //     "FREQ_STATUS": "A",
      //     "DEFINED_QTY": 0,
      //     "PRIORITY": 266
      // }
      // this.getMedicineDetails(val)
      // this.
      // this.Header1 = 'Dosage'
      // this.Header2 = ''
      // this.Header3 = ''
      // this.Field1 = 'name'
      // this.Field2 = ''
      // this.Field3 = ''
      // this.DropDownSearchTerm = val
      this.SearchHeaders = ['Dosage']
      this.SearchFileds = ['name']
      this.SearchWebGrids = "10fr"
      this.DropdownData = this.DosageList
      // this.DropSearch = true
    }
    else {

      this.medicineForms[i].firstRowSearch = false
    }
  }


  inputGeneric(event: any, i: any) {

    this.InputField = 'Generic'
    // const inputElement = event.target as HTMLInputElement;
    // const rect = inputElement.getBoundingClientRect();

    // // Set the position for the dropdown
    // this.dropdownPosition = {
    //   top: `${rect.bottom + window.scrollY}px`, // Calculate position below the input field
    //   left: this.appconfig.EnvType == 'mobile' ? '1px' : `${rect.left + window.scrollX}px` // Align with the input field
    //   // top:'10px',
    //   // left:'10px'
    // };
    let val = event.target.value
    this.SelectedIndex = i
    this.medicineForms[i].firstRowSearch = true

    if (val != '') {
      this.getGenericDetails(val)
    }
    else {

      this.medicineForms[i].firstRowSearch = false
    }
  }

  inputMedicine(event: any, i: any) {

    this.InputField = 'medicine'
    // const inputElement = event.target as HTMLInputElement;
    // const rect = inputElement.getBoundingClientRect();

    // // Set the position for the dropdown
    // this.dropdownPosition = {
    //   top: `${rect.bottom + window.scrollY}px`, // Calculate position below the input field
    //   left: this.appconfig.EnvType == 'mobile' ? '1px' : `${rect.left + window.scrollX}px` // Align with the input field
    //   // top:'10px',
    //   // left:'10px'
    // };
    let val = event.target.value
    this.SelectedIndex = i
    this.medicineForms[i].firstRowSearch = true

    if (val != '') {
      this.getMedicineDetails(val)
    }
  }


  inputFrequancy(event: any, i: any) {
    this.InputField = 'fre';

    // 1. Get the actual element from the Ionic event
    // const inputElement = event.target as HTMLElement;
    // const rect = inputElement.getBoundingClientRect();

    // // 2. Corrected Position Logic
    // this.dropdownPosition = {
    //   // Top is correct: Bottom of input + scroll
    //   top: `${rect.bottom + window.scrollY}px`,

    //   // FIX: Use rect.left for horizontal alignment, not rect.bottom
    //   left: this.appconfig.EnvType === 'mobile' ? '1px' : `${rect.left + window.scrollX}px`
    // };
    // this.dropdownPosition = {
    //   top: `${rect.bottom + 5}px`,
    //   left: `${rect.left}px`
    // };

    let val = event.detail.value;
    this.SelectedIndex = i;

    // Important: Ensure the search view is triggered
    this.medicineForms[i].firstRowSearch = true;

    if (val && val.trim() !== '') {
      this.SearchHeaders = ['Frequency'];
      this.SearchFileds = ['freQ_NAME'];
      this.SearchWebGrids = "10fr";
      // this.Header1 = 'Frequency';
      // this.Header2 = '';
      // this.Header3 = '';
      // // Double check casing: your data likely uses 'FREQ_NAME' (uppercase) 
      // // based on your comment, but your code says 'freQ_NAME'
      // this.Field1 = 'freQ_NAME';
      // this.Field2 = '';
      // this.Field3 = '';
      // this.DropDownSearchTerm = val;
      this.DropdownData = [...this.FrequencyList]; // Use spread to ensure change detection
      // this.DropSearch = true;
    } else {
      // this.DropDownSearchTerm = '';
      this.DropdownData = [...this.FrequencyList];
    }
  }

  activeIndex: number = 0;

  toggleAccordion(index: number) {
    this.activeIndex = this.activeIndex === index ? -1 : index;
  }


  inputRoute(event: any, i: any) {

    this.InputField = 'route'
    // const inputElement = event.target as HTMLInputElement;
    // const rect = inputElement.getBoundingClientRect();

    // // Set the position for the dropdown
    // this.dropdownPosition = {
    //   top: `${rect.bottom + window.scrollY}px`, // Calculate position below the input field
    //   left: this.appconfig.EnvType == 'mobile' ? '1px' : `${rect.bottom + window.scrollX}px` // Align with the input field
    //   // top:'10px',
    //   // left:'10px'
    // };
    let val = event.target.value
    this.SelectedIndex = i
    this.medicineForms[i].firstRowSearch = true

    if (val != '') {
      //   {
      //     "FREQ_ID": "1",
      //     "FREQ_NAME": "0-2-0",
      //     "FREQ_STATUS": "A",
      //     "DEFINED_QTY": 0,
      //     "PRIORITY": 266
      // }
      // this.getMedicineDetails(val)
      // this.
      this.SearchHeaders = ['Route']
      this.SearchFileds = ['name']
      this.SearchWebGrids = "10fr"
      // this.Header1 = 'Route'
      // this.Header2 = ''
      // this.Header3 = ''
      // this.Field1 = 'name'
      // this.Field2 = ''
      // this.Field3 = ''
      // this.DropDownSearchTerm = val
      this.DropdownData = this.RouteList
      // this.DropSearch = true
    }
    else {
      // this.DropDownSearchTerm = ''
    }
  }

  // MED_ROUTE_NAME


  OndropClose(event: any) {
    console.log(event);
    if (event) {
      // this.GetAllVendors(0)
    }

    // this.icdlist[this.Index].isDropdownVisible=false
    // this.Powerlensdropshow=false
    this.medicineForms[this.SelectedIndex].firstRowSearch = false
  }

  BrqQtyChange(event: any, index: any) {
    let val = event.target.checked

    if (val == true) {
      this.medicineForms[index].PSaleBrkQty = 1
    }
    else {
      this.medicineForms[index].PSaleBrkQty = 0
    }

  }

  EnterQtyTotal(event: any, index: any) {
    let val = event.target.value
    this.medicineForms[index].QtyTotal = val
    // Rmrks
  }



  AfChange(event: any, index: any) {
    let val = event.target.checked

    if (val == true) {
      this.medicineForms[index].Af = 'Y'
    }
    else {
      this.medicineForms[index].Af = 'N'
    }

  }

  BfChange(event: any, index: any) {
    let val = event.target.checked

    if (val == true) {
      this.medicineForms[index].Bf = 'Y'
    }
    else {
      this.medicineForms[index].Bf = 'N'
    }

  }

  TDChange(event: any, index: any) {
    let val = event.target.checked

    if (val == true) {
      this.medicineForms[index].PTestDose = 'Y'
    }
    else {
      this.medicineForms[index].PTestDose = 'N'
    }

  }

  EnterRemarks(event: any, index: any) {
    let val = event.detail.value
    this.medicineForms[index].Rmrks = val
    // Rmrks
  }

  ChangeDur(event: any, index: any) {
    console.log(event);

    let val = event.detail.value

    this.medicineForms[index].DurType = val
    let durval = 0
    if (this.medicineForms[index].Durval > 0) {
      durval = this.medicineForms[index].Durval
      this.medicineForms[index].Dur = Number(val) * Number(durval)
    }
    else {

      this.medicineForms[index].Dur = Number(val)
    }


    console.log(this.medicineForms);

  }


  EnterDurVal(event: any, index: any) {
    console.log(event);
    let val = event.detail.value

    this.medicineForms[index].Durval = val
    let DurType = 0
    if (this.medicineForms[index].DurType > 0) {
      DurType = this.medicineForms[index].DurType
      this.medicineForms[index].Dur = Number(val) * Number(DurType)
    }

    console.log(this.medicineForms);

  }




  async GetDosagesByEmployeeAsync() {
    (await this.prescriptionService.GetDosagesByEmployeeAsync()).subscribe((data: any) => {

      if (data) {
        console.log(data, 'patientlist');
        this.DosageList = data
        // this.procdatalistFilter=data
      }
      else {
        this.DosageList = []
      }
    },
      (error: any) => {
      })
  }

  async GetFrequencyByEmployeeAsync() {
    (await this.prescriptionService.GetFrequencyByEmployeeAsync()).subscribe((data: any) => {

      if (data) {
        console.log(data, 'GetFrequencyByEmployeeAsync');
        this.FrequencyList = data
        // this.procdatalistFilter=data
      }
      else {
        this.FrequencyList = []
      }
    },
      (error: any) => {
      })
  }


  async GetRoutesByEmployeeAsync() {
    (await this.prescriptionService.GetRoutesByEmployeeAsync()).subscribe((data: any) => {

      if (data) {
        console.log(data, 'GetRoutesByEmployeeAsync');
        this.RouteList = data
        // this.procdatalistFilter=data
      }
      else {
        this.RouteList = []
      }
    },
      (error: any) => {
      })
  }



  async Submit() {
    console.log(this.medicineForms, this.medicineForms[0].MedId);



    for (let i = 0; i < this.medicineForms.length; i++) {
      if (this.medicineForms[i].hasCustomValues()) {
        console.log(this.medicineForms[i].MandatoryCheck());
        if (this.medicineForms[i].MandatoryCheck()) {
          // Proceed if mandatory fields are filled
          continue;
        } else {
          // Mandatory fields are missing
          // Swal.fire('Enter the Mandatory Fields', '', 'warning');
          this.notificationService.showNotification('Enter the Mandatory Fields', 'warning');

          // Open the accordion for the current index
          const accordionId = `collapse${i}`;
          const accordionElement = document.getElementById(accordionId);

          if (accordionElement) {
            // Add the "show" class to display the accordion
            accordionElement.classList.add('show');
            accordionElement.previousElementSibling
              ?.querySelector('button')
              ?.setAttribute('aria-expanded', 'true');
          }

          return; // Stop further execution
        }
      } else {
        // Remove the form if it doesn't have custom values
        this.medicineForms.splice(i, 1);
        i--; // Adjust index after removal
      }
    }

    console.log(this.medicineForms);

    // await loading.present();
    (await
      // await loading.present();
      this.prescriptionService.ExecuteOnlineDocMediIns(this.medicineForms)).subscribe(
        (res: any) => {
          // loading.dismiss();
          let data = res
          console.log(data);
          if (data.status == 200) {
            this.notificationService.showNotification(data.message, 'success');
            this.medicineForms = []
            // this.GetuserDetails()

            this.Addnewform()
            this.GetPateintExistinfMedicine(this.pid, this.edocId)
          }
          else {
            this.notificationService.showNotification(data.message, 'warning');
          }

          // // Handle success case
          // if (data == 1) {
          //   // Swal.fire("Added Successfully",'','success')
          //   this.notificationService.showNotification("Added Successfully", 'success');
          // }
          // else if (data == 2) {
          //   // Swal.fire('Updated successfully','','success')
          //   this.notificationService.showNotification('Updated successfully', 'success');
          // }
          // else {
          //   this.notificationService.showNotification('Error while submission', 'warning');
          //   // Swal.fire('Error while submission','','warning')
          // }

        },
        (error: any) => {
          // loading.dismiss();
        }
      );
  }




}
