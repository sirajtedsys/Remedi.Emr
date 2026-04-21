import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonLabel, IonTextarea, IonAccordionGroup, IonAccordion, IonRadio, IonListHeader, IonRadioGroup, IonCheckbox } from '@ionic/angular/standalone';
import {
  calendarOutline,
  eyeOutline,
  searchOutline, closeOutline, documentOutline, personCircleOutline, closeCircle, chatbubblesOutline, createOutline, alertCircleOutline, trashOutline,
  addCircle, add
} from 'ionicons/icons';
import { CommonService } from 'src/app/shared/services/common.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { CustomToastService } from 'src/app/shared/services/custom-toast.service';
import { PatientListDatewiseItem } from 'src/app/shared/interfaces/patient-list/patient-list-date-wise-item';
import { addIcons } from 'ionicons';
// import { DigitalIntakeService } from 'src/app/shared/services/digital-intake.service';
import { DigitalIntakeDto } from 'src/app/shared/class/digital-intake-assesment/digital-intake-assessment-dto';
import { DigitalIntakeDtoInterface } from 'src/app/shared/interfaces/digital-intake-assesment/digital-intake-dto';
import { DigitalIntakeService } from 'src/app/shared/services/digital-intake.service';
@Component({
  selector: 'app-digital-intake',
  templateUrl: './digital-intake.page.html',
  styleUrls: ['./digital-intake.page.scss'],
  standalone: true,
 imports: [IonCheckbox,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    IonRadioGroup,
    IonRadio, IonItem, IonLabel, IonTextarea,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    IonAccordionGroup,
    IonAccordion, IonRadio,
    IonListHeader
  ]
})
export class DigitalIntakePage implements OnInit, AfterViewInit {

  assessmentForm!: FormGroup;
  paitentData!: PatientListDatewiseItem

  emrDocid: any
  doctorId: any
  patId: any
  Today: any
  formattedOrderDate: string = '';
  fromDate: any;
  ismobile: boolean = false;

  DigitalIntakeDto = new DigitalIntakeDto()


  ExistingData: DigitalIntakeDtoInterface | null = null

  constructor(private comser: CommonService,
    private datePipe: DatePipe,
    private el: ElementRef,
    private digitalIntakeService: DigitalIntakeService,

    private cts: CustomToastService, private shared: SharedDataService,
    private notificationService: NotificationService, private fb: FormBuilder,) {

    this.getPatientDataFromShared()
    this.initForm();
    addIcons({
      calendarOutline,
      eyeOutline,
      searchOutline,
      closeOutline,
      documentOutline,
      personCircleOutline,
      closeCircle,
      chatbubblesOutline,
      createOutline,
      alertCircleOutline,
      trashOutline,   // 👈 REQUIRED
      addCircle,
      add
    });
    this.Today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.fromDate = this.Today

  }
  getPatientDataFromShared() {
    this.paitentData = this.shared.getPatient()
    console.log(this.paitentData)
    this.emrDocid = this.paitentData.emR_DOC_ID;
    this.patId = this.paitentData.patI_ID;
    this.getExistingForm(this.emrDocid)

  }

  ngOnInit() {
    this.formattedOrderDate = this.datePipe.transform(this.fromDate, 'dd/MM/yyyy')!;
    console.log("Formatted Date:", this.formattedOrderDate);
    // this.checkScreenSize()
  }
  ngAfterViewInit() {
    // setTimeout(() => {

    //   const labels = this.el.nativeElement.querySelectorAll('.scroll-text');

    //   labels.forEach((label: HTMLElement) => {

    //     // only if text bigger than box
    //     if (label.scrollWidth > label.clientWidth) {
    //       label.classList.add('auto-scroll');
    //     }

    //   });

    // }, 800); // wait for render
  }


  checkScreenSize() {
    this.ismobile = window.innerWidth < 992;
  }

