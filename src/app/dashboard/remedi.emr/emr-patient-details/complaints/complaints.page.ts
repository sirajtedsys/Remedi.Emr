import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonHeader, IonInput, IonItem, IonLabel, IonTextarea, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonRadioGroup, IonRadio, IonIcon } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { addOutline, arrowBackOutline, chevronBackOutline, chevronForwardOutline, closeCircleOutline, pencil, trash } from 'ionicons/icons';
// import { ItemListTablePage } from "src/app/shared/item-list-table/item-list-table.page";
import { Complaint } from 'src/app/shared/class/remedi.emr/complaints/Complaint';
import { Knowcase } from 'src/app/shared/class/remedi.emr/complaints/Knowcase';
import { Symptoms } from 'src/app/shared/class/remedi.emr/complaints/Symptoms';
import { AppConfig } from 'src/app/shared/class/app-config';
import { Vitals } from 'src/app/shared/class/remedi.emr/complaints/Vitals';
import { PatientListDatewiseItem } from 'src/app/shared/interfaces/patient-list/patient-list-date-wise-item';
import { BloodGroup } from 'src/app/shared/interfaces/remedi.emr/complaints/blood-group';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { ComplaintService } from 'src/app/shared/services/remedi.emr/complaint.service';
import { PrescriptionService } from 'src/app/shared/services/remedi.emr/prescription.service';
import { LookupService } from 'src/app/shared/services/lookup.service';
import { UserDetails } from 'src/app/shared/interfaces/user-details';
import { ICDSel } from 'src/app/shared/class/remedi.emr/complaints/ICDSel';
import { Cases1 } from 'src/app/shared/class/remedi.emr/complaints/Cases1';
import { Sympt1 } from 'src/app/shared/class/remedi.emr/complaints/Sympt1';
import { ItemListTablePage } from 'src/app/shared/item-list-table/item-list-table.page';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.page.html',
  styleUrls: ['./complaints.page.scss'],
  standalone: true,
  imports: [IonRadioGroup, IonRadio, IonIcon, IonSelect, IonSelectOption, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonTextarea, IonLabel, IonItem, IonInput, ItemListTablePage]
})
export class ComplaintsPage implements OnInit {

  BranchId: string = ''
  cd = new Complaint()
  kn = new Knowcase()
  Sym = new Symptoms()
  appconfig = new AppConfig()
  pid: any;
  pEdocId: any;
  edocId: any;
  alllist: any;
  encrypteddata: any;
  DoctorId: string = ''
  EmployeeId: string = ''
  vit = new Vitals()
  doctorid: any;
  VisitId: any;

  Gender: any;

  patientData!: PatientListDatewiseItem;
  // @Input() SelectedData:any[]=[]
  // @Input() Remarksnote:string=''
  // @Input() EmrdocId:string=''
  BloodGroupList: BloodGroup[] = [];
  constructor(
    private notificationService: NotificationService,
    private comser: CommonService,
    private authser: AuthService,
    private shared: SharedDataService,
    private compaintService: ComplaintService,
    private prescriptionService: PrescriptionService,
    private lookupService: LookupService,
  ) {

    addIcons({ chevronBackOutline, chevronForwardOutline, closeCircleOutline, arrowBackOutline, pencil, addOutline, trash });
    this.getPatientDataFromShared()
    // this.getBranch()
    //  this.PAtientData()
  }

  ngOnInit() {
    console.log('a')
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
    // const grandparentSnapshot = this.route.snapshot.parent;
    // console.log(this.route);
    // if (grandparentSnapshot) {
    //   this.encrypteddata = grandparentSnapshot.params['Id'] || null;
    //   this.GetdecryptedData(this.encrypteddata)
    //   // console.log('Extracted doc token from grandparent:', this.doc);
    // } else {
    //   console.error('Grandparent route is not available or does not contain "doc" parameter.');
    // }

  }
  async GetdecryptedData(val: any) {
    let dat = this.authser.Decrypt(val)
    console.log(dat);
    this.pid = dat.Pid
    // this.pEdocId=dat.DocId
    this.edocId = dat.DocId
    this.doctorid = dat.DoctorId
    this.VisitId = dat.VisitId
    this.Gender = dat.Gender
    this.AddRow()
    await this.GetPatientDetails()
    this.GetComplaintDetails(dat.DocId)
    console.log(dat.DocId);
    this.GetPAtientVitals(dat.DocId)
    this.GetAllIcds(dat.DocId)
    console.log(dat.Pid)
    console.log(dat.DoctorId)
    this.GetAllergy(dat.Pid, dat.DoctorId)
    this.GetEduAdv(dat.DocId)
    this.GetKnowcase(dat.DocId)
    this.GetSymptomsDet(dat.DocId)
    //  await  this.GetuserDetails()
    // this.den.EmrDocId = this.pEdocId
    // this.den.Type ='I'
    // this.getdoctorassessmentlist()

  }


