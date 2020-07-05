import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SlidersComponent }  from './sliders';

@NgModule({
  declarations: [
    SlidersComponent
    ],
  imports:      [
    IonicModule
    ],
  exports:
  [
    SlidersComponent
  ]
})
export class SliderBarModule { }
