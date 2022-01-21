import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../auth/register/register.component';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../models/user.model';
import { OrderService } from '../order/order.service';
import { Order } from '../../models/order.model';
import {UserListDatasource} from "../admin/user/user-list/user-list-datasource";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Route, Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  subscription: Subscription;
  id: number;
  orders: Order[] = [];
  regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/;

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
      Validators.pattern(this.regex)
    ]),
    repeatPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
      Validators.pattern(this.regex)
    ])
  }, {validators: passwordMatchValidator });

  constructor(private userService: UserService, private orderService: OrderService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.userId;
        if (!this.authService.compareTokens(this.id)) {
          this.router.navigate(['home']);
        } else {
          this.getUserData();
        }
      }
    );
    this.subscription = this.orderService.userOrdersChanged.subscribe(
      (orders: Order[]) => {
        this.orders = orders;
      }
    );
    this.orders = this.orderService.getUserOrders();
    console.log(this.orders);
  }

  get password(): AbstractControl { return <AbstractControl>this.changePasswordForm.get('password');}
  get repeatPassword(): AbstractControl {return <AbstractControl>this.changePasswordForm.get('repeatPassword'); }

  onPasswordInput(): void {
    if (this.changePasswordForm.hasError('passwordMismatch')) {
      this.repeatPassword.setErrors([{passwordMismatch: true}]);
    } else {
      this.repeatPassword.setErrors(null);
    }
  }

  private getUserData(): void {
    this.currentUser = this.userService.currentUser;
  }

  onSubmit(): void {
    const values = this.changePasswordForm.value;

    if (this.changePasswordForm.valid) {
      this.userService.changeUserPassword(new Object({oldPassword: values.oldPassword, newPassword: values.password}));
      this.changePasswordForm.reset();
    }
  }

}
