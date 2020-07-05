import { Component } from '@angular/core';

@Component({
  selector: 'product-info',
  templateUrl: 'product-info.html'
})
export class ProductInfoComponent {

  text: string;

  constructor() {
    // console.log('Hello ProductInfoComponent Component');
    this.text = 'Hello World';
  }

}
