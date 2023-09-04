import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {  Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://flight-system-app.azurewebsites.net/api/Auth/";
  private userPayload: any
  constructor(private http : HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

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

  decodedToken(){
    const JwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(JwtHelper.decodeToken(token))
    return JwtHelper.decodeToken(token);
  }

  getNameFromToken(){
      if(this.userPayload){
        debugger
        return this.userPayload.unique_name;
      }
  }

  getRoleFromToken(){
    if(this.userPayload){
      debugger
      return this.userPayload.role;
    }
}
}
