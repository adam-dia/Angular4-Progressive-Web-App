import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CategoryItemComponent }  from './category-item';

@NgModule({
  declarations: [
    CategoryItemComponent
    ],
  imports:      [
    IonicModule
    ],
  exports:
  [
    CategoryItemComponent
  ]
})
export class CategoryItemsModule { }
