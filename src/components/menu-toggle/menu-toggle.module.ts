import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MenuToggleComponent }  from './menu-toggle';

@NgModule({
  declarations: [
    MenuToggleComponent
    ],
  imports:      [
    IonicModule
    ],
  exports:
  [
    MenuToggleComponent
  ]
})
export class MenuToggleModule { }
