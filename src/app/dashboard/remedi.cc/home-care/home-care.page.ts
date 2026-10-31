import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCheckbox,
  IonInput,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/angular/standalone';
import { HomeCareServiceMaster } from 'src/app/shared/class/home-care/home-care-service-master';
import { SystemExamination } from 'src/app/shared/class/home-care/system-examination';
import { HomeCareFunctionMaster } from 'src/app/shared/class/home-care/home-care-function-master';
import { HomeCareSave } from 'src/app/shared/class/home-care/home-care-save';
import { HomeCareServiceModel } from 'src/app/shared/class/home-care/home-care-service-model';
// import { HomeCareService } from 'src/app/shared/services/home-care/home-care.service';
import { PatientListDatewiseItem } from 'src/app/shared/interfaces/patient-list/patient-list-date-wise-item';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { VoiceTextareaDirective } from 'src/app/shared/services/common/voice-textarea.directive';
import { HomeCareService } from 'src/app/shared/services/home-care/home-care.service';
// import { HomeCareService } from 'src/app/services/home-care/home-care.service';
// import { HomeCareServiceMaster } from 'src/app/class/home-care/home-care-service-master';
// import { HomeCareSave } from 'src/app/class/home-care/home-care-save';
// import { SystemExamination } from 'src/app/class/home-care/system-examination';
// import { HomeCareFunctionMaster } from 'src/app/class/home-care/home-care-function-master';
// import { HomeCareServiceModel } from 'src/app/class/home-care/home-care-service-model';

@Component({
  selector: 'app-home-care',
  templateUrl: './home-care.page.html',
  styleUrls: ['./home-care.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonButton,
    IonSelectOption,
    IonRadio,
    IonInput,
    IonTextarea,
    IonSelect,
    IonCheckbox,
    IonRadioGroup,
    VoiceTextareaDirective
  ],
})
export class HomeCarePage implements OnInit {
  patientData!: PatientListDatewiseItem;
  RequestedServices: HomeCareServiceMaster[] = [];
  GeneralCondition: HomeCareServiceMaster[] = [];
  Mobility: HomeCareServiceMaster[] = [];
  FallRisk: HomeCareServiceMaster[] = [];
  NutritionHydration: HomeCareServiceMaster[] = [];
  MoodBehaviour: HomeCareServiceMaster[] = [];
  OrientationCognition: HomeCareServiceMaster[] = [];
  Referals: HomeCareServiceMaster[] = [];
  HomeSafety: HomeCareServiceMaster[] = [];
  Equipment: HomeCareServiceMaster[] = [];
  SystemExamination: SystemExamination[] = [];
  MA: HomeCareServiceMaster[] = [];
  HomecareFunctionalMaster: HomeCareFunctionMaster[] = [];
  HomeCareServiceMaster: HomeCareServiceMaster[] = [];

  hc = new HomeCareSave();
  hcServiceModel: HomeCareServiceModel[] = [];
  nextHomeVisitDate: string = '';
  TELEPHONE_FOLLOW_UP: string = '';
  HOME_CARE_DATE: string = '';

  Pati_id: string = '';
  emr_doc_id: string = '';
  // Equipment:

  medications = [
    { name: '', assessment: '', action: '' },
    { name: '', assessment: '', action: '' },
    { name: '', assessment: '', action: '' },
  ];
  constructor(
    private hcService: HomeCareService,
    private datePipe: DatePipe,
    private shared:SharedDataService,
    private notificationService: NotificationService
  ) {this.getPatientDataFromShared() }


