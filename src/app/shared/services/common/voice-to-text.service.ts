import { Injectable, NgZone } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

interface BrowserSpeechResult {
  readonly isFinal: boolean;
  readonly length: number;
  [index: number]: {
    transcript: string;
    confidence: number;
  };
}

interface BrowserSpeechEvent {
  readonly resultIndex: number;
  readonly results: ArrayLike<BrowserSpeechResult>;
}

interface BrowserSpeechError {
  readonly error: string;
}

interface BrowserSpeechRecognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;

  onstart: (() => void) | null;
  onend: (() => void) | null;
  onresult: ((event: BrowserSpeechEvent) => void) | null;
  onerror: ((event: BrowserSpeechError) => void) | null;

  start(): void;
  stop(): void;
  abort(): void;
}

interface BrowserSpeechWindow extends Window {
  SpeechRecognition?: new () => BrowserSpeechRecognition;
  webkitSpeechRecognition?: new () => BrowserSpeechRecognition;
}

@Injectable({
  providedIn: 'root',
})
export class VoiceToTextService {
  private listeningSubject = new BehaviorSubject<boolean>(false);
  listening$ = this.listeningSubject.asObservable();

  private transcriptSubject = new BehaviorSubject<string>('');
  transcript$ = this.transcriptSubject.asObservable();

  private errorSubject = new BehaviorSubject<string>('');
  error$ = this.errorSubject.asObservable();

  private browserRecognition: BrowserSpeechRecognition | null = null;

  private finalTranscript = '';
  private nativeListening = false;
private nativePartialListener: any = null;
private nativeStateListener: any = null;

private nativeBaseText = '';
private nativePartialText = '';
  constructor(private zone: NgZone) { }

  async startListening(language = 'en-IN', existingText = ''): Promise<void> {
    if (this.listeningSubject.value) {
      return;
    }

    this.errorSubject.next('');
    this.finalTranscript = existingText.trim();
    this.transcriptSubject.next(this.finalTranscript);

    try {
      if (Capacitor.isNativePlatform()) {
        await this.startNativeRecognition(language);
      } else {
        this.startBrowserRecognition(language);
      }
    } catch (error: any) {
      this.errorSubject.next(
        error?.message || 'Unable to start speech recognition.',
      );

      this.listeningSubject.next(false);
    }
  }

 private async startNativeRecognition(language: string): Promise<void> {

  const permission = await SpeechRecognition.checkPermissions();

  if (permission.speechRecognition !== 'granted') {

    const requested = await SpeechRecognition.requestPermissions();

    if (requested.speechRecognition !== 'granted') {
      throw new Error('Microphone permission not granted.');
    }
  }

  const available = await SpeechRecognition.available();

  if (!available.available) {
    throw new Error('Speech recognition unavailable.');
  }

  // Clean up previous session listeners.
  await this.removeNativeListeners();

  this.nativeBaseText = this.finalTranscript;
  this.nativePartialText = '';

  // Listen to Android recording state.
  this.nativeStateListener =
    await SpeechRecognition.addListener(
      'listeningState',
      (data: { status: 'started' | 'stopped' }) => {

        this.zone.run(() => {

          console.log('Native state:', data.status);

          if (data.status === 'started') {

            this.nativeListening = true;
            this.listeningSubject.next(true);

          } else {

            // Commit the last recognized text.
            this.finalTranscript = [
              this.nativeBaseText,
              this.nativePartialText
            ].filter(Boolean).join(' ');

            this.transcriptSubject.next(this.finalTranscript);

            this.nativeListening = false;
            this.listeningSubject.next(false);

          }

        });

      }
    );

  // Listen to speech results.
  this.nativePartialListener =
    await SpeechRecognition.addListener(
      'partialResults',
      (data: { matches: string[] }) => {

        this.zone.run(() => {

          const recognizedText = data.matches?.[0] || '';

          if (!recognizedText) return;

          // Replace interim result instead of appending repeatedly.
          this.nativePartialText = recognizedText;

          const completeText = [
            this.nativeBaseText,
            this.nativePartialText
          ].filter(Boolean).join(' ');

          console.log('Native transcript:', completeText);

          this.transcriptSubject.next(completeText);

        });

      }
    );

  try {

    this.nativeListening = true;
    this.listeningSubject.next(true);

    await SpeechRecognition.start({
      language,
      maxResults: 5,
      partialResults: true,
      popup: false
    });

  } catch (error) {

    this.nativeListening = false;
    this.listeningSubject.next(false);

    await this.removeNativeListeners();

    throw error;
  }
}

private async removeNativeListeners(): Promise<void> {

  if (this.nativePartialListener) {
    await this.nativePartialListener.remove();
    this.nativePartialListener = null;
  }

  if (this.nativeStateListener) {
    await this.nativeStateListener.remove();
    this.nativeStateListener = null;
  }

}

