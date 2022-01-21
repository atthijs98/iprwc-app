import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from '../../../../models/order.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { OrderListDatasource } from './order-list.datasource';
import { OrderService } from '../../../order/order.service';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  orders: Order[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<Order[]>;
  dataSource: OrderListDatasource;

  displayedColumns = ['date', 'user', 'total', 'action'];

  constructor(private orderService: OrderService, private userService: UserService) { }

  ngOnInit(): void {
    this.subscription = this.orderService.ordersChanged.subscribe(
      (orders: Order[]) => {
        this.orders = orders;
        this.dataSource = new OrderListDatasource(orders, this.paginator, this.sort, this.userService);
      }
    );
    this.orders = this.orderService.getOrders();
    console.log(this.orders);
    this.dataSource = new OrderListDatasource(this.orders, this.paginator, this.sort, this.userService);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  generatePdf(): void {
    console.log("bleep bloop PDF");
  }

  getEmail(userId: number): string {
    console.log(this.userService.getUser(userId).email);
    return this.userService.getUser(userId).email;
  }
}
