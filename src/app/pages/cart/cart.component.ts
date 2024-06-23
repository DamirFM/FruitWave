import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
// @Component({...})
// Decorator that marks the class as an Angular component and provides metadata about the component.
@Component({
  // Defines the HTML tag that will be used to insert this component in a template.
  selector: 'app-cart',
  // Specifies the path to the HTML file that defines the component's template.
  templateUrl: './cart.component.html',
})
// Defines the CartComponent class and implements the OnInit interface. This interface requires the class to define an ngOnInit method.
// keep in mind the cart.model.ts file is not included in the snippet
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [{
      product: 'https://via.placeholder.com/150',
      name: 'Shoes',
      price: 150,
      quantity: 1,
      id: 1,
    },
    {
      product: 'https://via.placeholder.com/150',
      name: 'T-shirt',
      price: 100,
      quantity: 2,
      id: 1,
    }]
  };

  // Data source for the table - an array of CartItem objects
  // Defines a dataSource property which is an array of CartItem objects. Initially, this array is empty. This property will be used as the data source for the table in the component's template.
  dataSource: Array<CartItem> = [];
  // Columns to be displayed in the table
  // Defines a displayedColumns property which is an array of strings. Each string corresponds to a column in the table that will be displayed in the component's template.
  displayedColumns: Array<string> = [
    'product',
    'name', 
    'price', 
    'quantity', 
    'total',
    'action'
  ];


  // Defines a constructor for the CartComponent class. The constructor is empty because no initial setup or dependency injection is needed.
  constructor(private CartService: CartService) { }

  // Defines the ngOnInit method, which is a lifecycle hook that Angular calls after creating the component. This method is used to perform component initialization logic.
  ngOnInit(): void {
    // Set dataSource to the items in the cart
    // this.dataSource = this.cart.items;
    // Sets the dataSource property to the items in the cart. This populates the dataSource array with the cart items, making them available for display in the table.
    this.dataSource = this.cart.items;
  }
  // Defines a method called getTotal that calculates the total price of all items in the cart. The method uses the reduce function to iterate over the items array and calculate the total price by summing the product of the item price and quantity for each item.
  getTotal(items: Array<CartItem>): number {
   return this.CartService.getTotal(this.cart.items);
  }
}
