import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonLabel,
  IonItem,
  IonFooter,
  IonAccordionGroup,
  IonAccordion,
  IonInput,
  IonRadio,
  IonListHeader,
  IonTextarea,
  IonRadioGroup,
  // IonCheckboxGroup
} from '@ionic/angular/standalone';
//import { NpaService } from 'src/app/shared/services/npa.service';
import { NpaSubmission } from 'src/app/shared/class/npa-assesment/npa-submission';
import { NeuroPsychobiologicalAssessment } from 'src/app/shared/interfaces/npa-assesment.ts/NeuroPsychobiologicalAssessment';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { PatientListDatewiseItem } from 'src/app/shared/interfaces/patient-list/patient-list-date-wise-item';
import { NpaService } from 'src/app/shared/services/npa.service';


@Component({
  selector: 'app-npassessment',
  templateUrl: './npassessment.page.html',
  styleUrls: ['./npassessment.page.scss'],
  standalone: true,
 imports: [
    IonButton,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonInput,
    IonTextarea,
    IonRadioGroup,
    IonLabel,
    IonItem,
    IonFooter,
    ReactiveFormsModule,
    IonAccordionGroup,
    IonAccordion,
    IonRadio, IonListHeader
],
})
export class NpassessmentPage implements OnInit {

  assessmentForm!: FormGroup;
  patientData!: PatientListDatewiseItem;

  ExistingData!:NeuroPsychobiologicalAssessment

  constructor(
    private fb: FormBuilder,
    private npaService: NpaService,
    private notification:NotificationService,
    private shared:SharedDataService
  ) {
    this.initForm();
    this.getPatientDataFromShared()

    // Initialize form groups for all 9 sections 
    // this.assessmentForm = this.fb.group({
    //   section1: this.fb.group({ notes: [''], score: [0] }),
    //   section2: this.fb.group({ observations: [''] }),
    //   section3: this.fb.group({ physicalExam: [''] }),
    //   // Add groups for sections 4 through 9 here 
    // });
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');

  }

    getPatientDataFromShared() {
    // const state = window.history.state;
    this.patientData =this.shared.getPatient()
    console.log(this.patientData);
    this.getExistingForm(this.patientData.emR_DOC_ID)
    
  }


  async getExistingForm(emrDociD:string){
    (await this.npaService.GetAssessmentAsync(emrDociD)).subscribe((data:any)=>{
      console.log(data);
      this.ExistingData = data
      this.bindAssessmentResponse(data)
    })

  }


