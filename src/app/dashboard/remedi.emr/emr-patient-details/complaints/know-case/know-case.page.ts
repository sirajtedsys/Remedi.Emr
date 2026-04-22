import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonCheckbox } from '@ionic/angular/standalone';
import { Cases } from 'src/app/shared/class/remedi.emr/complaints/Cases';
import { Knowcase } from 'src/app/shared/class/remedi.emr/complaints/Knowcase';
import { CommonService } from 'src/app/shared/services/common.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Vitals } from 'src/app/shared/class/remedi.emr/complaints/Vitals';
import { AppConfig } from 'src/app/shared/class/app-config';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { ComplaintService } from 'src/app/shared/services/remedi.emr/complaint.service';
import { PrescriptionService } from 'src/app/shared/services/remedi.emr/prescription.service';

@Component({
  selector: 'app-know-case',
  templateUrl: './know-case.page.html',
  styleUrls: ['./know-case.page.scss'],
  standalone: true,
  imports: [IonCheckbox, IonButton, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class KnowCasePage implements OnInit {

  BranchId: string = ''
  cd = new Knowcase()
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
  // Remarksnote:string=''

  @Input() SelectedData: any[] = []
  @Input() Remarksnote: any
  @Input() EmrdocId: string = ''

  @Output() itemSelected = new EventEmitter<any>();
  @Output() WindowClosed = new EventEmitter<any>();
  // @Input() Remarks:string=''
  // @input() Remarks;

  constructor(
    private comser: CommonService,
    private authser: AuthService,
    private notificationService: NotificationService,
    private compaintService: ComplaintService,
    private prescriptionService: PrescriptionService
  ) {
    this.GetAllCases()
    // this.getBranch()
    //this.PAtientData()
  }

  ngOnInit() {

  }

  SelectedDataCheck() {
    // this.Remarks = 
    if (this.SelectedData.length > 0) {
      let selectedids = []
      let selectedtreatmentstats = []
      for (let i = 0; i < this.SelectedData.length; i++) {
        selectedids.push(this.SelectedData[i].CaseId)

        // selectedtreatmentstats.push(this.SelectedData[i].TreatmentSts)
      }

      for (let j = 0; j < selectedids.length; j++) {
        // let index = 

        // if(selectedids.includes(this.caseslist[j].CaseId))
        // {
        //   this.caseslist[j].CaseCheck=true
        // }
        this.caseslist.splice(this.caseslist.findIndex((x: any) => x.CaseId == selectedids[j]), 1, this.SelectedData.filter((x: any) => x.CaseId == selectedids[j])[0])
      }
    }
  }


  closeDropdown(m: boolean = false) {
    // Logic to hide the dropdown
    let Modal = m
    this.WindowClosed.emit(Modal); // Replace with your actual visibility control
  }


  selectItem(item: any) {
    this.itemSelected.emit(item);
  }

  // getBranch(){
  //   if(localStorage.getItem('Branch'))
  //   {
  //    let  e = JSON.parse(`${localStorage.getItem('Branch')}`)
  //     let ddata = this.authser.Decrypt(e)
  //     this.BranchId = ddata.BRANCH_ID
  //    console.log(this.BranchId);
  //        }
  // }

  // PAtientData(){
  //   const grandparentSnapshot = this.route.snapshot.parent?.parent;
  //   console.log(this.route);
  //       if (grandparentSnapshot) {
  //     this.encrypteddata = grandparentSnapshot.params['Id'] || null;
  //     this.GetdecryptedData(this.encrypteddata)
  //     // console.log('Extracted doc token from grandparent:', this.doc);
  //   } else {
  //     console.error('Grandparent route is not available or does not contain "doc" parameter.');
  //   }

  // }
  // async GetdecryptedData(val:any){
  //   let dat = this.authser.Decrypt(val)
  //   console.log(dat);
  //     this.pid = dat.Pid
  //     // this.pEdocId=dat.DocId
  //     this.edocId=dat.DocId
  //     this.doctorid = dat.DoctorId
  //     this.VisitId = dat.VisitId
  //     this.Gender = dat.Gender
  //  await this.GetPatientDetails() 
  //  console.log(dat.DocId);
  //  this.GetAllCases();


  // }

  async GetPatientDetails() {

    (await this.prescriptionService.GetPatientDetails(this.pid, this.pEdocId, this.edocId)).subscribe((data: any) => {

      console.log(data);
      if (data) {
        this.alllist = data.STROUT1
        console.log(this.alllist);

      }
      else {
        this.alllist = []
      }
    }, (error: any) => {

    })
  }
  //region Know Case
  icd = new Cases()
  caseslist: any[] = []

  async GetAllCases() {
    (await this.compaintService.GetAllCases()).subscribe((data: any) => {

      console.log(data);
      if (data) {
        this.caseslist = data
        this.SelectedDataCheck()

      }
      else {
        // this.alllist=[]
        this.caseslist = []
      }
    }, (error: any) => {

    })
  }

  case = new Cases()


  async Submit() {
    let checkeditems = this.caseslist.filter((x: any) => x.CaseCheck == true);
    const remark = this.Remarksnote;
    console.log(this.EmrdocId);

    let lsit = []
    for (let i = 0; i < checkeditems.length; i++) {
      this.case = new Cases()
      this.case = checkeditems[i]
      this.case.emrDocId = this.EmrdocId;
      console.log(this.case.Medication);
      // this.case.TreatmentSts = 

      lsit.push(this.case)
      // this.case.CaseId
    }

    let kn = new Knowcase()
    kn.CaseList = lsit
    kn.Remarks = remark
    kn.EmrDocId = this.EmrdocId;



    (await this.compaintService.SaveKnowCase(kn)).subscribe((data: any) => {
      console.log(this.caseslist, "dta");

      if (data.Status == 200) {
        // Swal.fire(data.Message, '', 'success')
        this.notificationService.showNotification(data.Message, 'success');

        // Create an object to hold multiple values
        let dataToSend = {
          checkedItems: checkeditems,
          remark: remark
        };

        this.selectItem(dataToSend)
        // this.modalController.dismiss(dataToSend); // Pass the object back
        //  this.Clear();
      }
      else {
        // Swal.fire(data.Message, '', 'warning')
        this.notificationService.showNotification(data.Message, 'warning');
      }

    }, (error: any) => {

      console.log(error, "error");

    })

  }

  // Submit() {
  //   let checkeditems = this.caseslist.filter((x: any) => x.CaseCheck == true);
  //   const remark = this.Remarksnote;

  //   // Create an object to hold multiple values
  //   const dataToSend = {
  //     checkedItems: checkeditems,
  //     remark: remark
  //   };

  //   this.modalController.dismiss(dataToSend); // Pass the object back
  // }


  AddOrRemoveCaseCheck(event: any, index: any) {
    console.log(event.target.checked, index);

    this.caseslist[index].CaseCheck = event.target.checked
    console.log(this.caseslist);

  }
  P_REGULAR
    (event: any, index: any) {
    let val = event.target.checked
    if (val == true) {
      this.caseslist[index].TreatmentSts = 'Y'
    }
    else {

      this.caseslist[index].TreatmentSts = 'N'

    }
  }
}

