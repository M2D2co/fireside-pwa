import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ChatModule } from './chat/chat.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { PwaService } from './services/pwa.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SharedModule } from './shared/shared.module';
import { USE_EMULATOR as USE_EMULATOR_AUTH } from '@angular/fire/compat/auth';
import { USE_EMULATOR as USE_EMULATOR_FIRESTORE } from '@angular/fire/compat/firestore';
import { USE_EMULATOR as USE_EMULATOR_FUNCTIONS } from '@angular/fire/compat/functions';
import { USE_EMULATOR as USE_EMULATOR_STORAGE } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import firebaseConfig from '../firebase.config.json';

const initializer = (pwaService: PwaService) => () => pwaService.initPwaPrompt()

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    // TODO: FCM - Add messaging module
    AngularFireMessagingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    ChatModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    AngularFireAuthGuard,
    //  To emulate Functions
    { provide: USE_EMULATOR_FIRESTORE, useValue: environment.useEmulator ? ['localhost', 8080] : undefined },
    { provide: USE_EMULATOR_FUNCTIONS, useValue: environment.useEmulator ? ['localhost', 5001] : undefined },
    { provide: USE_EMULATOR_STORAGE, useValue: environment.useEmulator ? ['localhost', 9199] : undefined },
    { provide: USE_EMULATOR_AUTH, useValue: environment.useEmulator ? ['http://127.0.0.1:9099'] : undefined },
    //  PWA
    { provide: APP_INITIALIZER, useFactory: initializer, deps: [ PwaService ], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
