import { Component, OnInit, Input } from '@angular/core';
import { FlightDetails } from 'src/app/model/FlightDetails.model';
import { SeatMap } from 'src/app/model/SeatMap.model';
import { PassengerService } from 'src/app/service/passenger.service';

@Component({
  selector: 'app-flight-seatmap',
  templateUrl: './flight-seatmap.component.html',
  styleUrls: ['./flight-seatmap.component.scss']
})
export class FlightSeatmapComponent implements OnInit {

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

}
