import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Item } from '../../../models/item.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import {AuthService} from "../../../auth/auth.service";
import {OrderService} from "../order.service";
import {Order} from "../../../models/order.model";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  items: Item[];
  postCodeRegex: RegExp = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;
  paymentMethods = [
    {name: 'Mastercard', abbrev: 'MA'},
    {name: 'American Express', abbrev: 'AE'},
    {name: 'Visa', abbrev: 'VI'},
    {name: 'Paypal', abbrev: 'PA'},
    {name: 'Ideal', abbrev: 'ID'},
  ];

  checkoutForm = new FormGroup({
    address: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    zipcode: new FormControl('', [Validators.required, Validators.pattern(this.postCodeRegex), Validators.maxLength(100)]),
    city: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    paymentMethod: new FormControl('', [Validators.required])
  });

  constructor(private shoppingListService: ShoppingListService,
              private router: Router,
              private snackbar: MatSnackBar,
              public userService: UserService,
              public authService: AuthService,
              public orderService: OrderService) { }

  ngOnInit(): void {
    this.items = this.shoppingListService.getProducts();
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      let formValues = this.checkoutForm.value;
      formValues.orderNumber = this.orderService.generateOrderNumber();
      formValues.total = this.shoppingListService.getTotal();
      formValues.user = this.userService.currentUser;
      formValues.items = this.items;
      // this.orderService.addOrder(formValues);
      this.shoppingListService.flush();
    }
  }

  cancelCheckout():void {
    this.shoppingListService.triggerSubject();
    this.router.navigate(['/order']);
  }
}
