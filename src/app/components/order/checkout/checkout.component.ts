import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Item } from '../../../models/item.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  items: Item[]

  constructor(private shoppingListService: ShoppingListService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.items = this.shoppingListService.getProducts();
  }

  cancelCheckout():void {
    this.shoppingListService.triggerSubject();
    this.router.navigate(['/order']);
  }

  generatePDF(): void {
    this.snackbar.open('pdf generated', '',{duration: 3000});
  }

  placeOrder(): void {
    this.router.navigate(['/products']);
    this.shoppingListService.flush();
    this.snackbar.open('order placed', '',{duration: 3000});
  }
}
