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
import { animate, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(60px)' }),
        animate(
          '1000ms ease',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class BookingComponent implements OnInit{

  passengers: PassengerModule[] = []

  seatselectionOption: boolean = false;
  passengerAddOption: boolean = false;
  row: string[] = ['A', 'B', 'C', 'D', 'E','F'];
  cols: number[] = [1, 2, 3, 4, 5, 6,];
  rows: string[] = [];
  currentseat: string = '';
  searchedflight!:FlightModule;

  addFlightRequest : FlightModule ={
    flightId: 0,
    flightName: "sdf",
    flightNumber: "afdv",
    departureCity: "sd",
    arrivalCity: "asd",
    departureDateTime:new Date(),
    arrivalDateTime:new Date() ,
    departureCityCode: "ad",
    arrivalCityCode: "asd",
    basePrice: 45,
    totalSeats: 54,
    availableSeats: 54

  };



  constructor(private builder: FormBuilder, private router: Router, private DataService: DataService,
    private bookingService: BookingService,
    private passengerService: PassengersService,
    private flightService: FlightsService,
    private toast:NgToastService) {

      this.searchedflight= this.addFlightRequest;
      this.seatselection();
    }
    selectedSeats: string[] = [];

    ngOnInit(): void {}
    // add passenger form
    AddPassengerForm = this.builder.group({
      firstName: this.builder.control('', Validators.required),
      lastName: this.builder.control('', Validators.required),
      age: this.builder.control('',Validators.required),
      gender: this.builder.control('',Validators.required),
      phoneNumber: this.builder.control('',Validators.required),
      allocatedSeat: '',
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
    debugger
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
        allocatedSeat: this.AddPassengerForm.value.allocatedSeat ?? '',
        userId: uId,
        flightBookingId:bId

    };
    this.AddPassengerForm.value.allocatedSeat = this.currentseat;
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

     this.passengerService.deletePassenger(passengerId).subscribe((res:PassengerModule) => {

       console.log(res)
       if(res)
       {

        this.passengers = this.passengers.filter(
          (passenger) => passenger.passengerId !== passengerId
        );
         this.toast.success({detail:"Passenger Deleted", duration: 5000})}
       else{
         this.toast.warning({detail:"Error", duration: 5000});
       }
     })

   }



// For seats
//seat selection after adding passengers
seatselection() {
  this.seatselectionOption = !this.seatselectionOption;

  if (this.searchedflight === null) {
    this.toast.warning({detail:"Error", duration: 5000});
  }

  let val: number = this.searchedflight.totalSeats;
  for (let i = 1; i < val / 10; i++) {
    this.rows.push(this.row[i]);
  }
}

//selected seats to display.
onSeatSelectionChange(seat: string) {
  if (this.selectedSeats.includes(seat)) {
    this.selectedSeats = this.selectedSeats.filter((s) => s !== seat);
    this.passengers.forEach((item) => {
      if (item.allocatedSeat === seat) {
        this.cancelPassenger(item.passengerId);
      }
    });
  } else {
    if (this.selectedSeats.length <= 6) {
      this.selectedSeats.push(seat);
    }
  }
}

  //disabling seats
  isSeatDisabled(seat: string) {
    if (this.selectedSeats.length >= 6) {
      if (this.selectedSeats.includes(seat)) {
        return false;
      }

      return true;
    } else {
      return false;
    }
  }

  //add passenger opiton
  addPassengerOption(seat: string) {
    this.currentseat = seat;
    this.passengerAddOption = !this.passengerAddOption;
  }
}






















