import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { OrderItemsComponent }  from './order-items';

@NgModule({
  declarations: [
    OrderItemsComponent
    ],
  imports:      [
    IonicModule
    ],
  exports:
  [
    OrderItemsComponent
  ]
})
export class OrderItemsModule { }
