import { Component } from '@angular/core';
import { FlightsService } from 'src/app/Services/flights/flights.service';
import { FlightModule } from 'src/app/models/flight/flight.module';
import { HomePageComponent } from '../home-page/home-page.component';
import { FormBuilder } from '@angular/forms';
import DataService from 'src/app/Services/Data/data.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-flight-searched',
  templateUrl: './flight-searched.component.html',
  styleUrls: ['./flight-searched.component.css']
})
export class FlightSearchedComponent {

  flights: FlightModule[] = [] ;
  formData: any;

  constructor(private service: FlightsService, private builder: FormBuilder, private dataService : DataService, private router: Router){

    this.dataService.Data$.subscribe
    ((res) => {this.flights  = res
    console.log(this.flights);

  });
  }

  booking(){
    this.router.navigateByUrl('booking')
  }

}
