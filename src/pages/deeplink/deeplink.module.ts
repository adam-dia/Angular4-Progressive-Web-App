import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeeplinkPage } from './deeplink';

@NgModule({
  declarations: [
    DeeplinkPage,
  ],
  imports: [
    IonicPageModule.forChild(DeeplinkPage),
  ],
})
export class DeeplinkPageModule {}
