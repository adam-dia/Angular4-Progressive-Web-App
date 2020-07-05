import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { HeaderModule } from '../../components/header/header.module';
import { LoaderModule } from '../../components/loader/loader.module';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    LoaderModule,
    HeaderModule,
  ],
})
export class LoginPageModule {}
