import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-payment-means',
  templateUrl: 'payment-means.html',
})
export class PaymentMeansPage {
  public banner;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.banner = this.navParams.get('banner');
    // console.log('the banner sent ',JSON.stringify(this.navParams.get('banner')));
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad PaymentMeansPage');
  // }

}
