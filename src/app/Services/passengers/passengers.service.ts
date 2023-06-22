import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PassengerModule } from 'src/app/models/passenger/passenger.module';

@Injectable({
  providedIn: 'root'
})
export class PassengersService {
  private baseApiUrl = "http://localhost:5238/api"
  constructor(private httpClient: HttpClient) { }

  getPassengers() : Observable<PassengerModule[]>{
    return this.httpClient.get<PassengerModule[]>(this.baseApiUrl + '/Passenger');
  }

  addPassenger(addPassengerRequest : PassengerModule): Observable<PassengerModule>{
    return this.httpClient.post<PassengerModule>(this.baseApiUrl + '/Passenger', addPassengerRequest);
  }

  deletePassenger(passengerId : number): Observable<PassengerModule>{
    return this.httpClient.delete<PassengerModule>(this.baseApiUrl + '/Passenger/' + passengerId);
  }

  getPassenger(passengerId: number): Observable<PassengerModule>{
    return this.httpClient.get<PassengerModule>(this.baseApiUrl + '/Passenger/' + passengerId);
  }
}
