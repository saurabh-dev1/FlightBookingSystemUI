import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModule } from 'src/app/models/user/user/user.module';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  private baseApiUrl = "http://localhost:5238/api"

  getUser(): Observable<UserModule[]>{
    return this.httpClient.get<UserModule[]>(this.baseApiUrl + '/User');
  }

}
