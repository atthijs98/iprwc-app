import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product.model";
import {ProductService} from "../product/product.service";
import {ProductImage} from "../../models/productImage.model";
import {map, take} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  slides: ProductImage[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getPromoProducts();
    if (this.products.length > 0) {
      this.initCarousel();
    }
  }

  initCarousel(): void {
    for (let i = 0; i < this.products.length; i++) {
      this.slides.push(this.products[i].productImages[0]);
    }
  }

}