      getPatientDataFromShared() {
    // const state = window.history.state;
    this.patientData =this.shared.getPatient()
    console.log(this.patientData);
    this.emr_doc_id = this.patientData.emR_DOC_ID
    this.Pati_id = this.patientData.patI_ID
    this.hc.PATIENT_NAME = this.patientData.patI_FIRST_NAME??''
    this.hc.DocName = this.patientData.docT_NAME??''
    this.hc.opno = this.patientData.patI_OPNO
    // this.hc.Address = this.patientData.
    // this.getExistingForm(this.patientData.emR_DOC_ID)
    
  }

  
  async save() {
    let masterdata = [];
    masterdata.push(
      ...this.RequestedServices.filter((x: any) => x.checked == true),
    );
    masterdata.push(
      ...this.GeneralCondition.filter((x: any) => x.checked == true),
    );
    masterdata.push(...this.FallRisk.filter((x: any) => x.checked == true));
    masterdata.push(...this.Mobility.filter((x: any) => x.checked == true));
    masterdata.push(
      ...this.NutritionHydration.filter((x: any) => x.checked == true),
    );
    masterdata.push(
      ...this.MoodBehaviour.filter((x: any) => x.checked == true),
    );
    masterdata.push(...this.HomeSafety.filter((x: any) => x.checked == true));
    masterdata.push(...this.Equipment.filter((x: any) => x.checked == true));
    masterdata.push(
      ...this.OrientationCognition.filter((x: any) => x.checked == true),
    );
    masterdata.push(...this.Referals.filter((x: any) => x.checked == true));
    masterdata.push(...this.MA.filter((x: any) => x.checked == true));

    masterdata = masterdata.map((x: HomeCareServiceMaster) => x.homE_CARE_M_ID);

    console.log(masterdata);
    // this.hc.SysData = this.SystemExamination.
    this.hc.MasterData = masterdata.join(',');

    let sysdat = this.SystemExamination.map(
      (x: SystemExamination) => `${x.hcM_SYSTEM_ID}:${x.value}`,
    ).join('|');

    this.hc.SysData = sysdat;
    console.log(sysdat);

    let fndata = this.HomecareFunctionalMaster.map(
      (x: HomeCareFunctionMaster) => `${x.hcM_FUNCTIONAL_ID}:${x.value}`,
    ).join(',');

    this.hc.FunctionalData = fndata;

    this.hc.HOME_CARE_DATE = this.HOME_CARE_DATE
      ? new Date(this.HOME_CARE_DATE)
      : null;
    this.hc.TELEPHONE_FOLLOW_UP = this.TELEPHONE_FOLLOW_UP
      ? new Date(this.TELEPHONE_FOLLOW_UP)
      : null;
    this.hc.NEXT_HOME_VISIT = this.nextHomeVisitDate
      ? new Date(this.nextHomeVisitDate)
      : null;
    this.hc.PATI_ID = this.Pati_id;
    this.hc.EMR_DOC_ID = this.emr_doc_id;

    console.log(this.hc);
    (await this.hcService.SaveHomeCareService(this.hc)).subscribe(
      (data: any) => {
        console.log(data);
        if(data.success)
        {
          this.notificationService.success("Saved Successfully")
        }
        else
        {
          this.notificationService.error(data.message)
        }
      },
    );
  }

  clear() {
    if (confirm('Clear this assessment?')) {
      localStorage.removeItem('remedi_homecare');
      location.reload();
    }
  }

  ngOnInit(): void {
    this.loaders();
  }

  loaders() {
    this.GetActiveHomeCareServicesAsync();
    this.GetHomeCareServices();
    this.GetHomeCareFunctional();
    this.GetHomeCareSystemsExam();
    this.GetHomeCareService(this.Pati_id, this.emr_doc_id);
  }

  async GetHomeCareSystemsExam() {
    (await this.hcService.GetHomeCareSystemsExam()).subscribe((data: any) => {
      console.log(data);
      this.SystemExamination = data;
    });
  }

  async GetHomeCareServices() {
    (await this.hcService.GetHomeCareServices({ homeType: '1=1' })).subscribe(
      (data: any) => {
        console.log(data);
      },
    );
  }

  async GetActiveHomeCareServicesAsync() {
    (await this.hcService.GetActiveHomeCareServicesAsync()).subscribe(
      (data: HomeCareServiceMaster[]) => {
        console.log(data);
        this.HomeCareServiceMaster = data;
        this.assignHomeCareServiceMaster(data);

        console.log(this.RequestedServices);
      },
    );
  }

  assignHomeCareServiceMaster(data: HomeCareServiceMaster[]) {
    this.RequestedServices = data.filter((x: any) => x.homE_TYPE == 'RS');
    this.GeneralCondition = data.filter((x: any) => x.homE_TYPE == 'GC');
    this.Mobility = data.filter((x: any) => x.homE_TYPE == 'MB');
    this.FallRisk = data.filter((x: any) => x.homE_TYPE == 'FR');
    this.NutritionHydration = data.filter((x: any) => x.homE_TYPE == 'NH');
    this.MoodBehaviour = data.filter((x: any) => x.homE_TYPE == 'MD');
    this.MA = data.filter((x: any) => x.homE_TYPE == 'MA');
    this.HomeSafety = data.filter((x: any) => x.homE_TYPE == 'HS');
    this.Equipment = data.filter((x: any) => x.homE_TYPE == 'EQ');
    this.OrientationCognition = data.filter((x: any) => x.homE_TYPE == 'OC');
    this.Referals = data.filter((x: any) => x.homE_TYPE == 'RF');

    console.log(this.FallRisk);
  }

