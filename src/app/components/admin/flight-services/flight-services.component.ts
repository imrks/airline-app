import { Component, OnInit,Input } from '@angular/core';
import { FlightDetails } from '../../../model/FlightDetails.model';
import { Meal } from '../../../model/Meal.model';
import { FlightService } from 'src/app/service/flight.service';
import { Ancillary } from 'src/app/model/Ancillary.model';
import { ShoppingItem } from 'src/app/model/ShoppingItem.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flight-services',
  templateUrl: './flight-services.component.html',
  styleUrls: ['./flight-services.component.scss']
})
export class FlightServicesComponent implements OnInit {

  link:String;
  id:number;
  editFormTitle:String;
  add_item_name:String;
  add_item_type:String;
  add_item_price:number;
  add_ancillary_name:String;
  add_ancillary_price:number;
  add_meal_name:String;
  add_meal_price:number;
  mealIndex:number;
  shoppingItemIndex:number;
  ancillaryIndex:number;

  constructor(private flightService: FlightService) { }

  @Input() flight: FlightDetails;
  ngOnInit(): void {
    this.id=1;
    this.link='ancillary';
  }

  flightServiceTab(link:String){
    this.link=link;
  }

  addClass(id: any) {
    this.id = id;
}

  AddEditForm(title:String){
    this.editFormTitle=title;
  }
  destroySetValues(){
    this.add_item_price=null;
    this.add_item_name=null;
    this.add_item_type=null;
    this.add_meal_name=null;
    this.add_item_price=null;
    this.add_ancillary_name=null;
    this.add_ancillary_price=null;
  }

  AddMeals(meal_name:String, meal_price:number){
    let meal: Meal={} as Meal;
    meal.meal_name=meal_name;
    meal.meal_price=meal_price;
    this.flight.Meals.push(meal);
    this.flightService.updateFlightServices(this.flight);
    this.editFormTitle='';
    Swal.fire(
      'Success',
      'Meal Added',
      'success'
    );
  }

  AddAncillary(ancillary_name:String, ancillary_price:number){
    let ancillary: Ancillary={} as Ancillary;
    ancillary.ancillary_name=ancillary_name;
    ancillary.ancillary_price=ancillary_price;
    this.flight.Ancillary.push(ancillary);
    this.flightService.updateFlightServices(this.flight);
    this.editFormTitle='';
    Swal.fire(
      'Success',
      'Ancillary Added',
      'success'
    );
  }

  AddShoppingItem(item_type:String,item_name:String, item_price:number){
    let shoppingItem:ShoppingItem={} as ShoppingItem;
    shoppingItem.item_type=item_type;
    shoppingItem.item_name=item_name;
    shoppingItem.item_price=item_price;
    this.flight.Shopping_Item.push(shoppingItem);
    this.flightService.updateFlightServices(this.flight);
    this.editFormTitle='';
    Swal.fire(
      'Success',
      'Shopping Item Added',
      'success'
    );
  }

  SetShoppingValues(shoppingItem:ShoppingItem){
    this.shoppingItemIndex=this.flight.Shopping_Item.indexOf(shoppingItem);
    this.add_item_type=shoppingItem.item_type;
    this.add_item_name=shoppingItem.item_name;
    this.add_item_price=shoppingItem.item_price;
  }

  SetAncillaryValues(ancillary:Ancillary){
    this.ancillaryIndex=this.flight.Ancillary.indexOf(ancillary);
    this.add_ancillary_name=ancillary.ancillary_name;
    this.add_ancillary_price=ancillary.ancillary_price;
  }
  SetMealValues(meal:Meal){
    this.mealIndex=this.flight.Meals.indexOf(meal);
    this.add_meal_name=meal.meal_name;
    this.add_meal_price=meal.meal_price
  }

  removeMeal(meal:Meal){
    this.flight.Meals = this.flight.Meals.filter(meals => meals!= meal);
    this.flightService.updateFlightServices(this.flight);
    Swal.fire(
      'Success',
      'Meal Item Deleted',
      'success'
    );
  }

  removeAncillary(ancillary:Ancillary){
    this.flight.Ancillary = this.flight.Ancillary.filter(ancillaries => ancillaries!= ancillary);
    this.flightService.updateFlightServices(this.flight);
    Swal.fire(
      'Success',
      'Ancillary Item Deleted',
      'success'
    );
  }

  removeShoppingItem(shoppingItem:ShoppingItem){
    this.flight.Shopping_Item= this.flight.Shopping_Item.filter(shoppingItems => shoppingItems!= shoppingItem);
    this.flightService.updateFlightServices(this.flight);
    Swal.fire(
      'Success',
      'Shopping Item Deleted',
      'success'
    );
  }

  EditMeals(meal_name:String, meal_price:number){
    let editedMeal: Meal={} as Meal;
    editedMeal.meal_name=meal_name;
    editedMeal.meal_price=meal_price;
    this.flight.Meals[this.mealIndex]=editedMeal;
    this.flightService.updateFlightServices(this.flight);
    this.editFormTitle='';
    this.mealIndex=null;
    Swal.fire(
      'Success',
      'Meal Edited',
      'success'
    );
  }

  EditAncillary(ancillary_name:String, ancillary_price:number){
    let editedAncillary: Ancillary={} as Ancillary;
    editedAncillary.ancillary_name=ancillary_name;
    editedAncillary.ancillary_price=ancillary_price;
    this.flight.Ancillary[this.ancillaryIndex]=editedAncillary;
    this.flightService.updateFlightServices(this.flight);
    this.editFormTitle='';
    this.ancillaryIndex=null;
    Swal.fire(
      'Success',
      'Ancillary Edited',
      'success'
    );
  }
  
  EditShoppingItem(item_type:String,item_name:String, item_price:number){
    let editedShoppingItem:ShoppingItem={} as ShoppingItem;
    editedShoppingItem.item_type=item_type;
    editedShoppingItem.item_name=item_name;
    editedShoppingItem.item_price=item_price;
    this.flight.Shopping_Item[this.shoppingItemIndex]=editedShoppingItem;
    this.flightService.updateFlightServices(this.flight);
    this.editFormTitle='';
    this.shoppingItemIndex=null;
    Swal.fire(
      'Success',
      'Shopping Item Edited',
      'success'
    );
  }

}
