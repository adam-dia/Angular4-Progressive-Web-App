import { Component } from '@angular/core';

@Component({
  selector: 'order-items',
  templateUrl: 'order-items.html'
})
export class OrderItemsComponent {

  text: string;

  constructor() {
    // console.log('Hello OrderItemsComponent Component');
    this.text = 'Hello World';
  }

}
