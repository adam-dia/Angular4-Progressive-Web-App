import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import { isUndefined } from 'ionic-angular/util/util';

@Component({
  selector: 'user',
  templateUrl: 'user.html'
})
export class UserComponent {

  public showLoader: boolean = false;
  public isTablet: boolean = false;
  public isPhone: boolean = true;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    if (this.platform.is('tablet') || this.platform.is('ipad')) {
      this.isPhone = false;
      this.isTablet = true;
    }
  }
  goToLogin() {
    this.showLoader = true;
    this.storage.get('Customer')
      .then(
        (data) => {
          // console.log('user stored');
          if (data === null || isUndefined(data)) {
            this.navCtrl.push('LoginPage');
            this.showLoader = true;
            // console.error('Logging Error');
          }
          else {
            this.navCtrl.push('MyAccountPage');
            this.showLoader = true;
          }
        }
        // ,
        // error => {
        //   // console.error('Logging Error');
        //   this.navCtrl.push('LoginPage');
        //   this.showLoader  = true;
        // }
      )
  }


}
