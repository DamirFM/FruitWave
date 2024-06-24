import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

// Object to hold the height of the rows
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  category: string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];
  products: Array<Product> | undefined;
  sort = 'desc';
  count = 12;
  productsSubscription: Subscription | undefined;

  // Inject CartService and StoreService
  constructor(private cartService: CartService, private storeService: StoreService) {}

  ngOnInit(): void {
    this.updateColsBasedOnWidth();
    this.getProducts();
  }

  @HostListener('window:resize', ['$event'])
  onResize(_event: any) {
    this.updateColsBasedOnWidth();
  }

  getProducts(): void {
    console.log(`Getting products with count: ${this.count}, sort: ${this.sort}, category: ${this.category}`);
    this.productsSubscription = this.storeService.getAllProducts(this.count.toString(), this.sort.toString(), this.category)
      .subscribe((_products) => {
        console.log('Products received:', _products);
        this.products = _products;
      });
  }

  updateColsBasedOnWidth() {
    const width = window.innerWidth;
    console.log(`Window width: ${width}`);
    if (width <= 800) {
      this.onColumsCountChange(1);
    } else if (width <= 950) {
      this.onColumsCountChange(3);
    } else {
      this.onColumsCountChange(4);
    }
  }

  onColumsCountChange(colsNumber: number): void {
    console.log(`Changing columns count to: ${colsNumber}`);
    this.cols = colsNumber;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onCategoryChange(categoryPick: string): void {
    console.log(`Category changed to: ${categoryPick}`);
    this.category = categoryPick;
    this.getProducts();
  }

  onSortUpdated(sortOrder: string): void {
    console.log(`Sort order updated to: ${sortOrder}`);
    this.sort = sortOrder;
  }

  onItemsUpdated(count: number): void {
    console.log(`Items count updated to: ${count}`);
    this.count = count;
  }

  getGridClass() {
    return {
      'grid grid-cols-1 gap-4': this.cols === 1,
      'grid grid-cols-3 gap-4': this.cols === 3,
      'grid grid-cols-4 gap-4': this.cols === 4,
    };
  }

  onAddToCart(product: Product): void {
    console.log('Adding to cart:', product);
    this.cartService.addToCart({  
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  onItemsCountChange(newCount: number): void {
    this.count = newCount;
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }
}
