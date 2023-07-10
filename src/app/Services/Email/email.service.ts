import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private baseApiUrl = "http://localhost:5238/api"
  constructor(private httpClient: HttpClient) { }

  sendEmail(email:any){
    return this.httpClient.post<any>(this.baseApiUrl + '/Email',email);
  }
}
