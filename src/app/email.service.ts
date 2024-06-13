import { Injectable } from '@angular/core';
// Injectable decorator is a function that takes a metadata object that tells Angular 
// that a service might have dependencies that need to be injected into the constructor.
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }
}
