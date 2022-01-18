import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from '../../../../models/order.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { OrderListDatasource } from './order-list.datasource';
import { OrderService } from '../../../order/order.service';

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

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.subscription = this.orderService.ordersChanged.subscribe(
      (orders: Order[]) => {
        this.orders = orders;
        this.dataSource = new OrderListDatasource(orders, this.paginator, this.sort);
      }
    );
    this.orders = this.orderService.getOrders();
    this.dataSource = new OrderListDatasource(this.orders, this.paginator, this.sort);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  generatePdf(): void {
    console.log("bleep bloop PDF");
  }
}
