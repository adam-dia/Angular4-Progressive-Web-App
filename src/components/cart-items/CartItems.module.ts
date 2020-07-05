import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CartItemsComponent }  from './cart-items';
import { LoaderModule }  from '../../components/loader/loader.module';

@NgModule({
  declarations: [
    CartItemsComponent
    ],
  imports:      [
    IonicModule,
    LoaderModule,
    ],
  exports:
  [
    CartItemsComponent
  ]
})
export class CartItemModule { }
