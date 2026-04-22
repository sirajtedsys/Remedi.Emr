import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientTablePage } from "../components/patient-table/patient-table.page";
import { MobileCardPage } from "../components/mobile-card/mobile-card.page";
import { SectionDet } from 'src/app/shared/interfaces/lookup/sectiondet';
import { PatientListDatewiseItem } from 'src/app/shared/interfaces/patient-list/patient-list-date-wise-item';
import { CommonService } from 'src/app/shared/services/common.service';
import { PatientlistService } from 'src/app/shared/services/patientlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { CustomToastService } from 'src/app/shared/services/custom-toast.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.page.html',
  styleUrls: ['./patient-list.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, PatientTablePage, MobileCardPage]
})
export class PatientListPage implements OnInit {




  EMRPatientsList: PatientListDatewiseItem[] = []

  constructor(private shared: SharedDataService) { }

  ngOnInit() { 
  
    this.clearSelectedPatient();
  }

  clearSelectedPatient() {
    this.shared.clearPatient();
  }
}