  async getPatientDataFromShared() {
    // const state = window.history.state;
    this.patientData = this.shared.getPatient()
    console.log(this.patientData);
    this.pid = this.patientData.patI_ID
    this.edocId = this.patientData.opvdtlS_DOCTOR_ID
    this.pEdocId = this.patientData.emR_DOC_ID
    // this.BranchId = this.patientData.br
    // this.getExistingForm(this.patientData.emR_DOC_ID)

    await this.GetPatientDetails()
    await this.GetuserDetails()

    this.AddRow()

    this.GetBloodGroup()
    await this.GetPatientDetails()
    this.GetComplaintDetails(this.pEdocId)
    console.log(this.edocId);
    this.GetPAtientVitals(this.pEdocId)
    this.GetAllIcds(this.pEdocId)
    // console.log(this.pid)
    // console.log(dat.DoctorId)
    this.GetAllergy(this.pid, this.edocId)
    this.GetEduAdv(this.pEdocId)
    this.GetKnowcase(this.pEdocId)
    this.GetSymptomsDet(this.pEdocId)

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

  async GetuserDetails() {

    (await this.lookupService.GetUserDetails()).subscribe((data: UserDetails[]) => {

      console.log(data);

      if (data) {

        this.DoctorId = data[0].docT_ID ?? ''
        this.EmployeeId = data[0].emP_ID ?? ''
        this.BranchId = (data[0].brancH_ID ?? '').toString()        // console.log);

        // this.Addnewform()
        // this.GetPateintExistinfMedicine(this.pid, this.edocId)

      }
      else {
        // this.alllist=[]
        this.DoctorId = ""
        this.EmployeeId = ''
      }
    }, (error: any) => {
    })
  }


  async GetComplaintDetails(edocId: any) {

    (await this.compaintService.GetFullEmrAssessment(edocId)).subscribe((data: any) => {

      console.log(data);
      // console.log(data[0].ICD_DIGNOSIS);

      if (data.length > 0) {

        this.cd.PATIID = data[0].PATIENT_ID;
        this.cd.p_mh_Other = data[0].P_MH_OTHER;
        this.cd.P_FAMILY_MED_HISTORY = data[0].FAMILY_MED_HISTORY;
        this.cd.P_DOCID = data[0].DOC_ID;
        this.cd.P_EMR_DOC_ID = data[0].EMR_DOC_ID;
        this.cd.EDOCID = data[0].EDOC_ID;
        this.cd.DOCID = data[0].DOC_ID;
        // this.cd.COMPLNT = data[0].COMPLAINT;
        // this.cd.HSTRY = data[0].HISTORY;
        this.cd.COMPLNT = data[0].COMPLNT;
        this.cd.HSTRY = data[0].HSTRY;
        this.cd.IMMUN = data[0].IMMUNIZATION;
        this.cd.GENRMRKS = data[0].GENERAL_REMARKS;
        this.cd.I_TREATMENT_REMARKS = data[0].TREATMENT_REMARKS;
        this.cd.P_TREATMENT_REMARKS_NEW = data[0].TREATMENT_REMARKS_NEW;
        this.cd.P_NOTES = data[0].NOTES;
        this.cd.P_DOCT_NOTES = data[0].DOCTOR_NOTES;
        this.cd.EDOC_ID = data[0].EDOC_ID;
        this.cd.P_OPERTN_NOTE = data[0].OPERATION_NOTE;
        this.cd.USER_ID = data[0].USER_ID;
        this.cd.CREATEUSR = data[0].CREATE_USER;
        // this.cd.ICDSL_NO = data[0].ICD_SL_NO;
        this.cd.ICDSL_NO = 1;
        // this.cd.ICDDIGNOSIS = data[0].ICD_DIAGNOSIS;
        this.cd.ICDDIGNOSIS = data[0].ICD_DIGNOSIS;
        this.cd.CURRENT_MEDICATION = data[0].CURRENT_MEDICATION;

        this.cd.PATI = data[0].PATIENT;
        this.cd.PATI_ID = data[0].PATIENT_ID;
        this.cd.BRANCHCODE = data[0].BRANCH_CODE;
        this.cd.SYSTEMIC = data[0].SYSTEMIC;
        this.cd.LOCALEX = data[0].LOCALEX;

      }
      else {
        // this.alllist=[]
      }
    }, (error: any) => {

    })
  }

  async GetAllIcds(Id: any) {

    (await this.compaintService.GetVisitIcdDetails(Id)).subscribe((data: any) => {

      console.log(data);
      if (data.length > 0) {
        // this.alllist = data.STROUT1
        // console.log(this.alllist);
        //   {
        //     "ICD_ID": "551",
        //     "ICODE_ID": 2,
        //     "ICODE_DTLS_ID": 1,
        //     "ICODE_DTLS_NAME": "Typhoid fever",
        //     "ICODE_DTLS_CODE": "A01.0",
        //     "ICD_RMRKS": "test00000",
        //     "MRD_UPDATE_STS": "N",
        //     "MRD_UPDATE_USR": "UCHM000013",
        //     "MRD_UPDATE_DATE": "2025-02-15T00:00:00"
        // }

        this.icdlist = []
        for (let i = 0; i < data.length; i++) {
          this.icd = new ICDSel()
          this.icd.Name = data[i].ICODE_DTLS_NAME
          this.icd.Code = data[i].ICODE_DTLS_CODE
          this.icd.icdCodeId = data[i].ICODE_ID
          this.icd.emrDocId = this.edocId
          this.icd.icdCodeDtlsId = data[i].ICODE_DTLS_ID
          this.icd.icdId = data[i].ICD_ID
          this.icd.icdSlNo = i + 1
          this.icd.isDropdownVisible = false
          this.icd.patiId = this.pid
          this.icd.remarks = data[i].ICD_RMRKS
          this.icdlist.push(this.icd)
        }

      }
      else {
        // this.alllist=[]
        // this.icdlist=[]
      }
    }, (error: any) => {

    })
  }





  async GetPAtientVitals(edocId: any) {

    (await this.compaintService.GetPatientVitals(edocId)).subscribe((data: any) => {
      console.log(data);



      if (data.length > 0) {
        this.vit.height1 = data[0].HEIGHT;
        this.vit.weight1 = data[0].WEIGHT;
        this.vit.temp1 = data[0].DOC_ID;
        this.vit.pulse1 = data[0].EMR_DOC_ID;

        this.vit.maxBpLeft = data[0].BP_LEFTMAX;
        this.vit.minBpLeft = data[0].BP_LEFTMIN;
        this.vit.maxBp = data[0].MAX_BP;
        this.vit.minBp = data[0].MIN_BP;
        this.vit.rr1 = data[0].RR;
        this.vit.pSpo2 = data[0].SPO2;

        this.vit.pGrbs = data[0].GRBS;
        this.vit.temp1 = data[0].TEMP;

        this.vit.pulse1 = data[0].PULSE;
        this.vit.pPainAssessment = data[0].PAINASSESSMENT;
        this.vit.pTempUnit = data[0].TEMP_UNIT;
        this.vit.pNurseRemarks = data[0].NURSE_REMARKS;
        this.vit.pLocation = data[0].LOCATION;
        this.vit.pRemarks = data[0].P_REMARKS;
        this.vit.pBg = data[0].BG;
        this.vit.BLD_GRP_ID = data[0].BLD_GRP_ID
        this.calculateBMI('h')
        this.calculateBMI('w')

      }
      else {
        this.alllist = []
      }
    }, (error: any) => {

    })
  }


  async submitvitalks() {



    try {
      const data = await this.executeVitalStatusUpdate();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {

    }
  }

  executeVitalStatusUpdate(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      (await this.compaintService.ExecuteSpOnlineVitalStatusUpd(this.cd)).subscribe(
        (data: any) => resolve(data),
        (error: any) => reject(error)
      );
    });
  }

