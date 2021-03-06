import { Component, Input } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Product } from '../../models/Products';

@Component({
  selector: 'pop-product',
  templateUrl: 'pop-product.html'
})
export class PopProductComponent {

  @Input() popProds: Product[];
  public isTablet: boolean = false;
  public isPhone: boolean = true;
  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
    if (this.platform.is('tablet') || this.platform.is('ipad')) {
      this.isPhone = false;
      this.isTablet = true;
    }
  }
  goToProductDetail() {
    let params: Object = this.popProds;
    this.navCtrl.push('ProductPage', params);
  }

}
