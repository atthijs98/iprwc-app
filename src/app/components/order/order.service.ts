import { Injectable } from '@angular/core';
import { Order } from '../../models/order.model';
import { Observable, Subject, Subscription, throwError } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class OrderService {
  ordersChanged = new Subject<Order[]>();
  private orders: Order[] = [];

  constructor(private httpService: HttpService,
              private snackbar: MatSnackBar,
              private router: Router) {
  }

  getOrders(): Order[] {
    return this.orders.slice();
  }

  getOrder(id: number): Order | undefined {
    let order;
    for (let i = 0; i < this.orders.length; i++) {
      if (id === this.orders[i].id) {
        order = this.orders[i];
        break;
      }
    }
    return order;
  }

  addOrder(order: Order): Subscription {
    return this.httpService.post({
      endpoint: '/order',
      public: false,
      body: JSON.stringify(order)
    }).subscribe(
      data => {
        this.snackbar.open('Bestelling sucessvol geplaatst', '', {
          duration: 3000
        })
        this.orders.push(order);
        this.ordersChanged.next(this.orders.slice());
        this.router.navigate(['/products']);
      },
      () => {
        this.snackbar.open('Er is iets mis gegaan bij het plaatsen van de bestelling, probeer het later opnieuw', '', {
          duration: 3000
        })
      }
    );
  }

  setOrders(orders: Order[]): void {
    this.orders = orders;
    this.ordersChanged.next(this.orders.slice());
  }

  fetchOrders(): Observable<unknown> {
    return this.httpService.get({
      endpoint: '/order/',
      public: false
    }).pipe(
      tap(orders => {
        this.setOrders(orders.body);
      }),
      catchError(this.handleError)
    );
  }

  generateOrderNumber(): string {
   return '#'+ new Date().getUTCMilliseconds().toString();
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
}
