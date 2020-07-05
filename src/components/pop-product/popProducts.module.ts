import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PopProductComponent }  from './pop-product';

@NgModule({
  declarations: [
    PopProductComponent
    ],
  imports:      [
    IonicModule
    ],
  exports:
  [
    PopProductComponent
  ]
})
export class PopProductsModule { }
