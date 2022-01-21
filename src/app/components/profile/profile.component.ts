import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../models/user.model';
import { OrderService } from '../order/order.service';
import { Order } from '../../models/order.model';
import { Subscription } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

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
  }

  private getUserData(): void {
    this.currentUser = this.userService.currentUser;
  }

}
