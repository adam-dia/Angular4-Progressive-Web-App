import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartPage } from './cart';
import { CartItemModule } from '../../components/cart-items/CartItems.module';
import { HeaderModule } from '../../components/header/header.module';
import { LoaderModule } from '../../components/loader/loader.module';

@NgModule({
  declarations: [
    CartPage,
  ],
  imports: [
    IonicPageModule.forChild(CartPage),
    CartItemModule,
    HeaderModule,
    LoaderModule,
  ],
})
export class CartPageModule {}