  async GetHomeCareFunctional() {
    (await this.hcService.GetHomeCareFunctional()).subscribe((data: any) => {
      console.log(data);
      this.HomecareFunctionalMaster = data;

      // this.HomecareFunctionalMaster.map((x:any)=>x.value=='I')
    });
  }

  async GetHomeCareFunctionalDetails(hcsId: number) {
    (await this.hcService.GetHomeFunctionalDetails({ hcsId: hcsId })).subscribe(
      (
        data: {
          hcM_FUNCTIONAL_ID: number;
          hcM_FUNCTIONAL_TYPE: 'I' | 'A' | 'D';
        }[],
      ) => {
        console.log(data);
        if (data.length > 0) {
          data.forEach((element) => {
            this.HomecareFunctionalMaster.map((x: HomeCareFunctionMaster) => {
              if (x.hcM_FUNCTIONAL_ID == element.hcM_FUNCTIONAL_ID) {
                x.value = element.hcM_FUNCTIONAL_TYPE;
              }
            });
          });
        }
      },
    );
  }

  async GetHomeCareSystemDetails(hcsId: number) {
    (await this.hcService.GetHomeCareSystemDetails({ hcsId: hcsId })).subscribe(
      (data: { hcM_SYSTEM_ID: number; hcM_SYSTEM_VALUE: string }[]) => {
        console.log(data);
        // this.HomecareFunctionalMaster = data

        // this.HomecareFunctionalMaster.map((x:any)=>x.value=='I')
        data.forEach((element) => {
          this.SystemExamination.map((x: SystemExamination) => {
            if (x.hcM_SYSTEM_ID == element.hcM_SYSTEM_ID) {
              x.value = element.hcM_SYSTEM_VALUE;
            }
          });
        });
      },
    );
  }

  async GetHomeCareServiceDetails(hcsId: number) {
    (
      await this.hcService.GetHomeCareServiceDetails({ hcsId: hcsId })
    ).subscribe((data: { homE_CARE_M_ID: number }[]) => {
      console.log(data);
      data.forEach((element) => {
        this.HomeCareServiceMaster.map((x: HomeCareServiceMaster) => {
          if (x.homE_CARE_M_ID == element.homE_CARE_M_ID) {
            x.checked = true;
          }
        });
      });
      this.assignHomeCareServiceMaster(this.HomeCareServiceMaster);
      // this.HomecareFunctionalMaster = data

      // this.HomecareFunctionalMaster.map((x:any)=>x.value=='I')
    });
  }

