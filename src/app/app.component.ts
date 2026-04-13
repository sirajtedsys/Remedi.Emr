import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarClearOutline, closeCircleOutline, createOutline, documentOutline, documentTextOutline, listOutline, saveOutline, searchOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({ 
      listOutline,
      searchOutline,
      documentOutline,
      documentTextOutline,
      closeCircleOutline,
      createOutline,
      saveOutline,
      calendarClearOutline,
      
    });
  }
}
