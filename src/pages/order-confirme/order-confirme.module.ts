import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderConfirmePage } from './order-confirme';
import { OrderItemsModule } from '../../components/order-items/OrderItems.module';
import { ModalModule } from '../../components/modal/Modal.module';
import { LoaderModule } from '../../components/loader/loader.module';
@NgModule({
  declarations: [
    OrderConfirmePage,
  ],
  imports: [
    IonicPageModule.forChild(OrderConfirmePage),
    OrderItemsModule,
    ModalModule,
    LoaderModule,
  ],
})
export class OrderConfirmePageModule {}
