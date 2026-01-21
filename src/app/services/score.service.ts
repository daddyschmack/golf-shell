import { Injectable, inject } from '@angular/core';
import { GolfRound } from "shared-data";
import { 
  Firestore, 
  collection, 
  collectionData, 
  doc, 
  addDoc, 
  updateDoc 
} from "@angular/fire/firestore";
import { Subject, from, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private firestore = inject(Firestore);
  private dbPath = '/Scores';
  
  public scoresSubject: Subject<Partial<GolfRound>> = new Subject<Partial<GolfRound>>();
  public score: Subject<Partial<GolfRound>> = new Subject<Partial<GolfRound>>();

  updateScore(id: string, roundInfo: Partial<GolfRound>){
    const docRef = doc(this.firestore, this.dbPath, id);
    return from(updateDoc(docRef, roundInfo));
  }

  addScore(round: Partial<GolfRound>){
      const colRef = collection(this.firestore, this.dbPath);
      return from(addDoc(colRef, round));
  }

  getScores(): Observable<GolfRound[]>{
    const colRef = collection(this.firestore, this.dbPath);
    return collectionData(colRef, { idField: 'id' }) as Observable<GolfRound[]>;
  }
}