  async GetHomeCareService(patiId: string, emrdocId: string) {
    (
      await this.hcService.GetHomeCareService({
        patiId: patiId,
        emrDocId: emrdocId,
      })
    ).subscribe((data: any) => {
      console.log(data);

      this.hcServiceModel = data;

      if (this.hcServiceModel && this.hcServiceModel.length > 0) {
        const hcsm: HomeCareServiceModel = this.hcServiceModel[0];

        // Assign values to HomeCareSave model
        this.hc.HCS_ID = hcsm.hcS_ID ?? 0;
        this.GetHomeCareFunctionalDetails(this.hc.HCS_ID);
        this.GetHomeCareServiceDetails(this.hc.HCS_ID);
        this.GetHomeCareSystemDetails(this.hc.HCS_ID);
        this.hc.PATI_ID = hcsm.patI_ID ?? patiId;
        this.hc.EMR_DOC_ID = hcsm.emR_DOC_ID ?? emrdocId;

        this.hc.VISIT_TYPE = hcsm.visiT_TYPE;
        this.hc.PRIMARY_CAREGIVER = hcsm.primarY_CAREGIVER;
        this.hc.SERVICE_REASON_VISIT = hcsm.servicE_REASON_VISIT;
        this.hc.MAIN_CONCERNS = hcsm.maiN_CONCERNS;
        this.hc.RED_FLAGS = hcsm.reD_FLAGS;
        this.hc.CURRENT_ILLNESS = hcsm.currenT_ILLNESS;
        this.hc.PAST_MEDICAL = hcsm.pasT_MEDICAL;
        this.hc.ALLERGIES = hcsm.allergies;

        // Medication details
        this.hc.MA_MEDICATION_ONE = hcsm.mA_MEDICATION_ONE;
        this.hc.MA_MEDICATION_TWO = hcsm.mA_MEDICATION_TWO;
        this.hc.MA_MEDICATION_THREE = hcsm.mA_MEDICATION_THREE;

        this.hc.MA_ADHERENCE_ONE = hcsm.mA_ADHERENCE_ONE;
        this.hc.MA_ADHERENCE_TWO = hcsm.mA_ADHERENCE_TWO;
        this.hc.MA_ADHERENCE_THREE = hcsm.mA_ADHERENCE_THREE;

        this.hc.MA_ACTION_ONE = hcsm.mA_ACTION_ONE;
        this.hc.MA_ACTION_TWO = hcsm.mA_ACTION_TWO;
        this.hc.MA_ACTION_THREE = hcsm.mA_ACTION_THREE;

        // Vital signs
        this.hc.BP = hcsm.bp;
        this.hc.PULSE = hcsm.pulse;
        this.hc.RESP_RATE = hcsm.resP_RATE;
        this.hc.SPO2 = hcsm.spO2;
        this.hc.TEMPERATURE = hcsm.temperature;
        this.hc.WEIGHT_KG = hcsm.weighT_KG;
        this.hc.BMI = hcsm.bmi;

        // Patient assessment
        this.hc.OXYGEN = hcsm.oxygen;
        this.hc.ORIENTATION = hcsm.orientation;
        this.hc.NUTRITION = hcsm.nutrition;
        this.hc.EQUIPMENT_AVAILABLE = hcsm.equipmenT_AVAILABLE;
        this.hc.CAREGIVER_AVAILABILITY = hcsm.caregiveR_AVAILABILITY;
        this.hc.UNDERSTANDING = hcsm.understanding;
        this.hc.CAREGIVER_CONCERNS = hcsm.caregiveR_CONCERNS;
        this.hc.SOCIAL = hcsm.social;

        // Clinical assessment and care plan
        this.hc.PROBLEM_LIST = hcsm.probleM_LIST;
        this.hc.OVERALL_RISK = hcsm.overalL_RISK;
        this.hc.CLINICAL_OUTLOOK = hcsm.clinicaL_OUTLOOK;
        this.hc.TREATMENT_CARE_PLAN = hcsm.treatmenT_CARE_PLAN;
        this.hc.INVESTIGATIONS_ORDERS = hcsm.investigationS_ORDERS;

        // Home care details
        this.hc.PATIENT_CAREGIVER = hcsm.patienT_CAREGIVER;
        this.hc.NEXT_HOME_VISIT = hcsm.nexT_HOME_VISIT
          ? new Date(hcsm.nexT_HOME_VISIT)
          : null;
        this.nextHomeVisitDate =
          this.datePipe.transform(this.hc.NEXT_HOME_VISIT, 'yyyy-MM-dd') ?? '';

        // this.hc.TELEPHONE_FOLLOW_UP = this.datePipe.transform(hcsm.telephonE_FOLLOW_UP
        // ? new Date(hcsm.telephonE_FOLLOW_UP)
        // : null, 'yyyy-MM-dd');

        this.hc.TELEPHONE_FOLLOW_UP = hcsm.telephonE_FOLLOW_UP
          ? new Date(hcsm.telephonE_FOLLOW_UP)
          : null;

        this.TELEPHONE_FOLLOW_UP =
          this.datePipe.transform(this.hc.TELEPHONE_FOLLOW_UP, 'yyyy-MM-dd') ??
          '';

        this.hc.ASSIGNED_HOME_CARE = hcsm.assigneD_HOME_CARE;
        this.hc.WARNING_SIGNS = hcsm.warninG_SIGNS;
        this.hc.EMERGENCY_REFERRAL = hcsm.emergencY_REFERRAL;
        this.hc.PATIENT_GOALS = hcsm.patienT_GOALS;
        this.hc.DECISION_MAKER = hcsm.decisioN_MAKER;
        this.hc.ESCALATION = hcsm.escalation;
        this.hc.HOME_CARE_CLINICIAN = hcsm.homE_CARE_CLINICIAN;

        this.hc.HOME_CARE_DATE = hcsm.homE_CARE_DATE
          ? new Date(hcsm.homE_CARE_DATE)
          : null;

        this.HOME_CARE_DATE =
          this.datePipe.transform(this.hc.HOME_CARE_DATE, 'yyyy-MM-dd') ?? '';

        this.hc.ACKNOWLEDGEMENT = hcsm.acknowledgement;
      }
    });
  }
}
