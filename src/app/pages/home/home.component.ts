import { Component, OnInit, HostListener } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

// Object to hold the height of the rows
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  cols = 3;
  category = 'All';
  rowHeight = ROWS_HEIGHT[this.cols];
  // export CartService to the home component and go to addToCart method
  constructor( private cartService: CartService ) {}

  ngOnInit(): void {
    this.updateColsBasedOnWidth();
  };

  @HostListener('window:resize', ['$event'])
  onResize(_event: any) {
    this.updateColsBasedOnWidth();
  };

  updateColsBasedOnWidth() {
    const width = window.innerWidth;
    if (width <= 800) {
      this.onColumsCountChange(1);
    } else if (width <= 950) {
      this.onColumsCountChange(3);
    } else {
      this.onColumsCountChange(4);
    }
  };

  onColumsCountChange(colsNumber: number): void {
    this.cols = colsNumber;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  };

  onCategoryChange(categoryPick: string): void {
    this.category = categoryPick;
  };

  onSortUpdated(sortOrder: string): void {
    // Implement sorting logic here
  };

  onItemsUpdated(count: number): void {
    // Implement item count update logic here
  };

  getGridClass() {
    return {
      'grid grid-cols-1 gap-4': this.cols === 1,
      'grid grid-cols-3 gap-4': this.cols === 3,
      'grid grid-cols-4 gap-4': this.cols === 4,
    };
  };
  // we will create service to store the cart data
  onAddToCart(product: Product): void {
    this.cartService.addToCart(
    {  
      product: product.image,
      name: product.name,
      price: product.price,
      quantity: 1,
      id: product.id
    });
  }
}