  private initForm() {
    this.assessmentForm = this.fb.group({

      clientProfile: this.fb.group({
        fullName: [''],
        preferredName: [''],
        age: [''],
        sexAssignedAtBirth: [''],
        genderIdentity: [''],
        sexualOrientation: [''],
        nationality: [''],
        maritalStatus: [''],
        occupation: [''],
        emergencyContact: [''],
      }),

      presentingComplaints: this.fb.group({
        reason: [''],
        duration: [''],
        intensity: [''],
        frequency: [''],
        triggers: [''],
        impact: [''],
      }),

      clientNarrative: this.fb.group({
        ownWords: [''],
        improvementGoals: [''],
      }),

      currentEnvironment: this.fb.group({
        workStress: [''],
        socialSupport: [''],
        livingEnvironment: [''],
        lifeTransitions: [''],
      }),





    });

    this.assessmentForm.addControl(
      'mentalStatus',
      this.fb.group({

        consciousAwareness: this.fb.group({
          presentDuringTasks: [''],        // yes / no / sometimes
          dissociationLevel: [''],          // no / mild / moderate / severe
          bodyEmotionConnection: [''],      // yes / no / sometimes
          notes: [''],
        }),

        mentalStatusExam: this.fb.group({
          appearanceBehavior: [''],
          speech: [''],
          mood: [''],
          affect: [''],

          // thoughtProcess: this.fb.group({
          //   logical: [false],
          //   tangential: [false],
          //   disorganized: [false],
          //   flightOfIdeas: [false],
          // }),

          thoughtProcess:[''],
          thoughtContent:[''],
          // thoughtContent: this.fb.group({
          //   worryRumination: [false],
          //   obsessions: [false],
          //   delusions: [false],
          //   suicidalIdeation: [false],
          //   selfHarm: [false],
          //   none: [false],
          // }),

          notes: [''],
          perception:[''],
          hallucinationDetails:[''],

          // perception: this.fb.group({
          //   normal: [false],
          //   derealization: [false],
          //   hallucinations: [false],
          //   hallucinationDetails: [''],
          // }),

          cognition: this.fb.group({
            orientation: [''],   // intact / impaired
            memory: [''],        // intact / impaired
            attention: [''],     // intact / impaired
            insightJudgment: [''],
          }),
        }),

      })
    );

    this.assessmentForm.addControl(
      'developmentalNeurohistory',
      this.fb.group({

        earlyLifeMilestones: this.fb.group({
          prenatalComplications: [''],   // yes / no
          attachmentStyle: [''],         // secure / anxious / avoidant / disorganized / unclear
          developmentalMilestones: [''], // normal / delayed
          earlyEmotionRegulation: [''],
        }),

        childhoodAdolescence: this.fb.group({
          traumaHistory: [''],           // yes / no
          academicsPeerRelations: [''],
          // childhoodCoping: this.fb.group({
          //   withdrawal: [false],
          //   fight: [false],
          //   peoplePleasing: [false],
          //   overachieving: [false],
          //   other: [false],
          // }),
          childhoodCoping:['']
        }),

        adultDevelopment: this.fb.group({
          identityFormation: [''],
          majorTurningPoints: [''],
          relationshipHistory: [''],
          roleModels: [''],
        }),

      })
    );

    this.assessmentForm.addControl(
      'functionalNeurobiology',
      this.fb.group({

        neuroendocrineChecklist: this.fb.group({
          cortisolStress:[''],
          thyroidMetabolism:[''],
          sexHormones:[''],
          insulinBloodSugar:[''],
          oxytocinBonding:[''],
          melatoninSleep:[''],
          // inflammatorySymptoms:[''],
          




          // cortisolStress: this.fb.group({
          //   fatigueOnWaking: [false],
          //   midDayCrash: [false],
          //   anxietyIrritability: [false],
          //   sleepDifficulty: [false],
          // }),

          // thyroidMetabolism: this.fb.group({
          //   weightChange: [false],
          //   coldHeatIntolerance: [false],
          //   hairThinning: [false],
          //   constipationBrainFog: [false],
          // }),

          // sexHormones: this.fb.group({
          //   pmsPmdd: [false],
          //   libidoChange: [false],
          //   acneHirsutism: [false],
          //   irregularPeriods: [false],
          // }),

          // insulinBloodSugar: this.fb.group({
          //   sugarCravings: [false],
          //   moodAfterMeals: [false],
          //   energySwings: [false],
          // }),

          // oxytocinBonding: this.fb.group({
          //   emotionalClosenessDifficulty: [false],
          //   trustIssues: [false],
          //   aversionToTouch: [false],
          // }),

        //   melatoninSleep: this.fb.group({
        //     troubleWindingDown: [false],
        //     restlessSleep: [false],
        //     sleepWakeInversion: [false],
        //   }),
        }),

        // notes:[''],


        inflammatorySymptoms: this.fb.group({
          
        inflammatorySymptoms:[''],
          // jointMusclePain: [false],
          // chronicFatigue: [false],
          // skinIssues: [false],
          // frequentInfections: [false],
          notes: [''],
        }),

        gutBrainAxis: this.fb.group({
          // digestiveIssues: this.fb.group({
          //   ibs: [false],
          //   bloating: [false],
          //   gas: [false],
          //   constipation: [false],
          //   looseStools: [false],
          //   other: [false],
          // }),
          digestiveIssues:[''],
          antibioticOveruse: [''], // yes / no
          foodIntolerances: [''],
          emotionalGutLink: [''],
        }),

        geneticEpigenetic: this.fb.group({
          familyMentalIllness: [''], // yes / no
          neurodevelopmentalFamily: [''], // yes / no
          geneticConditions: [''],
          familyAddictionTrauma: [''],
          temperamentTraits: [''],
          earlyStressImpact: [''],
          geneticTestResults: [''],
        }),

      })
    );


    this.assessmentForm.addControl(
      'emotionalNeuroscience',
      this.fb.group({

        amygdala: this.fb.group({
          // fightFlightFreeze: [false],
          // hypervigilance: [false],
          // difficultyFeelingSafe: [false],
          amygdala:[''],
          notes: [''],
        }),

        hippocampus: this.fb.group({
          // flashbacksFlooding: [false],
          // poorContextIntegration: [false],
          // repeatingEmotionalLoops: [false],
          hippocampus:[''],          
          notes: [''],
        }),

        prefrontalCortex: this.fb.group({
          prefrontalCortex:[''],
          // impulsivity: [false],
          // emotionRegulationDifficulty: [false],
          // planningDecisionDifficulty: [false],
          notes: [''],
        }),

        anteriorCingulate: this.fb.group({
          // excessGuiltSelfBlame: [false],
          // rejectionSensitivity: [false],
          // empathicOverload: [false],
          anteriorCingulate:[''],
          notes: [''],
        }),

        insula: this.fb.group({
          // bodyDisconnection: [false],
          // difficultyNamingEmotions: [false],
          // lowBodyBasedSelfRegulation: [false],
          insula:[''],
          notes: [''],
        }),

      })
    );

    this.assessmentForm.addControl(
      'personalityMapping',
      this.fb.group({

        selfImageBeliefs: this.fb.group({
          selfDescription: [''],
          coreBeliefs: [''],
          limitingBeliefs: [''],
        }),

        traitRatings: this.fb.group({
          introversionExtraversion: [''], // 1–5
          openness: [''],
          emotionalReactivity: [''],
          selfDiscipline: [''],
          empathyCompassion: [''],
          riskTaking: [''],
        }),

        copingStyles: [''],
        copingStylesChk: ['']

      })
    );


    this.assessmentForm.addControl(
      'section7',
      this.fb.group({
        bodyMindMapping: this.fb.group({
          tensionAreas: [''],
          bodyEmotionChanges: [''],
          bodyTraumaHistory: [null] // boolean
        }),

        emotionRegulation: this.fb.group({
          // childhoodEmotions: this.fb.array([]), // ✅ FormArray
          childhoodEmotions:[''],
          angerHandling: [''],
          sadnessHandling: [''],
          fearHandling: [''],
          regulationStyle: ['']
        }),

        sensoryProfile: this.fb.group({
          // sensitivities: this.fb.array([]), // ✅ FormArray
          sensitivities:[''],
          overloadTriggers: [''],
          calmingPreferences: [''],

        })
      })
    );


    this.assessmentForm.addControl(
      'lifeStyleBehaviour',
      this.fb.group({



        // 8.1 Daily Routine
        dailyRoutine: this.fb.group({
          morningHabits: [''],
          eveningWindDown: [''],
          // screenTime: this.fb.array([]),        // checkbox group
          screenTime:[''],
          // caffeine: this.fb.array([]),           // checkbox group
          caffeine:[''],
          alcoholSubstances: [''],
        }),

        sleepRecovery: this.fb.group({
          // 8.2 Sleep & Recovery
          sleepHours: [''],
          // sleepQuality: this.fb.array([]),       // checkbox group
          sleepQuality:[''],
          dreamsNightmares: [''],
        }),



        nutrition: this.fb.group({
          // 8.3 Nutrition
          mealRegularity: [''],     // checkbox group
          proteinFiber: [''],       // checkbox group
          emotionalEating: [''],    // checkbox group
          restrictionBinge: [''],

        }),


        activity: this.fb.group({
          // 8.4 Activity
          activityTypeFrequency: [''],
          exerciseEffectMood: [''],
          bodyConnection: [''],
        }),



        // checkbox group
      }),

      /* ===================== SECTION 9 ===================== */

    );


    this.assessmentForm.addControl(
      'clientGoals',
      this.fb.group({

        selfReflection: this.fb.group({
          // 9.1 Self-Reflection
          selfUnderstanding: [''],
          healingDefinition: [''],
        }),
        therapeuticDirection: this.fb.group({
          // 9.2 Therapeutic Direction
          // preferredModalities: this.fb.array([]),
          preferredModalities:[''],
          previousTherapy: [''],
          readinessForInnerWork: [''],
        }),
        lfh: this.fb.group({
          // 9.3 Growth Vision
          lifeAfterHealing: ['']
        }),






      })
    );











  }

