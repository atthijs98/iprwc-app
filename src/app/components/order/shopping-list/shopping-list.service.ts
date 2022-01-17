import { Subject } from 'rxjs';
import { Product } from '../../../models/product.model';
import { Item } from '../../../models/item.model';

export class ShoppingListService {
  itemsChanged = new Subject<Item[]>();
  startedEditing = new Subject<number>();
  private checkoutStatus: boolean = false;
  private items: Item[] = [];

  getProducts(): Item[] {
    return this.items.slice();
  }

  flush(): void {
    this.items = [];
    this.itemsChanged.next(this.items.slice());
  }

  getProduct(id: number): Item | undefined {
    let product;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        product = this.items[i];
        break;
      }
    }
    return product;
  }

  getTotal(): number {
    let total = 0;
    for (let i = 0; i < this.items.length; i++) {
      total += this.items[i].total;
    }
    return total;
  }

  addProduct(product: Product): void {
    const pp = this.checkForDuplicate(product);
    if (!pp) {
      const newItem = new Item(Math.floor(Math.random() * 10000),1, product.price, product);
      this.items.push(newItem);
      this.itemsChanged.next(this.items.slice());
    } else {
      this.incrementItem(pp);
    }
  }

  incrementItem(item: Item): void {
    for (let i = 0; i < this.items.length; i++) {
      if (item.id === this.items[i].id) {
        const newItem = new Item(this.items[i].id, this.items[i].amount + 1, this.items[i].product.price * (this.items[i].amount + 1),this.items[i].product);
        this.items[i] = newItem;
        this.itemsChanged.next(this.items.slice());
      }
    }
  }

  decrementItem(item: Item): void {
    for (let i = 0; i < this.items.length; i++) {
      if (item.id === this.items[i].id) {
        const newItem = new Item(this.items[i].id, this.items[i].amount - 1, this.items[i].product.price * (this.items[i].amount - 1),this.items[i].product);
        this.items[i] = newItem;
        if (this.items[i].amount === 0 ) {
          this.deleteProduct(this.items[i].id);
        }
        this.itemsChanged.next(this.items.slice());
      }
    }
  }

  checkForDuplicate(product: Product): any {
    for (let i = 0; i < this.items.length; i++) {
      if (product.id === this.items[i].product.id) {
        return this.items[i];
      }
    }
    return false;
  }

  deleteProduct(id: number): void {
    for (let i = 0; i < this.items.length; i++) {
      if (id === this.items[i].id) {
        this.items.splice(i, 1);
        this.itemsChanged.next(this.items.slice());
      }
    }
  }

  triggerSubject(): void {
    this.itemsChanged.next(this.items.slice());
  }

}
