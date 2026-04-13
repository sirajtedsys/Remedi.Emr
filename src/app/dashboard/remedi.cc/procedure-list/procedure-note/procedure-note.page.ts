import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton } from '@ionic/angular/standalone';
import { ProcedureNote } from 'src/app/shared/class/remedi.cc/procedure-note/procedure-note';
import { LookUp } from 'src/app/shared/interfaces/lookup/lookup';

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
  @Output() close = new EventEmitter<any>();

  
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

    nextProcedure: '',
    timeGap: ''
  };


  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
    
  }

  // ================= CHECKBOX DATA =================

  procedures = [
    { name: 'HEG Neurofeedback', selected: false },
    { name: 'Biofeedback', selected: false },
    { name: 'NeuroSync', selected: false },
    { name: 'tDCS', selected: false },
    { name: 'rTMS', selected: false },
    { name: 'Photobiomodulation', selected: false },
    { name: 'Happy Light', selected: false },
    { name: 'CES', selected: false },
    { name: 'AVE', selected: false },
    { name: 'Vibroacoustic Therapy', selected: false },
    { name: 'QEEG / Brain Mapping', selected: false },
    { name: 'MediBalance / Sensorimotor', selected: false },
    { name: 'CBT', selected: false },
    { name: 'ACT', selected: false },
    { name: 'DBT', selected: false },
    { name: 'SFBT', selected: false },
    { name: 'Mindfulness', selected: false },
    { name: 'Trance', selected: false },
    { name: 'Combined Neuropsychotherapy', selected: false }
  ];

  categories = [
    { name: 'Neurofeedback', selected: false },
    { name: 'Neuromodulation', selected: false },
    { name: 'Sensory–Somatic Regulation', selected: false },
    { name: 'Light / Sound Based', selected: false },
    { name: 'Cognitive–Behavioural', selected: false },
    { name: 'Experiential / Trance', selected: false }
  ];

  intents = [
    { name: 'Anxiety regulation', selected: false },
    { name: 'Stress reduction', selected: false },
    { name: 'Emotional dysregulation', selected: false },
    { name: 'Trauma arousal', selected: false },
    { name: 'Cognitive fatigue', selected: false },
    { name: 'Sleep dysregulation', selected: false },
    { name: 'Attention / focus', selected: false },
    { name: 'Mood stabilization', selected: false },
    { name: 'Autonomic imbalance', selected: false },
    { name: 'Neuroplasticity enhancement', selected: false }
  ];

  // ================= SAVE =================
  saveProcedureNote() {
    const payload = {
      ...this.form,
      procedures: this.procedures.filter(x => x.selected).map(x => x.name),
      categories: this.categories.filter(x => x.selected).map(x => x.name),
      intents: this.intents.filter(x => x.selected).map(x => x.name)
    };

    console.log('FINAL PAYLOAD:', payload);

    // 👉 Call your API here
    // this.api.saveProgressNote(payload).subscribe(...)
  }

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


}