  BMI: number = 0

  calculateBMI(val: any): number | null {
    let j = this.cd.vital
    if (val == 'h') {
      console.log(this.Gender, this.vit.height1, this.vit.weight1);

      this.calculateIBW(this.Gender, Number(this.vit.height1))

    }
    if (this.vit.height1! && this.vit.weight1) {
      // Convert height from cm to meters
      const heightInMeters = Number(this.vit.height1) / 100;
      console.log(heightInMeters);


      // Calculate BMI
      const bmi = Number(this.vit.weight1) / (heightInMeters * heightInMeters);

      this.BMI = Number((bmi).toFixed(2))
      // this.setBMIMsg(this.BMI);
      console.log(this.BMI);
      // this.Bmi = bmi
    }
    return null; // Return null if height or weight is not provided
  }
  IBW: number = 0

  async calculateIBW(gender: 'M' | 'F', heightCm: number) {
    // Convert height from cm to inches (1 inch = 2.54 cm)
    const heightInches = heightCm / 2.54;

    // Apply Devine formula
    if (gender === 'M') {
      // IBW for men
      this.IBW = Number((50 + 2.3 * (heightInches - 60)).toFixed(2))
    } else {
      // IBW for women
      this.IBW = Number((45.5 + 2.3 * (heightInches - 60)).toFixed(2));
    }
    console.log(this.IBW);
  }


