import { Component, Input } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { PopCategories } from '../../models/PopCategorie';
// import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'pop-categorie',
  templateUrl: 'pop-categorie.html'
})
export class PopCategorieComponent {
  public HomeParams;
  text: string;
  @Input() categories: PopCategories;
  public isTablet: boolean = false;
  public isPhone: boolean = true;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    if (this.platform.is('tablet') || this.platform.is('ipad')) {
      this.isPhone = false;
      this.isTablet = true;
    }
  }
  goToCategorie(param) {
    this.storage.get('Shop').then(
      data => {
        if (data != null && data != undefined) {
          this.HomeParams = {
            id: param.categorie,
            name: param.name,
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
