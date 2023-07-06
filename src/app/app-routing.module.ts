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
import { AuthGuard } from './Guards/auth.guard';
import { UserBookingsComponent } from './Components/booking/UserBooking/user-bookings/user-bookings.component';




const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },



  {
    path: 'Admin',
    canActivate: [AuthGuard],
    children:[{

      path: '', component: AdminNavbarComponent,
      canActivate: [AuthGuard]

    },
  {
    path:'flights', component: FlightsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'users', component: UsersComponent,
    canActivate: [AuthGuard]
    }
 ],
 },
 {
  path:'users', component: UsersComponent,
  canActivate: [AuthGuard]
  },

  {
    path:'addFlight', component: AddFlightsComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'flights',
  component: FlightsComponent,
  canActivate: [AuthGuard]
    },
  {
    path: 'Edit/:id', component: EditFlightsComponent,
    canActivate: [AuthGuard]
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
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'flightSearched',
    component: FlightSearchedComponent
  },
  {
    path: 'booking',
    component: BookingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bookingList',
    component: BookingListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payment/:amount',
    component: PaymentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'userBooking',
    component: UserBookingsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
