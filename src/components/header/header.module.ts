import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HeaderComponent }  from './header';
import { MenuToggleModule }  from '../menu-toggle/menu-toggle.module';
import { UserModule }  from '../user/user.module';
import { MenuCartModule }  from '../menu-cart/menu-cart.module';
import { LogoModule }  from '../logo/logo.module';

@NgModule({
  declarations: [
    HeaderComponent
    ],
  imports:      [
    IonicModule,
    MenuToggleModule,
    LogoModule,
    UserModule,
    MenuCartModule,
    ],
  exports:
  [
    HeaderComponent
  ]
})
export class HeaderModule { }
