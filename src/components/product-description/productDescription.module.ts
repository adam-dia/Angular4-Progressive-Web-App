import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ProductDescriptionComponent }  from './product-description';

@NgModule({
  declarations: [
    ProductDescriptionComponent
    ],
  imports:      [
    IonicModule
    ],
  exports:
  [
    ProductDescriptionComponent
  ]
})
export class ProductDescriptionModule { }