  private initForm() {
    this.assessmentForm = this.fb.group({


      /* ================= PRESENTING CONCERNS ================= */
      presentingComplaints: this.fb.group({
        primaryComplaint: [''],
        duration: [''],
        severity: [''],
        triggers: [[]],
        functionalImpact: [''],
        // triggerss: this.fb.array(this.triggerOptions.map(() => new FormControl(false)))

      }),

      /* ================= MENTAL STATUS ================= */
      mentalStatusExam: this.fb.group({
        appearance: [''],   // Appropriate / Dishevelled
        speech: [''],       // Normal / Slow / Pressured
        mood: [''],         // Euthymic / Low / Anxious
        affect: [''],       // Congruent / Restricted
        thoughtProcess: [''], // Logical / Ruminative
        perception: [''],     // Normal / Altered
        cognition: [''],      // Oriented x3 / Mild difficulty
        insight: [''],        // Good / Fair / Limited
        judgment: [''],       // Intact / Compromised
      }),

      /* ================= SAFETY SCREENING ================= */
      safetyScreening: this.fb.group({
        suicidalIdeation: [''],  // Yes / No
        homicidalIdeation: [''], // Yes / No
        overallRisk: [''],      // Low / Moderate / High
        protectiveFactors: [''] // Yes / No
      }),

      /* ================= NEUROENDOCRINE ================= */
      neuroEndocrine: this.fb.group({
        neuroEndocrine: [[]]
        // ,
        // thyroidSymptoms: [false],
        // sexHormoneMood: [false],
        // insulinInstability: [false],
        // oxytocinWithdrawal: [false],
        // delayedMelatonin: [false],
      }),

      /* ================= INFLAMMATION & GUT ================= */
      gutBrain: this.fb.group({
        inflammatoryIndicators: [''], // No / Suspected
        gutBrain: [[]], // No / Suspected
        // bloating: [false],
        // antibioticHistory: [false],
        // foodSensitivity: [false],
      }),


      lifeStyle: this.fb.group({
        avgSleep: [''], // No / Suspected
        sleepQuality: [''], // No / Suspected
        dietPattern: [''], // No / Suspected
        physicalActivity: [''], // No / Suspected
        substances: [[]], // No / Suspected
        screenTime: [''], // No / Suspected
        // bloating: [false],
        // antibioticHistory: [false],
        // foodSensitivity: [false],
      }),

      sensorySomatic: this.fb.group({
        awarnessIssue: [''], // No / Suspected
        sensitivity: [[]], // No / Suspected
        tensionArea: [[]], // No / Suspected
        // bloating: [false],
        // antibioticHistory: [false],
        // foodSensitivity: [false],
      }),

      goal: this.fb.group({
        statedGoal: [''], // No / Suspected
        regulations: [''], // No / Suspected
        regulationsOther: [''], // No / Suspected
        readyForChange: [''], // No / Suspected
        // bloating: [false],
        // antibioticHistory: [false],
        // foodSensitivity: [false],
      }),

      clinical: this.fb.group({
        impression: [''], // No / Suspected
        regulations: [''], // No / Suspected
        folowUp: [''], // No / Suspected
        // bloating: [false],
        // antibioticHistory: [false],
        // foodSensitivity: [false],
      }),





    });
  }


  checkFormHasData() {
    const hasData = this.hasAnyValue(this.assessmentForm);

    if (hasData) {
      // console.log("User entered some value");
      return true
    } else {
      // console.log("Form empty");
      return false
    }
  }

  hasAnyValue(control: any): boolean {
    if (!control) return false;

    // FormControl
    if (control.controls === undefined) {
      const value = control.value;

      // handle null, empty string, empty array
      if (value === null || value === undefined) return false;
      if (typeof value === 'string' && value.trim() === '') return false;
      if (Array.isArray(value) && value.length === 0) return false;

      return true;
    }

    // FormGroup / FormArray
    for (const key of Object.keys(control.controls)) {
      if (this.hasAnyValue(control.controls[key])) {
        return true;
      }
    }

    return false;
  }



  saveAssessment() {
    if (this.checkFormHasData()) {

      const dto = this.mapFormToDto();
      // return
      console.log("Mapped DTO:", dto, this.checkFormHasData());

      // return
      this.submitAssessment(dto)
    }
    else {
      this.notificationService.showNotification("Please fill at least one field to save the assessment.", "warning")
    }
  }

