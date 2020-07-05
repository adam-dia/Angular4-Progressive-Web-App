import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CongratPage } from './congrat';
import { HeaderModule } from '../../components/header/header.module';

@NgModule({
  declarations: [
    CongratPage,
  ],
  imports: [
    IonicPageModule.forChild(CongratPage),
    HeaderModule,
  ],
})
export class CongratPageModule {}
