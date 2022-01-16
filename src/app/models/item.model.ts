import { Product } from './product.model';

export class Item {
  constructor(public id: number, public amount: number, public total: number, public product: Product) {
  }
}
