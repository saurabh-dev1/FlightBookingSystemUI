import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightsService } from 'src/app/Services/flights/flights.service';
import { FlightModule } from 'src/app/models/flight/flight.module';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {


  constructor(private route : ActivatedRoute, private flightService: FlightsService, private router: Router,private builder:FormBuilder) {}

  flightDetail: FlightModule ={
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



  ngOnInit(): void {


  }
  searchflightsform = this.builder.group({
    departureCity: this.builder.control(''),
    arrivalCity: this.builder.control(''),
    departureDateTime: this.builder.control('')
  });

  searchFlights(){
    // debugger
    // this.flightService.searchFlight(this.flightDetail.departureCity, this.flightDetail.arrivalCity, this.flightDetail.departureDateTime)
    // .subscribe({
    //   next: (response) =>{
    //     this.router.navigate(['flightSearched']);
    //   }
    // });

        if(this.searchflightsform.valid){
          //call Api
          this.flightService.searchFlight(this.searchflightsform.value.departureCity, this.searchflightsform.value.arrivalCity, this.searchflightsform.value.departureDateTime)
          .subscribe({
            next:(res) => {
              console.log(res);
              this.flightDetail = res;
              this.router.navigate(['flightSearched']);
            },
            error:(err) => {
              console.log(err);
            }
            })

        }
      }
    }
