import { Component, OnInit,Input } from '@angular/core';
import { FlightDetails } from '../../../model/FlightDetails.model';

@Component({
  selector: 'app-flight-services',
  templateUrl: './flight-services.component.html',
  styleUrls: ['./flight-services.component.scss']
})
export class FlightServicesComponent implements OnInit {

  constructor() { }

  @Input() flight: FlightDetails;
  ngOnInit(): void {
    console.log(this.flight.flight_id);
  }

}
