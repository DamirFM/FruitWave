import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html',
 
})
export class FiltersComponent implements OnInit, OnDestroy {
  // This is the way how we sand date outside of the component to the parent component
  // Output is a decorator that we use to create an event emitter
  // EventEmitter is a class that we use
  // number is a type of the data that we want to send
  @Output() categoryPickChange = new EventEmitter<string>();

  categoriesSubscription: Subscription | undefined;

  categories: Array<string>| undefined;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
   this.categoriesSubscription= this.storeService.getAllCategories()
    .subscribe((response) => {
      this.categories = response;
    });
  }

  onCategoryUpdated(category: string): void {
    // we need send this value to the parent component
    // we will create event emitter @Output() in the parent component
    this.categoryPickChange.emit(category);
  }

  ngOnDestroy (): void {
    if (this.categoriesSubscription){
      this.categoriesSubscription.unsubscribe();
    }
  }

}
