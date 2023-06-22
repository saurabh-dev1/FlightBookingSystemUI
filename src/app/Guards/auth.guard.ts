import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { NgToastService } from 'ng-angular-popup';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router,private toast:NgToastService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.service.isLoggedIn()) {
      debugger
      const menu = state.url.split('/')[1];
      if (menu === 'admin' && this.service.getrole() !== 'Admin') {
        debugger
        this.router.navigate(['/dashboard']);
        this.toast.warning({detail: 'You dont have access.'});
        return false;
      }
      return true;
    } else {
      this.toast.error({detail:"ERROR", summary: "Please login first!!"})
      this.router.navigate(['Login']);
      return false;
    }
  }
}
