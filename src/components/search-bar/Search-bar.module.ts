import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SearchBarComponent }  from './search-bar';

@NgModule({
  declarations: [
    SearchBarComponent
    ],
  imports:      [
    IonicModule
    ],
  exports:
  [
    SearchBarComponent
  ]
})
export class SearchBarModule { }
