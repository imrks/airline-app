import { ShoppingItem } from '../model/ShoppingItem.model';
import { Meal } from '../model/Meal.model';
import { Ancillary } from '../model/Ancillary.model';
export interface Passenger{
    flight_id:String;
    phone:number;
    passenger_id?:String;
    Name: String;
    Address:String;
    Check_In:boolean;
    Ancillary_Service:Ancillary[];
    DOB: Date;
    Infant:boolean;
    Meal:Meal[];
    Passport:String;
    Seat_Number:String;
    Shopping_Item:ShoppingItem[];
    WheelChair:boolean;
}