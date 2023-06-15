import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/Services/booking/booking.service';
import { BookingModule } from 'src/app/models/flightbooking/booking/booking.module';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit{

  constructor (private builder: FormBuilder, private router: Router, private bookingService: BookingService){}

  bookings: BookingModule[] = [];
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
   }

    }




