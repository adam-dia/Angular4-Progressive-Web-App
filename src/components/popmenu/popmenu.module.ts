import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PopmenuComponent }  from './popmenu';

@NgModule({
  declarations: [
    PopmenuComponent
    ],
  imports:      [
    IonicModule
    ],
  exports:
  [
    PopmenuComponent
  ]
})
export class PopMenu { }
