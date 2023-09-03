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
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthService } from 'src/app/Services/Auth/auth.service';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', animate('300ms ease-in')),
    ]),
  ],
})
export class BookingComponent implements OnInit{

  isTaxChartCollapsed: boolean = true;
  passengers: PassengerModule[] = []

  seatselectionOption: boolean = false;
  passengerAddOption: boolean = false;
  row: string[] = ['A', 'B', 'C', 'D', 'E','F','G','H','I','J'];
  cols: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  rows: string[] = [];
  currentseat: string = '';
  searchedflight:any;
  amount: number = 0;
  gst!: number;
  tax!: number;
  totalAmount!: number;
  totalTax!: number;




  constructor(private authService: AuthService,
    private builder: FormBuilder,
     private router: Router,
    private bookingService: BookingService,
    private passengerService: PassengersService,
    private dataService: DataService,
    private flightService: FlightsService,
    private toast:NgToastService) {


      this.dataService.Data$.subscribe((res) => {
      this.searchedflight = res;
      this.seatselection();
      debugger
      console.log(res);
    });


    }
    selectedSeats: string[] = [];
    occupiedseatslist: string[] = [];

    ngOnInit(): void {
      this.occupiedseats();
    }
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
    this.AddPassengerForm.value.allocatedSeat = this.currentseat;
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
    debugger

    this.passengerService.addPassenger(passenger).subscribe((res: any) => {

      this.passengers.push (res);
      console.log(res);
      console.log(this.passengers)
    })
  }else{

    this.toast.error({detail:"All blanks required!", duration: 5000});
  }
    }
    this.calculateAmountOnAdd();
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
     this.calculateAmountOnremove();
   }


   //get passenger by id
   getPassengers() {
    debugger
    let id: number | null = this.convertToNumberfromstring(sessionStorage.getItem('bookingid') );
    if(id!==null){
    this.passengerService.getPassenger(id).subscribe((res: any) => {
      if (res) {
        debugger
        this.passengers = res;
      } else {
        this.toast.warning(res.message);
      }
    });
    this.calculateAmount();
  }
}


// For seats
//seat selection after adding passengers
seatselection() {
  debugger
  this.seatselectionOption = !this.seatselectionOption;
  debugger
  if (this.searchedflight === null) {
    this.toast.warning({detail:"Search Flight Again!!", duration: 5000});
  }
  console.log(this.searchedflight[0]);
  let val: number = this.searchedflight[0].totalSeats;
  for (let i = 0; i < val / 10; i++) {
    this.rows.push(this.row[i]);
  }
  debugger
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
    if (this.selectedSeats.length >= 6 || this.checkseatsoccupied(seat)) {
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

  //for button
  getButtonStyle(seat: string) {

    if (seat === this.currentseat) {
      return { 'background-color': 'green', 'color': '#fff' };
    } else {
      return {};
    }
  }


  logout(){
    this.authService.signOut();
  }


  payments() {
    debugger
    this.router.navigate(['payment', this.totalAmount]);
  }

  calculateAmount() {
    debugger
    for (let i = 0; i < this.passengers.length; i++) {
      this.amount += this.searchedflight[0].basePrice;
    }
    this.TotalAmount();
  }

  calculateAmountOnAdd() {
    debugger
    this.amount += this.searchedflight[0].basePrice;
    this.TotalAmount();

  }
  calculateAmountOnremove() {
    debugger
    this.amount -= this.searchedflight[0].basePrice;
    this.TotalAmount();

  }
  TotalAmount(){
    this.gst = (this.amount*18)/100;
    this.tax = (this.amount*10)/100;
    this.totalTax = this.gst+ this.tax

    this.totalAmount = this.totalTax+ this.amount
  }


  occupiedseats() {
    debugger
    this.flightService
      .getoccupiedseatsbyflightid(this.searchedflight[0].flightId)

      .subscribe((res:any) => {
        debugger
        console.log('seats' + res);
        if (res) {
          this.occupiedseatslist = res;
          debugger;
          console.log('seats' + this.occupiedseatslist);
          debugger;
        }
      });
  }

  checkseatsoccupied(seat: string) {

    if (this.occupiedseatslist.includes(seat)) {
      return true;
    } else {
      return false;
    }
  }

  isseatchecked(seat: string): boolean {

    return this.occupiedseatslist.includes(seat);
  }

  isSeatOccupied(seat: string): boolean {

    return this.occupiedseatslist.includes(seat);
  }

  isSelectedSeat(seat: string): boolean {
    return this.selectedSeats.includes(seat);
  }

  getSeatLabel(seat: string): string {
    if (this.checkseatsoccupied(seat)) {
      return '🧑‍💼';
    } else {
      return seat;
    }
  }


}























