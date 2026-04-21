import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton } from '@ionic/angular/standalone';
import { ProcedureNote } from 'src/app/shared/class/remedi.cc/procedure-note/procedure-note';
import { LookUp } from 'src/app/shared/interfaces/lookup/lookup';
import { ProcrequestService } from 'src/app/shared/services/procrequest.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
@Component({
  selector: 'app-procedure-note',
  templateUrl: './procedure-note.page.html',
  styleUrls: ['./procedure-note.page.scss'],
  standalone: true,
  imports: [IonButton, CommonModule, FormsModule]
})
export class ProcedureNotePage implements OnInit, OnChanges {


  
  @Input() ProcedureList: LookUp[] = []
  @Input() MachineList: LookUp[] = []
  @Input() pn = new ProcedureNote()
  // @input() proc=new ProcrequestService()
  @Output() close = new EventEmitter<any>();
procedureDeviceList:any[]=[];
procedureCategoryList:any[]=[];
clinicalIntentList:any[]=[];
  procedures: any[] = [];
  categories:any[]=[];
  intents:any[]=[];
form: any = {
    clientName: '',
    therapistName: '',
    date: '',
    time: '',
    sessionNo: null,
    sessionType: '',

    rationale: '',

    pre: {
      anxiety: null,
      stress: null,
      emotion: null,
      body: null,
      clarity: null
    },

    deviceName: '',
    targetArea: '',
    protocol: '',
    intensity: '',
    frequency: '',
    duration: null,

    observation: '',

    post: {
      anxiety: null,
      stress: null,
      body: null,
      clarity: null
    },

    soap: {
      s: '',
      o: '',
      a: '',
      p: ''
    },
 obs: {
    hyper: false,
    hypo: false,
    restless: false,
    fatigued: false,
    calm: false,
    attentive: false,
    dissociated: false
  },
  physio: {
  exercise: '',
  bodyPart: '',
  reps: null,
  sets: null,
  duration: null
    },

    therapy: {
      cbt: false,
      act: false,
      dbt: false,
      sfbt: false,
      mindfulness: false,
      trance: false,
      technique: ''
    },
      sessionFocus: {
      thoughtPatterns: false,
      emotionalProcessing: false,
      behaviouralActivation: false,
      acceptance: false,
      grounding: false,
      insightDevelopment: false
    },
    duringSession: {
  engagement: {
    active: false,
    passive: false,
    resistant: false,
    highlyReceptive: false
  },
  responses: {
    increasedCalm: false,
    emotionalRelease: false,
    fatigue: false,
    heightenedAwareness: false,
    noAdverseReaction: false,
    mildDiscomfort: false,
    discomfortNote: ''
  }
},
postSession: {
  anxiety: null,
  stress: null,
  bodyComfort: null,
  mentalClarity: null,
  observedChange: {
    improvedRegulation: false,
    mildImprovement: false,
    neutral: false,
    temporaryDiscomfort: false,
    needsAdjustment: false
  }
},
plan: {
    continueProtocol: false,
    modifyIntensity: false,
    combinePsychotherapy: false,
    shiftProcedure: false,
    homePractice: false,
    notes: ''
  },
safety: {
    adverseEffects: '', // 'none' | 'mild' | 'moderate'
    adverseNote: '',
    tolerated: '' // 'yes' | 'monitoring'
  },

  nextSession: {
    procedure: '',
    timeGap: ''
  },

  signOff: {
    therapistSignature: '',
    dateTime: ''
  },
    nextProcedure: '',
    timeGap: ''
  };
  constructor(
   private proc: ProcrequestService, private notificationService: NotificationService
  ) { 
       this.pageLoaders()
  }
  async pageLoaders() {
   this.getProcedureDevice()
  this.getProcedureCategory()
  this.getClinicalIntent()
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
    
  }

async getProcedureDevice() {
  (await this.proc.getProcedureDevice()).subscribe((data: any) => {
    console.log(data);

    if (data && data.length > 0) {

      this.procedureDeviceList = data;

      // 🔥 MAP API DATA TO UI CHECKBOX FORMAT
      this.procedures = data.map((item: any) => ({
        id: item.devicE_ID,
        name: item.procedurE_NAME,
        selected: false
      }));

    } else {
      this.procedures = [];
    }

  }, (error: any) => {
    console.error(error);
  });
}

async getProcedureCategory() {
  (await this.proc.getProcedureCategory()).subscribe((data: any) => {
    console.log(data);

    if (data && data.length > 0) {

      this.procedureCategoryList = data;

      this.categories = data.map((item: any) => ({
        id: item.categorY_ID,           // ✅ correct
        name: item.prO_CATEGORY_NAME,   // ✅ correct
        selected: false
      }));

    } else {
      this.categories = [];
    }

  }, (error: any) => {
    console.error(error);
  });
}

async getClinicalIntent() {
  (await this.proc.getClinicalIntent()).subscribe((data: any) => {
    console.log(data);

    if (data && data.length > 0) {

      this.clinicalIntentList = data;

      this.intents = data.map((item: any) => ({
        id: item.intenT_ID,         // 🔥 FIX FIELD
        name: item.clN_INTENT_NAME, // 🔥 FIX FIELD
        selected: false
      }));

    } else {
      this.intents = [];
    }

  }, (error: any) => {
    console.error(error);
  });
}

