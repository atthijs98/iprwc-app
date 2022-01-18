import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Order } from '../../models/order.model';
import { OrderService } from '../../components/order/order.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class OrderResolverService implements Resolve<Order[]> {
  constructor(private orderService: OrderService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Order[] | Observable<any> {
    let orders = this.orderService.getOrders();
    if (orders.length === 0) {
      return this.orderService.fetchOrders().pipe(take(1), map((Order) => Order));
    } else {
      return orders;
    }
  }
}
