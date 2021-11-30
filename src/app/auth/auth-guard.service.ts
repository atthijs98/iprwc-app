import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public auth: AuthService, public router: Router) {}
  canActivate( route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    } else {
      if (!this.checkAuthorizationNecessity(route)) {
        return this.auth.isAuthorized();
      } else {
        return true;
        // return false;
      }
    }
  }
  checkAuthorizationNecessity(route: ActivatedRouteSnapshot): boolean {
    return Object.keys(route.data).length <= 0;
  }
}
