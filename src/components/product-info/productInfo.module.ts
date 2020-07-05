import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ProductInfoComponent }  from './product-info';

@NgModule({
  declarations: [
    ProductInfoComponent
    ],
  imports:      [
    IonicModule
    ],
  exports:
  [
    ProductInfoComponent
  ]
})
export class ProductInfoModule { }
