export interface FlightDetails {
    flight_id?: string;
    Arrival: String;
    Departure: String;
    Destination: string;
    Source: string,
    Flight_Name: String,
    Ancillary?:{
      Ancillary_id:{
      Ancillary_Name:string,
      Ancillary_Price:number
    }},
    Meals?:{
      Meal_Id:{
        Meal_Name:string,
        Meal_Price:number
      }
    },
    Shopping_Item?:{
      Shopping_Id:{
        Item_Type:string,
        Item_Name:string,
        Item_Price:number
      }
    }
  }
  