  async Submit() {

    this.cd.PATIID = this.pid
    this.cd.PATI = this.pid
    this.cd.PATI_ID = this.pid
    this.cd.P_EMR_DOC_ID = this.edocId
    this.cd.EDOC_ID = this.edocId
    this.cd.DOCID = this.doctorid
    console.log(this.cd.DOCID);
    this.cd.EDOCID = this.edocId
    this.cd.P_DOCID = this.doctorid
    this.cd.P_EMR_DOC_ID = this.edocId
    console.log(this.cd.ICDDIGNOSIS)
    this.cd.ICDSL_NO = 0
    this.cd.BRANCHCODE = 'UCHM'
    console.log(this.cd.p_mh_Other)
    // console.log(P_MH_OTHER);
    console.log(this.cd.P_FAMILY_MED_HISTORY)

    this.vit.patiId = this.pid
    this.vit.edocId = this.edocId
    this.vit.doctId = this.doctorid
    this.vit.visitId = this.VisitId
    //  this.vit.pBg=this.BloodGroupList[0]
    //  this.vit.pBldGrpId=this.vit.BLD_GRP_ID
    console.log(this.vit)
    // this.vit.pBldGrpId = this.BLD_GRP_ID;
    // this.vit.pBg = data[0].BLD_GRP_NAME;
    // this.vit.empId=this.EmployeeId
    console.log(this.vit)
    this.cd.vital = this.vit


    this.cd.IcdList = this.icdlist


    // console.log(this.cd.P_TYPE)
    // if(this.cd.P_TYPE==4)
    // {
    //   this.cd.P_PRESC_ADV=this.cd.SYSTEM_EXAM
    // }
    // if(this.cd.P_TYPE==5)
    //   {
    //     this.cd.P_PRESC_ADV=this.cd.PHYSICAL_EXAM
    //   }
    console.log(this.cd.CURRENT_MEDICATION)

    await this.submitvitalks()
      // if(this.cd.P_CONSULTANT!='' && this.cd.P_CHIEF_COMPLAINTS !=null)
      // {
      // await loading.present();
      ; (await
        // if(this.cd.P_CONSULTANT!='' && this.cd.P_CHIEF_COMPLAINTS !=null)
        // {
        // await loading.present();
        this.compaintService.SaveComplaint(this.cd)).subscribe((data: any) => {
          console.log(data, "dta");

          if (data.Status == 200) {
            // Swal.fire(data.Message,'','success')
            this.notificationService.showNotification(data.Message, 'success');

            //  this.Clear();
          }
          else {
            // Swal.fire(data.Message,'','warning')
            this.notificationService.showNotification(data.Message, 'warning');
          }

        }, (error: any) => {

          console.log(error, "error");

        })
    // }
    // else
    // {
    //   Swal.fire("Please Enter Consultant  and Cheif Complaint",'','warning')
    // }
  }

  Clear() {
    this.cd.p_mh_Other = '';
    this.cd.P_FAMILY_MED_HISTORY = '';
    this.cd.COMPLNT = '';
    this.cd.HSTRY = '';
    this.cd.IMMUN = '';
    this.cd.GENRMRKS = '';
    this.cd.I_TREATMENT_REMARKS = '';
    this.cd.P_TREATMENT_REMARKS_NEW = '';
    this.cd.P_NOTES = '';
    this.cd.P_DOCT_NOTES = '';
    this.cd.P_OPERTN_NOTE = '';
    // this.cd.USER_ID = data[0].USER_ID;
    // this.cd.CREATEUSR = data[0].CREATE_USER;
    // this.cd.ICDSL_NO = data[0].ICD_SL_NO;
    // this.cd.ICDSL_NO=1;
    // this.cd.ICDDIGNOSIS = data[0].ICD_DIAGNOSIS;
    this.cd.ICDDIGNOSIS = '';
    this.cd.CURRENT_MEDICATION = '';

    // this.cd.PATI = data[0].PATIENT;
    // this.cd.PATI_ID = data[0].PATIENT_ID;
    // this.cd.BRANCHCODE = data[0].BRANCH_CODE;
    this.cd.SYSTEMIC = '';
    this.cd.LOCALEX = '';
    this.cd.ALLERGYDTLS = '';
    this.cd.P_ALLERGY_STATUS = '';
    this.cd.P_PATI_EDU = '';
    this.cd.P_PATI_ADVICE = '';
    this.cd.edu = 'No';
    this.cd.adv = 'No';
    //  this.vit.height1='';
    this.vit.height1 = null;
    this.vit.weight1 = null;

    this.vit.minBpLeft = null;
    this.vit.maxBpLeft = null;
    this.vit.minBp = null;
    this.vit.maxBp = null;
    this.vit.BLD_GRP_ID = '';
    this.vit.pSpo2 = null;
    this.vit.pGrbs = '';
    this.vit.temp1 = null;
    this.vit.rr1 = null;
    this.vit.pLocation = '';
    this.vit.pNurseRemarks = '';
    this.vit.pRemarks = '';
    this.vit.pulse1 = null;
    this.IBW = 0;
    this.BMI = 0;
    this.icdlist = []
    this.AddRow()
    // this.GetPAtientVitals
    this.SelectedknowCase = []
    this.kn.knowCaseCode = ''
    this.kn.Remarks = ''

    this.SelectedSymptoms = []
    this.Sym.SymptomsName = ''
    this.Sym.Remarks = ''

  }


