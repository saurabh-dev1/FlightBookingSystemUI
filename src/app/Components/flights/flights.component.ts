import { Component, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/Services/flights/flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit{

  constructor (private flightService: FlightsService){}

  ngOnInit(): void {
      //fetch flights
      this.flightService.getFlights()
      .subscribe({
        next: (flight) => {
          console.log(flight);
        },
        error:(response) =>{
          console.log(response);
        }
      })

  }
    }
