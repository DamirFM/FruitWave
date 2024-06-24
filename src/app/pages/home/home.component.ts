import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

// Object to hold the height of the rows
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 2: 350, 3: 335, 4: 350, 5: 350 };

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
  breakpointSubscription: Subscription | undefined;
  isMobile = false;

  constructor(
    private cartService: CartService,
    private storeService: StoreService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.breakpointSubscription = this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall] || result.breakpoints[Breakpoints.Small]) {
        this.isMobile = true;
        this.onColumsCountChange(1);
      } else {
        this.isMobile = false;
        if (result.breakpoints[Breakpoints.Medium]) {
          this.onColumsCountChange(3);
        } else if (result.breakpoints[Breakpoints.Large]) {
          this.onColumsCountChange(4);
        } else if (result.breakpoints[Breakpoints.XLarge]) {
          this.onColumsCountChange(5);
        }
      }
    });
  }

  getProducts(): void {
    console.log(`Getting products with count: ${this.count}, sort: ${this.sort}, category: ${this.category}`);
    this.productsSubscription = this.storeService.getAllProducts(this.count.toString(), this.sort.toString(), this.category)
      .subscribe((_products) => {
        console.log('Products received:', _products);
        this.products = _products;
      });
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
    this.getProducts();
  }

  onItemsUpdated(count: number): void {
    console.log(`Items count updated to: ${count}`);
    this.count = count;
    this.getProducts();
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
    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
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
