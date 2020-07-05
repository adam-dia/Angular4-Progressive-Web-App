import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { App, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {

  title: string = "Mon compte";
  public userId = 0;
  public showLoader: boolean = false;

  // User Credentials
  public address: string;
  public birthday: string;
  public city: string;
  public date_add: string;
  public email: string;
  public firstname: string;
  public user_id: number;
  public last_passwd_gen: string;
  public lastname: string;
  public passwd: string;
  public phone_mobile: number;
  public response: number;

  constructor(public viewCtrl: ViewController, public appCtrl: App, public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.showLoader = true;
    // setTimeout(() => {console.log('Donne')}, 2000);
    // setTimeout(()=> { this.navCtrl.setRoot('MyAccountPage') } ,200);

  }

  watchUserActivity() {

  }
  ngOnInit() {
    this.showLoader = true;
    this.storage.get('Customer')
      .then(
        data => {
          this.address = data.address1;
          this.birthday = data.birthday;
          this.city = data.city;
          this.date_add = data.date_add;
          this.email = data.email;
          this.firstname = data.firstname;
          this.user_id = data.id_customer;
          this.last_passwd_gen = data.last_passwd_gen;
          this.lastname = data.lastname;
          this.passwd = data.passwd;
          this.phone_mobile = data.phone_mobile;
          this.response = data.response;
          // console.log('Utilisateur ',this.email);
          this.showLoader = false;
        },
        error => {
          // console.log('Aucun utilisateur connecté');
          // this.navCtrl.setRoot('LoginPage');
          this.viewCtrl.dismiss(
            // console.log('Dismiss'),
            this.appCtrl.getRootNav().push('LoginPage')
          );
        }
      );
    // setTimeout(() => this, 250);
    this.showLoader = false;
    // console.log('Welcome on myAccount page');
  }

  goToSuggestion() {

    this.navCtrl.push('SuggestionPage');
  }
  goToCS() {
    this.navCtrl.push('CustomerServicePage');
  }
  goToAccountParams() {
    this.navCtrl.push('AccountParametersPage');
  }

  goToOrders() {
    let param = {
      email: this.email
    }
    // console.log('le mail order', param.mail);
    this.navCtrl.push('MyOrdersPage', param);
  }

  LogOut() {
    // event.preventDefault();
    this.showLoader = true;
    this.storage.remove('Customer');
    // console.log('Donnée effacée');
    this.showLoader = false;
    // this.navCtrl.setRoot('LoginPage');
    this.viewCtrl.dismiss(
      // console.log('Dismiss'),
      this.appCtrl.getRootNav().push('LoginPage')
    );
  }

  goToCondition() {
    var user = {
      name: 'adam',
      job: 'developper'
    }
    this.navCtrl.push('ConditionPage', { data: user });
  }

}
