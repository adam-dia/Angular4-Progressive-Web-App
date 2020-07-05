import { Component, Input } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Product } from '../../models/Products';

@Component({
  selector: 'category-item',
  templateUrl: 'category-item.html'
})

export class CategoryItemComponent {

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
