import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountPage } from './account';
import { HeaderModule } from '../../components/header/header.module';
import { LoaderModule } from '../../components/loader/loader.module';
@NgModule({
  declarations: [
    AccountPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountPage),
    HeaderModule,
    LoaderModule,
  ],
})
export class AccountPageModule {}
