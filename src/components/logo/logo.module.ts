import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LogoComponent }  from './logo';

@NgModule({
  declarations: [
    LogoComponent
    ],
  imports:      [
    IonicModule
    ],
  exports:
  [
    LogoComponent
  ]
})
export class LogoModule { }
