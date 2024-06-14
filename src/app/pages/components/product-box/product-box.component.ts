import { Component, OnInit, Input } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
