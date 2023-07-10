import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { FlightsService } from 'src/app/Services/flights/flights.service';
import { FlightModule } from 'src/app/models/flight/flight.module';

@Component({
  selector: 'app-edit-flights',
  templateUrl: './edit-flights.component.html',
  styleUrls: ['./edit-flights.component.css']
})
export class EditFlightsComponent implements OnInit {

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
  constructor(private authService: AuthService, private route : ActivatedRoute, private flightService: FlightsService, private router: Router) {}

  ngOnInit(): void{
    this.route.params.subscribe({
      next: (param) => {
        const id = param['id'];

        if(id){
          //call Api
          this.flightService.getFlight(id)
          .subscribe({
            next:(res) => {
              this.flightDetail = res;
            }
            })

        }
      }
    })
  }

  updateFlight(){
    this.flightService.updateFlight(this.flightDetail.flightId, this.flightDetail)
    .subscribe({
      next: (response) =>{
        this.router.navigate(['Admin/flights']);
      }
    });
  }

  deleteFlight(flightId : number){
    this.flightService.deleteFlight(flightId)
    .subscribe({
      next: (response) =>{
      this.router.navigate(['Admin/flights']);
      }
    });
  }


  logout(){
    this.authService.signOut();
  }
}
