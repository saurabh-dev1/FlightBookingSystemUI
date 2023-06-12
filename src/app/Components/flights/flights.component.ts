
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/Services/booking/booking.service';
import { FlightsService } from 'src/app/Services/flights/flights.service';
import { FlightModule } from 'src/app/models/flight/flight.module';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit{

  constructor (private flightService: FlightsService,private builder: FormBuilder, private router: Router, private bookingService: BookingService){}

  flights: FlightModule[] = [];
  ngOnInit(): void {

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







  AddFlight() {
    this.router.navigateByUrl('addFlight');
  }
  editFlight(FlightId: number) {
    this.router.navigateByUrl('Edit/'+ FlightId);
  }
  getUser(){
    this.router.navigateByUrl('users')
  }


    }
