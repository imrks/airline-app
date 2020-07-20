import { ShoppingItem } from '../model/ShoppingItem.model';
import { Meal } from '../model/Meal.model';
import { Ancillary } from '../model/Ancillary.model';

export interface FlightDetails {
    flight_id?: string;
    Arrival: String;
    Departure: String;
    Destination: string;
    Source: string,
    Flight_Name: String,
    Ancillary?:Ancillary[],
    Meals?:Meal[],
    Shopping_Item?:ShoppingItem[]
  }
  