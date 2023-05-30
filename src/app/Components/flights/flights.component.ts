
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightsService } from 'src/app/Services/flights/flights.service';
import { FlightModule } from 'src/app/models/flight/flight.module';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit{

  constructor (private flightService: FlightsService, private router: Router){}

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



    }