  bindAssessmentResponse(res: NeuroPsychobiologicalAssessment) {

  this.assessmentForm.patchValue({

    /* ================= CLIENT PROFILE ================= */
    clientProfile: {
      // not available in response → keep empty or map later
    },

    /* ================= PRESENTING COMPLAINTS (SECTION 1) ================= */
    presentingComplaints: {
      reason: res.seekinG_SUPPORT,
      duration: res.duratioN_CONCERN,
      intensity: res.intensity,
      frequency: res.frequency,
      triggers: res.triggers,
      impact: res.impact
    },

    clientNarrative: {
      ownWords: res.owN_WORDS,
      improvementGoals: res.changE_IMPROVE
    },

    currentEnvironment: {
      workStress: res.joB_SATISFACTION,
      socialSupport: res.sociaL_SUPPORT,
      livingEnvironment: res.livinG_ENVIRONMENT,
      lifeTransitions: res.currenT_LIFE
    }
  });

  /* ================= MENTAL STATUS (SECTION 2) ================= */
  this.assessmentForm.get('mentalStatus')?.patchValue({
    consciousAwareness: {
      presentDuringTasks: res.durinG_TASKS,
      dissociationLevel: res.dissociation,
      bodyEmotionConnection: res.feeL_CONNECTED,
      notes: res.consciouS_NOTES
    },
    mentalStatusExam: {
      appearanceBehavior: res.appearance,
      speech: res.speech,
      mood: res.mood,
      affect: res.affect,
      thoughtProcess: res.thoughT_PROCESS,
      thoughtContent: res.thoughT_CONTENT,
      notes: res.mentaL_NOTES,
      perception: res.perception,
      hallucinationDetails: res.perceptioN_RMK,
      cognition: {
        orientation: res.orientation,
        memory: res.memory,
        attention: res.attention,
        insightJudgment: res.insight
      }
    }
  });

  /* ================= DEVELOPMENTAL NEUROHISTORY (SECTION 3) ================= */
  this.assessmentForm.get('developmentalNeurohistory')?.patchValue({
    earlyLifeMilestones: {
      prenatalComplications: res.prenatal,
      attachmentStyle: res.attachment,
      developmentalMilestones: res.developmental,
      earlyEmotionRegulation: res.early
    },
    childhoodAdolescence: {
      traumaHistory: res.trauma,
      academicsPeerRelations: res.academics,
      childhoodCoping: res.childhood
    },
    adultDevelopment: {
      identityFormation: res.identity,
      majorTurningPoints: res.major,
      relationshipHistory: res.relationship,
      roleModels: res.role
    }
  });

  /* ================= FUNCTIONAL NEUROBIOLOGY (SECTION 4) ================= */
  this.assessmentForm.get('functionalNeurobiology')?.patchValue({
    neuroendocrineChecklist: {
      cortisolStress: res.cortisol,
      thyroidMetabolism: res.thyroid,
      sexHormones: res.seX_HORMONES,
      insulinBloodSugar: res.insulin,
      oxytocinBonding: res.oxytocin,
      melatoninSleep: res.melatonin
    },
    inflammatorySymptoms: {
      inflammatorySymptoms: res.inflammatory,
      notes: res.inflammatorY_NOTES
    },
    gutBrainAxis: {
      digestiveIssues: res.digestive,
      antibioticOveruse: res.antibiotic,
      foodIntolerances: res.food,
      emotionalGutLink: res.emotional
    },
    geneticEpigenetic: {
      familyMentalIllness: res.family,
      neurodevelopmentalFamily: res.neurodevelopmental,
      geneticConditions: res.genetic,
      familyAddictionTrauma: res.familY_HISTORY,
      temperamentTraits: res.temperament,
      earlyStressImpact: res.sectioN4_EARLY,
      geneticTestResults: res.genetiC_TEST
    }
  });

  /* ================= EMOTIONAL NEUROSCIENCE (SECTION 5) ================= */
  this.assessmentForm.get('emotionalNeuroscience')?.patchValue({
    amygdala: {
      amygdala: res.amygdala,
      notes: res.amygdalA_NOTES
    },
    hippocampus: {
      hippocampus: res.hippocampus,
      notes: res.hippocampuS_NOTES
    },
    prefrontalCortex: {
      prefrontalCortex: res.prefrontal,
      notes: res.prefrontaL_NOTES
    },
    anteriorCingulate: {
      anteriorCingulate: res.anterior,
      notes: res.anterioR_NOTES
    },
    insula: {
      insula: res.insula,
      notes: res.insulA_NOTES
    }
  });

  /* ================= PERSONALITY MAPPING (SECTION 6) ================= */
  this.assessmentForm.get('personalityMapping')?.patchValue({
    selfImageBeliefs: {
      selfDescription: res.describE_YOURSELF,
      coreBeliefs: res.core,
      limitingBeliefs: res.beliefs
    },
    traitRatings: {
      introversionExtraversion: res.introversion,
      openness: res.openness,
      emotionalReactivity: res.sectioN6_EMOTIONAL,
      selfDiscipline: res.self,
      empathyCompassion: res.empathy,
      riskTaking: res.risk
    },
    copingStyles: res.copinG_STYLES,
    copingStylesChk: res.copinG_STYLES_CHK
  });

  /* ================= SECTION 7 ================= */
  this.assessmentForm.get('section7')?.patchValue({
    bodyMindMapping: {
      tensionAreas: res.main,
      bodyEmotionChanges: res.bodY_SYMPTOMS,
      bodyTraumaHistory: res.history === 'A'
    },
    emotionRegulation: {
      childhoodEmotions: res.emotions,
      angerHandling: res.anger,
      sadnessHandling: res.sadness,
      fearHandling: res.fear,
      regulationStyle: res.style
    },
    sensoryProfile: {
      sensitivities: res.sensitivity,
      overloadTriggers: res.overload,
      calmingPreferences: res.calming
    }
  });

  /* ================= LIFESTYLE BEHAVIOUR (SECTION 8) ================= */
  this.assessmentForm.get('lifeStyleBehaviour')?.patchValue({
    dailyRoutine: {
      morningHabits: res.morning,
      eveningWindDown: res.evening,
      screenTime: res.screen,
      caffeine: res.caffeine,
      alcoholSubstances: res.alcohol
    },
    sleepRecovery: {
      sleepHours: res.sleeP_HOURS,
      sleepQuality: res.sleeP_QUALITY,
      dreamsNightmares: res.dreams
    },
    nutrition: {
      mealRegularity: res.meal,
      proteinFiber: res.protein,
      emotionalEating: res.sectioN8_EMOTIONAL,
      restrictionBinge: res.restriction
    },
    activity: {
      activityTypeFrequency: res.activity,
      exerciseEffectMood: res.exercise,
      bodyConnection: res.bodY_CONNECTION
    }
  });

  /* ================= CLIENT GOALS (SECTION 9) ================= */
  this.assessmentForm.get('clientGoals')?.patchValue({
    selfReflection: {
      selfUnderstanding: res.abouT_YOURSELF,
      healingDefinition: res.likE_FOR_YOU
    },
    therapeuticDirection: {
      preferredModalities: res.preferred,
      previousTherapy: res.previous,
      readinessForInnerWork: res.readiness
    },
    lfh: {
      lifeAfterHealing: res.life
    }
  });
}





