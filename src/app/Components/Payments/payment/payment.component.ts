import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import DataService from 'src/app/Services/Data/data.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { FlightsService } from 'src/app/Services/flights/flights.service';
import { PaymentService } from 'src/app/Services/payment/payment.service';
import { PaymentModule } from 'src/app/models/Payments/payment/payment.module';
import { FlightModule } from 'src/app/models/flight/flight.module';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  searchedFlight!: any;
  amount: number = 0;
  paymentForm!: FormGroup;
  payment: PaymentModule = new PaymentModule();
  status: boolean = false;

  constructor(private authService: AuthService,
    private dataService: DataService,
    private paymentService: PaymentService,
    private activeRoute: ActivatedRoute,
    private builder: FormBuilder,
    private toast: NgToastService){

      this.dataService.Data$.subscribe((res) => {
        debugger
        this.searchedFlight = res[0];
        console.log('this is '+res[0]);

  })

    this.getAmount();

    }

    ngOnInit() {
      this.paymentform();
    }


    getAmount(){
      debugger
      this.activeRoute.paramMap.subscribe((res) => {
        let amount = res.get('amount');
        debugger
        if (amount !== null) {
          debugger
          this.amount = +amount;
        }
      });
    }

    convertToNumberfromstring(value: string | null): number | null {
      if (value === null) {
        return null;
      }

      const parsedValue = parseInt(value, 10);

      if (isNaN(parsedValue)) {
        return null;
      }

      return parsedValue;
    }

    paymentform() {
      this.paymentForm = this.builder.group({
        cardNumber: this.builder.control('', Validators.required),
        expirationDate: this.builder.control('', Validators.required),
        cvv: this.builder.control('', Validators.required),
        cardName: this.builder.control('', Validators.required),
        amount: this.builder.control({value: this.amount, disabled: true}, Validators.required),
      });
      debugger
    }


    Payment(){
      if(this.paymentForm.valid){
        debugger
        let bid =  this.convertToNumberfromstring(sessionStorage.getItem('bookingId'))
        let bookId: number;

        if (bid !== null) {
          debugger;
          bookId = +bid;
          this.payment.flightBookingId = +bid;
        }
        debugger
        this.payment.paymentStatus = true;
        this.payment.totalPrice = this.amount;
        this.payment.paymentTime= new Date;
        this.payment.paymentMethod = 'card';

        this.paymentService.addPayment(this.payment).subscribe((res: any)=>
        {
          debugger
          console.log(res);
          if(res){
            debugger
            this.toast.success({detail:'Payment Success'})
          }else{
            debugger
            this.toast.warning({detail: 'try again!!'})
          }
        }
        );
      }
    }


  logout(){
    this.authService.signOut();
  }

}
