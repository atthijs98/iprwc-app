import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {User} from "../../models/user.model";
import {UserService} from "../services/user.service";

@Injectable({providedIn: 'root'})
export class UserResolverService implements Resolve<User[]> {
  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User[] | Observable<any> {
    let users = this.userService.getUsers();
    if (users.length === 0) {
      return this.userService.fetchUsers().pipe(take(1), map((User) => User));
    } else {
      return users;
    }
  }
}
