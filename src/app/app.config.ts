import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-97018","appId":"1:664428463088:web:85fd277eda29bf4a509335","storageBucket":"ring-of-fire-97018.appspot.com","apiKey":"AIzaSyAwKDeA_9g3jlwCl83hwTvV5N4URxi0FtY","authDomain":"ring-of-fire-97018.firebaseapp.com","messagingSenderId":"664428463088"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
