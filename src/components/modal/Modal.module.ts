import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ModalComponent }  from './modal';

@NgModule({
  declarations: [
    ModalComponent
    ],
  imports:      [
    IonicModule
    ],
  exports:
  [
    ModalComponent
  ]
})
export class ModalModule { }
