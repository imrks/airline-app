import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FlightService } from 'src/app/service/flight.service';
import { PassengerService } from 'src/app/service/passenger.service';
import { FlightDetails } from 'src/app/model/FlightDetails.model';
import { Passenger } from 'src/app/model/Passenger.model';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.scss']
})
export class PassengerComponent implements OnInit {

  displayedColumnsPassenger: string[];
  dataSourcePassenger : MatTableDataSource<Passenger>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private flightService: FlightService, private passengerService:PassengerService) { }
  @Input() flight:FlightDetails;
  ngOnInit(): void {
    console.log(this.flight.flight_id);
    this.passengerService.getPassengerDetails().subscribe(response=>{
    let All_Passenger_Details=response as Passenger[];
    this.displayedColumnsPassenger = ['flight_id','Name','Seat_Number', 'Check_In', 'DOB','Actions'];
    this.dataSourcePassenger = new MatTableDataSource<Passenger>(All_Passenger_Details);
    this.dataSourcePassenger.paginator = this.paginator;
  })
  }
}
