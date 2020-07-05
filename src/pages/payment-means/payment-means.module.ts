import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentMeansPage } from './payment-means';

@NgModule({
  declarations: [
    PaymentMeansPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentMeansPage),
  ],
})
export class PaymentMeansPageModule {}
