import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PushBannerComponent }  from './push-banner';

@NgModule({
  declarations: [
    PushBannerComponent
    ],
  imports:      [
    IonicModule
    ],
  exports:
  [
    PushBannerComponent
  ]
})
export class PushBannerModule { }
