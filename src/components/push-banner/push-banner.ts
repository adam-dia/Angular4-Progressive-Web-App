import { Component, Input } from '@angular/core';
import { PromoBanner } from '../../models/PromoBanner';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'push-banner',
  templateUrl: 'push-banner.html'
})
export class PushBannerComponent {

  @Input() banner: PromoBanner;
  public isTablet: boolean = false;
  public isPhone: boolean = true;
  constructor(public platform: Platform) {
    if (this.platform.is('tablet') || this.platform.is('ipad')) {
      this.isPhone = false;
      this.isTablet = true;
    }

  }

}
