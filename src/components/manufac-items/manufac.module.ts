import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ManufacItemsComponent }  from './manufac-items';

@NgModule({
  declarations: [
    ManufacItemsComponent
    ],
  imports:      [
    IonicModule
    ],
  exports:
  [
    ManufacItemsComponent
  ]
})
export class ManufacModule { }
