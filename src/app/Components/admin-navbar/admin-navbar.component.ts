import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/Users/users.service';
import { BookingService } from 'src/app/Services/booking/booking.service';
import { BookingModule } from 'src/app/models/flightbooking/booking/booking.module';
import { UserModule } from 'src/app/models/user/user/user.module';
import { FlightModule } from 'src/app/models/flight/flight.module';
import { FlightsService } from 'src/app/Services/flights/flights.service';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit{

  constructor (private authService: AuthService,private userService: UsersService, private flightService: FlightsService, private bookingService: BookingService){}

  users: UserModule[]= [];
  bookings: BookingModule[] = [];
  flights: FlightModule[] = [];
  ngOnInit(): void {



    this.bookingService.getBookings()
    .subscribe({
     next: (bookings) =>{
       this.bookings = bookings;
     },
     error:(response) =>{
       console.log(response);
     }
    })


    this.userService.getUser()
    .subscribe({
      next: (users) =>{
        this.users = users;
      },
      error:(res) =>{
        console.log(res);
      }
    })


    this.flightService.getFlights()
    .subscribe({
     next: (flights) =>{
       this.flights = flights;
     },
     error:(response) =>{
       console.log(response);
     }
    })
   }

   logout(){
    this.authService.signOut();
  }

    }




