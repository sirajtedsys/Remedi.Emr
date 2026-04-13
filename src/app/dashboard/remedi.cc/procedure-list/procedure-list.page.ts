import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonHeader, IonIcon, IonModal, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { PatientlistService } from 'src/app/shared/services/patientlist.service';
import { LookupService } from 'src/app/shared/services/lookup.service';
import { LookUp } from 'src/app/shared/interfaces/lookup/lookup';
import { PatientTestInfo } from 'src/app/shared/interfaces/patient-list/patient-test-info';
import { NoDataPage } from "src/app/components/no-data/no-data.page";
import { ProcedureNotePage } from "./procedure-note/procedure-note.page";
import { ProcedureNote } from 'src/app/shared/class/remedi.cc/procedure-note/procedure-note';
// import { IonModal } from '@ionic/angular/common';

@Component({
  selector: 'app-procedure-list',
  templateUrl: './procedure-list.page.html',
  styleUrls: ['./procedure-list.page.scss'],
  standalone: true,
  imports: [IonModal, IonButtons, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, CommonModule, FormsModule, IonButton, IonIcon, NoDataPage, ProcedureNotePage]
})
export class ProcedureListPage implements OnInit {

  fromDate: any = '';
  toDate: any = '';

  modalType: 'procedure-note'  = 'procedure-note'
  modalOpen: boolean = false

  EMRPatientsList:PatientTestInfo[] = []

  selectedPrcIds:any[] = []


  ProceduresList:LookUp[] = []
  MachineList:LookUp[] = []

  constructor(
    private patientListService:PatientlistService,
    private lookupService: LookupService,
    private datePipe: DatePipe
  ) { 
    this.fromDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.toDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.getProcedureList(this.fromDate, this.toDate, this.selectedPrcIds)
  }

  ngOnInit() {
    this.getActiveProcedures()
    this.getMachines()

  }



  async getProcedureList(fromDate: any, toDate: any,prcIds: any) {
    (await this.patientListService.GetBillingReport(fromDate, toDate, prcIds)).subscribe((response: any) => {
      this.EMRPatientsList = response;
      console.log(this.EMRPatientsList)
    });
  }



  async getActiveProcedures() {
    (await this.lookupService.GetActiveProcedures()).subscribe((response: any) => {
      console.log(response);
      
      this.ProceduresList=response
      // this.EMRPatientsList = response.data;
      // console.log(this.EMRPatientsList)
    });
    
  }


    async getMachines() {
    (await this.lookupService.GetMachines()).subscribe((response: any) => {
      console.log(response);
      
      this.MachineList=response
      // this.EMRPatientsList = response.data;
      // console.log(this.EMRPatientsList)
    });
    
  }


  onSearch() {
    console.log(this.selectedPrcIds);
    
    this.getProcedureList(this.fromDate, this.toDate, this.selectedPrcIds)
  }

  pn = new ProcedureNote()

  openProcedureNotes(row:PatientTestInfo) {
    console.log(row,'openProcedureNotes');
    let pn = new ProcedureNote()
    pn.PrcId = row.prC_ID
    pn.BillHdrId =row.bilL_HDR_ID
    this.pn =pn
    this.openModal()
    
  }


    openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.pn=new ProcedureNote()

    // this.ngOnInit()

    // this.getAllDocDailyPageFns(this.CCmoduleConfig.branchId, this.CalenderData.DoctId ?? '', this.CalenderData.fullDate)

  }

  onModalClose(event: any) {
    // this.modalOpen = false;
    this.closeModal()
  }

}