  // ================= CHECKBOX DATA =================

  // procedures = [
  //   { name: 'HEG Neurofeedback', selected: false },
  //   { name: 'Biofeedback', selected: false },
  //   { name: 'NeuroSync', selected: false },
  //   { name: 'tDCS', selected: false },
  //   { name: 'rTMS', selected: false },
  //   { name: 'Photobiomodulation', selected: false },
  //   { name: 'Happy Light', selected: false },
  //   { name: 'CES', selected: false },
  //   { name: 'AVE', selected: false },
  //   { name: 'Vibroacoustic Therapy', selected: false },
  //   { name: 'QEEG / Brain Mapping', selected: false },
  //   { name: 'MediBalance / Sensorimotor', selected: false },
  //   { name: 'CBT', selected: false },
  //   { name: 'ACT', selected: false },
  //   { name: 'DBT', selected: false },
  //   { name: 'SFBT', selected: false },
  //   { name: 'Mindfulness', selected: false },
  //   { name: 'Trance', selected: false },
  //   { name: 'Combined Neuropsychotherapy', selected: false }
  // ];

  // categories = [
  //   { name: 'Neurofeedback', selected: false },
  //   { name: 'Neuromodulation', selected: false },
  //   { name: 'Sensory–Somatic Regulation', selected: false },
  //   { name: 'Light / Sound Based', selected: false },
  //   { name: 'Cognitive–Behavioural', selected: false },
  //   { name: 'Experiential / Trance', selected: false }
  // ];

  // intents = [
  //   { name: 'Anxiety regulation', selected: false },
  //   { name: 'Stress reduction', selected: false },
  //   { name: 'Emotional dysregulation', selected: false },
  //   { name: 'Trauma arousal', selected: false },
  //   { name: 'Cognitive fatigue', selected: false },
  //   { name: 'Sleep dysregulation', selected: false },
  //   { name: 'Attention / focus', selected: false },
  //   { name: 'Mood stabilization', selected: false },
  //   { name: 'Autonomic imbalance', selected: false },
  //   { name: 'Neuroplasticity enhancement', selected: false }
  // ];

  // ================= SAVE =================
  // saveProcedureNote() {
  //   const payload = {
  //     ...this.form,
  //     procedures: this.procedures.filter(x => x.selected).map(x => x.id),
  //     categories: this.categories.filter(x => x.selected).map(x => x.id),
  //     intents: this.intents.filter(x => x.selected).map(x => x.id)
  //   };

  //   console.log('FINAL PAYLOAD:', payload);

  //   // 👉 Call your API here
  //   // this.api.saveProgressNote(payload).subscribe(...)
  // }

  // ================= CLEAR =================
  clearProcedureNote() {
    this.form = {
      clientName: '',
      therapistName: '',
      date: '',
      time: '',
      sessionNo: null,
      sessionType: '',
      rationale: '',
      pre: {},
      post: {},
      soap: {}
    };

    this.procedures.forEach(x => x.selected = false);
    this.categories.forEach(x => x.selected = false);
    this.intents.forEach(x => x.selected = false);
  }

  // ================= LIMIT INTENTS (MAX 2) =================
  onIntentChange() {
    const selected = this.intents.filter(x => x.selected);
    if (selected.length > 2) {
      selected[selected.length - 1].selected = false;
    }
  }


