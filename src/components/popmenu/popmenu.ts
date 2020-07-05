import { Component, Input } from '@angular/core';
import { PopMenu } from '../../models/PopMenu';
// import { NativeStorage } from '@ionic-native/native-storage';
import { NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'popmenu',
  templateUrl: 'popmenu.html'
})
export class PopmenuComponent {
  HomeParams;
  @Input() menus: PopMenu;
  public isTablet: boolean = false;
  public isPhone: boolean = true;

  constructor(public platform: Platform, public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    if (this.platform.is('tablet') || this.platform.is('ipad')) {
      this.isPhone = false;
      this.isTablet = true;
    }

  }
  goToMenu(param) {

    this.storage.get('Shop').then(
      data => {
        if (data != null && data != undefined) {
          this.HomeParams = {
            id: param.id_category,
            name: param.label,
            id_shop: data.id
          };
          this.navCtrl.push('CategoriePage', this.HomeParams);
        }
        else {
          this.HomeParams = {
            id: param.id,
            name: param.name,
            id_shop: 1
          };
          this.navCtrl.push('CategoriePage', this.HomeParams);
        }
      }
      // ,
      // error=> {

      // }
    )
  }
}


