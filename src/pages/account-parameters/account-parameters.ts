import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Customer } from '../../models/Customer';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-account-parameters',
  templateUrl: 'account-parameters.html',
})
export class AccountParametersPage {

  public user: Customer;
  public mail: string;
  public name: string;
  public lastname: string;
  public address: string;
  public city: string;
  public phone: string;
  public showSpinner: boolean = false;
  public showAddress: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.showSpinner = true;
    this.storage.get('Customer').then(
      data => {
        this.name = data.firstname;
        this.lastname = data.lastname;
        this.mail = data.email;
        this.address = data.address1;
        this.city = data.city;
        this.phone = data.phone_mobile;
        console.log('Customer => ', JSON.stringify(data));
      },
      error => console.log('NO USER FOUND')
    )
    this.showSpinner = false;
  }

  ionViewDidLoad() {

  }
  goToDelivery() {
    this.showAddress = true;
    // this.navCtrl.push('DeliveryAddressPage')
  }
  passwordChanger() {
    this.navCtrl.push('UpdatepasswordPage');
  }

}
