import { Injectable } from '@angular/core';
import {EmailModel} from "../../../models/emailModel";
import {FirebaseEmailHandler} from "./firebase";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, tap} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor( private fbs: AngularFirestore ) { }
  private firestoreEmailHandler = new FirebaseEmailHandler();

  async onValidEmail(value: string){
    const emaiItem = new EmailModel(value);
    return await this.firestoreEmailHandler.create(emaiItem);
  }

  getExperiments(){
    return this.fbs
      .collection("experiments")
      .snapshotChanges()
      .pipe(
        map(data => data.map(item => ({
              id: item.payload.doc.id.replace(/[^A-Za-z0-9]/g,""),
              ...item.payload.doc.data() as {}
            })
          ),
        )

      )
  }
  getExperimentById(id: string){
    return this.fbs
      .collection("experiments", ref=> ref.where('experimental_design.wandb_id', '==', id))
      .snapshotChanges()
      .pipe(
        map((data: any) => {
          return data.map((item: any) =>  ({
            id: item.payload.doc.id,
            ...item.payload?.doc.data()
          }))
        })
      )
  }
}
