import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StepPaymentPage } from './step-payment';
import { LoaderModule } from '../../components/loader/loader.module';


@NgModule({
  declarations: [
    StepPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(StepPaymentPage),
    LoaderModule,
  ],
})
export class StepPaymentPageModule {}
