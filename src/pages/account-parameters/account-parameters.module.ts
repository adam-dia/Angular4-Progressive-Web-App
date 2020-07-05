import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountParametersPage } from './account-parameters';
import { LoaderModule } from '../../components/loader/loader.module';

@NgModule({
  declarations: [
    AccountParametersPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountParametersPage),
    LoaderModule,
  ],
})
export class AccountParametersPageModule {}
