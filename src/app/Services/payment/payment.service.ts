import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentModule } from 'src/app/models/Payments/payment/payment.module';
import { FlightModule } from 'src/app/models/flight/flight.module';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseApiUrl = "https://flight-system-app.azurewebsites.net/api"
  constructor(private httpClient: HttpClient) { }

  addPayment(addPaymentRequest : PaymentModule): Observable<PaymentModule>{
    return this.httpClient.post<PaymentModule>(this.baseApiUrl + '/Payment/Add', addPaymentRequest);
  }

  deletePayment(paymentId : number): Observable<PaymentModule>{
    return this.httpClient.delete<PaymentModule>(this.baseApiUrl + '/Payment/Add'+ paymentId);
  }
}
