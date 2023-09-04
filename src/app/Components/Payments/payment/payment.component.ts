import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import DataService from 'src/app/Services/Data/data.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { FlightsService } from 'src/app/Services/flights/flights.service';
import { PaymentService } from 'src/app/Services/payment/payment.service';
import { PaymentModule } from 'src/app/models/Payments/payment/payment.module';
import { FlightModule } from 'src/app/models/flight/flight.module';
import { EmailService } from 'src/app/Services/Email/email.service';
import {jsPDF} from "jspdf";
import { UsersService } from 'src/app/Services/Users/users.service';
import { UserStoreService } from 'src/app/Services/UserStore/user-store.service';
import { PassengersService } from 'src/app/Services/passengers/passengers.service';
import { PassengerModule } from 'src/app/models/passenger/passenger.module';

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
  name!: any
  passengers: PassengerModule[] = []
  users: any;


  constructor(private authService: AuthService,
    private userService: UsersService,
    private dataService: DataService,
    private paymentService: PaymentService,
    private passengerService: PassengersService,
    private activeRoute: ActivatedRoute,
    private builder: FormBuilder,
    private toast: NgToastService,
    private emailService : EmailService,
    private userStoreService : UserStoreService,
    private router: Router){

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

    //get user details

    showUserDetails() {

      let uId = this.convertToNumberfromstring(sessionStorage.getItem('userId'))
      debugger
      if(uId!=null){
      this.userService.getUserById(uId)
            .subscribe( (res) => {

              this.users = res;
              console.log(res);
              debugger
              sessionStorage.setItem('phoneNo', this.users.phoneNo);
              console.log(sessionStorage)
              console.log(sessionStorage.getItem('phoneNo'))

              debugger
            },
            (error) => {
              console.log(error);
            })
          }
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
        cardNumber: this.builder.control('',  [Validators.required, Validators.pattern(/^\d{16}$/)]),
        expirationDate: this.builder.control('', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]),
        cvv: this.builder.control('',  [Validators.required, Validators.pattern(/^\d{3}$/)]),
        cardName: this.builder.control('', Validators.required),
        amount: this.builder.control({value: this.amount, disabled: true}, Validators.required),
      });
      debugger
    }


    Payment(){
      if(this.paymentForm.valid){
        debugger
        let bid =  this.convertToNumberfromstring(sessionStorage.getItem('bookingId'))


        if(bid!==null){
          this.showUserDetails();
          this.passengerService.getPassenger(bid).subscribe((res: any) => {
            if (res) {
              debugger

              this.passengers = res;
            } else {
              this.toast.warning(res.message);
            }
          });

        }

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
            this.toast.success({detail:'Payment Success'});



            debugger
            let currentDate = new Date();
            let departureDate = new Date(this.searchedFlight.departureDateTime);

        // Format the date as "YYYY-MM-DD"
            let formattedDepartureDate = departureDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
            let id: number | null = this.convertToNumberfromstring(sessionStorage.getItem('bookingId') );
            let mobileNo : string |null = sessionStorage.getItem('phoneNo') ;


            this.name = this.userStoreService.getNameFromStore()
            console.log(this.name.source._value);
            let subject = "Ticket Confirmation"
            let body = `Dear ${this.name.source._value},


            We are excited to confirm your flight booking with JetSetGo! Your travel details are as follows:


            <table width="100%" cellpadding="4">
          <tbody>
              <tr>
                <td style="border-bottom:1px solid #ccc;font:9px arial"><b>Booking Id. :</b>
                </td>
                <td style="border-bottom:1px solid #ccc;font:9px arial"><span>${id}</span>

                </td>

                <td style="border-bottom:1px solid #ccc;font:9px arial"><b>Flight Name / No. : </b>

                </td>
                <td style="border-bottom:1px solid #ccc;font:9px arial"><span>${this.searchedFlight.flightName} / ${this.searchedFlight.flightNumber}</span>


              </td>

                <TR>

              <td style="border-bottom:1px solid #ccc;font:9px arial"><b>Date &amp; Time of Booking : </b>

              </td>

              <td style="border-bottom:1px solid #ccc;font:9px arial"><span>${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()} HRS</span>

              </td>



              <td style="border-bottom:1px solid #ccc;font:9px arial"><b>From : </b>
              </td>
              <td style="border-bottom:1px solid #ccc;font:9px arial"><span>${this.searchedFlight.departureCity}</span>

              </td>
              </TR>
                  <TR>
              <td style="border-bottom:1px solid #ccc;font:9px arial"><b>Date of Journey : </b>

              </td>
              <td style="border-bottom:1px solid #ccc;font:9px arial"><span>${formattedDepartureDate}</span>


              </td> <td style="border-bottom:1px solid #ccc;font:9px arial"><b>To : </b>
              </td>
              <td style="border-bottom:1px solid #ccc;font:9px arial"><span>${this.searchedFlight.arrivalCity}</span>
                 </td>

              </tr><tr>
              <td style="border-bottom:1px solid #ccc;font:9px arial"><b>Mobile No :</b></td>
              <td style="border-bottom:1px solid #ccc;font:9px arial"><span>${mobileNo}</span></td>

              <td style="border-bottom:1px solid #ccc;font:9px arial"><b>No. of Passenger : </b> </td>
              <td style="border-bottom:1px solid #ccc;font:9px arial"><span>1</span> </td>
             </tr><tr></tr></tbody></table> `;
            let email = sessionStorage.getItem('email');
            debugger
            let message = {email, subject, body}
            debugger
            this.emailService.sendEmail(message).subscribe({
              next:(res)=>{

              },
              error:(err)=>{
                console.log(err)
              }
            })
            this.router.navigate(['Ticket']);
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






