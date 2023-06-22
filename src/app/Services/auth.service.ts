import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "http://localhost:5238/api/Auth/"
  constructor(private http : HttpClient, private router: Router) { }

  signUp(userObj:any):Observable<any> {
    debugger
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

  signOut(){
    localStorage.clear();
    this.router.navigate(['Login'])
  }
  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  getrole(){
    debugger
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
}
