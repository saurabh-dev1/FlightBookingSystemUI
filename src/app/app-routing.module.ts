import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { AdminNavbarComponent } from './Components/admin-navbar/admin-navbar.component';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { FlightsComponent } from './Components/flights/flights.component';
import { AddFlightsComponent } from './Components/flights/add-flights/add-flights.component';




const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'Admin',
    component: AdminNavbarComponent
  },
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'Admin/flights',
    component: FlightsComponent
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
    path: 'Admin/flights/Admin',
    component: AdminNavbarComponent
  },
  {
    path: 'Admin/flights/Admin/flights/add',
    component: AddFlightsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
