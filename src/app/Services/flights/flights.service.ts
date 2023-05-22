import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
    private baseApiUrl = "http://localhost:5238/api"
  constructor(private httpClient: HttpClient) { }


  getFlights() : Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/Flight');
  }
}