  async submitAssessment(dto: any) {
    (await this.digitalIntakeService.SaveDigitalIntakeAssessmentAsync(dto)).subscribe({
      next: (res) => {
        this.notificationService.showNotification("Assessment saved successfully!", "success");
        // Optionally, navigate to another page or reset the form
        this.getExistingForm(this.emrDocid)
      },
      error: (err) => {
        console.error("Error saving assessment:", err);
        this.notificationService.showNotification("Failed to save assessment. Please try again.", "error");
      }
    });

  }



  mapFormToDto(): DigitalIntakeDto {

    const form = this.assessmentForm.value;
    console.log(form);


    // return new DigitalIntakeDto();

    let dto: DigitalIntakeDto = {

      DigitalId: this.ExistingData?.digitalId ?? 0,  // Use existing DigitalId if available

      PatiId: this.patId,
      EmrDocId: this.emrDocid,
      // CreateUser: this.authser?.userName ?? 'admin',

      /* PRESENTING */
      PrimaryComplaint: form.presentingComplaints?.primaryComplaint,
      Duration: form.presentingComplaints?.duration,
      SubjectiveSeverity: form.presentingComplaints?.severity,
      IdentifiedTriggers: Array.isArray(form.presentingComplaints?.triggers) && form.presentingComplaints?.triggers.length > 0 ? form.presentingComplaints?.triggers.join(',') : null,
      FunctionalImpact: form.presentingComplaints?.functionalImpact,

      /* MENTAL STATUS */
      Appearance: form.mentalStatusExam?.appearance,
      Speech: form.mentalStatusExam?.speech,
      Mood: form.mentalStatusExam?.mood,
      Affect: form.mentalStatusExam?.affect,
      ThoughtProcess: form.mentalStatusExam?.thoughtProcess,
      Perception: form.mentalStatusExam?.perception,
      Cognition: form.mentalStatusExam?.cognition,
      Insight: form.mentalStatusExam?.insight,
      Judgment: form.mentalStatusExam?.judgment,

      /* SAFETY */
      SuicidalIdeation: form.safetyScreening?.suicidalIdeation,
      HomicidalIdeation: form.safetyScreening?.homicidalIdeation,
      OverallRiskLevel: form.safetyScreening?.overallRisk,
      ProtectiveFactorsPresent: form.safetyScreening?.protectiveFactors,

      /* NEURO */
      NeuroendocrineRegulation: Array.isArray(form.neuroEndocrine?.neuroEndocrine) && form.neuroEndocrine?.neuroEndocrine.length > 0 ? form.neuroEndocrine?.neuroEndocrine.join(',') : null,

      /* GUT */
      InflammatoryIndicators: form.gutBrain?.inflammatoryIndicators,
      GutBrainAxisIndicators: Array.isArray(form.gutBrain?.gutBrain) && form.gutBrain?.gutBrain.length > 0
        ? form.gutBrain?.gutBrain.join(',')
        : null,



      /* LIFESTYLE */
      AverageSleepDuration: form.lifeStyle?.avgSleep,
      SleepQuality: form.lifeStyle?.sleepQuality,
      DietPattern: form.lifeStyle?.dietPattern,
      PhysicalActivity: form.lifeStyle?.physicalActivity,
      Substances: Array.isArray(form.lifeStyle?.substances) && form.lifeStyle?.substances.length > 0
        ? form.lifeStyle?.substances.join(',')
        : null,


      /* SENSORY */
      InteroceptiveAwarenessIssues: form.sensorySomatic?.awarnessIssue,
      SensorySensitivity: Array.isArray(form.sensorySomatic?.sensitivity) && form.sensorySomatic?.sensitivity.length > 0
        ? form.sensorySomatic?.sensitivity.join(',')
        : null,
      CommonTensionAreas: Array.isArray(form.sensorySomatic?.tensionArea) && form.sensorySomatic?.tensionArea.length > 0
        ? form.sensorySomatic?.tensionArea.join(',')
        : null,

      /* GOALS */
      ClientStatedGoal: form.goal?.statedGoal,
      PreferredRegulation: form.goal?.regulations,
      PreferredRegulationRmk: form.goal?.regulationsOther,
      ReadinessForChange: form.goal?.readyForChange,

      /* CLINICAL */
      ClinicalImpression: form.clinical?.impression,
      InitialRegulationPlan: form.clinical?.regulations,
      FollowupInterval: form.clinical?.folowUp

    };

    return dto;
  }



