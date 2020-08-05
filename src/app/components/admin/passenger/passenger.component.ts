import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { PassengerService } from 'src/app/service/passenger.service';
import { FlightDetails } from 'src/app/model/FlightDetails.model';
import { Passenger } from 'src/app/model/Passenger.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.scss']
})
export class PassengerComponent implements OnInit {

  displayedColumnsPassenger: string[];
  dataSourcePassenger : MatTableDataSource<Passenger>;
  editPassengerForm: FormGroup;  
  passport: boolean = false;
  passenger_id:String;
  filterPassenger: FormGroup;
  All_Passenger_Details: Passenger[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private passengerService:PassengerService) { }

  @Input() flight:FlightDetails;

  ngOnInit(): void {
    this.editPassengerForm = new FormGroup({
      user_flight_id: new FormControl(null),
      name: new FormControl(null),
      user_phone: new FormControl(null),
      user_addesss: new FormControl(null),
    user_dob : new FormControl(null),
    user_infants : new FormControl(null),
    user_passport : new FormControl(null),
    user_wheelchair : new FormControl(null)
    });

    this.filterPassenger = new FormGroup({
      passenger_passport: new FormControl(null),
      passenger_DOB: new FormControl(null),
      passenger_addrress: new FormControl(null)
    });
    
    this.passengerService.getPassengerDetails().subscribe(response=>{
    this.All_Passenger_Details=response as Passenger[];
    this.displayedColumnsPassenger = ['flight_id','Name','Seat_Number', 'Check_In', 'DOB','Actions'];
    this.dataSourcePassenger = new MatTableDataSource<Passenger>(this.All_Passenger_Details);
    this.dataSourcePassenger.paginator = this.paginator;
  })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue != null || filterValue !== undefined) {
    this.dataSourcePassenger.filter = filterValue.trim().toLowerCase();
    }
  }
  
  Fliter(filterPassenger: FormGroup){
    let filteredPassenger: Passenger[]=[];
    if(filterPassenger.value.passenger_passport){
      if(filterPassenger.value.passenger_passport==1){
        this.All_Passenger_Details.forEach(element => {
          if (element.Passport!=null) {
            filteredPassenger.push(element);
          }
        });
      }
      if(filterPassenger.value.passenger_passport==0){
        this.All_Passenger_Details.forEach(element => {
          if (element.Passport==null) {
            filteredPassenger.push(element);
          }
        });
      }
    }
    if(filterPassenger.value.passenger_DOB){
      if(filterPassenger.value.passenger_DOB==1){
        this.All_Passenger_Details.forEach(element => {
          if (element.DOB!=null) {
            filteredPassenger.push(element);
          }
        });
      }
      if(filterPassenger.value.passenger_DOB==0){
        this.All_Passenger_Details.forEach(element => {
          if (element.DOB==null) {
            filteredPassenger.push(element);
          }
        });
      }
    }
    if(filterPassenger.value.passenger_addrress){
      if(filterPassenger.value.passenger_addrress==1){
        this.All_Passenger_Details.forEach(element => {
          if (element.Address!=null) {
            filteredPassenger.push(element);
          }
        });
      }
      if(filterPassenger.value.passenger_addrress==0){
        this.All_Passenger_Details.forEach(element => {
          if (element.Address==null) {
            filteredPassenger.push(element);
          }
        });
      }
    }
    filteredPassenger = filteredPassenger.filter(
      (object, i, passengers) => passengers.findIndex(element => element.passenger_id === object.passenger_id) === i
    );
    this.dataSourcePassenger = new MatTableDataSource<Passenger>(filteredPassenger);
    filteredPassenger=[];
  }

  ClearFilter() {
    this.filterPassenger.reset();
    this.dataSourcePassenger = new MatTableDataSource<Passenger>(this.All_Passenger_Details);
  }

  onEditPassengerForm(editPassenger:Passenger,date:number){
    this.passenger_id=editPassenger.passenger_id;
    if(editPassenger.Passport!=null){
      this.passport=true;
    }
    this.editPassengerForm = new FormGroup({
      user_flight_id: new FormControl(editPassenger.flight_id),
      name: new FormControl(editPassenger.Name, Validators.required),
      user_phone: new FormControl(editPassenger.phone, Validators.required),
      user_addesss: new FormControl(editPassenger.Address, Validators.required),
    user_dob : new FormControl(formatDate(new Date(date * 1000), 'yyyy-MM-dd', 'en') , Validators.required),
    user_infants : new FormControl(editPassenger.Infant),
    user_passport : new FormControl(editPassenger.Passport),
    user_wheelchair : new FormControl(editPassenger.WheelChair),
    });
  }

  public toggle(event: MatSlideToggleChange) {
		if(event.checked){
      this.passport=true;
		}
		else{
      this.passport=false;
		}
    }
	
	EditPassenger(editPassengerForm: FormGroup){
    let editPassenger: Passenger={} as Passenger;
    editPassenger.passenger_id=this.passenger_id;
    editPassenger.flight_id=editPassengerForm.value.user_flight_id;
    editPassenger.Name=editPassengerForm.value.name;
    editPassenger.Address=editPassengerForm.value.user_addesss;
    editPassenger.Check_In=false;
    editPassenger.DOB=new Date(editPassengerForm.value.user_dob);
    editPassenger.Infant=editPassengerForm.value.user_infants;
    editPassenger.WheelChair=editPassengerForm.value.user_wheelchair;
    if(this.passport==false){
      editPassenger.Passport=null;
    }
    else{
      editPassenger.Passport=editPassengerForm.value.user_passport;
    }
    editPassenger.phone=editPassengerForm.value.user_phone;
    editPassenger.Seat_Number=null;
    editPassenger.Meal=null;
    editPassenger.Ancillary_Service=null;
    editPassenger.Shopping_Item=null;
    this.passengerService.updatePassenger(editPassenger);
    Swal.fire(
      'Success',
      'Passenger Edited',
      'success'
    ).then(function() {
      location.pathname = ('');
    });
  }

  onCloseModal(){
    this.passport=false;
  }

}
