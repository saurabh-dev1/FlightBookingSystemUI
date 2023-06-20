import { Component } from '@angular/core';
import { FlightsService } from 'src/app/Services/flights/flights.service';
import { FlightModule } from 'src/app/models/flight/flight.module';
import { HomePageComponent } from '../home-page/home-page.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import DataService from 'src/app/Services/Data/data.service';
import { Route, Router } from '@angular/router';
import { BookingService } from 'src/app/Services/booking/booking.service';

@Component({
  selector: 'app-flight-searched',
  templateUrl: './flight-searched.component.html',
  styleUrls: ['./flight-searched.component.css']
})
export class FlightSearchedComponent {

  flights: FlightModule[] = [] ;
  formData: any;
  flight!: FlightModule;
  AddBookingForm!: FormGroup

  constructor( private builder: FormBuilder,private flightService : FlightsService, private dataService : DataService, private router: Router, private bookingService: BookingService){

    this.dataService.Data$.subscribe
    ((res) => {this.flights  = res
    console.log(this.flights);
  });

    this.flightService.getSearchedflight().subscribe
    ((res) => {this.flight = res
    console.log(this.flight)}
    )

  }




convertToNumberfromstring(value: string | null): number | null
  {
    if (value === null) {
      return null;
    }

    const parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue)) {
      return null;
    }

    return parsedValue;
  }


  booking(flight : FlightModule){

    this.AddBookingForm = this.builder.group({
      flightbookingId: this.builder.control(0, Validators.required),
      departureCity: this.builder.control('', Validators.required),
      arrivalCity: this.builder.control('',Validators.required),
      departureDateTime: this.builder.control(flight.departureDateTime,Validators.required),
      arrivalDateTime: this.builder.control(flight.arrivalDateTime,Validators.required),
    flightId: this.builder.control(0, Validators.required),
    userId: this.builder.control(0, Validators.required),
  })

    let userId : number | null = this.convertToNumberfromstring(sessionStorage.getItem('userId'))

    this.AddBookingForm.value.departureCity=flight.departureCity;
    this.AddBookingForm.value.arrivalCity = flight.arrivalCity;
    this.AddBookingForm.value.departureDateTime= flight.departureDateTime;
    this.AddBookingForm.value.arrivalDateTime = flight.arrivalDateTime;
    this.AddBookingForm.value.flightId= flight.flightId;
    this.AddBookingForm.value.userId= userId;

    this.bookingService.addBooking(this.AddBookingForm.value).subscribe((res: any) => {
     // console.log(this.AddBookingForm.value.departureDate + "departure date hai  3")
     // res.departureDate = this.AddBookingForm.value.departureDate

      console.log(res)


     // console.log(res.data.id);
     // debugger
     sessionStorage.setItem("bookingId",res.flightBookingId)

    })
    this.router.navigateByUrl('booking')
  }

}
