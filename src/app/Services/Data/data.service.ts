import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class DataService {

  constructor() { }
  private DataSubject = new BehaviorSubject<any>(null);
  Data$ = this.DataSubject.asObservable();

  setData(Data: any) {

    this.DataSubject.next(Data);
  }

}
