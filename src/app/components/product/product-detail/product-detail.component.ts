import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../../../shared/services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProductImage } from '../../../models/productImage.model';
import { MatCarouselModule, MatCarouselComponent } from '@ngbmodule/material-carousel';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: number;
  slides: ProductImage[];
  @ViewChild('matCarousel') matCarousel: MatCarouselComponent;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private httpService: HttpService,
              public dialog: MatDialog,
              private snackbar: MatSnackBar,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.product = this.productService.getProduct(this.id);
        this.slides = this.product.productImages;
      }
    );
  }

  toShoppingList(): void {
    // this.productService.addToShoppingList(this.product);
    // this.snackBar.open('product added to shopping cart!', '', {duration: 3000});
  }

  trustSrcUrl(data: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(data);
  }

  xor(a: any, b: any): boolean {
    return (a || b) && !(a && b);
  }

}
