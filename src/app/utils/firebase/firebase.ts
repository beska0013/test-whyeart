import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, get } from "firebase/database";
import {EmailModel} from "../../../models/emailModel";
import {environment} from "../../../environments/environment";




export class FirebaseEmailHandler {
  readonly firebaseConfig:any;
  readonly database:any;
  readonly app:any;

  constructor() {
    this.firebaseConfig = {
      apiKey: environment.NODE_ENV_FIREBASE_API_KEY,
      authDomain: environment.NODE_ENV_FIREBASE_AUTH_DOMAIN,
      databaseURL: environment.NODE_ENV_FIREBASE_DATABASEURL,
      projectId: environment.NODE_ENV_FIREBASE_PROJECT_ID,
      storageBucket: environment.NODE_ENV_FIREBASE_STORAGE_BUCKET,
      messagingSenderId:environment.NODE_ENV_FIREBASE_MESSAGING_SENDER_ID,
      appId: environment.NODE_ENV_FIREBASE_APP_ID,
      measurementId: environment.NODE_ENV_FIREBASE_MEASUREMENT_ID,
    };
    this.app = initializeApp(this.firebaseConfig);
    this.database = getDatabase(this.app);

  }



  async create(email:EmailModel){
    return push(
      ref(this.database,'Emails'),
      email
    );}







}
