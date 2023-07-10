import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { BookingService } from 'src/app/Services/booking/booking.service';
import { BookingModule } from 'src/app/models/flightbooking/booking/booking.module';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent {

  constructor(private authService: AuthService,
    private bookingService: BookingService,
    private routeactive:ActivatedRoute){


      this.getBooking();
    }

   bookings: BookingModule[] = [];


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

   getBooking(){
    debugger
    let uId = this.convertToNumberfromstring(sessionStorage.getItem('userId'))
    if(uId!= null){
      debugger
    this.bookingService.getBookingByUser(uId).subscribe((res: any) =>{
      if(res){
      this.bookings = res
      console.log(res);
      console.log(this.bookings);
      }else{

      }
     })
   }
  }

  logout(){
    this.authService.signOut();
  }
}
