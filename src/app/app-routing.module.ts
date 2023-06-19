import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { AdminNavbarComponent } from './Components/admin-navbar/admin-navbar.component';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { FlightsComponent } from './Components/flights/flights.component';
import { AddFlightsComponent } from './Components/flights/add-flights/add-flights.component';
import { EditFlightsComponent } from './Components/flights/edit-flights/edit-flights.component';
import { FlightSearchedComponent } from './Components/flight-searched/flight-searched.component';
import { UsersComponent } from './Components/User/users/users.component';
import { BookingComponent } from './Components/booking/booking.component';
import { BookingListComponent } from './Components/booking/bookingList/booking-list/booking-list.component';
import { PaymentComponent } from './Components/Payments/payment/payment.component';




const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },



  {
    path: 'Admin', children:[{
      path: '', component: AdminNavbarComponent
    },
  {
    path:'flights', component: FlightsComponent
  },
  {
    path:'users', component: UsersComponent
    }
 ]},
 {
  path:'users', component: UsersComponent
  },

  {
    path:'addFlight', component: AddFlightsComponent
  },

  {
    path: 'flights',
  component: FlightsComponent
    },
  {
    path: 'Edit/:id', component: EditFlightsComponent
  },
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'SignUp',
    component: SignUpComponent
  },
  {
    path: 'Login/SignUp',
    component: SignUpComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'flightSearched',
    component: FlightSearchedComponent
  },
  {
    path: 'booking',
    component: BookingComponent
  },
  {
    path: 'bookingList',
    component: BookingListComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
