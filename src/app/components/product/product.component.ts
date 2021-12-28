import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  selectedProduct: Product;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.productSelected.subscribe(
      (product: Product) => {
        this.selectedProduct = product;
      }
    )
  }

}
