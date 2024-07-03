// In this component we will grab the cart data from the service and display it in the header component
import { Component, Input,HostListener } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {

  scrollDirection: 'up' | 'down' = 'up'; // Initialize scrollDirection

  lastScrollTop = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.scrollDirection = scrollTop > this.lastScrollTop ? 'down' : 'up';
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  // Initializes a private property named _cart with an initial value of an empty cart object.
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;
  // To recieve the cart data from the parent component, we will use the @Input() decorator.
  @Input()
  // getter method to return the cart data
  get cart(): Cart {
    return this._cart;
  }
  // setter method to set the cart data
  set cart(cart: Cart) {
    // set the cart data to the private property _cart
    this._cart = cart;
    // calculate the total quantity of items in the cart
    this.itemsQuantity = this._cart.items.
    map(item => item.quantity).
    reduce((prev, curr) => prev + curr, 0);
  }

  constructor(private cartService: CartService) { }
  // getTotal already decleared in cart.service.ts file
  // we re-use the method here
  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
   }

}
