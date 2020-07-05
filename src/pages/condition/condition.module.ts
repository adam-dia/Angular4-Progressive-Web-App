import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConditionPage } from './condition';

@NgModule({
  declarations: [
    ConditionPage,
  ],
  imports: [
    IonicPageModule.forChild(ConditionPage),
  ],
})
export class ConditionPageModule {}
