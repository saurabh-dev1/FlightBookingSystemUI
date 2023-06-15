import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminNavbarComponent } from './Components/admin-navbar/admin-navbar.component';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FlightsComponent } from './Components/flights/flights.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from 'src/material/material.module';
import { NgToastModule } from 'ng-angular-popup';
import { AddFlightsComponent } from './Components/flights/add-flights/add-flights.component';
import { EditFlightsComponent } from './Components/flights/edit-flights/edit-flights.component';
import { FlightSearchedComponent } from './Components/flight-searched/flight-searched.component';
import { UsersComponent } from './Components/User/users/users.component';
import { BookingComponent } from './Components/booking/booking.component';
import { BookingListComponent } from './Components/booking/bookingList/booking-list/booking-list.component';





@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AdminNavbarComponent,
    LoginComponent,
    SignUpComponent,
    FlightsComponent,
    DashboardComponent,
    AddFlightsComponent,
    EditFlightsComponent,
    FlightSearchedComponent,
    UsersComponent,
    BookingComponent,
    BookingListComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MaterialModule,
    NgToastModule,
    FormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
