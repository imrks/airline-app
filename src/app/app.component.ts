import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

export interface flightdetails{
  id?: string;
  name?: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  flightscollection : AngularFirestoreCollection<any>;
  flights : Observable<any[]>;

  constructor(private db: AngularFirestore){
    this.flights= this.db.collection('flights').valueChanges();
    console.log(this.flights);
  }

}
