import { Component } from '@angular/core';

@Component({
  selector: 'product-description',
  templateUrl: 'product-description.html'
})
export class ProductDescriptionComponent {

  text: string;

  constructor() {
    // console.log('Hello ProductDescriptionComponent Component');
    this.text = 'Hello World';
  }

}
