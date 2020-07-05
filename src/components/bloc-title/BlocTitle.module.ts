import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BlocTitleComponent }  from './bloc-title';

@NgModule({
  declarations: [
    BlocTitleComponent
    ],
  imports:      [
    IonicModule
    ],
  exports:
  [
    BlocTitleComponent
  ]
})
export class BlocTitleModule { }
