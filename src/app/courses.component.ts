// We need to import the Component decorator from the Angular core library.
// Component decorator is a function that takes a metadata object that tells Angular how to create a component.
import { Component } from '@angular/core';
import { CoursesService } from './courses.service';

@Component({
    // selector is a CSS selector that tells Angular to create and insert 
    // an instance of this component wherever it finds the corresponding tag in the HTML.
    selector: 'courses',
    // template is the HTML markup that needs to be rendered for this component.
    // derective *ngFor is used to iterate over the courses array and render a list of courses.
    template: `
    <h2>{{ getTitle() }}</h2>
    <ul>
        <li *ngFor="let course of courses">
            {{ course }}
        </li>
    </ul>
    `
})

export class CoursesComponent {
    title = 'List of courses';
    courses;

    constructor(service: CoursesService ) {
        
        this.courses = service.getCourses();
    }
  
    getTitle() {
        return this.title;
    }
}