import { Component, OnInit, Input } from '@angular/core';
import { FlightDetails } from 'src/app/model/FlightDetails.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrls: ['./add-passenger.component.scss']
})
export class AddPassengerComponent implements OnInit {

  constructor() { }

  @Input() flight:FlightDetails;

  signupForm: FormGroup;  //declaring our form variable

ngOnInit() {
  console.log(this.flight.flight_id);
  this.signupForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    user_phone: new FormControl(null, Validators.required),
    user_addesss: new FormControl(null, Validators.required),

  });
  }

  onSubmit() {
    console.log(this.signupForm);
    console.log(this.signupForm.get('user_name').value);
    }

}
