import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from "@angular/common/http";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {environment} from "../environments/environment";
import {LoaderComponent} from "./components-ui/loader/loader.component";




@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        HttpClientModule,
        AppRoutingModule,
        AngularFireModule.initializeApp({
            apiKey: environment.NODE_ENV_FIREBASE_API_KEY,
            authDomain: environment.NODE_ENV_FIREBASE_AUTH_DOMAIN,
            databaseURL: environment.NODE_ENV_FIREBASE_DATABASEURL,
            projectId: environment.NODE_ENV_FIREBASE_PROJECT_ID,
            storageBucket: environment.NODE_ENV_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: environment.NODE_ENV_FIREBASE_MESSAGING_SENDER_ID,
            appId: environment.NODE_ENV_FIREBASE_APP_ID,
            measurementId: environment.NODE_ENV_FIREBASE_MEASUREMENT_ID,
        }),
        AngularFirestoreModule,
        LoaderComponent,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
