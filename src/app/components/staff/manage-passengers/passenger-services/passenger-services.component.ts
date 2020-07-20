import { Component, OnInit, Input } from '@angular/core';
import { Passenger } from '../../../../model/Passenger.model';
import { FlightDetails } from '../../../../model/FlightDetails.model';
import { Meal } from 'src/app/model/Meal.model';
import Swal from 'sweetalert2';
import { PassengerService } from 'src/app/service/passenger.service';
import { Ancillary } from 'src/app/model/Ancillary.model';
import { ShoppingItem } from 'src/app/model/ShoppingItem.model';

@Component({
  selector: 'app-passenger-services',
  templateUrl: './passenger-services.component.html',
  styleUrls: ['./passenger-services.component.scss']
})
export class PassengerServicesComponent implements OnInit {

  link:String;
  id:number;

  @Input() passengerDetail: Passenger;
  @Input() flight: FlightDetails;

  constructor(private passengerService: PassengerService) { }

  ngOnInit(): void {
    this.id=1;
    this.link='ancillary';
  }

  passengerServiceTab(link:String){
    this.link=link;
    this.passengerDetail.Meal
  }

  addClass(id: any) {
    this.id = id;
  }

  AddMealService(meal: Meal){
    if(this.passengerDetail.Meal.some(obj => obj.meal_name === meal.meal_name)){
      Swal.fire('This Meal is Already Added');
    }
    else{
      this.passengerDetail.Meal.push(meal);
      this.passengerService.updatePassenger(this.passengerDetail);
      Swal.fire(
        'Success',
        'Meal Added',
        'success'
      );
    }
  }

  AddAncillaryService(ancillary: Ancillary){ 
    if(this.passengerDetail.Ancillary_Service.some(obj => obj.ancillary_name === ancillary.ancillary_name)){
      Swal.fire('This Ancillary Service is Already Added');
    }
    else{
       this.passengerDetail.Ancillary_Service.push(ancillary);
       this.passengerService.updatePassenger(this.passengerDetail);
       Swal.fire(
         'Success',
         'Ancillary Service Added',
         'success'
       );
    }
  }

  AddShoppingService(shoppingItem: ShoppingItem){
    if(this.passengerDetail.Shopping_Item.some(obj => obj.item_name === shoppingItem.item_name)){
      Swal.fire('This Shopping Item is Already Added');
    }
    else{
      this.passengerDetail.Shopping_Item.push(shoppingItem);
      this.passengerService.updatePassenger(this.passengerDetail);
      Swal.fire(
        'Success',
        'Shopping Item Added',
        'success'
      );
    }
  }

  DeleteMealService(meal:Meal){
    this.passengerDetail.Meal = this.passengerDetail.Meal.filter(meals => meals!= meal);
    this.passengerService.updatePassenger(this.passengerDetail);
    Swal.fire(
      'Success',
      'Meal Item Removed',
      'success'
    );
  }

  DeleteShoppingService(shoppingItem:ShoppingItem){
    this.passengerDetail.Shopping_Item = this.passengerDetail.Shopping_Item.filter(element => element!= shoppingItem);
    this.passengerService.updatePassenger(this.passengerDetail);
    Swal.fire(
      'Success',
      'Shopping Item Removed',
      'success'
    );
  }

  DeleteAncillaryService(ancillary:Ancillary){
    this.passengerDetail.Ancillary_Service = this.passengerDetail.Ancillary_Service.filter(element => element!= ancillary);
    this.passengerService.updatePassenger(this.passengerDetail);
    Swal.fire(
      'Success',
      'Ancillary Item Removed',
      'success'
    );
  }

}
