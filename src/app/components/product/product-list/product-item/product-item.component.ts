import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../../models/product.model";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
  @Input() id!: number;
  constructor() { }

  ngOnInit(): void {
  }

  onToggleDetails(): void {
    const element = document.getElementsByTagName('app-product-detail')[0];
    if (screen.width <= 600) {
      element.scrollIntoView();
    }
  }

}
