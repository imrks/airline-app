import { Component, OnInit, Input} from '@angular/core';
import { Passenger } from '../../../model/Passenger.model';
import { PassengerService } from 'src/app/service/passenger.service';
import { FlightDetails } from 'src/app/model/FlightDetails.model';

@Component({
  selector: 'app-manage-passengers',
  templateUrl: './manage-passengers.component.html',
  styleUrls: ['./manage-passengers.component.scss']
})
export class ManagePassengersComponent implements OnInit {

  passengerDetail: Passenger;
  flight: FlightDetails;

  loadedFeature: String='manageservices';

  onNavigate(feature:String){
    this.loadedFeature=feature;
  }
  constructor(private passengerService: PassengerService) { }

  ngOnInit(): void {
    this.flight=this.passengerService.setFlightDetails();
    this.passengerDetail=this.passengerService.getSelectedPassengerDetails();
    if(this.passengerDetail==undefined || this.flight==undefined){
      location.pathname = ('');
    }
  }

}
