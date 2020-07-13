import { Component, OnInit } from '@angular/core';
import { PassengerService } from 'src/app/service/passenger.service';
import { FlightDetails } from '../../model/FlightDetails.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  loadedFeature: String='managePassenger';
  flight: FlightDetails;

  onNavigate(feature:String){
    this.loadedFeature=feature;
    console.log(this.loadedFeature);
  }
  constructor(private passengerService:PassengerService) { }

  ngOnInit(): void {
    this.flight=this.passengerService.setFlightDetails();
  }

}
