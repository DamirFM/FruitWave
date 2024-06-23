
// Purpose: The CartService manages the state of the shopping cart across the application.
// BehaviorSubject: Used to store and notify subscribers of changes in the cart items.
// addToCart Method: Adds products to the cart, updates the cart state, displays a message to the user, and logs the updated cart state.


import { Injectable } from "@angular/core";
// Imports BehaviorSubject from RxJS, which is used to store and broadcast the latest value to its subscribers.
import { BehaviorSubject } from "rxjs";
import { Cart, CartItem } from "../models/cart.model";
// Imports MatSnackBar from Angular Material's snack bar module, used for displaying messages to the user.
import { MatSnackBar } from "@angular/material/snack-bar";


// Decorates the CartService class with @Injectable, indicating that Angular should provide this service at the root level, making it available throughout the application.
@Injectable({
  providedIn: "root",
})
export class CartService {
  // Initializes a BehaviorSubject named cart with an initial value of an empty array ({ items: [] }). This BehaviorSubject holds the current state of the cart.
  cart = new BehaviorSubject<Cart>({ items: [] });
  // Defines the constructor of the CartService class. It injects the MatSnackBar service (_snackBar) to display messages to the user.
  constructor(private _snackBar: MatSnackBar) {}
  // Method that adds a product to the cart. It takes a product object as an argument and adds it to the cart.
  addToCart(product: any): void {
    // Creates a copy of the current items array in the cart using the spread operator (...). This ensures that the original array is not modified.
    const items = [...this.cart.value.items];
    // Checks if the product to be added (product) already exists in the cart (items) based on its id.
    const itemsInCart = items.find((_item) => _item.id === product.id);
    // Conditionally increments the quantity of an existing item in the cart or adds a new item with a quantity of 1 if it doesn't exist.
    if (itemsInCart) {
      itemsInCart.quantity += 1;
    } else {
      items.push({ ...product, quantity: 1 }); // Adds the product to cart with quantity 1
    }
    // Updates the cart BehaviorSubject with the new items array, notifying all subscribers of the change.
    this.cart.next({ items }); // Updates the cart BehaviorSubject with the new items array

    // Displays a snack bar message informing the user that the product was successfully added to the cart, with a duration of 2000 milliseconds (2 seconds).
    this._snackBar.open("Product added to cart", "Close", {
      duration: 2000, // Duration for which the snack bar will be displayed (in milliseconds)
    });

    console.log(this.cart.value); // Logs the current value of the cart to the console
  }
  getTotal(items: CartItem[]): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }
}
// export CartService to the home component
