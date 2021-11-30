import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Product} from '../../models/product.model';
import {map, take} from 'rxjs/operators';
import {ProductService} from '../../components/product/product.service';

@Injectable({providedIn: 'root'})
export class ProductResolverService implements Resolve<Product[]> {
  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const products = this.productService.getProducts();
    if (products.length === 0) {
      // @ts-ignore
      return this.productService.fetchProducts().pipe(take(1), map((product: Product) => product));
    } else {
      // @ts-ignore
      return products;
    }
  }
}
