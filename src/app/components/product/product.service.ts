import {EventEmitter, Injectable} from "@angular/core";
import {Product} from "../../models/product.model";
import {Observable, Subject, Subscription, throwError} from "rxjs";
import {HttpService} from "../../shared/services/http.service";
import {catchError, tap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {newArray} from "@angular/compiler/src/util";

@Injectable()
export class ProductService {
  productSelected = new EventEmitter<Product>();
  productsChanged = new Subject<Product[]>();

  private products: Product[] = [];

  constructor(private httpService: HttpService,
              private snackbar: MatSnackBar) {}

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
        console.log(data);
      },
      () => {
        this.snackbar.open('Er ging iets mis met inloggen, probeer het later opnieuw')
      }
    );
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

  // @ts-ignore
  handleError(error): Observable<never> {
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
