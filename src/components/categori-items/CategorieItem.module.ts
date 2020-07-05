import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CategoriItemsComponent }  from './categori-items';

@NgModule({
  declarations: [
    CategoriItemsComponent
    ],
  imports:      [
    IonicModule
    ],
  exports:
  [
    CategoriItemsComponent
  ]
})
export class CategorieItemsModule { }
