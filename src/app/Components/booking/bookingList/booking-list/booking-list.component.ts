import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingService } from 'src/app/Services/booking/booking.service';
import { FlightsService } from 'src/app/Services/flights/flights.service';
import { FlightModule } from 'src/app/models/flight/flight.module';
import { BookingModule } from 'src/app/models/flightbooking/booking/booking.module';
import { UsersService } from 'src/app/Services/Users/users.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';



@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit{




  flights: FlightModule ={
    flightId: 0,
    flightName: "",
    flightNumber: "",
    departureCity: "",
    arrivalCity: "",
    departureDateTime:new Date(),
    arrivalDateTime:new Date() ,
    departureCityCode: "",
    arrivalCityCode: "",
    basePrice: 0,
    totalSeats: 0,
    availableSeats: 0
}

// users: UserModule = {
//   userId: 0,
//   userName: "",
//   emailAddress: "",
//   password: "",
//   phoneNo: "",
//   roles: ""
// }
 users: any;


  constructor (private authService: AuthService, private bookingService: BookingService, private flightService: FlightsService, private userService: UsersService){}


  bookings: BookingModule[] = [];
  // tusers: UserModule[]=[];


  ngOnInit(): void {


    //get all bookings
    this.bookingService.getBookings()
    .subscribe({
     next: (bookings) =>{
       this.bookings = bookings;
     },
     error:(response) =>{
       console.log(response);
     }
    })


   }

   // get flight by id
   selectedFlightId = 0;
   showFlightDetails(flightId: number) {
    debugger
    this.flightService.getFlight(flightId)
          .subscribe( (res) => {
            this.selectedFlightId = flightId;
            this.flights = res;
            console.log(res);
          },
          (error) => {
            console.log(error);
          })
  }

   //get user by id
   selectedUserId = 0;
   showUserDetails(userId: number) {
    debugger
    this.userService.getUserById(userId)
          .subscribe( (res) => {
            this.selectedUserId = userId;
            this.users = res;
            console.log(res);
          },
          (error) => {
            console.log(error);
          })
  }

  convertToNumberfromstring(value: string | null): number | null
  {
    if (value === null) {
      return null;
    }

    const parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue)) {
      return null;
    }

    return parsedValue;
  }

  // delete booking
  deleteBooking(bookingId : number){

    if(bookingId !== null){
      debugger
      this.bookingService.cancelBooking(bookingId).subscribe(
        () => {
          this.bookings = this.bookings.filter(booking => booking.flightBookingId !== bookingId);
        },
        (error) => {
          console.error('Error deleting booking:', error);
        }
      );

    }else{

    }
  }

  logout(){
    this.authService.signOut();
  }



  }





