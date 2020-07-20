import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { PassengerService } from 'src/app/service/passenger.service';
import { FlightDetails } from 'src/app/model/FlightDetails.model';
import { Passenger } from 'src/app/model/Passenger.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit {

  displayedColumnsPassenger: string[];
  dataSourcePassenger : MatTableDataSource<Passenger>;
  filterPassengerStaff: FormGroup;  
  All_Passenger_Details: Passenger[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private passengerService:PassengerService) { }

  @Input() flight:FlightDetails;

  ngOnInit(): void {
    this.filterPassengerStaff = new FormGroup({
      passenger_checkin: new FormControl(null),
      passenger_wheelchair: new FormControl(null),
      passenger_infants: new FormControl(null)
    });
    console.log(this.flight.flight_id);
    this.passengerService.getPassengerDetails().subscribe(response=>{
    this.All_Passenger_Details=response as Passenger[];
    this.displayedColumnsPassenger = ['flight_id','Name','Seat_Number', 'Check_In', 'DOB','Actions'];
    this.dataSourcePassenger = new MatTableDataSource<Passenger>(this.All_Passenger_Details);
    this.dataSourcePassenger.paginator = this.paginator;
  })
  }

  setSelectedPassenger(selectedPassenger: Passenger){
    this.passengerService.setSelectedPassengerDetails(selectedPassenger);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue != null || filterValue !== undefined) {
    this.dataSourcePassenger.filter = filterValue.trim().toLowerCase();
    }
  }
  
  Fliter(filterPassenger: FormGroup){
    let filteredPassengerStaff: Passenger[]=[];
    if(filterPassenger.value.passenger_checkin){
      if(filterPassenger.value.passenger_checkin==1){
        this.All_Passenger_Details.forEach(element => {
          if (element.Check_In==true) {
            filteredPassengerStaff.push(element);
          }
        });
      }
      if(filterPassenger.value.passenger_checkin==0){
        this.All_Passenger_Details.forEach(element => {
          if (element.Check_In==false) {
            filteredPassengerStaff.push(element);
          }
        });
      }
    }
    if(filterPassenger.value.passenger_wheelchair){
      if(filterPassenger.value.passenger_wheelchair==1){
        this.All_Passenger_Details.forEach(element => {
          if (element.WheelChair==true) {
            filteredPassengerStaff.push(element);
          }
        });
      }
      if(filterPassenger.value.passenger_wheelchair==0){
        this.All_Passenger_Details.forEach(element => {
          if (element.WheelChair==false) {
            filteredPassengerStaff.push(element);
          }
        });
      }
    }
    if(filterPassenger.value.passenger_infants){
      if(filterPassenger.value.passenger_infants==1){
        this.All_Passenger_Details.forEach(element => {
          if (element.Infant==true) {
            filteredPassengerStaff.push(element);
          }
        });
      }
      if(filterPassenger.value.passenger_infants==0){
        this.All_Passenger_Details.forEach(element => {
          if (element.Infant==false) {
            filteredPassengerStaff.push(element);
          }
        });
      }
    }
    filteredPassengerStaff = filteredPassengerStaff.filter(
      (object, i, passengers) => passengers.findIndex(element => element.passenger_id === object.passenger_id) === i
    );
    this.dataSourcePassenger = new MatTableDataSource<Passenger>(filteredPassengerStaff);
    filteredPassengerStaff=[];
  }

  ClearFilter() {
    this.filterPassengerStaff.reset();
    this.dataSourcePassenger = new MatTableDataSource<Passenger>(this.All_Passenger_Details);
  }


}