  sensoryOptions = ['Sound', 'Light', 'Touch', 'Smell', 'Crowds', 'None'];
  childhoodEmotionOptions = ['Suppressed', 'Punished', 'Allowed', 'Unpredictable'];


  get sensitivitiesArray(): string[] {
    return this.assessmentForm
      .get('section7.sensoryProfile.sensitivities')?.value || [];
  }

  onSensitivityChange(ev: any, value: string) {
    const control = this.assessmentForm.get(
      'section7.sensoryProfile.sensitivities'
    );

    const current = control?.value || [];

    if (ev.detail.checked) {
      control?.setValue([...current, value]);
    } else {
      control?.setValue(current.filter((v: string) => v !== value));
    }
  }



  get childhoodEmotionsArray(): string[] {
    return this.assessmentForm
      .get('section7.emotionRegulation.childhoodEmotions')?.value || [];
  }

  onChildhoodEmotionChange(ev: any, value: string) {
    const control = this.assessmentForm.get(
      'section7.emotionRegulation.childhoodEmotions'
    );

    const current = control?.value || [];

    if (ev.detail.checked) {
      control?.setValue([...current, value]);
    } else {
      control?.setValue(current.filter((v: string) => v !== value));
    }
  }


  // Generic save function to call specific procedures 
  async onSaveSection(sectionNumber: number) {
    const sectionKey = `section${sectionNumber}`;
    const data = this.assessmentForm.get(sectionKey)?.value;

    console.log(`Executing: UCHEMR.SP_NPA_SECTION_${sectionNumber}_SAVE`, data);
    // Here you would call your API service to execute the SQL procedure 
  }


