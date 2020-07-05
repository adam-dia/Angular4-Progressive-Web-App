import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PushTwoBannerComponent }  from './pushTwo-banner';

@NgModule({
  declarations: [
    PushTwoBannerComponent
    ],
  imports:      [
    IonicModule
    ],
  exports:
  [
    PushTwoBannerComponent
  ]
})
export class PushTwoBannerModule { }
