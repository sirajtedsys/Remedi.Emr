import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCheckbox, IonLabel, IonItem, IonAccordion, IonAccordionGroup, IonInput, IonTextarea, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { PsyHistory } from 'src/app/shared/class/remedi.emr/psychatric-assesment/psychatric-adult/psy-history';
import { MedicalHistory } from 'src/app/shared/class/remedi.emr/psychatric-assesment/psychatric-adult/medical-history';
import { RelaventFamilyHistory } from 'src/app/shared/class/remedi.emr/psychatric-assesment/psychatric-adult/relevent-family-history';
import { EducationalHistory } from 'src/app/shared/class/remedi.emr/psychatric-assesment/psychatric-adult/educational-history';
import { AppConfig } from 'src/app/shared/class/app-config';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-p-a-history',
  templateUrl: './p-a-history.page.html',
  styleUrls: ['./p-a-history.page.scss'],
  standalone: true,
  imports: [IonAccordionGroup, IonTextarea,IonInput,IonSelect,IonSelectOption, IonAccordion, IonItem, IonLabel, IonCheckbox, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PAHistoryPage implements OnInit {

  commonLabelPlacement: string = 'floating';

  ph = new PsyHistory();
  mh = new MedicalHistory();
  rf = new RelaventFamilyHistory();
  ed = new EducationalHistory();
  // psy = new PsychoactiveSubstanceUsage();
  // exm = new Examination();
  // ehmf = new ExaminationHigherMentalFunction();
  // mse = new MentalStatusExamination();
  // meh = new MenstrualHistory();
  // vi = new VitalStatus();
  // ge = new GeneralExamination();

  // map = new Mapping();
  // ad = new NonAdaptive();
  // ft = new FormThought();
  // st = new StreamThought();
  // of = new Phenomenon();
  // mod = new Modality();

  // gexm = new GeneralExam();
  // gt = new GeneralTemp();
  // cmse = new ChildMentalStatusExam();



  // CombineClass = new CombineClass();



  // DiabetesMellitus: boolean = false;
  appconfig = new AppConfig();

  Accordian1: boolean = false;
  Accordian2: boolean = false;
  Accordian3: boolean = false;
  Accordian4: boolean = false;
  Accordian5: boolean = false;

  doc: any;
  EmDocId: any;
  PatientId: any;
  patientType: any;
  patiid: any;
  Gender: any;
  VisitID: any;
  DoctorID: any;
  EmpID: any;
  minDate: any;
  lmp: any;
  Age: any;


  constructor(


    private router: Router,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private authser: AuthService,
    private comser: CommonService,
    private notificationService: NotificationService,
    // private pa: PsychiatricAssessmentService
  ) {

    // this.Loaders();

  }



  PrecipitatingFactor: boolean = false;
  PsychiatricHistory: boolean = false;
  DiabetesMellitus: boolean = false;
  Hypertension: boolean = false;
  Dyslipidemia: boolean = false;
  Thyroidillness: boolean = false;
  cad: boolean = false;
  cva: boolean = false;
  Seizuredisorder: boolean = false;
  Others: boolean = false;
  RelevantFamilyHistory: boolean = false;
  BirthandDevelopmentHistory: boolean = false;
  HistoryOfPerinatalInsults: boolean = false;
  Developmentalmilestones: boolean = false;
  AdolescentHistory: boolean = false;
  Historyofhyperactivity: boolean = false;
  Historyofconductproblems: boolean = false;
  Behavioralproblems: boolean = false;
  Learningdifficulties: boolean = false;
  Historyofpsychoactivesubstanceusage: boolean = false;
  TobaccoDependence: boolean = false;
  OtherDependence: boolean = false;
  OtherDependences: boolean = false;
  Harmfuluse: boolean = false;
  Predominanceofanypersonalitytrait: boolean = false;
  Oriented: boolean = false;
  Nonadaptive: boolean = false;
  FormofThought: boolean = false;
  StreamofThought: boolean = false;
  Phobias: boolean = false;
  Depressiveideas: boolean = false;
  Suicidalthoughts: boolean = false;
  Overvaluedideas: boolean = false;
  Delusions: boolean = false;
  Obsessions: boolean = false;
  Compulsions: boolean = false;
  Hallucinations: boolean = false;




  ngOnInit() {
  }



  CheckboxClick2(keyname: keyof MedicalHistory, value: string, event: any) {
    let check = (event.target as HTMLInputElement).checked;
    console.log(check);
    if (check) {
      // this.ph.Relability =value
      this.mh[keyname] = value
    }
    else {
      let medh = new MedicalHistory()
      if (value == medh[keyname]) {
        console.log('gg');
        event.preventDefault();
        return
      }
      this.mh[keyname] = medh[keyname]
    }
  }


  CheckboxClick1(keyname: keyof PsyHistory, value: string, event: any) {
    console.log(event);
    
    let check = event.detail.checked;
    console.log(check, value);
    if (check) {
      // this.ph.Relability =value
      this.ph[keyname] = value
    }
    else {
      let psyh = new PsyHistory()
      if (value == psyh[keyname]) {
        console.log('gg');
        event.preventDefault();
        return
      }
      this.ph[keyname] = psyh[keyname]
    }
  }


  Check_Label(checkval: 'N' | 'Y', check: number) {

    if (checkval == 'Y') {

      if (check == 1) {
        this.PrecipitatingFactor = this.PrecipitatingFactor == true ? false : true;
      }
      else if (check == 2) {
        this.PsychiatricHistory = this.PsychiatricHistory == true ? false : true;
      }
      else if (check == 3) {
        this.DiabetesMellitus = this.DiabetesMellitus == true ? false : true;
      }
      else if (check == 4) {
        this.Hypertension = this.Hypertension == true ? false : true;
      }
      else if (check == 5) {
        this.Dyslipidemia = this.Dyslipidemia == true ? false : true;
      }
      else if (check == 6) {
        this.Thyroidillness = this.Thyroidillness == true ? false : true;
      }
      else if (check == 7) {
        this.cad = this.cad == true ? false : true;
      }
      else if (check == 8) {
        this.cva = this.cva == true ? false : true;
      }
      else if (check == 9) {
        this.Seizuredisorder = this.Seizuredisorder == true ? false : true;
      }
      else if (check == 10) {
        this.Others = this.Others == true ? false : true;
      }
      else if (check == 11) {
        this.RelevantFamilyHistory = this.RelevantFamilyHistory == true ? false : true;
      }
      else if (check == 12) {
        this.BirthandDevelopmentHistory = this.BirthandDevelopmentHistory == true ? false : true;
      }
      else if (check == 13) {
        this.HistoryOfPerinatalInsults = this.HistoryOfPerinatalInsults == true ? false : true;
      }
      else if (check == 14) {
        this.Developmentalmilestones = this.Developmentalmilestones == true ? false : true;
      }
      else if (check == 15) {
        this.AdolescentHistory = this.AdolescentHistory == true ? false : true;
      }
      else if (check == 16) {
        this.Historyofhyperactivity = this.Historyofhyperactivity == true ? false : true;
      }
      else if (check == 17) {
        this.Historyofconductproblems = this.Historyofconductproblems == true ? false : true;
      }
      else if (check == 18) {
        this.Behavioralproblems = this.Behavioralproblems == true ? false : true;
      }
      else if (check == 19) {
        this.Learningdifficulties = this.Learningdifficulties == true ? false : true;
      }
      else if (check == 20) {
        this.Historyofpsychoactivesubstanceusage = this.Historyofpsychoactivesubstanceusage == true ? false : true;
      }
      else if (check == 21) {
        this.TobaccoDependence = this.TobaccoDependence == true ? false : true;
      }
      else if (check == 22) {
        this.OtherDependence = this.OtherDependence == true ? false : true;
      }
      else if (check == 23) {
        this.OtherDependences = this.OtherDependences == true ? false : true;
      }
      else if (check == 24) {
        this.Harmfuluse = this.Harmfuluse == true ? false : true;
      }
      else if (check == 25) {
        this.Predominanceofanypersonalitytrait = this.Predominanceofanypersonalitytrait == true ? false : true;
      }
      else if (check == 26) {
        this.Oriented = this.Oriented == true ? false : true;
      }
      else if (check == 27) {
        this.Nonadaptive = this.Nonadaptive == true ? false : true;
      }
      else if (check == 28) {
        this.FormofThought = this.FormofThought == true ? false : true;
      }
      else if (check == 29) {
        this.StreamofThought = this.StreamofThought == true ? false : true;
      }
      else if (check == 30) {
        this.Phobias = this.Phobias == true ? false : true;
      }
      else if (check == 31) {
        this.Depressiveideas = this.Depressiveideas == true ? false : true;
      }
      else if (check == 32) {
        this.Suicidalthoughts = this.Suicidalthoughts == true ? false : true;
      }
      else if (check == 33) {
        this.Overvaluedideas = this.Overvaluedideas == true ? false : true;
      }
      else if (check == 34) {
        this.Delusions = this.Delusions == true ? false : true;
      }
      else if (check == 35) {
        this.Obsessions = this.Obsessions == true ? false : true;
      }
      else if (check == 36) {
        this.Compulsions = this.Compulsions == true ? false : true;
      }
      else if (check == 37) {
        this.Hallucinations = this.Hallucinations == true ? false : true;
      }
    }
    else {

      if (check == 1) {
        this.PrecipitatingFactor = false
      }
      else if (check == 2) {
        this.PsychiatricHistory = false
      }
      else if (check == 3) {
        this.DiabetesMellitus = false
      }
      else if (check == 4) {
        this.Hypertension = false
      }
      else if (check == 5) {
        this.Dyslipidemia = false
      }
      else if (check == 6) {
        this.Thyroidillness = false
      }
      else if (check == 7) {
        this.cad = false
      }
      else if (check == 8) {
        this.cva = false
      }
      else if (check == 9) {
        this.Seizuredisorder = false
      }
      else if (check == 10) {
        this.Others = false
      }
      else if (check == 11) {
        this.RelevantFamilyHistory = false
      }
      else if (check == 12) {
        this.BirthandDevelopmentHistory = false
      }
      else if (check == 13) {
        this.HistoryOfPerinatalInsults = false
      }
      else if (check == 14) {
        this.Developmentalmilestones = false
      }
      else if (check == 15) {
        this.AdolescentHistory = false
      }
      else if (check == 16) {
        this.Historyofhyperactivity = false
      }
      else if (check == 17) {
        this.Historyofconductproblems = false
      }
      else if (check == 18) {
        this.Behavioralproblems = false
      }
      else if (check == 19) {
        this.Learningdifficulties = false
      }
      else if (check == 20) {
        this.Historyofpsychoactivesubstanceusage = false
      }
      else if (check == 21) {
        this.TobaccoDependence = false
      }
      else if (check == 22) {
        this.OtherDependence = false
      }
      else if (check == 23) {
        this.OtherDependences = false
      }
      else if (check == 24) {
        this.Harmfuluse = false
      }
      else if (check == 25) {
        this.Predominanceofanypersonalitytrait = false
      }
      else if (check == 26) {
        this.Oriented = false
      }
      else if (check == 27) {
        this.Nonadaptive = false
      }
      else if (check == 28) {
        this.FormofThought = false
      }
      else if (check == 29) {
        this.StreamofThought = false
      }
      else if (check == 30) {
        this.Phobias = false
      }
      else if (check == 31) {
        this.Depressiveideas = false
      }
      else if (check == 32) {
        this.Suicidalthoughts = false
      }
      else if (check == 33) {
        this.Overvaluedideas = false
      }
      else if (check == 34) {
        this.Delusions = false
      }
      else if (check == 35) {
        this.Obsessions = false
      }
      else if (check == 36) {
        this.Compulsions = false
      }
      else if (check == 37) {
        this.Hallucinations = false
      }

    }
  }




    CheckboxClick3(keyname: keyof RelaventFamilyHistory, value: string, event: any) {
    let check = event.detail.checked;
    console.log(check);
    if (check) {
      // this.ph.Relability =value
      this.rf[keyname] = value
    }
    else {
      let relh = new RelaventFamilyHistory()
      if (value == relh[keyname]) {
        console.log('gg');
        event.preventDefault();
        return
      }
      this.rf[keyname] = relh[keyname]
    }
  }

}
