import { Component, OnInit, Input } from '@angular/core';
import { Passenger } from '../../../../model/Passenger.model';
import { FlightDetails } from '../../../../model/FlightDetails.model';
import { PassengerService } from 'src/app/service/passenger.service';
import { SeatMap } from 'src/app/model/SeatMap.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {

  @Input() passengerDetail: Passenger;
  @Input() flight: FlightDetails;

  seatMap : SeatMap[];
  stringRef = String;
  map=new Map();
  row=6;
  col=6;

  constructor(private passengerService: PassengerService) { }

  ngOnInit(): void {
    for(let i=1;i<=this.row;i++){
      let row_name=String.fromCharCode('@'.charCodeAt(0)+i);
      for(let j=1;j<=this.col;j++){
        this.map.set(row_name+j,null);
      }
    }
    this.passengerService.getSeatMapDetails().subscribe(response=>{
      this.seatMap=response;
      for(let a of this.seatMap){
        this.map.set(a.Seat_Number,a as SeatMap);
      } 
    });
  }

  SelectSeat(seat_no:String){
    if(this.passengerDetail.Seat_Number!=null){
      Swal.fire(
        'Oops',
        'Deselect First.This Passenger already has a seat selected.',
        'error'
      );
    }
    else{
      Swal.fire({
        title: 'Confirm ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.value) {
          this.passengerDetail.Seat_Number=seat_no;
          this.passengerDetail.Check_In=true;
          this.passengerService.updatePassenger(this.passengerDetail);
          Swal.fire(
            'Success',
            'Seat Selected Successfully',
            'success'
          );
        }
      });
    }
  }

  DeselectSeat(){
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Deselect it!'
    }).then((result) => {
      if (result.value) {
        this.passengerDetail.Seat_Number=null;
        this.passengerDetail.Check_In=false;
        this.passengerService.updatePassenger(this.passengerDetail);
        Swal.fire(
          'Success',
          'Seat deselected Successfully',
          'success'
        );
        this.ngOnInit();
      }
    });
  }

}
