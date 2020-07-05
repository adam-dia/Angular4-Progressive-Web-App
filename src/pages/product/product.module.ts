import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductPage } from './product';
import { SearchBarModule } from '../../components/search-bar/Search-bar.module';
import { ProductInfoModule } from '../../components/product-info/productInfo.module';
import { MenuCartModule } from '../../components/menu-cart/menu-cart.module';
import { LogoModule } from '../../components/logo/logo.module';
import { HeaderModule } from '../../components/header/header.module';
import { ProductDescriptionModule } from '../../components/product-description/productDescription.module';
import { LoaderModule } from '../../components/loader/loader.module';

@NgModule({
  declarations: [
    ProductPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductPage),
    SearchBarModule,
    ProductInfoModule,
    LogoModule,
    MenuCartModule,
    HeaderModule,
    LoaderModule,
    ProductDescriptionModule,
  ],
})
export class ProductPageModule {}
