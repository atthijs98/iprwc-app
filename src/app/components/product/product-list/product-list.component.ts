import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../../models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.subscription = this.productService.productsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
    this.products = this.productService.getProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
