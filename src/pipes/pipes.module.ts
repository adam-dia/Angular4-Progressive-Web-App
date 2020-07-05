import { NgModule } from '@angular/core';
import { NosanitizePipe } from './nosanitize/nosanitize';
@NgModule({
  declarations: [NosanitizePipe,
    NosanitizePipe],
  imports: [],
  exports: [NosanitizePipe,
    NosanitizePipe]
})
export class PipesModule { }
