import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

@Component({
  selector: 'logo',
  templateUrl: 'logo.html'
})
export class LogoComponent {

  public isTablet: boolean = false;
  public isPhone: boolean = true;
  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {

    if (this.platform.is('tablet') || this.platform.is('ipad')) {
      this.isPhone = false;
      this.isTablet = true;
    }

  }
  goHome() {
    // this.navCtrl.popTo('HomePage');
    this.navCtrl.setRoot('HomePage');

    //   this.navCtrl.popTo('HomePage');
    //   if(this.navCtrl.getActive().name == 'HomePage'){
    //     this.navCtrl.popTo('HomePage');
    //   }
    //   else if(this.navCtrl.getActive().name == 'MyAccountPage'){
    //     this.navCtrl.popTo('HomePage');
    //   }
    //   else if(this.navCtrl.getActive().name == 'CategoriePage'){
    //     this.navCtrl.popTo('HomePage');
    //   }
    //   else if(this.navCtrl.getActive().name == 'CartPage'){
    //     this.navCtrl.popTo('HomePage');
    //   }
    //   else {
    //     // console.log('******************* The current page is *******************',this.navCtrl.getActive().name);
    //     this.navCtrl.setRoot('HomePage');
    //   }

  }

}