  KnowCaseModal: boolean = false
  SymptomsModal: boolean = false


  // region icd

  icd = new ICDSel()
  icdlist: any[] = []
  AddRow() {
    // console.log(this.icdlist.le);

    this.icd = new ICDSel()
    this.icd.patiId = this.pid
    this.icd.emrDocId = this.edocId
    // this.icd
    this.icdlist.push(this.icd)

  }

  remarksin(event: any, i: any) {
    let val = event.target.value
    this.icdlist[i].remarks = val
  }



  DeleteRow(index: any) {
    this.icdlist.splice(index, 1)
  }

  AddIcdList(dat: any) {
    if (this.icdlist.length == 0) {

      this.icd = new ICDSel()
      // this.icd.patiId = this.patientid
      this.icd.emrDocId = dat
      this.icdlist.push(this.icd)

    }
  }

  CodeType(event: any, i: any) {

    console.log(event.target.value);

    // this.cdr.detectChanges()
    console.log(i);


    console.log(this.dropdownPosition);

    this.icdlist[i].isDropdownVisible = true
    console.log(this.icdlist);

    let type = 'p'
    let val = event.target.value
    this.GetOnlineICDSelectionAsync(type, val)
    this.Index = i
  }

  NameType(event: any, i: any) {



    console.log(this.dropdownPosition);
    // this.cdr.detectChanges()

    this.icdlist[i].isDropdownVisible = true

    this.Index = i
    let type = 'N'
    let val = event.target.value
    this.GetOnlineICDSelectionAsync(type, val)

  }


  ICdSelectionList: any[] = []
  Index: any


  async GetOnlineICDSelectionAsync(type: any, code: any) {
    (await this.compaintService.SearchIcd(type, code)).subscribe((data: any) => {
      if (data) {
        console.log(data);

        this.ICdSelectionList = [...data];
        // this.isLocationDropdownVisible = true; // Ensure dropdown visibility
        // this.cdr.detectChanges(); // Manually trigger change detection
      }
    });
  }
  selectedLOcationName: string = ''
  //  isLocationDropdownVisible=false

  dropdownPosition = { top: '0px', left: '0px' };

  showLocationDropdown(event: FocusEvent) {
    // this.SelectedIndex = index
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    // console.log(rect);


    // Get the dropdown position
    this.dropdownPosition = {
      top: `${rect.bottom}px`,
      left: `${rect.left}px`,
    };

    //  this.isLocationDropdownVisible = true;
  }
  onLocationSelected(selected: any) {
    console.log(selected);
    this.icdlist[this.Index].icdCodeId = selected.ICODE_ID
    this.icdlist[this.Index].icdCodeDtlsId = selected.ICODE_DTLS_ID
    this.icdlist[this.Index].Code = selected.ICODE_DTLS_CODE
    this.icdlist[this.Index].Name = selected.ICODE_DTLS_NAME


    // ACTIVE_STATUS: "A"
    // BLOCK_ID: 1
    // CHPT_ID: 1
    // CREATE_DATE: "2012-05-24T16:31:29"
    // CREATE_USER: "UCHM000001"
    // ICODE_CODE: "A08"
    // ICODE_DESCRIPTION: null
    // ICODE_DTLS_CODE: "A08.0"
    // ICODE_DTLS_DESCRIPTION: null
    // ICODE_DTLS_ID: 1
    // ICODE_DTLS_NAME: "Rotaviral enteritis"
    // ICODE_DTLS_SUB_CODE: null
    // ICODE_ID: 9
    // ICODE_NAME: "Viral and other specified intestinal infections"
    // UPDATE_DATE: null
    // UPDATE_USER: null
    // this.purchase.VendorId =selected.Id
    // this.purchase.Address=selected.Addresses[0].Address1  + selected.Addresses[0].Address2 + selected.Addresses[0].Address3
    // this.purchase.CreditLimit= selected.CreditLimit
    //  this.pr.P_LOCATION_ID = selected.TrdId

    //  this.selectedLOcationName = selected.Place

    this.icdlist[this.Index].isDropdownVisible = false
  }

