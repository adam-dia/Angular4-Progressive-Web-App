import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PromoItemComponent }  from './promo-item';

@NgModule({
  declarations: [
    PromoItemComponent
    ],
  imports:      [
    IonicModule
    ],
  exports:
  [
    PromoItemComponent
  ]
})
export class PromoItemModule { }
