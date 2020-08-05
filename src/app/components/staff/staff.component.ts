import { Component, OnInit } from '@angular/core';
import { PassengerService } from 'src/app/service/passenger.service';
import { FlightDetails } from '../../model/FlightDetails.model';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  loadedFeature: String='managePassenger';
  flight: FlightDetails;

  onNavigate(feature:String){
    this.loadedFeature=feature;
  }
  constructor(private passengerService:PassengerService) { }

  ngOnInit(): void {
    this.flight=this.passengerService.setFlightDetails();
    if(this.flight==undefined){
      location.pathname = ('flights');
    }
  }

}