  OnLOcationdropClose(event: any) {
    console.log(event);
    if (event) {
      // this.GetAllVendors(0)
    }

    this.icdlist[this.Index].isDropdownVisible = false
  }
  //#endregion Vendor dropdown

  //region know case modal

  SelectedknowCase: any[] = []

  itemselected(event: any) {
    const modalElement = document.getElementById('myModal'); // Replace with your modal's ID
    // if (modalElement) {
    //   const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    //   modalInstance.hide();
    // }
    this.KnowCaseModal = false
    let data = event

    if (data) {
      // data.checkedItems
      let knowCaseCode = ''
      let codesarr = []
      for (let i = 0; i < data.checkedItems.length; i++) {
        codesarr.push(data.checkedItems[i].CaseCode)
      }
      knowCaseCode = codesarr.join(',')
      console.log(knowCaseCode);
      this.kn.knowCaseCode = knowCaseCode;
      this.kn.Remarks = data.remark
      console.log(data.remark)
      this.SelectedknowCase = data.checkedItems
    }

  }

  async openKnowCaseModal() {
    // const modal = await this.modalController.create({
    //   component: KnowCasePage,
    //    cssClass: 'custom-modal',
    let componentProps = {
      SelectedData: this.SelectedknowCase,
      EmrdocId: this.edocId,
      Remarksnote: this.kn.Remarks
    }



    // {
    //   // data.checkedItems
    //   let knowCaseCode = ''
    //   let codesarr = []
    //   for (let i = 0; i < data.checkedItems.length; i++) {
    //     codesarr.push(data.checkedItems[i].CaseCode)
    //   }
    //   knowCaseCode = codesarr.join(',')
    //   console.log(knowCaseCode);
    //   this.kn.knowCaseCode = knowCaseCode;
    //   this.kn.Remarks = data.remark
    //   console.log(data.remark)
    //   this.SelectedknowCase = data.checkedItems
    // }

  }
  //#endregion know case modal


  //region Symptoms modal
  SelectedSymptoms: any[] = []

  itemselected1(event: any) {
    // const modalElement = document.getElementById('myModal1'); // Replace with your modal's ID
    // if (modalElement) {
    //   const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    //   modalInstance.hide();
    // }
    this.SymptomsModal = false
    let data = event
    console.log(data)
    if (data) {
      // data.checkedItems
      let SymptomsCode = ''
      let codesarr = []
      for (let i = 0; i < data.checkedItems.length; i++) {
        codesarr.push(data.checkedItems[i].SYMP_NAME)
      }
      SymptomsCode = codesarr.join(',')
      this.Sym.SymptomsName = SymptomsCode;
      this.Sym.Remarks = data.remark
      console.log(data.remark)
      this.SelectedSymptoms = data.checkedItems
    }

  }
  async openSymptomsModal() {
    console.log(this.doctorid, this.SelectedSymptoms);

    let componentProps = {
      SelectedData: this.SelectedSymptoms,
      EmrdocId: this.edocId,
      DoctId: this.doctorid,
      Remarksnote: this.Sym.Remarks
    }

    let data: any
    console.log(data);
    if (data) {
      // data.checkedItems
      let SymptomsCode = ''
      let symptarr = []
      for (let i = 0; i < data.checkedItems.length; i++) {
        symptarr.push(data.checkedItems[i].SYMP_NAME)

      }
      SymptomsCode = symptarr.join(',')
      console.log(SymptomsCode);
      // this.Sym.SymptomsName=SymptomsCode;
      this.Sym.SymptomsName = SymptomsCode;
      this.Sym.Remarks = data.remark
      console.log(data.remark)
      this.SelectedSymptoms = data.checkedItems
    }


  }

  //#endregion Symptoms modal

  // ngOnChanges() {
  //   if (this.cd.P_ALLERGY_STATUS === 'NKA') {
  //     this.cd.ALLERGYDTLS = 'No Known Allergies';
  //   } else if (this.cd.P_ALLERGY_STATUS === 'KA') {
  //     this.cd.ALLERGYDTLS = 'Known Allergies';
  //   } else if (this.cd.P_ALLERGY_STATUS === 'NA') {
  //     this.cd.ALLERGYDTLS = 'No Allergies';
  //   }
  // }

