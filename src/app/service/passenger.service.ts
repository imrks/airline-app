import { Injectable } from '@angular/core';
import { FlightDetails } from '../model/FlightDetails.model';
import { FlightService } from './flight.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { Passenger } from '../model/Passenger.model';
import { SeatMap } from '../model/SeatMap.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  seatMap: Observable<SeatMap[]>;
  passengers : Observable<Passenger[]>;
  passengerDetails: Passenger;

  constructor(private flightService: FlightService,private db: AngularFirestore) { }
  flight:FlightDetails;

  setFlightDetails(){
    this.flight=this.flightService.getSelectedFlightDetails();
    return this.flight;
   }

   setSelectedPassengerDetails(passengerDetails: Passenger){
     this.passengerDetails=passengerDetails;
   }

   getSelectedPassengerDetails(){
     return this.passengerDetails;
   }

   getPassengerDetails(){
    this.passengers= this.db.collection<Passenger>('Passengers',ref=> {
      return ref.where('flight_id','==',this.flight.flight_id)
    }).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Passenger;
        const passenger_id = a.payload.doc.id;
        return { passenger_id, ...data};
      });
    }))
    return this.passengers;
  }

  getSeatMapDetails(){
    this.seatMap= this.db.collection<Passenger>('Passengers',ref=> {
      return ref.where('flight_id','==',this.flight.flight_id)
      .where('Seat_Number','<', '\uf8ff')
    }).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Passenger;
        let seatMapDetail ={} as SeatMap;
        seatMapDetail.Seat_Number=data.Seat_Number;
        seatMapDetail.Meal= data.Meal.length>0?true:false;
        seatMapDetail.Infant=data.Infant;
        seatMapDetail.Wheelchair=data.WheelChair;
        return { ...seatMapDetail };
      });
    }))
    return this.seatMap;
  }

  addPassengerDetails(newPassenger:Passenger){
    let r = Math.random().toString(36).substring(7);
    this.db.collection('Passengers').doc(r).set(newPassenger);
  }

  updatePassenger(passenger: Passenger){
    this.db.doc('Passengers/'+passenger.passenger_id).update(passenger);
  }
}
