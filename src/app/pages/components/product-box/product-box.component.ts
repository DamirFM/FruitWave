import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
})
export class ProductBoxComponent implements OnInit {
[x: string]: any;
  // Input for product data
  @Input() fullWidthMode = false
cols: any;
rowHeight: any;

  // Input for product data
  product: Product | undefined = {
    name: 'New Balance',
    id: 1,
    title: 'New nalance',
    price: 150,
    category: 'shoes',
    description: 'Shop the iconic 990 collection from New Balance. These timeless models have earned their name as a staple in fashion footwear.',
    image: 'https://via.placeholder.com/150',
  };
  // Output - this is the way how we communicate between parent and child components
  @Output() addToCart = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  // Method to handle the Add to Cart button click event
  // 1. create product data
  // 2. emit the product data to the parent component
  // 3. add Output decorator to the event emitter

  onAddtoCart(): void{
    this.addToCart.emit(this.product);
    console.log('Add to cart');
  }
}