  async getExistingForm(emrDociD: string) {
    (await this.digitalIntakeService.GetDigitalIntakeAsync(emrDociD)).subscribe((data: any) => {
      console.log(data);
      this.ExistingData = data
      this.patchForm(data)
    })
  }



  //   bindAssessmentResponse(res: DigitalIntakeDto) {

  //   this.assessmentForm.patchValue({

  //     /* ================= CLIENT PROFILE ================= */
  //     clientProfile: {
  //       // not available in response → keep empty or map later
  //     },

  //     /* ================= PRESENTING COMPLAINTS (SECTION 1) ================= */
  //     presentingComplaints: {
  //       reason: res.seekinG_SUPPORT,
  //       duration: res.duratioN_CONCERN,
  //       intensity: res.intensity,
  //       frequency: res.frequency,
  //       triggers: res.triggers,
  //       impact: res.impact
  //     },

  //     clientNarrative: {
  //       ownWords: res.owN_WORDS,
  //       improvementGoals: res.changE_IMPROVE
  //     },

  //     currentEnvironment: {
  //       workStress: res.joB_SATISFACTION,
  //       socialSupport: res.sociaL_SUPPORT,
  //       livingEnvironment: res.livinG_ENVIRONMENT,
  //       lifeTransitions: res.currenT_LIFE
  //     }
  //   });

  //   /* ================= MENTAL STATUS (SECTION 2) ================= */
  //   this.assessmentForm.get('mentalStatus')?.patchValue({
  //     consciousAwareness: {
  //       presentDuringTasks: res.durinG_TASKS,
  //       dissociationLevel: res.dissociation,
  //       bodyEmotionConnection: res.feeL_CONNECTED,
  //       notes: res.consciouS_NOTES
  //     },
  //     mentalStatusExam: {
  //       appearanceBehavior: res.appearance,
  //       speech: res.speech,
  //       mood: res.mood,
  //       affect: res.affect,
  //       thoughtProcess: res.thoughT_PROCESS,
  //       thoughtContent: res.thoughT_CONTENT,
  //       notes: res.mentaL_NOTES,
  //       perception: res.perception,
  //       hallucinationDetails: res.perceptioN_RMK,
  //       cognition: {
  //         orientation: res.orientation,
  //         memory: res.memory,
  //         attention: res.attention,
  //         insightJudgment: res.insight
  //       }
  //     }
  //   });

  //   /* ================= DEVELOPMENTAL NEUROHISTORY (SECTION 3) ================= */
  //   this.assessmentForm.get('developmentalNeurohistory')?.patchValue({
  //     earlyLifeMilestones: {
  //       prenatalComplications: res.prenatal,
  //       attachmentStyle: res.attachment,
  //       developmentalMilestones: res.developmental,
  //       earlyEmotionRegulation: res.early
  //     },
  //     childhoodAdolescence: {
  //       traumaHistory: res.trauma,
  //       academicsPeerRelations: res.academics,
  //       childhoodCoping: res.childhood
  //     },
  //     adultDevelopment: {
  //       identityFormation: res.identity,
  //       majorTurningPoints: res.major,
  //       relationshipHistory: res.relationship,
  //       roleModels: res.role
  //     }
  //   });

