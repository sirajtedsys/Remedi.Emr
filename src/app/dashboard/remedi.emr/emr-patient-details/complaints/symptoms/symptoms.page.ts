import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonItem, IonCheckbox, IonInput } from '@ionic/angular/standalone';
import { Symptoms } from 'src/app/shared/class/remedi.emr/complaints/Symptoms';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { ComplaintService } from 'src/app/shared/services/remedi.emr/complaint.service';
import { Sympt } from 'src/app/shared/class/remedi.emr/complaints/Sympt';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.page.html',
  styleUrls: ['./symptoms.page.scss'],
  standalone: true,
  imports: [IonItem, IonCheckbox, IonInput, IonLabel, IonButton, CommonModule, FormsModule]
})
export class SymptomsPage implements OnInit {

  
  // Remarksnote:string=''

  @Input() SelectedData: any[] = []
  @Input() Remarksnote: any
  @Input() EmrdocId: string = ''
  @Input() DoctId: string = ''

  @Output() itemSelected = new EventEmitter<any>();
  // @input() Remarks;

  constructor(
    // private comser:CommonService,
    private notification: NotificationService,
    private complaintService: ComplaintService,
  ) {
    // this.case.emrDocId=this.EmrdocId;

    //  this.PAtientData()
  }

  ngOnInit() {

    console.log(this.DoctId);
    this.GetSymptoms(this.DoctId)

  }

  SelectedDataCheck() {
    console.log(this.SelectedData, 'slecteddata synmtoms');

    // this.Remarks = 
    if (this.SelectedData.length > 0) {
      let selectedids = []
      let selectedtreatmentstats = []
      for (let i = 0; i < this.SelectedData.length; i++) {
        selectedids.push(this.SelectedData[i].SYMP_ID)
        console.log(this.SelectedData[i].SYMP_ID);
        // selectedtreatmentstats.push(this.SelectedData[i].TreatmentSts)
      }

      for (let j = 0; j < selectedids.length; j++) {
        // let index = 

        // if(selectedids.includes(this.caseslist[j].CaseId))
        // {
        //   this.caseslist[j].CaseCheck=true
        // }
        this.symptomslist.splice(this.symptomslist.findIndex((x: any) => x.SYMP_ID == selectedids[j]), 1, this.SelectedData.filter((x: any) => x.SYMP_ID == selectedids[j])[0])
        // this.symptomslist.splice(this.symptomslist.findIndex((x:any)=>x.SYMP_NAME == selectedids[j]),1,this.SelectedData.filter((x:any)=>x.SYMP_NAME == selectedids[j])[0])

      }
    }
  }

  closeDropdown(m: boolean = false) {
    // Logic to hide the dropdown
    let Modal = m
    // this.WindowClosed.emit(Modal); // Replace with your actual visibility control
  }


  selectItem(item: any) {
    this.itemSelected.emit(item);
  }

  //region Symptoms
  icd1 = new Sympt()
  symptomslist: any[] = []

  async GetSymptoms(docId: any) {
   
    
    (await this.complaintService.GetSymptoms(docId)).subscribe((data: any) => {
      
      console.log(data);
      if (data) {
        this.symptomslist = data
        this.SelectedDataCheck()

      }
      else {
        // this.alllist=[]
        this.symptomslist = []
      }
    }, (error: any) => {
      
    })
  }

  AddOrRemoveCaseCheck(event: any, index: any) {
    console.log(event.target.checked, index);

    this.symptomslist[index].CaseCheck = event.target.checked
    console.log(this.symptomslist);

  }
  symp = new Sympt()

  async Submit() {
    let checkeditems = this.symptomslist.filter((x: any) => x.CaseCheck == true);
    const remark = this.Remarksnote;
    console.log(this.EmrdocId);

    let lsit = []
    for (let i = 0; i < checkeditems.length; i++) {
      this.symp = new Sympt()
      this.symp = checkeditems[i]
      // this.symp.emrDocId=this.EmrdocId;
      // console.log(this.case.Medication);
      // this.case.TreatmentSts = 

      lsit.push(this.symp)
      // this.case.CaseId
    }

    let Sy = new Symptoms()
    Sy.SymptList = lsit
    Sy.Remarks = remark
    Sy.EmrDocId = this.EmrdocId;
   

    
    (await this.complaintService.SaveSymptoms(Sy)).subscribe((data: any) => {
      console.log(this.symptomslist, "dta");
      
      if (data.status == 200) {
        // Swal.fire(data.Message, '', 'success')
        this.notification.showNotification(data.message, 'success');


        // Create an object to hold multiple values
        const dataToSend = {
          checkedItems: checkeditems,
          remark: remark
        };
        this.selectItem(dataToSend)
        // this.modalController.dismiss(dataToSend); // Pass the object back
        //  this.Clear();
      }
      else {
        // Swal.fire(data.Message, '', 'warning')
        this.notification.showNotification(data.message, 'warning');
      }

    }, (error: any) => {
      
      console.log(error, "error");

    })

  }

}

