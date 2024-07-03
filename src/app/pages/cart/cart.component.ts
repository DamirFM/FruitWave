import { Component, OnInit, HostListener } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  // styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Cart = {items: []};
  isMobile: boolean = false;

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name', 
    'price', 
    'quantity', 
    'total',
    'action'
  ];

  constructor(private cartService: CartService, private http: HttpClient, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });

    this.checkScreenSize();
    this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
      map(result => result.matches)
    ).subscribe(isHandset => {
      this.isMobile = isHandset;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveItem(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.removeQuantity(item);
    } else {
      this.cartService.removeFromCart(item);
    }
  }

  onCheckout(): void {
    this.http
      .post('http://localhost:4242/checkout', {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe('pk_test_51PVDbpRq1jUUHxJf32MC4IsO5E6nR5pKY0q1omwsipXvMVJDUrft2BxeS3w0tSmG0mo5S9GIIwS4yG9SundRI6ZV002APgyQyz');
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
}