 private startBrowserRecognition(language: string): void {

  const speechWindow = window as BrowserSpeechWindow;

  const Recognition =
    speechWindow.SpeechRecognition ||
    speechWindow.webkitSpeechRecognition;

  if (!Recognition) {
    throw new Error(
      'Speech recognition is not supported. Use Google Chrome.'
    );
  }

  const recognition = new Recognition();

  this.browserRecognition = recognition;

  recognition.lang = language;
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    this.zone.run(() => {
      console.log('Voice recognition started');

      this.listeningSubject.next(true);
    });
  };

  recognition.onresult = (event: BrowserSpeechEvent) => {

    this.zone.run(() => {

      let finalText = this.finalTranscript;
      let interimText = '';

      for (let i = event.resultIndex;
           i < event.results.length;
           i++) {

        const result = event.results[i];

        const text = result[0].transcript.trim();

        if (result.isFinal) {
          finalText = [finalText, text]
            .filter(Boolean)
            .join(' ');
        } else {
          interimText += text + ' ';
        }
      }

      this.finalTranscript = finalText;

      const completeText = [
        finalText,
        interimText.trim()
      ].filter(Boolean).join(' ');

      console.log('Recognized:', completeText);

      this.transcriptSubject.next(completeText);

    });

  };

  recognition.onerror = (event: BrowserSpeechError) => {

    this.zone.run(() => {

      console.error('Speech recognition error:', event.error);

      this.errorSubject.next(
        `Speech recognition error: ${event.error}`
      );

    });

  };

  recognition.onend = () => {

    this.zone.run(() => {

      console.log('Voice recognition ended');

      this.browserRecognition = null;

      this.listeningSubject.next(false);

    });

  };

  recognition.start();
}

  async stopListening(): Promise<void> {

  if (Capacitor.isNativePlatform()) {

    if (!this.nativeListening) return;

    // Immediately update Angular UI.
    this.nativeListening = false;
    this.listeningSubject.next(false);

    try {

      // Avoid waiting indefinitely on Android.
      await Promise.race([
        SpeechRecognition.stop(),
        new Promise<void>(resolve =>
          setTimeout(resolve, 1500)
        )
      ]);

    } catch (error) {

      console.error('Native stop error:', error);

    }

    // Commit the last recognized text.
    this.finalTranscript = [
      this.nativeBaseText,
      this.nativePartialText
    ].filter(Boolean).join(' ');

    this.transcriptSubject.next(this.finalTranscript);

    await this.removeNativeListeners();

    return;
  }

  if (this.browserRecognition) {  
    this.browserRecognition.stop();
  }
}

  async cancelListening(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      if (this.nativeListening) {
        try {
          await SpeechRecognition.stop();
        } catch {
          // Recognition may already have stopped.
        }
      }

      this.nativeListening = false;
      this.listeningSubject.next(false);

      return;
    }

    if (this.browserRecognition) {
      this.browserRecognition.abort();
      this.browserRecognition = null;
    }

    this.listeningSubject.next(false);
  }

  clearTranscript(): void {
    this.finalTranscript = '';
    this.transcriptSubject.next('');
  }
}
