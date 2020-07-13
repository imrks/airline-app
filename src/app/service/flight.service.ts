import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FlightDetails } from '../model/FlightDetails.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  flights : Observable<FlightDetails[]>;
  flightDetails: FlightDetails;

  constructor(private db: AngularFirestore){ 
  }

  getFlightDetails(){
    this.flights= this.db.collection<FlightDetails>('flights').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as FlightDetails;
        const flight_id = a.payload.doc.id;
        return { flight_id, ...data};
      });
    }))
    return this.flights;
  }

  setSelectedFlightDetails(flightDetails:FlightDetails){
    this.flightDetails=flightDetails;
  }

  getSelectedFlightDetails(){
    return this.flightDetails;
  }
}
