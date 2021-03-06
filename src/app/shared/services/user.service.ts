import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, Subscription, throwError } from 'rxjs';
import { HttpService } from './http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import {Role} from "../../models/roles.model";

@Injectable()
export class UserService {
  userSelected = new EventEmitter<User>();
  userChanged = new Subject<User[]>();
  currentUser: User;

  private users: User[] = [];

  constructor(private httpService: HttpService, private snackBar: MatSnackBar) {
    const currentUser = localStorage.getItem('user');
    if (currentUser !== null) {
      this.currentUser = JSON.parse(currentUser);
    }
  }

  setUsers(users: User[]): void {
    this.users = users;
    this.userChanged.next(this.users.slice());
  }

  getUsers(): User[] {
    return this.users.slice();
  }

  // @ts-ignore
  getUser(id: number): User {
    for (let i = 0; i < this.users.length; i++) {
      if (id === this.users[i].id) {
        return this.users[i];
      }
    }
  }

  deleteUser(id: number): void {
    for (let i = 0; i < this.users.length; i++) {
      this.users.splice(i, 1);
      this.userChanged.next(this.users.slice());
    }
  }

  fetchUsers(): Observable<any> {
    return this.httpService.get({
      endpoint: '/users',
      public: false
    }).pipe(
      tap(users => {
        this.setUsers(users.body);
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: any): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      if (error.error.status === 404) {
        errorMessage = `Not found`;
      }
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  updateUser(user: User): void {
    for (let i = 0; i < this.users.length; i++) {
      if (user.id === this.users[i].id) {
        this.users[i] = user;
        this.userChanged.next(this.users.slice());
      }
    }
  }

  setCurrentUser(data: any): void {
    this.currentUser = new User(data.id, data.username, data.name, this.parseUserRoles(data.roles));
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  parseUserRoles(data: object): number {
    if (Object.keys(data).length > 1) {
       return Role.Admin;
    } else {
       return Role.User;
    }
  }

  changeUserPassword(password: object) {
    return this.httpService.put({
      endpoint: '/user/password/',
      public: false,
      body: JSON.stringify(password)
    }).subscribe(
      data => {
        this.snackBar.open('Wachtwoord succesvol gewijzigd', '', {
          duration: 3000
        })
      },
      () => {
        this.snackBar.open('Er ging iets mis bij het wijzigen van je wachtwoord, probeer het later opnieuw', '', {
          duration: 3000
        })
      }
    )
  }

  changeUserPrivilege(userId: number, userPrivilege: number, newUser: User): Subscription {
    return this.httpService.post({
      endpoint: '/user/privilege/' + userId,
      body: userPrivilege,
      public: false
    }).pipe(
      catchError(async (err) => this.snackBar.open(err.error.message))
    ).subscribe((data) => {
      this.updateUser(newUser);
      this.snackBar.open(data.message, '', {
        duration: 3000
      });
    });
  }
}
