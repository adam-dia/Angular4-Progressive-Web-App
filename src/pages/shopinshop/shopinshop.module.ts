import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopinshopPage } from './shopinshop';
import { LoaderModule } from '../../components/loader/loader.module';
import { PipesModule } from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    ShopinshopPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopinshopPage),
    LoaderModule,
    PipesModule
  ],
})
export class ShopinshopPageModule { }
