import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAccountPage } from './my-account';
import { HeaderModule } from '../../components/header/header.module';
import { LoaderModule } from '../../components/loader/loader.module';

@NgModule({
  declarations: [
    MyAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(MyAccountPage),
    HeaderModule,
    LoaderModule,
  ],
})
export class MyAccountPageModule {}
