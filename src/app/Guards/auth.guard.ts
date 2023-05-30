import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {


  return true;
};
