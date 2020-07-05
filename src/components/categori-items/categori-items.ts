import { Component, Input } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Product } from '../../models/Products';

@Component({
  selector: 'categori-items',
  templateUrl: 'categori-items.html'
})
export class CategoriItemsComponent {

  text: string;
  @Input() product: Product[];
  picture: Boolean = false;
  public isTablet: boolean = false;
  public isPhone: boolean = true;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
    if (this.platform.is('tablet') || this.platform.is('ipad')) {
      this.isPhone = false;
      this.isTablet = true;
    }
  }

  goToProduct() {
    let params: Object = this.product;
    // console.log('The param est ',JSON.stringify(params));
    this.navCtrl.push('ProductPage', params);
  }

}
