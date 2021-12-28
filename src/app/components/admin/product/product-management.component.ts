import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../product/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
  selectedProduct: Product;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.productService.productSelected.subscribe(
      (product: Product) => {
        this.selectedProduct = product;
      }
    );
  }

  newProduct(): void {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
