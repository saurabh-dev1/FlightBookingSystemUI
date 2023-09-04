import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private baseApiUrl = "https://flight-system-app.azurewebsites.net/api"
  constructor(private httpClient: HttpClient) { }

  sendEmail(email:any){
    return this.httpClient.post<any>(this.baseApiUrl + '/Email',email);
  }
}
