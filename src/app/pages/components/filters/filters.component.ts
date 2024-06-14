import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html',
 
})
export class FiltersComponent implements OnInit {
  // This is the way how we sand date outside of the component to the parent component
  // Output is a decorator that we use to create an event emitter
  // EventEmitter is a class that we use
  // number is a type of the data that we want to send
  @Output() categoryPickChange = new EventEmitter<string>();

  categories = ['All', 'Shirts', 'Pants', 'Shoes', 'Accessories'];

  constructor() { }

  ngOnInit(): void {
  }

  onCategoryUpdated(category: string): void {
    // we need send this value to the parent component
    // we will create event emitter @Output() in the parent component
    this.categoryPickChange.emit(category);
  }

}
