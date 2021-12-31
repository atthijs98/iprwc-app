import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../../models/user.model';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {trigger} from "@angular/animations";
import { MatTable } from "@angular/material/table";
import { UserListDatasource } from "./user-list-datasource";
import {UserService} from "../../../../shared/services/user.service";
import {AuthService} from "../../../../auth/auth.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  currentUserId: number;
  users: User[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<User[]>;
  dataSource: UserListDatasource;

  displayedColumns = ['email', 'name', 'role', 'orders', 'action'];

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUserId = parseInt(this.authService.getUserId());
    this.subscription = this.userService.userChanged.subscribe(
      (users: User[]) => {
        this.users = users;
        this.dataSource = new UserListDatasource(users, this.paginator, this.sort);
      }
    );
    this.users = this.userService.getUsers();
    this.dataSource = new UserListDatasource(this.users, this.paginator, this.sort);
  }

  changeUserRole(target: any, user: User): void {
    const newUser = user;
    newUser.role = target.value;
    this.userService.changeUserPrivilege(user.id, target.value, newUser);
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
