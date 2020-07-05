import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-congrat',
  templateUrl: 'congrat.html',
})
export class CongratPage {
  public email: string
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    this.storage.get('Customer').then(
      data => {
        this.email = data.email;
        // console.log(JSON.stringify(data))
      },
      error => console.log('No Customer avalable')
    )
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad CongratPage');
  // }
  goToCarts() {
    let param = {
      email: this.email
    }
    this.navCtrl.setRoot('MyOrdersPage', param);
  }
  goShop() {
    this.navCtrl.setRoot('HomePage');
  }

}
