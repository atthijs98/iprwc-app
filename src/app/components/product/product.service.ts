import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../../models/product.model';
import { Observable, Subject, Subscription, throwError } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShoppingListService } from '../order/shopping-list/shopping-list.service';
import {ProductImage} from "../../models/productImage.model";

@Injectable()
export class ProductService {
  productSelected = new EventEmitter<Product>();
  productsChanged = new Subject<Product[]>();

  private products: Product[] = [];

  constructor(private httpService: HttpService,
              private snackbar: MatSnackBar,
              private shoppingListService: ShoppingListService) {}

  getProducts(): Product[] {
    return this.products.slice();
  }

  // @ts-ignore
  getProduct(id: number): Product {
    for (let i = 0; i < this.products.length; i++) {
      if (id === this.products[i].id) {
        return this.products[i];
      }
    }
  }

  getPromoProducts(): Product[] {
    let promo = [];
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].englishTitle === "Pan's Labyrinth" ||
        this.products[i].englishTitle === "La Haine" ||
        this.products[i].englishTitle === "Chungking Express") {
        promo.push (this.products[i]);
      }
    }
    return promo;
  }

  removeProduct(id: number): void {
    for (let i = 0; i < this.products.length; i++) {
      if (id === this.products[i].id) {
        this.products.splice(i, 1);
        this.productsChanged.next(this.products.slice());
      }
    }
    this.deleteProduct(id);
  }

  deleteProduct(id: number): void{
    this.httpService.delete({
      endpoint: `/admin/product/${id}`,
      public: false
    }).subscribe({
      next: data => {
        this.snackbar.open('Product successvol verwijderd.')
      },
      error: error => {
        if (error.status !== 200) {
          this.snackbar.open('Er ging iets mis bij het verwijderen, probeer het later opnieuw')
        } else {
          this.snackbar.open('Product successvol verwijderd.')
        }
      }
    })
  }

  addProduct(product: Product): Subscription {
    this.products.push(product);
    this.productsChanged.next(this.products.slice());

    return this.httpService.post({
      endpoint: '/admin/product',
      public: false,
      body: JSON.stringify(product)
    }).subscribe(
      data => {
        this.snackbar.open('Product succesvol toegevoegd', '', {
          duration: 3000
        })
      },
      () => {
        this.snackbar.open('Er ging iets mis met het toevoegen van het product, probeer het later opnieuw', '', {
          duration: 3000
        })
      }
    );
  }

  updateProduct(id: number, updatedProduct: Product) {
    for (let i = 0; i < this.products.length; i++) {
      if (id == this.products[i]['id']) {
        this.products[i] = updatedProduct;
        this.productsChanged.next(this.products.slice());
      }
    }
    this.putProduct(id, updatedProduct);
  }

  putProduct(id: number, productToUpdate: Product): Subscription {
    return this.httpService.put({
      endpoint: `/admin/product/${id}`,
      public: false,
      body: JSON.stringify(productToUpdate)
    }).subscribe(
      data => {
        this.snackbar.open('Product successvol bijgewerkt.', '', {
          duration: 3000
        });
      },
      () => {
        this.snackbar.open('Er ging iets mis met update van het product, probeer het later opnieuw', '', {
          duration: 3000
        });
      }
    )
  }

  setProducts(products: Product[]): void {
    this.products = products;
    this.productsChanged.next(this.products.slice());
  }

  fetchProducts(): Observable<unknown> {
    return this.httpService.get({
      endpoint: '/product/',
      public: false
    }).pipe(
      tap(products => {
        this.setProducts(products.body);
      }),
      catchError(this.handleError)
      );
  }

  removeImage(productId: number, imageId: number): void {
    for (let i = 0; i < this.products.length; i++) {
      if (productId === this.products[i].id) {
        for (let j = 0; j < this.products[i].productImages.length; j++) {
          if (imageId === this.products[i].productImages[j].id) {
            this.products[i].productImages.splice(j, 1);
            this.productsChanged.next(this.products.slice());
          }
        }
      }
    }
    this.deleteImage(imageId);
  }

  removeDirector(productId: number, directorId: number): void {
    for (let i = 0; i < this.products.length; i++) {
      if (productId === this.products[i].id) {
        for (let j = 0; j < this.products[i].productDirectors.length; j++) {
          if (directorId === this.products[i].productDirectors[j].id) {
            this.products[i].productDirectors.splice(j, 1);
            this.productsChanged.next(this.products.slice());
          }
        }
      }
    }
    this.deleteDirector(directorId);
  }

  deleteDirector(directorId: number): void {
    this.httpService.delete({
      endpoint: `/admin/productDirector/${directorId}`,
      public: false
    }).subscribe({
      next: data => {
        this.snackbar.open('Regisseur successvol verwijderd.','', {
          duration: 3000
        })
      },
      error: error => {
        if (error.status !== 200) {
          this.snackbar.open('Er ging iets mis bij het verwijderen, probeer het later opnieuw')
        } else {
          this.snackbar.open('Regisseur successvol verwijderd.')
        }
      }
    })
  }

  deleteImage(imageId: number): void {
    this.httpService.delete({
      endpoint: `/admin/productImage/${imageId}`,
      public: false
    }).subscribe({
      next: data => {
        this.snackbar.open('Afbeelding successvol verwijderd.','', {
          duration: 3000
        })
      },
      error: error => {
        if (error.status !== 200) {
          this.snackbar.open('Er ging iets mis bij het verwijderen, probeer het later opnieuw')
        } else {
          this.snackbar.open('Afbeelding successvol verwijderd.')
        }
      }
    })
  }

  addToShoppingList(product: Product): void {
    this.shoppingListService.addProduct(product);
  }

  handleError(error: any): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      if (error.error.status === 404) {
        errorMessage = `Not found`;
      }
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
