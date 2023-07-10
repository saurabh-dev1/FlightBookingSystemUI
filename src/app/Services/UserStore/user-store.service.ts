import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private name$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  constructor() { }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role:string){
    return this.role$.next(role);
  }

  public getNameFromStore(){
    return this.name$.asObservable();
  }

  public setNameForStore(name:string){
    return this.name$.next(name);
  }
}
