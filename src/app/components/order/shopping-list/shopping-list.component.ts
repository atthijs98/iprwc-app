import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from '../../../models/item.model';
import { ShoppingListService } from './shopping-list.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ShoppingListDatasource } from './shopping-list.datasource';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  items: Item[];
  total: number;
  disabled: boolean;
  itemsChanged: Subscription;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<Item[]>
  dataSource: ShoppingListDatasource;

  displayedColumns = ['poster', 'englishTitle', 'year', 'amount', 'price', 'subTotal', 'action'];

  constructor(private shoppingListService: ShoppingListService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.itemsChanged = this.shoppingListService.itemsChanged.subscribe(
      (items: Item[]) => {
        this.items = items;
        this.dataSource = new ShoppingListDatasource(this.items, this.paginator, this.sort);
        this.total = this.shoppingListService.getTotal();
        this.disabled = false;
      }
    );
    this.items = this.shoppingListService.getProducts();
    this.dataSource = new ShoppingListDatasource(this.items, this.paginator, this.sort);
    this.total = this.shoppingListService.getTotal();
    this.disabled = false;
  }

  goToCheckout(): void {
    this.disabled = true;
    this.router.navigate(['checkout'], {relativeTo: this.route});
  }

  decrement(item: Item): void {
    this.shoppingListService.decrementItem(item);
  }

  increment(item: Item): void {
    this.shoppingListService.incrementItem(item);
  }

  deleteItem(id: number): void {
    this.shoppingListService.deleteProduct(id);
  }

  ngOnDestroy(): void {
    this.itemsChanged.unsubscribe();
  }

  onEditItem(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }

}
