
import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  NgZone
} from '@angular/core';

import { Subscription } from 'rxjs';
import { VoiceToTextService } from './voice-to-text.service';
// import { VoiceToTextService } from 'src/app/shared/services/voice-to-text.service';

@Directive({
  selector: 'ion-textarea[voiceText], ion-input[voiceText]',
  standalone: true
})
export class VoiceTextareaDirective implements OnInit, OnDestroy {

  private wrapper!: HTMLElement;
  private micButton!: HTMLButtonElement;
  private subscriptions = new Subscription();
  private isListening = false;
  private originalText = '';
  private originalValue = '';
  private currentValue = '';
  private isActiveTextarea = false;
  private static activeDirective: VoiceTextareaDirective | null = null;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private voiceService: VoiceToTextService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    const textarea = this.elementRef.nativeElement as HTMLElement;

    this.wrapper = this.renderer.createElement('div');
    this.renderer.addClass(this.wrapper, 'voice-textarea-wrapper');

    this.renderer.insertBefore(
      textarea.parentNode,
      this.wrapper,
      textarea
    );

    this.renderer.appendChild(this.wrapper, textarea);

    this.micButton = this.renderer.createElement('button');

    this.renderer.setAttribute(this.micButton, 'type', 'button');
    this.renderer.setAttribute(this.micButton, 'aria-label', 'Voice input');
    this.renderer.addClass(this.micButton, 'voice-textarea-mic');
    // this.micButton.innerHTML = '🎤';
    this.micButton.innerHTML = `
  <ion-icon name="mic-outline"></ion-icon>
`;

    this.renderer.appendChild(this.wrapper, this.micButton);

    this.renderer.listen(this.micButton, 'click', () => {
      void this.toggleVoice();
    });

    this.subscriptions.add(
  this.voiceService.listening$.subscribe(listening => {

    this.zone.run(() => {

      this.isListening =
        listening &&
        VoiceTextareaDirective.activeDirective === this;

      this.updateButton();

    });

  })
);

    this.subscriptions.add(
  this.voiceService.transcript$.subscribe(text => {

    // Only update the textarea whose microphone was clicked.
    if (!this.isActiveTextarea || !text) {
      return;
    }

    const ionTextarea = this.elementRef.nativeElement;

    ionTextarea.value = text;

    ionTextarea.dispatchEvent(
      new CustomEvent('ionInput', {
        detail: { value: text },
        bubbles: true,
        composed: true
      })
    );

  })
);
  }

private async toggleVoice(): Promise<void> {

  // Stop currently active microphone.
  if (VoiceTextareaDirective.activeDirective === this) {

    this.isActiveTextarea = false;
    this.isListening = false;

    VoiceTextareaDirective.activeDirective = null;

    this.updateButton();

    await this.voiceService.stopListening();

    return;
  }

  // Stop previously active microphone.
  const previous = VoiceTextareaDirective.activeDirective;

  if (previous) {

    previous.isActiveTextarea = false;
    previous.isListening = false;

    previous.updateButton();

    VoiceTextareaDirective.activeDirective = null;

    await this.voiceService.stopListening();

  }

  // Activate selected microphone.
  VoiceTextareaDirective.activeDirective = this;

  this.isActiveTextarea = true;

  const textarea = this.elementRef.nativeElement;

  this.originalValue = textarea.value || '';
  this.originalText = this.originalValue;

  this.updateButton();

  await this.voiceService.startListening(
    'en-IN',
    this.originalText
  );

}

 private updateButton(): void {

  if (!this.micButton) return;

  const isActive =
    this.isListening && this.isActiveTextarea;

  this.micButton.innerHTML = isActive
    ? '<ion-icon name="stop-circle-outline"></ion-icon>'
    : '<ion-icon name="mic-outline"></ion-icon>';

  this.renderer.setAttribute(
    this.micButton,
    'aria-label',
    isActive ? 'Stop voice input' : 'Start voice input'
  );

  if (isActive) {
    this.renderer.addClass(this.micButton, 'recording');
  } else {
    this.renderer.removeClass(this.micButton, 'recording');
  }
}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