  //   /* ================= FUNCTIONAL NEUROBIOLOGY (SECTION 4) ================= */
  //   this.assessmentForm.get('functionalNeurobiology')?.patchValue({
  //     neuroendocrineChecklist: {
  //       cortisolStress: res.cortisol,
  //       thyroidMetabolism: res.thyroid,
  //       sexHormones: res.seX_HORMONES,
  //       insulinBloodSugar: res.insulin,
  //       oxytocinBonding: res.oxytocin,
  //       melatoninSleep: res.melatonin
  //     },
  //     inflammatorySymptoms: {
  //       inflammatorySymptoms: res.inflammatory,
  //       notes: res.inflammatorY_NOTES
  //     },
  //     gutBrainAxis: {
  //       digestiveIssues: res.digestive,
  //       antibioticOveruse: res.antibiotic,
  //       foodIntolerances: res.food,
  //       emotionalGutLink: res.emotional
  //     },
  //     geneticEpigenetic: {
  //       familyMentalIllness: res.family,
  //       neurodevelopmentalFamily: res.neurodevelopmental,
  //       geneticConditions: res.genetic,
  //       familyAddictionTrauma: res.familY_HISTORY,
  //       temperamentTraits: res.temperament,
  //       earlyStressImpact: res.sectioN4_EARLY,
  //       geneticTestResults: res.genetiC_TEST
  //     }
  //   });

  //   /* ================= EMOTIONAL NEUROSCIENCE (SECTION 5) ================= */
  //   this.assessmentForm.get('emotionalNeuroscience')?.patchValue({
  //     amygdala: {
  //       amygdala: res.amygdala,
  //       notes: res.amygdalA_NOTES
  //     },
  //     hippocampus: {
  //       hippocampus: res.hippocampus,
  //       notes: res.hippocampuS_NOTES
  //     },
  //     prefrontalCortex: {
  //       prefrontalCortex: res.prefrontal,
  //       notes: res.prefrontaL_NOTES
  //     },
  //     anteriorCingulate: {
  //       anteriorCingulate: res.anterior,
  //       notes: res.anterioR_NOTES
  //     },
  //     insula: {
  //       insula: res.insula,
  //       notes: res.insulA_NOTES
  //     }
  //   });

  //   /* ================= PERSONALITY MAPPING (SECTION 6) ================= */
  //   this.assessmentForm.get('personalityMapping')?.patchValue({
  //     selfImageBeliefs: {
  //       selfDescription: res.describE_YOURSELF,
  //       coreBeliefs: res.core,
  //       limitingBeliefs: res.beliefs
  //     },
  //     traitRatings: {
  //       introversionExtraversion: res.introversion,
  //       openness: res.openness,
  //       emotionalReactivity: res.sectioN6_EMOTIONAL,
  //       selfDiscipline: res.self,
  //       empathyCompassion: res.empathy,
  //       riskTaking: res.risk
  //     },
  //     copingStyles: res.copinG_STYLES,
  //     copingStylesChk: res.copinG_STYLES_CHK
  //   });

  //   /* ================= SECTION 7 ================= */
  //   this.assessmentForm.get('section7')?.patchValue({
  //     bodyMindMapping: {
  //       tensionAreas: res.main,
  //       bodyEmotionChanges: res.bodY_SYMPTOMS,
  //       bodyTraumaHistory: res.history === 'A'
  //     },
  //     emotionRegulation: {
  //       childhoodEmotions: res.emotions,
  //       angerHandling: res.anger,
  //       sadnessHandling: res.sadness,
  //       fearHandling: res.fear,
  //       regulationStyle: res.style
  //     },
  //     sensoryProfile: {
  //       sensitivities: res.sensitivity,
  //       overloadTriggers: res.overload,
  //       calmingPreferences: res.calming
  //     }
  //   });

  //   /* ================= LIFESTYLE BEHAVIOUR (SECTION 8) ================= */
  //   this.assessmentForm.get('lifeStyleBehaviour')?.patchValue({
  //     dailyRoutine: {
  //       morningHabits: res.morning,
  //       eveningWindDown: res.evening,
  //       screenTime: res.screen,
  //       caffeine: res.caffeine,
  //       alcoholSubstances: res.alcohol
  //     },
  //     sleepRecovery: {
  //       sleepHours: res.sleeP_HOURS,
  //       sleepQuality: res.sleeP_QUALITY,
  //       dreamsNightmares: res.dreams
  //     },
  //     nutrition: {
  //       mealRegularity: res.meal,
  //       proteinFiber: res.protein,
  //       emotionalEating: res.sectioN8_EMOTIONAL,
  //       restrictionBinge: res.restriction
  //     },
  //     activity: {
  //       activityTypeFrequency: res.activity,
  //       exerciseEffectMood: res.exercise,
  //       bodyConnection: res.bodY_CONNECTION
  //     }
  //   });

