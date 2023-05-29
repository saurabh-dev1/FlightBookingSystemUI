import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightModule } from 'src/app/models/flight/flight.module';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
    private baseApiUrl = "http://localhost:5238/api"
  constructor(private httpClient: HttpClient) { }


  getFlights() : Observable<FlightModule[]>{
    return this.httpClient.get<FlightModule[]>(this.baseApiUrl + '/Flight');
  }

  addFlight(addFlightRequest : FlightModule): Observable<FlightModule>{
    return this.httpClient.post<FlightModule>(this.baseApiUrl + '/Flight/Add', addFlightRequest);
  }

  getFlight(flightId: number) : Observable<FlightModule>{
    return this.httpClient.get<FlightModule>(this.baseApiUrl + '/Flight/' + flightId);
  }

  updateFlight(flightId : number, updateFlight: FlightModule) : Observable<FlightModule>{
    return this.httpClient.put<FlightModule>(this.baseApiUrl + '/Flight/' + flightId, updateFlight);
  }

  deleteFlight(flightId : number): Observable<FlightModule>{
    return this.httpClient.delete<FlightModule>(this.baseApiUrl + '/Flight/' + flightId);
  }
}
