import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { UserComponent }  from './user';
import { LoaderModule } from '../../components/loader/loader.module'
@NgModule({
  declarations: [
    UserComponent
    ],
  imports:      [
    IonicModule,
    LoaderModule
    ],
  exports:
  [
    UserComponent
  ]
})
export class UserModule { }
