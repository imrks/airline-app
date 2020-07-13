export interface Passenger{
    flight_id:String;
    passenger_id:String;
    Name: String;
    Address:String;
    Check_In:boolean;
    Ancillary_Service:{

    };
    DOB: Date;
    Infant:boolean;
    Meal:{
    };
    Passport:{
        Passport_Number:String
    };
    Seat_Number:String;
    Shopping_Item:{

    };
    WheelChair:boolean;
}