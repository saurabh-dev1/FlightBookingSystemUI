import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { PassengerModule } from 'src/app/models/passenger/passenger.module';
import { FormBuilder } from '@angular/forms';
import { BookingService } from 'src/app/Services/booking/booking.service';
import { BookingModule } from 'src/app/models/flightbooking/booking/booking.module';
import { PassengersService } from 'src/app/Services/passengers/passengers.service';
import { Router } from '@angular/router';
import DataService from 'src/app/Services/Data/data.service';
import { FlightModule } from 'src/app/models/flight/flight.module';
import { FlightsService } from 'src/app/Services/flights/flights.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {

  passengers: PassengerModule[] = []

  searchedflight!:FlightModule;



  constructor(private builder: FormBuilder, private router: Router, private DataService: DataService,
    private bookingService: BookingService,
    private passengerService: PassengersService,
    private flightService: FlightsService,
    private toast:NgToastService) {}


    // add passenger form
    AddPassengerForm = this.builder.group({
      firstName: this.builder.control('', Validators.required),
      lastName: this.builder.control('', Validators.required),
      age: this.builder.control('',Validators.required),
      gender: this.builder.control('',Validators.required),
      phoneNumber: this.builder.control('',Validators.required),
      userId: 0,
      bookingId: 0
    });



     // convert id to number

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

  // cancel booking

  CancelBooking()
  {
    let bookingId : number | null = this.convertToNumberfromstring(sessionStorage.getItem('bookingId'))

    if(bookingId !== null){

      this.bookingService.cancelBooking(bookingId).subscribe((res) => {
        console.log(res);
        this.toast.success({detail:"Booking Canceled", duration: 5000});
        this.router.navigate(['flightSearched']);
      });

    }else{

    }
  }

  //add passenger
  AddPassenger()
  {
    debugger
    let bId = this.convertToNumberfromstring(sessionStorage.getItem('bookingId'))
    let uId = this.convertToNumberfromstring(sessionStorage.getItem('userId'))
    if(bId!==null && uId!==null){
    debugger
   if(this.AddPassengerForm.valid){
    debugger
    const passenger: PassengerModule = {
      passengerId: 0,
      firstName: this.AddPassengerForm.value.firstName ?? '',
        lastName:  this.AddPassengerForm.value.lastName ?? '',
        age: this.AddPassengerForm.value.age ? parseInt(this.AddPassengerForm.value.age) : 0,
        gender: this.AddPassengerForm.value.gender ?? '',
        phoneNumber: this.AddPassengerForm.value.phoneNumber ?? '',
        userId: uId,
        flightBookingId:bId

    };

    this.passengerService.addPassenger(passenger).subscribe((res: any) => {
      this.passengers.push (res);
      console.log(res);
      console.log(this.passengers)
    })
  }else{

    this.toast.error({detail:"All blanks required!", duration: 5000});
  }
    }
  }


   //cancel passenger

   cancelPassenger(passengerId:number)
   {
    debugger
     console.log("passenger Id :"+passengerId);

     this.passengerService.deletePassenger(passengerId).subscribe((res:any) => {

       console.log(res)
       if(res)
       {

        this.passengers = res
         this.toast.success({detail:"Passenger Deleted", duration: 5000})}
       else{
         this.toast.warning({detail:"Error", duration: 5000});
       }
     })

   }

}
