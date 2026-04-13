import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app/app.routes';
import { DatePipe } from '@angular/common'; 
import { AppComponent } from './app/app.component';
import { defineCustomElements } from '@ionic/core/loader';
import { IonicStorageModule } from '@ionic/storage-angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// import { Injectable } from '@angular/core';
// import { ModalController } from '@ionic/angular';


  // register all Ionic Web Components (ion-icon, etc.)
  defineCustomElements(window);


  bootstrapApplication(AppComponent, {
    // providers: [
    //   { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    //   provideIonicAngular(),
    //   DatePipe,
    //   provideRouter(routes, withPreloading(PreloadAllModules)),
    //     provideHttpClient(),
    //        importProvidersFrom(
    //     IonicStorageModule.forRoot(),
    //       FormsModule,
    //     ReactiveFormsModule
    //   ),
    //      DatePipe, 
    // ],

    providers: [
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      provideIonicAngular(),
      DatePipe,
      provideHttpClient(),
      provideRouter(routes, withPreloading(PreloadAllModules)),
      importProvidersFrom(
        IonicModule.forRoot({}),
        IonicStorageModule.forRoot(),// ✅ Add this line
        FormsModule,
        ReactiveFormsModule
      )
    ],
  });

