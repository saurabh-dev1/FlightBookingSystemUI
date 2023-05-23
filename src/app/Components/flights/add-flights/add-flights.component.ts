import { Component, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/Services/flights/flights.service';
import { FlightModule } from 'src/app/models/flight/flight.module';

@Component({
  selector: 'app-add-flights',
  templateUrl: './add-flights.component.html',
  styleUrls: ['./add-flights.component.css']
})
export class AddFlightsComponent implements OnInit {

    addFlightRequest : FlightModule ={
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

    };

    constructor(private flightService: FlightsService){}

  ngOnInit(): void {

  }

  addFlight(){
    this.flightService.addFlight(this.addFlightRequest)
    .subscribe({
      next: (employee) => {
        console.log(employee);
      }
    })
  }

}