  //   /* ================= CLIENT GOALS (SECTION 9) ================= */
  //   this.assessmentForm.get('clientGoals')?.patchValue({
  //     selfReflection: {
  //       selfUnderstanding: res.abouT_YOURSELF,
  //       healingDefinition: res.likE_FOR_YOU
  //     },
  //     therapeuticDirection: {
  //       preferredModalities: res.preferred,
  //       previousTherapy: res.previous,
  //       readinessForInnerWork: res.readiness
  //     },
  //     lfh: {
  //       lifeAfterHealing: res.life
  //     }
  //   });
  // }

  patchForm(data: DigitalIntakeDtoInterface) {

    if (!data) return;

    // this.DigitalIntakeDto.EmrDocId = data.emrDocId
    // this.DigitalIntakeDto.PatiId = data.patiId
    this.DigitalIntakeDto.DigitalId = data.digitalId
    this.assessmentForm.patchValue({

      presentingComplaints: {
        primaryComplaint: data.primaryComplaint,
        duration: data.duration,
        severity: data.subjectiveSeverity,
        triggers: data.identifiedTriggers?.split(',') || null,
        functionalImpact: data.functionalImpact
      },

      mentalStatusExam: {
        appearance: data.appearance,
        speech: data.speech,
        mood: data.mood,
        affect: data.affect,
        thoughtProcess: data.thoughtProcess,
        perception: data.perception,
        cognition: data.cognition,
        insight: data.insight,
        judgment: data.judgment
      },

      safetyScreening: {
        suicidalIdeation: data.suicidalIdeation,
        homicidalIdeation: data.homicidalIdeation,
        overallRisk: data.overallRiskLevel,
        protectiveFactors: data.protectiveFactorsPresent
      },

      neuroEndocrine: {
        neuroEndocrine: data.neuroendocrineRegulation?.split(',') || null
      },

      gutBrain: {
        inflammatoryIndicators: data.inflammatoryIndicators,
        gutBrain: data.gutBrainAxisIndicators?.split(',') || null
      },

      lifeStyle: {
        avgSleep: data.averageSleepDuration,
        sleepQuality: data.sleepQuality,
        dietPattern: data.dietPattern,
        physicalActivity: data.physicalActivity,
        substances: data.substances?.split(',') || null,
        screenTime: data.dailyScreenExposure
      },

      sensorySomatic: {
        awarnessIssue: data.interoceptiveAwarenessIssues,
        sensitivity: data.sensorySensitivity?.split(',') || null,
        tensionArea: data.commonTensionAreas?.split(',') || null
      },

      goal: {
        statedGoal: data.clientStatedGoal,
        regulations: data.preferredRegulation,
        regulationsOther: data.preferredRegulationRmk,
        readyForChange: data.readinessForChange
      },

      clinical: {
        impression: data.clinicalImpression,
        regulations: data.initialRegulationPlan,
        folowUp: data.followupInterval
      }

    });

  }


  onCheckboxChange(event: any, arrayName: string) {

    const control = this.assessmentForm.get(arrayName);

    let triggers = control?.value;

    // if somehow not array, reset it
    if (!Array.isArray(triggers)) {
      triggers = [];
    }

    if (event.detail.checked) {

      if (!triggers.includes(event.detail.value)) {
        triggers.push(event.detail.value);
      }

    } else {

      triggers = triggers.filter((v: string) => v !== event.detail.value);

    }

    control?.setValue(triggers);
    console.log(this.assessmentForm);

  }

  isTriggerChecked(val: string, path: string): boolean {

    const control = this.assessmentForm.get(path);

    if (!control) return false;

    let arr = control.value;

    // if null/string convert to array
    if (!Array.isArray(arr)) {
      return false;
    }

    return arr.includes(val);
  }



}

