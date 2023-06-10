import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import DataService from 'src/app/Services/Data/data.service';
import { FlightsService } from 'src/app/Services/flights/flights.service';
import { FlightModule } from 'src/app/models/flight/flight.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor( private flightService: FlightsService, private router: Router,private builder:FormBuilder, private DataService: DataService) {}

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

        if(this.searchflightsform.valid){
          //call Api
          this.flightService.searchFlight(this.searchflightsform.value.departureCity, this.searchflightsform.value.arrivalCity, this.searchflightsform.value.departureDateTime)
          .subscribe(

            (res) => {

              //console.log(res);
              this.flightDetail = res;

              this.DataService.setData(res);
              this.router.navigate(['flightSearched']);
            },
            (err) => {
              console.log(err);
            }
            )

        }
      }
    }

