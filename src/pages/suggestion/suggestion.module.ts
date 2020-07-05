import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuggestionPage } from './suggestion';

@NgModule({
  declarations: [
    SuggestionPage,
  ],
  imports: [
    IonicPageModule.forChild(SuggestionPage),
  ],
})
export class SuggestionPageModule {}
