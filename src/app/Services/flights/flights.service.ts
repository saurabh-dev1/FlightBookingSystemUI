import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FlightModule } from 'src/app/models/flight/flight.module';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
    private baseApiUrl = "https://flight-system-app.azurewebsites.net/api"
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

  searchFlight(departureCity: any, arrivalCity: any, departureDateTime: any): Observable<FlightModule>{
    debugger
    return this.httpClient.get<FlightModule>(this.baseApiUrl+`/Flight/GetByCities/`+departureCity +'/'+ arrivalCity +'/'+departureDateTime);
  }

  searchedFlight(departureCity: any, arrivalCity: any, departureDateTime: any): Observable<FlightModule[]>{
    return this.httpClient.get<FlightModule[]>(this.baseApiUrl+`/Flight/GetByCities/`+departureCity +'/'+ arrivalCity +'/'+departureDateTime);
  }

   private selectedflight:BehaviorSubject<any> = new BehaviorSubject<any>(null)

  getSearchedflight():Observable<FlightModule>
  {
   return this.selectedflight.asObservable();
  }
  setSearchedFlight(obj:FlightModule)
  {
    this.selectedflight.next(obj);
  }

  getoccupiedseatsbyflightid(flightId : number): Observable<FlightModule>{
    return this.httpClient.get<FlightModule>(this.baseApiUrl + '/Flight/selectedSeats/'+ flightId);
  }
}
