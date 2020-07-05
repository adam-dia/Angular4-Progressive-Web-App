import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, } from 'ionic-angular';
import { isUndefined } from 'ionic-angular/util/util';

@Component({
  selector: 'menu-toggle',
  templateUrl: 'menu-toggle.html'
})
export class MenuToggleComponent {

  public isTablet: boolean = false;
  public isPhone: boolean = true;
  public activeSelector: boolean = false;

  constructor(public platform: Platform,
    public navCtrl: NavController,
    public storage: Storage,
    public navParams: NavParams,
  ) {

    if (this.platform.is('tablet') || this.platform.is('ipad')) {
      this.isPhone = false;
      this.isTablet = true;
    }
  }


  // verifyShop(event) {
  //   console.log('This is trigging ');

  //   event.preventDefault();
  //   event.stopPropagation();
  //   this.storage.get('dateChecker').then(
  //     data => {
  //       if (data) {
  //         // console.log('the data DATE-TIME get stored is ', JSON.stringify(data));
  //         let dater = new Date();
  //         let date = dater.getUTCDate();
  //         let dateFormater = date.toLocaleString();

  //         if (data.date == dateFormater) {
  //           // console.log('**************| there is Data EGAL|**************' + data.date);
  //           // console.log('***********Click on main element Shop Already taken ********** ' + JSON.stringify(data));
  //           this.activeSelector = false;
  //         }
  //         else if (data.date != dateFormater) {
  //           this.storage.remove('dateChecker').then(data => {
  //           });
  //           // console.log('The date checker is not today ', dateFormater);
  //           this.activeSelector = true;
  //         }
  //         // this.activeSelector = false;
  //         // console.log('***********Click on main element Shop Already taken ********** ', data);
  //       }
  //       else if (data == null || isUndefined(data)) {

  //         if (this.navCtrl.getPrevious() == null) {
  //           this.activeSelector = true;
  //           this.navCtrl.pop(this.navCtrl.getPrevious());

  //         }
  //         else {
  //           this.activeSelector = true;
  //           this.navCtrl.pop(this.navCtrl.getPrevious());
  //         }
  //         // this.appCtrl.getRootNav().push(this.navCtrl.getPrevious());
  //         return false;
  //         // console.log('***********Click on main element Nooooo Shop Already taken ********** ');
  //       }
  //     })
  // }

}
