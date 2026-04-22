import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, addOutline, calendarClearOutline, chevronDownOutline, closeCircleOutline, createOutline, documentOutline, documentTextOutline, eyeOutline, listOutline, saveOutline, searchOutline } from 'ionicons/icons';

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
      add,
      addOutline,chevronDownOutline,
      eyeOutline
      
    });
  }
}
