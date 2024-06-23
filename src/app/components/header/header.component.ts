// In this component we will grab the cart data from the service and display it in the header component
import { Component, Input } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent  {

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

  constructor(private CartService: CartService) { }

  getTotal(items: Array<CartItem>): number {
    return this.CartService.getTotal(this.cart.items);
   }

}