  async saveProcedureNote() {

  const payload = {
    patientId: 'UCHM00000006767', 

    sessionDate: this.form.date,
    sessionTime: this.form.time,
    sessionNumber: this.form.sessionNo?.toString(),
    sessionType: this.mapSessionType(this.form.sessionType),

    intentRationale: this.form.rationale,

    // ✅ PRE SESSION
    preAnxiety: this.form.pre.anxiety,
    preStress: this.form.pre.stress,
    preIntensity: this.form.pre.emotion,
    preDiscomfort: this.form.pre.body,
    preClarity: this.form.pre.clarity,

    // ✅ OBSERVATION (Y/N)
    hyperaroused: this.boolToYN(this.form.obs.hyper),
    hypoaroused: this.boolToYN(this.form.obs.hypo),
    restless: this.boolToYN(this.form.obs.restless),
    fatigued: this.boolToYN(this.form.obs.fatigued),
    calm: this.boolToYN(this.form.obs.calm),
    attentive: this.boolToYN(this.form.obs.attentive),
    dissociated: this.boolToYN(this.form.obs.dissociated),

    // ✅ DEVICE PARAMS
    deviceName: this.form.deviceName,
    targetArea: this.form.targetArea,
    modeProtocol: this.form.protocol,
    intensity: this.form.intensity,
    frequency: this.form.frequency,
    duration: this.form.duration?.toString(),

    // ✅ THERAPY FLAGS
    cbt: this.boolToYN(this.form.therapy.cbt),
    act: this.boolToYN(this.form.therapy.act),
    dbt: this.boolToYN(this.form.therapy.dbt),
    sfbt: this.boolToYN(this.form.therapy.sfbt),
    mindfullness: this.boolToYN(this.form.therapy.mindfulness),
    trance: this.boolToYN(this.form.therapy.trance),

    // ✅ SESSION FOCUS
    thoughtPatterns: this.boolToYN(this.form.sessionFocus.thoughtPatterns),
    emotionalProcessing: this.boolToYN(this.form.sessionFocus.emotionalProcessing),
    behavioural: this.boolToYN(this.form.sessionFocus.behaviouralActivation),
    acceptance: this.boolToYN(this.form.sessionFocus.acceptance),
    grounding: this.boolToYN(this.form.sessionFocus.grounding),
    insight: this.boolToYN(this.form.sessionFocus.insightDevelopment),

    keyTechnique: this.form.therapy.technique,

    // ✅ DURING SESSION
    clientActive: this.boolToYN(this.form.duringSession.engagement.active),
    clientPassive: this.boolToYN(this.form.duringSession.engagement.passive),
    clientResistant: this.boolToYN(this.form.duringSession.engagement.resistant),
    clientReceptive: this.boolToYN(this.form.duringSession.engagement.highlyReceptive),

    incCalm: this.boolToYN(this.form.duringSession.responses.increasedCalm),
    emotRelease: this.boolToYN(this.form.duringSession.responses.emotionalRelease),
    fatigue: this.boolToYN(this.form.duringSession.responses.fatigue),
    awareness: this.boolToYN(this.form.duringSession.responses.heightenedAwareness),
    adverse: this.boolToYN(!this.form.duringSession.responses.noAdverseReaction),
    mildDiscomfort: this.boolToYN(this.form.duringSession.responses.mildDiscomfort),

    // ✅ POST SESSION
    feedbackAnxiety: this.form.postSession.anxiety,
    feedbackStress: this.form.postSession.stress,
    feedbakckComfort: this.form.postSession.bodyComfort,
    feedbakckClarity: this.form.postSession.mentalClarity,

    improvedRegulation: this.boolToYN(this.form.postSession.observedChange.improvedRegulation),
    mildImprovement: this.boolToYN(this.form.postSession.observedChange.mildImprovement),
    neutral: this.boolToYN(this.form.postSession.observedChange.neutral),
    discomfort: this.boolToYN(this.form.postSession.observedChange.temporaryDiscomfort),
    protocol: this.boolToYN(this.form.postSession.observedChange.needsAdjustment),

    // ✅ SOAP
    subjective: this.form.subjective,
    objective: this.form.objective,
    assessment: this.form.sassessment,

    continueProtocol: this.boolToYN(this.form.plan.continueProtocol),
    modifyIntensity: this.boolToYN(this.form.plan.modifyIntensity),
    psychotherapy: this.boolToYN(this.form.plan.combinePsychotherapy),
    neuroProcedure: this.boolToYN(this.form.plan.shiftProcedure),
    homePractice: this.boolToYN(this.form.plan.homePractice),

    notes: this.form.plan.notes,

    adverseEffects: this.form.safety.adverseEffects,
    document: this.form.safety.adverseNote,

    clientProcedures: this.form.safety.tolerated,
    suggestedProcedure: this.form.nextSession.procedure,
    timeGap: this.form.nextSession.timeGap,

    therapistSign: this.form.signOff.therapistSignature,
    datetime: this.form.signOff.dateTime,

    // ✅ CHILD TABLE DATA
    deviceIds: this.procedures.filter(x => x.selected).map(x => x.id),
    categoryIds: this.categories.filter(x => x.selected).map(x => x.id),
    intentIds: this.intents.filter(x => x.selected).map(x => x.id)
  };

  console.log('FINAL PAYLOAD:', payload);

  (await this.proc.saveProcedureNote(payload)).subscribe({
    next: (res: any) => {
         this.notificationService.showNotification('Patient Message submitted successfully!');
      console.log('Saved:', res);
    },
    error: (err: any) => {
      console.error(err);
    }
  });
}
boolToYN(val: boolean): string {
  return val ? 'Y' : 'N';
}

mapSessionType(type: string): string {
  switch (type) {
    case 'Initial': return 'I';
    case 'Follow-up': return 'F';
    case 'Intensive': return 'N';
    case 'Review': return 'R';
    case 'Maintenance': return 'M';
    default: return '';
  }
}

}
