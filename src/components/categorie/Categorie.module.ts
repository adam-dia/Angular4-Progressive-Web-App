import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CategorieComponent }  from './categorie';

@NgModule({
  declarations: [
    CategorieComponent
    ],
  imports:      [
    IonicModule
    ],
  exports:
  [
    CategorieComponent
  ]
})
export class CategorieModule { }
