// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
// import { Observable } from 'rxjs';

// import { Injectable } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
// import { AuthService } from '../Services/auth.service';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private service: AuthService, private router: Router,private tostr:ToastrService) { }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     if (this.service.isLoggedIn()) {
//       const menu = state.url.split('/')[1]; // Extract the first segment of the URL
//       if (menu === 'dashboard-admin' && this.service.getrole() !== 'Admin') {
//         this.router.navigate(['dashboard']);
//         this.tostr.warning('You dont have access.');
//         return false;
//       }
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }
