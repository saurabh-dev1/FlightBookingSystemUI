import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import DataService from 'src/app/Services/Data/data.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { BookingService } from 'src/app/Services/booking/booking.service';
import { FlightsService } from 'src/app/Services/flights/flights.service';
import { FlightModule } from 'src/app/models/flight/flight.module';
import { UserStoreService } from 'src/app/Services/UserStore/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor( private flightService: FlightsService,private bookingService: BookingService, private router: Router,private builder:FormBuilder, private DataService: DataService,
    private authService: AuthService,
    private toastService: NgToastService,
    ) {}

    searchflightsform!: FormGroup;

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


cityValidator(builder: FormGroup) {
  const departureCity = builder.get('departureCity')?.value;
  const arrivalCity = builder.get('arrivalCity')?.value;

  if (departureCity && arrivalCity && departureCity.toLowerCase() === arrivalCity.toLowerCase()) {
    return { invalidCities: true };
  }

  return null;
}


  ngOnInit(): void {
    this.searchflightsform = this.builder.group({
      departureCity: ['',Validators.required],
      arrivalCity: ['',Validators.required],
      departureDateTime: ['',Validators.required],
    });



  }


  searchFlights(){

debugger
        if(this.searchflightsform.valid){
          debugger
          //call Api
          this.flightService.searchFlight(this.searchflightsform.value.departureCity, this.searchflightsform.value.arrivalCity, this.searchflightsform.value.departureDateTime)
          .subscribe(


            (res) => {

              debugger
              //console.log(res);
              this.flightDetail = res;

              this.DataService.setData(res);
              this.router.navigate(['flightSearched']);
            },
            (err) => {

              console.log(err);
              this.toastService.error({detail: 'No Flights Found' })
            }
            )

        }
      }

      AddBookingForm = this.builder.group({
        flightbookingId: this.builder.control(0, Validators.required),
        departureCity: this.builder.control('', Validators.required),
        arrivalCity: this.builder.control('',Validators.required),
        departureDate: this.builder.control('',Validators.required),
        arrivalDate: this.builder.control('',Validators.required),
      noOfPassenger: this.builder.control('',Validators.required),
      flightId: this.builder.control(0, Validators.required),
      userId: this.builder.control(0, Validators.required),
    })

    logout(){
      this.authService.signOut();
    }





    }