  onCheckboxChange(event: any, arrayName: string, groupPath: string) {
    const formArray = this.assessmentForm.get(
      `${groupPath}.${arrayName}`
    ) as FormArray;

    if (event.detail.checked) {
      formArray.push(this.fb.control(event.target.value));
    } else {
      const index = formArray.controls.findIndex(
        x => x.value === event.target.value
      );
      if (index !== -1) formArray.removeAt(index);
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




  async onSubmitAssessment() {
    console.log(this.assessmentForm.invalid);
    
    // if (this.assessmentForm.invalid) {
    //   this.assessmentForm.markAllAsTouched();
    //   return;
    // }

  if (!this.hasAnyValue(this.assessmentForm)) {
    console.warn('No data entered');
    this.notification.showNotification('No data Entered',"warning")
    // show toast / alert
    return;
  }

    const f = this.assessmentForm.value;
    console.log(f);
    

    // const payload: {
    //   npaId?: number | null;
    //   patiId?: string;
    //   emrDocId?: string;
    //   createUser?: string;
    //   section1?: any;
    //   section2?: any;
    //   section3?: any;
    //   section4?: any;
    //   section5?: any;
    //   section6?: any;
    //   section7?: any;
    //   section8?: any;
    //   section9?: any;
    // } = {
    const payload :  NpaSubmission = {
      npaId: null, // set if editing
      patiId: this.patientData.patI_ID,        // from route / auth
      emrDocId: this.patientData.emR_DOC_ID,      // from route
      // createUser: '',     // from auth

      // ================= SECTION 1 =================
      Section1: {
        SeekingSupport: f.presentingComplaints.reason,
        DurationConcern: f.presentingComplaints.duration,
        Intensity: f.presentingComplaints.intensity,
        Frequency: f.presentingComplaints.frequency,
        Triggers: f.presentingComplaints.triggers,
        Impact: f.presentingComplaints.impact,
        OwnWords: f.clientNarrative.ownWords,
        ChangeImprove: f.clientNarrative.improvementGoals,
        JobSatisfaction: f.currentEnvironment.workStress,
        SocialSupport: f.currentEnvironment.socialSupport,
        LivingEnvironment: f.currentEnvironment.livingEnvironment,
        CurrentLife: f.currentEnvironment.lifeTransitions
      },

      // ================= SECTION 2 =================
      Section2: {
        DuringTasks: f.mentalStatus.consciousAwareness.presentDuringTasks,
        Dissociation: f.mentalStatus.consciousAwareness.dissociationLevel,
        FeelConnected: f.mentalStatus.consciousAwareness.bodyEmotionConnection,
        ConsciousNotes: f.mentalStatus.consciousAwareness.notes,
        Appearance: f.mentalStatus.mentalStatusExam.appearanceBehavior,
        Speech: f.mentalStatus.mentalStatusExam.speech,
        Mood: f.mentalStatus.mentalStatusExam.mood,
        Affect: f.mentalStatus.mentalStatusExam.affect,
        ThoughtProcess:  f.mentalStatus.mentalStatusExam.thoughtProcess,
        ThoughtContent:  f.mentalStatus.mentalStatusExam.thoughtContent,
        MentalNotes: f.mentalStatus.mentalStatusExam.notes,
        Perception:  f.mentalStatus.mentalStatusExam.perception,
        PerceptionRemark: f.mentalStatus.mentalStatusExam.perception.hallucinationDetails,
        Orientation: f.mentalStatus.mentalStatusExam.cognition.orientation,
        Memory: f.mentalStatus.mentalStatusExam.cognition.memory,
        Attention: f.mentalStatus.mentalStatusExam.cognition.attention,
        Insight: f.mentalStatus.mentalStatusExam.cognition.insightJudgment
      },

      // ================= SECTION 3 =================
      Section3: {
        Prenatal: f.developmentalNeurohistory.earlyLifeMilestones.prenatalComplications,
        Attachment: f.developmentalNeurohistory.earlyLifeMilestones.attachmentStyle,
        Developmental: f.developmentalNeurohistory.earlyLifeMilestones.developmentalMilestones,
        Early: f.developmentalNeurohistory.earlyLifeMilestones.earlyEmotionRegulation,
        Trauma: f.developmentalNeurohistory.childhoodAdolescence.traumaHistory,
        Academics: f.developmentalNeurohistory.childhoodAdolescence.academicsPeerRelations,
        Childhood:  f.developmentalNeurohistory.childhoodAdolescence.childhoodCoping,
        Identity: f.developmentalNeurohistory.adultDevelopment.identityFormation,
        Major: f.developmentalNeurohistory.adultDevelopment.majorTurningPoints,
        Relationship: f.developmentalNeurohistory.adultDevelopment.relationshipHistory,
        Role: f.developmentalNeurohistory.adultDevelopment.roleModels
      },

      // ================= SECTION 4 =================
      Section4: {
        Cortisol:  f.functionalNeurobiology.neuroendocrineChecklist.cortisolStress,
        Thyroid:  f.functionalNeurobiology.neuroendocrineChecklist.thyroidMetabolism,
        SexHormones:  f.functionalNeurobiology.neuroendocrineChecklist.sexHormones,
        Insulin:  f.functionalNeurobiology.neuroendocrineChecklist.insulinBloodSugar,
        Oxytocin:  f.functionalNeurobiology.neuroendocrineChecklist.oxytocinBonding,
        Melatonin:  f.functionalNeurobiology.neuroendocrineChecklist.melatoninSleep,
        Inflammatory:  f.functionalNeurobiology.inflammatorySymptoms.inflammatorySymptoms,
        InflammatoryNotes: f.functionalNeurobiology.inflammatorySymptoms.notes,
        Digestive:  f.functionalNeurobiology.gutBrainAxis.digestiveIssues,
        Antibiotic: f.functionalNeurobiology.gutBrainAxis.antibioticOveruse,
        Food: f.functionalNeurobiology.gutBrainAxis.foodIntolerances,
        Emotional: f.functionalNeurobiology.gutBrainAxis.emotionalGutLink,
        Family: f.functionalNeurobiology.geneticEpigenetic.familyMentalIllness,
        Neurodevelopmental: f.functionalNeurobiology.geneticEpigenetic.neurodevelopmentalFamily,
        Genetic: f.functionalNeurobiology.geneticEpigenetic.geneticConditions,
        FamilyHistory: f.functionalNeurobiology.geneticEpigenetic.familyAddictionTrauma,
        Temperament: f.functionalNeurobiology.geneticEpigenetic.temperamentTraits,
        Early: f.functionalNeurobiology.geneticEpigenetic.earlyStressImpact,
        GeneticTest: f.functionalNeurobiology.geneticEpigenetic.geneticTestResults
      },

      // ================= SECTION 5 =================
      Section5: {
        Amygdala:  f.emotionalNeuroscience.amygdala.amygdala,
        AmygdalaNotes: f.emotionalNeuroscience.amygdala.notes,
        Hippocampus:  f.emotionalNeuroscience.hippocampus.hippocampus,
        HippocampusNotes:  f.emotionalNeuroscience.hippocampus.notes,
        Prefrontal:  f.emotionalNeuroscience.prefrontalCortex.prefrontalCortex,
        PrefrontalNotes:  f.emotionalNeuroscience.prefrontalCortex.notes,
        Anterior:  f.emotionalNeuroscience.anteriorCingulate.anteriorCingulate,
        AnteriorNotes:  f.emotionalNeuroscience.anteriorCingulate.notes,
        Insula:  f.emotionalNeuroscience.insula.insula,
        InsulaNotes:  f.emotionalNeuroscience.insula.notes,
      },

      // ================= SECTION 6 =================
      Section6: {
        DescribeYourself: f.personalityMapping.selfImageBeliefs.selfDescription,
        Core: f.personalityMapping.selfImageBeliefs.coreBeliefs,
        Beliefs: f.personalityMapping.selfImageBeliefs.limitingBeliefs,
        Introversion: f.personalityMapping.traitRatings.introversionExtraversion,
        Openness: f.personalityMapping.traitRatings.openness,
        Emotional: f.personalityMapping.traitRatings.emotionalReactivity,
        Self: f.personalityMapping.traitRatings.selfDiscipline,
        Empathy: f.personalityMapping.traitRatings.empathyCompassion,
        Risk: f.personalityMapping.traitRatings.riskTaking,
        CopingStyles: f.personalityMapping.copingStyles,
        CopingStylesChk: f.personalityMapping.copingStylesChk
      },

      // ================= SECTION 7 =================
      Section7: {
        Main: f.section7.bodyMindMapping.tensionAreas,
        BodySymptoms: f.section7.bodyMindMapping.bodyEmotionChanges,
        History: f.section7.bodyMindMapping.bodyTraumaHistory,
        Emotions: f.section7.emotionRegulation.childhoodEmotions,
        Anger: f.section7.emotionRegulation.angerHandling,
        Sadness: f.section7.emotionRegulation.sadnessHandling,
        Fear: f.section7.emotionRegulation.fearHandling,
        Style: f.section7.emotionRegulation.regulationStyle,
        Sensitivity: f.section7.sensoryProfile.sensitivities,
        Overload: f.section7.sensoryProfile.overloadTriggers,
        Calming: f.section7.sensoryProfile.calmingPreferences
      },

      // ================= SECTION 8 =================
      Section8: {
        Morning: f.lifeStyleBehaviour.dailyRoutine.morningHabits,
        Evening: f.lifeStyleBehaviour.dailyRoutine.eveningWindDown,
        Screen: f.lifeStyleBehaviour.dailyRoutine.screenTime,
        Caffeine: f.lifeStyleBehaviour.dailyRoutine.caffeine,
        Alcohol: f.lifeStyleBehaviour.dailyRoutine.alcoholSubstances,
        SleepHours: f.lifeStyleBehaviour.sleepRecovery.sleepHours,
        SleepQuality: f.lifeStyleBehaviour.sleepRecovery.sleepQuality,
        Dreams: f.lifeStyleBehaviour.sleepRecovery.dreamsNightmares,
        Meal: f.lifeStyleBehaviour.nutrition.mealRegularity,
        Protein: f.lifeStyleBehaviour.nutrition.proteinFiber,
        Emotional: f.lifeStyleBehaviour.nutrition.emotionalEating,
        Restriction: f.lifeStyleBehaviour.nutrition.restrictionBinge,
        Activity: f.lifeStyleBehaviour.activity.activityTypeFrequency,
        Exercise: f.lifeStyleBehaviour.activity.exerciseEffectMood,
        BodyConnection: f.lifeStyleBehaviour.activity.bodyConnection
      },

      // ================= SECTION 9 =================
      Section9: {
        AboutYourself: f.clientGoals.selfReflection.selfUnderstanding,
        LikeForYou: f.clientGoals.selfReflection.healingDefinition,
        Preferred: f.clientGoals.therapeuticDirection.preferredModalities,
        Previous: f.clientGoals.therapeuticDirection.previousTherapy,
        Readiness: f.clientGoals.therapeuticDirection.readinessForInnerWork,
        Life: f.clientGoals.lfh.lifeAfterHealing
      }
    };

    console.log(payload);
    
    // return
    (await this.npaService.submitNpa(payload)).subscribe({
      next: res => {
        console.log(res);

        // console.log('NPA saved successfully', res);
        this.notification.showNotification("Saved Successfully",'success')
      },
      error: err => {
        // console.error('NPA save failed', err);
        
        this.notification.showNotification("save failed",'error')
      }
    });
  }






}