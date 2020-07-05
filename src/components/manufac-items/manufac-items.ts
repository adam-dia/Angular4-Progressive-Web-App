import { Component, Input } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Product } from '../../models/Products';

@Component({
  selector: 'manufac-items',
  templateUrl: 'manufac-items.html'
})
export class ManufacItemsComponent {

  public isTablet: boolean = false;
  public isPhone: boolean = true;
  @Input() product: Product[];
  picture: Boolean = false;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
    if (this.platform.is('tablet') || this.platform.is('ipad')) {
      this.isPhone = false;
      this.isTablet = true;
    }
  }

  goToProduct() {
    let params: Object = this.product;
    this.navCtrl.push('ProductPage', params);
  }

}
