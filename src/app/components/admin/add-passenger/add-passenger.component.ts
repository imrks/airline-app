import { Component, OnInit, Input } from '@angular/core';
import { FlightDetails } from 'src/app/model/FlightDetails.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material';
import { Passenger } from '../../../model/Passenger.model'; 
import { PassengerService } from '../../../service/passenger.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrls: ['./add-passenger.component.scss']
})
export class AddPassengerComponent implements OnInit {

  constructor(private passengerService: PassengerService) { }

  @Input() flight:FlightDetails;

  addPassengerForm: FormGroup;  
  passport: boolean = false;
	
ngOnInit() {
  this.addPassengerForm = new FormGroup({
    user_flight_id: new FormControl(this.flight.flight_id),
    name: new FormControl(null, Validators.required),
    user_phone: new FormControl(null, Validators.required),
    user_addesss: new FormControl(null, Validators.required),
	user_dob : new FormControl(null, Validators.required),
	user_infants : new FormControl(false),
	user_passport : new FormControl(null),
	user_wheelchair : new FormControl(false),
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
	
	AddPassenger(addPassengerForm: FormGroup){
    let newPassenger: Passenger={} as Passenger;
    newPassenger.flight_id=addPassengerForm.value.user_flight_id;
    newPassenger.Name=addPassengerForm.value.name;
    newPassenger.Address=addPassengerForm.value.user_addesss;
    newPassenger.Check_In=false;
    newPassenger.DOB=new Date(addPassengerForm.value.user_dob);
    newPassenger.Infant=addPassengerForm.value.user_infants;
    newPassenger.WheelChair=addPassengerForm.value.user_wheelchair;
    newPassenger.Passport=addPassengerForm.value.user_passport;
    newPassenger.phone=addPassengerForm.value.user_phone;
    newPassenger.Seat_Number=null;
    newPassenger.Meal=null;
    newPassenger.Ancillary_Service=null;
    newPassenger.Shopping_Item=null;
    this.passengerService.addPassengerDetails(newPassenger);
    Swal.fire(
      'Success',
      'Passenger Added',
      'success'
    ).then(function() {
      location.pathname = ('');
    });
    
	}
		
}