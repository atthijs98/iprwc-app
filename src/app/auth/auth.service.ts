import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginInterface } from '../interfaces/login.interface';
import { HttpService } from '../shared/services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../shared/services/user.service';
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
              public jwtHelper: JwtHelperService,
              private httpService: HttpService,
              private snackbar: MatSnackBar,
              private userService: UserService) {

    if (localStorage.getItem('jwtoken') !== null && this.httpHeaders.get('Token') === null) {
      // @ts-ignore
      this.httpHeaders = this.httpHeaders.append('Token', localStorage.getItem('jwtoken'));
    }

  }
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  private static setRoles(roles: Object): void {
    if (Object.keys(roles).length > 1) {
      localStorage.setItem('role', '1');
    } else {
      localStorage.setItem('role', '0');
    }
  }

  public login(user: LoginInterface): void {
    if (user.username !== '' && user.password !== '') {
      const userToBeLoggedIn = {
        username: user.username,
        password: user.password
      };
      this.httpService.post({
        auth: true,
        endpoint: '/login',
        public: true,
        body: userToBeLoggedIn
      }).subscribe(
        data => {
          localStorage.setItem('jwtoken', data.headers.get('Authorization'));
          localStorage.setItem('name', data.body.name);
          this.userService.setCurrentUser(data.body);
          this.router.navigate(['/home']).then();
        },
        () => {
          this.snackbar.open('Er ging iets mis met inloggen, probeer het later opnieuw', '',{
            duration: 3000
          });
        });
    }
  }

  setCurrentUser(data: object): void {
    this.userService.setCurrentUser(data);
  }

  public isAuthenticated(): boolean {
    try {
      const token = localStorage.getItem('jwtoken');
      // @ts-ignore
      return !this.jwtHelper.isTokenExpired(token);
    } catch (Error) {
      this.logout();
      return false;
    }
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']).then();
  }

  isAuthorized(): boolean {
    return parseInt(<string>localStorage.getItem('role'), 10) > 0;
  }

  public compareTokens(id: number): boolean {
    if (Number(this.getUserId()) === id) {
      return true;
    } else {
      return false;
    }
  }

  public getUserId(): string {
    return <string>localStorage.getItem('id');
  }
  public getName(): string {
    return <string>localStorage.getItem('name');
  }
}
