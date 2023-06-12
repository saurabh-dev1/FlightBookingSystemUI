import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import DataService from 'src/app/Services/Data/data.service';
import { BookingService } from 'src/app/Services/booking/booking.service';
import { FlightsService } from 'src/app/Services/flights/flights.service';
import { FlightModule } from 'src/app/models/flight/flight.module';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {


  constructor( private flightService: FlightsService,private bookingService: BookingService, private router: Router,private builder:FormBuilder, private DataService: DataService) {}

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
      onFlightSelected(id:number)
      {

           this.flightService.getFlight(id).subscribe((res) => {

            this.flightService.setSearchedFlight(res);
           })
           debugger
           this.bookingService.addBooking(this.AddBookingForm.value).subscribe((res: any) => {
             console.log(res)
            debugger
            // console.log(res.data.id);
            // debugger
            sessionStorage.setItem("bookingId",res.bookingId)

           })



          // this.route.navigate(['home/flights']);
        }
    }
