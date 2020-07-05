import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FilterComponent }  from './filter';

@NgModule({
  declarations: [
    FilterComponent
    ],
  imports:      [
    IonicModule
    ],
  exports:
  [
    FilterComponent
  ]
})
export class FilterModule { }
