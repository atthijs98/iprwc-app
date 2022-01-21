import { DataSource } from '@angular/cdk/collections';
import { Order } from '../../../../models/order.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../../../../shared/services/user.service';

export class OrderListDatasource extends DataSource<Order> {
  data: Order[] = [];
  paginator: MatPaginator;
  sort: MatSort;
  userService: UserService;

  constructor(orders: Order[], paginator: MatPaginator, sort: MatSort, userService: UserService) {
    super();
    this.data = orders;
    this.paginator = paginator;
    this.sort = sort;
    this.userService = userService;
  }

  connect(): Observable<Order[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect(): void {}

  private getPagedData(data: Order[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: Order[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'user': return compare(this.getEmail(a), this.getEmail(b), isAsc);
        case 'date': return compare(a.dateCreated, b.dateCreated, isAsc);
        default: return 0;
      }
    });
  }

  private getEmail(a: any) {
    return this.userService.getUser(a.userId).email;
  }
}



function compare(a: any, b: any, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
