import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html' ,

})
export class ProductsHeaderComponent implements OnInit {
  // This is the way how we sand date outside of the component to the parent component
  // Output is a decorator that we use to create an event emitter
  // EventEmitter is a class that we use
  // number is a type of the data that we want to send
  // columsCountChange is a name of the event
  @Output() columsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange: EventEmitter<string> = new EventEmitter<string>();

  sort = 'desc';
  itemsShowCount = 12;

  constructor() { }

  ngOnInit(): void {
  }
  // onSortUpdated is a function for sorting the products
  onSortUpdated(newSort: string): void{
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }
  // onItemsUpdated is a function for updating the number of products shown
  onItemsUpdated(count: number): void{
    this.itemsShowCount = count;
    this.itemsCountChange.emit(count);
  }
  onColumnsUpdated(colums: number): void {
    // we need send this value to the parent component
    // we will create event emitter @Output() in the parent component
    this.columsCountChange.emit(colums);
  }
 

}
