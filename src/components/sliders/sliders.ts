import { Component, Input } from '@angular/core';
import { Sliders } from '../../models/Sliders'
// import { NativeStorage } from '@ionic-native/native-storage';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { isUndefined } from 'ionic-angular/util/util';

@Component({
  selector: 'sliders',
  templateUrl: 'sliders.html'
})
export class SlidersComponent {

  @Input() slides: Sliders;
  HomeParams;
  public isTablet: boolean = false;
  public isPhone: boolean = true;
  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    if (this.platform.is('tablet') || this.platform.is('ipad')) {
      this.isPhone = false;
      this.isTablet = true;
    }

  }

  gotoCategorie(param) {
    // console.log('Slide params ',JSON.stringify(param));
    this.storage.get('Shop').then(
      data => {
        if (data != null && !isUndefined(data)) {
          if (param.is_product == 0) {
            this.HomeParams = {
              id: param.object,
              name: param.description,
              id_shop: data.id
            };
            this.navCtrl.push('CategoriePage', this.HomeParams);
          }

          if (param.is_product == 1) {
            // console.log('Il sAgit de la produit',JSON.stringify(param.product));
            this.navCtrl.push('ProductPage', param.product);
          }

          if (param.is_product == 2) {
            let manufacParam = {
              id_shop_manuf: data.id,
              is_product: parseInt(param.is_product),
              manufacturer: param.object
            }
            // console.log('Il sAgit de la Manufacturer',JSON.stringify(manufacParam));
            this.navCtrl.push('CategoriePage', manufacParam);
          }
          // this.HomeParams = {
          //   id : param.object,
          //   name : param.description,
          //   id_shop : data.id
          // };
          // this.navCtrl.push('CategoriePage', this.HomeParams);
        }
        else {

          if (param.is_product == 0) {
            this.HomeParams = {
              id: param.object,
              name: param.description,
              id_shop: 1
            };
            this.navCtrl.push('CategoriePage', this.HomeParams);
          }

          if (param.is_product == 1) {
            // console.log('Il sAgit de la produit',JSON.stringify(param.product));
            this.navCtrl.push('ProductPage', param.product);
          }

          if (param.is_product == 2) {
            let manufacParam = {
              id_shop_manuf: 1,
              is_product: parseInt(param.is_product),
              manufacturer: 105
            }
            // console.log('Il sAgit de la Manufacturer',JSON.stringify(manufacParam));
            this.navCtrl.push('CategoriePage', manufacParam);
          }
          // this.HomeParams ={
          //   id : param.object,
          //   name : param.description,
          //   id_shop : 1
          // };
          // this.navCtrl.push('CategoriePage', this.HomeParams);
        }
      }
      // ,
      // error=> {

      // }
    )
  }

}
