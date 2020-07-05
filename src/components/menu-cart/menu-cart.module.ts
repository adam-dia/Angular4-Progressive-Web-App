import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MenuCartComponent }  from './menu-cart';

@NgModule({
  declarations: [
    MenuCartComponent
    ],
  imports:      [
    IonicModule
    ],
  exports:
  [
    MenuCartComponent
  ]
})
export class MenuCartModule { }
