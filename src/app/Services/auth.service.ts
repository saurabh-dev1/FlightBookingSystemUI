import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "http://localhost:5238/api/Auth/"
  constructor(private http : HttpClient) { }

  signUp(userObj:any):Observable<any> {

    return this.http.post(`${this.baseUrl}Register`, userObj)

  }

  login(userObj:any):Observable<any> {

    return this.http.post(`${this.baseUrl}Login`, userObj)
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }
}
