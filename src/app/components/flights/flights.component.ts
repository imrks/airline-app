import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FlightService } from 'src/app/service/flight.service';
import {FlightDetails } from '../../model/FlightDetails.model';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {

  displayedColumns: string[];
  dataSource : MatTableDataSource<FlightDetails>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private flightService: FlightService){
  }

  ngOnInit(): void {
    this.flightService.getFlightDetails().subscribe(response=>{
      let All_Flight_Details=response as FlightDetails[];
      this.displayedColumns = ['flight_id','Flight_Name', 'Source', 'Destination', 'Departure','Arrival','Actions'];
      this.dataSource = new MatTableDataSource<FlightDetails>(All_Flight_Details);
      this.dataSource.paginator = this.paginator;
    })
  }
  
  setFlightDetails(flightDetails:FlightDetails){
    this.flightService.setSelectedFlightDetails(flightDetails);
  }
}