  async GetAllergy(patId: any, docId: any) {


    (await this.compaintService.GetPatientMedicalHistory(patId, docId)).subscribe((data: any) => {

      console.log(data);
      // console.log(data[0].ICD_DIGNOSIS);

      if (data.length > 0) {
        // this.cd.PATIID = data[0].pid;
        this.cd.ALLERGYDTLS = data[0].ALLERGIES;
        this.cd.P_ALLERGY_STATUS = data[0].ALLERGY_STATUS;
        // this.cd.P_DOCT_ID = data[0].doctorid;
      }
      else {
        // this.alllist=[]
      }
    }, (error: any) => {

    })
  }

  async GetEduAdv(edocId: any) {


    (await this.compaintService.GetPastMedicalSurgeryHistory(edocId)).subscribe((data: any) => {

      console.log(data);
      // console.log(data[0].ICD_DIGNOSIS);

      if (data.length > 0) {
        // this.cd.PATIID = data[0].pid;
        this.cd.P_PATI_EDU = data[0].PATI_EDU;
        this.cd.P_PATI_ADVICE = data[0].PATI_ADVICE;
        if (this.cd.P_PATI_EDU != '' && this.cd.P_PATI_EDU != null) {
          this.cd.edu = 'Yes'
        }
        else {
          this.cd.edu = 'No'
        }
        if (this.cd.P_PATI_ADVICE != '' && this.cd.P_PATI_ADVICE != null) {
          this.cd.adv = 'Yes'
        }
        else {
          this.cd.adv = 'No'
        }
        // this.cd.P_DOCT_ID = data[0].doctorid;
      }
      else {
        // this.alllist=[]
      }
    }, (error: any) => {

    })
  }
  // kns = new Cases1()
  async GetKnowcase(edocId: any) {


    (await this.compaintService.GetPatientCases(edocId)).subscribe((data: any) => {

      console.log(data);
      // console.log(data[0].ICD_DIGNOSIS);

      if (data) {
        let code = []
        for (let i = 0; i < data.length; i++) {
          let kns = new Cases1()
          kns.CaseId = data[i].CASE_ID
          kns.CaseCode = data[i].CASE_CODE
          kns.CaseName = data[i].CASE_NAME
          // this.kns.emrDocId=data[i].EMR_DOC_ID
          kns.TreatmentSts = data[i].TREATMENT_STS
          kns.Medication = data[i].MEDICATIONS
          kns.CaseCheck = true
          kns.Remarks = data[i].REMARKS
          this.kn.Remarks = kns.Remarks
          console.log(kns.Remarks)

          // data[i].CaseCheck= true

          code.push(data[i].CASE_CODE)
          this.SelectedknowCase.push(kns)


        }
        console.log(this.SelectedknowCase, 'selectedkknoiw xase');

        this.kn.knowCaseCode = code.join(',')

        // this.cd.PATIID = data[0].pid;
        // this.cd.P_PATI_EDU = data[0].PATI_EDU;
        // this.cd.P_PATI_ADVICE = data[0].PATI_ADVICE;
        // if(this.cd.P_PATI_EDU!='')
        // {
        //   this.cd.edu='Yes'
        // }
        // if(this.cd.P_PATI_ADVICE!='')
        //   {
        //     this.cd.adv='Yes'
        //   }

        // this.cd.P_DOCT_ID = data[0].doctorid;
      }
      else {
        // this.alllist=[]
      }
    }, (error: any) => {

    })
  }
  async GetSymptomsDet(edocId: any) {


    (await this.compaintService.GetPatientSymptoms(edocId)).subscribe((data: any) => {

      console.log(data);
      // console.log(data[0].ICD_DIGNOSIS);

      if (data) {
        let code = []
        let kns1 = new Symptoms()
        for (let i = 0; i < data.length; i++) {
          let kns = new Sympt1()

          kns.SYMP_ID = data[i].SYMP_ID
          kns.SYMP_NAME = data[i].SYMP_NAME
          kns.CaseCheck = true
          kns1.Remarks = data[i].REMARKS


          // kns.CaseCheck=true


          // data[i].CaseCheck= true

          // code.push(data[i].SYMP_ID)
          code.push(data[i].SYMP_NAME)
          this.SelectedSymptoms.push(kns)


        }
        console.log(this.SelectedSymptoms, 'selectesymptoms');
        console.log(code)
        this.Sym.SymptomsName = code.join(',')
        console.log(kns1.Remarks)
        this.Sym.Remarks = kns1.Remarks
        // this.Sym.Remarks=Remarks

        // this.cd.PATIID = data[0].pid;
        // this.cd.P_PATI_EDU = data[0].PATI_EDU;
        // this.cd.P_PATI_ADVICE = data[0].PATI_ADVICE;
        // if(this.cd.P_PATI_EDU!='')
        // {
        //   this.cd.edu='Yes'
        // }
        // if(this.cd.P_PATI_ADVICE!='')
        //   {
        //     this.cd.adv='Yes'
        //   }

        // this.cd.P_DOCT_ID = data[0].doctorid;
      }
      else {
        // this.alllist=[]
      }
    }, (error: any) => {

    })
  }

