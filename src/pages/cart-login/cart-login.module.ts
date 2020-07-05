import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartLoginPage } from './cart-login';
import { LoaderModule } from '../../components/loader/loader.module';

@NgModule({
  declarations: [
    CartLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(CartLoginPage),
    LoaderModule,

  ],
})
export class CartLoginPageModule {}
