import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
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

  getFlightDetails(role:String,username:String){
    let flightCol : AngularFirestoreCollection=null;
    if(role=='Admin'){
      flightCol=this.db.collection<FlightDetails>('flights');
    }
    else if(role=='Staff'){
      console.log(username);
      flightCol=this.db.collection<FlightDetails>('flights',ref=> {
        return ref.where('username','==',username)
      });
    }
    this.flights= flightCol.snapshotChanges().pipe(map(actions => {
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

  updateFlightServices(flight: FlightDetails){
    this.db.doc('flights/'+flight.flight_id).update(flight);
  }
}
