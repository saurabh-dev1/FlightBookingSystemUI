import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingModule } from 'src/app/models/flightbooking/booking/booking.module';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseApiUrl = "http://localhost:5238/api"
  constructor(private httpClient: HttpClient) { }

  addBooking(addBookingRequest : BookingModule): Observable<any>{
    debugger
    return this.httpClient.post<BookingModule>(this.baseApiUrl + '/FlightBooking/Add', addBookingRequest);
  }

  cancelBooking(bookingId : number): Observable<BookingModule>{
    return this.httpClient.delete<BookingModule>(this.baseApiUrl + '/FlightBooking/'+ bookingId);
  }

  getBookings() : Observable<BookingModule[]>{
    return this.httpClient.get<BookingModule[]>(this.baseApiUrl + '/FlightBooking');
  }

  getBookingByUser(userId : number): Observable<BookingModule>{
    return this.httpClient.get<BookingModule>(this.baseApiUrl + '/FlightBooking/User/'+ userId);
  }
}
