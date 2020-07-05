import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'bloc-title',
  templateUrl: 'bloc-title.html'
})
export class BlocTitleComponent {

  text: string;
  public isTablet: boolean = false;
  public isPhone: boolean = true;

  constructor(public platform: Platform, ) {

    if (this.platform.is('tablet') || this.platform.is('ipad')) {
      this.isPhone = false;
      this.isTablet = true;
    }

  }

}