  async GetBloodGroup() {


    (await this.compaintService.GetBloodGroups()).subscribe((data: any) => {

      console.log(data);
      // console.log(data[0].ICD_DIGNOSIS);

      if (data.length > 0) {
        // this.vit.BLD_GRP_ID = data[0].BLD_GRP_ID;
        // this.vit.BLD_GRP_NAME = data[0].BLD_GRP_NAME;
        this.BloodGroupList = data

      }
      else {
        // this.alllist=[]
        this.BloodGroupList = []
      }
    }, (error: any) => {

    })
  }

  P_ALLERGY_STATUS
    (event: any) {
    let val = event.target.checked
    if (val == true) {
      // this.cd.P_DIARRHEA ='Others'
      this.cd.ALLERGYDTLS = 'No Known Allergies';
    }
  }
  P_ALLERGY_STATUS1
    (event: any) {
    let val = event.target.checked
    if (val == true) {
      // this.cd.P_DIARRHEA ='Others'
      this.cd.ALLERGYDTLS = 'Known Allergies';
    }
  }
  P_ALLERGY_STATUS2
    (event: any) {
    let val = event.target.checked
    if (val == true) {
      // this.cd.P_DIARRHEA ='Others'
      this.cd.ALLERGYDTLS = 'No Allergies';
    }
  }
  // clearTextArea() {
  //   console.log('aaaaaaaaaa')
  //   if (this.cd.edu === 'No') {
  //     this.cd.P_PATI_EDU = ''; // Clears the textarea if "No" is selected
  //     console.log(this.cd.P_PATI_EDU);
  //     console.log('bbbbbb')
  //   }
  // }

  clearTextArea(event: any, num: any) {
    if (event.target.checked == true) {
      if (num == 1) {
        this.cd.edu = 'Yes'
      }
      else {
        this.cd.edu = 'No'
        this.cd.P_PATI_EDU = ''
      }
    }
    console.log(event.target.checked);
    console.log(JSON.parse(JSON.stringify(this.cd.edu)));
    console.log(JSON.parse(JSON.stringify((this.cd.P_PATI_EDU))));

  }
  clearTextArea1(event: any, num: any) {
    if (event.target.checked == true) {
      if (num == 1) {
        this.cd.adv = 'Yes'
      }
      else {
        this.cd.adv = 'No'
        this.cd.P_PATI_ADVICE = ''
      }
    }
    console.log(event.target.checked);

    // console.log(this.cd.adv);
    // ,this.cd.P_PATI_ADVICE
    console.log(JSON.parse(JSON.stringify(this.cd.adv)));
    console.log(JSON.parse(JSON.stringify((this.cd.P_PATI_ADVICE))));



  }
  onBloodGroupChange(event: any) {
    const selectedId = event.target.value;  // Get the selected ID (BLD_GRP_ID)
    const selectedName = event.target.selectedOptions[0].text;  // Get the selected value (BLD_GRP_NAME)

    console.log('Selected Blood Group ID:', selectedId);
    console.log('Selected Blood Group Name:', selectedName);
    this.vit.pBg = selectedName;
    this.vit.pBldGrpId = selectedId;
    console.log(this.vit.pBg);

    // You can implement further logic using these values
  }

  caseslist: any[] = []
  AddOrRemoveCaseCheck(event: any, index: any) {
    console.log(event.target.checked, index);

    this.caseslist[index].CaseCheck = event.target.checked
    console.log(this.caseslist);

  }
  // SYSTEMIC,LOCALEX,P_FAMILY_MED_HISTORY,P_OPERTN_NOTE,ICDDIGNOSIS,CURRENT_MEDICATION,P_TREATMENT_REMARKS_NEW
  insert(event: any, cname: 'COMPLNT' | 'p_mh_Other' | 'HSTRY' | 'SYSTEMIC' | 'LOCALEX' | 'P_FAMILY_MED_HISTORY' | 'P_OPERTN_NOTE' | 'ICDDIGNOSIS' | 'CURRENT_MEDICATION' | 'P_TREATMENT_REMARKS_NEW') {
    this.cd[cname] = event.target.value
    // this.cd.p_mh_Other=event.target.value
    // this.cd.=event.target.value
  }

}
