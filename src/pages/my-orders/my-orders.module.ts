import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyOrdersPage } from './my-orders';
import { HeaderModule } from '../../components/header/header.module';
import { LoaderModule } from '../../components/loader/loader.module';

@NgModule({
  declarations: [
    MyOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(MyOrdersPage),
    HeaderModule,
    LoaderModule,
  ],
})
export class MyOrdersPageModule {}
