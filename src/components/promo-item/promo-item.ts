import { Component, Input } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Product } from '../../models/Products';

@Component({
  selector: 'promo-item',
  templateUrl: 'promo-item.html'
})
export class PromoItemComponent {

  @Input() deals: Product;
  public isTablet: boolean = false;
  public isPhone: boolean = true;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
    if (this.platform.is('tablet') || this.platform.is('ipad')) {
      this.isPhone = false;
      this.isTablet = true;
    }

  }
  goToProductDetail() {
    let params: Object = this.deals;
    this.navCtrl.push('ProductPage', params);
  }

}
