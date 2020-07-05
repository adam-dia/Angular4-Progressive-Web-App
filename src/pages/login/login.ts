import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NativeStorage } from '@ionic-native/native-storage';
import { LoginProvider } from '../../providers/login/login';
import { User } from '../../models/User';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public showSpiner: boolean;
  rForm: FormGroup;
  public mail: string;
  public password: string;
  public post: any;
  public user: User[];
  public logError: boolean = false;
  public is_Logged: number = 0;
  public isTablet: boolean = false;
  public isPhone: boolean = true;
  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder, public authService: LoginProvider, public storage: Storage, public alertCtrl: AlertController) {

    if (this.platform.is('tablet') || this.platform.is('ipad')) {
      this.isPhone = false;
      this.isTablet = true;
    }

    this.rForm = fb.group({
      'mail': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(200)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
    });
  }

  Register(post) {
    this.showSpiner = true;

    let credential = {
      'mail': post.mail,
      'password': post.password
    };

    let userCred = JSON.stringify(credential);

    this.authService.login(userCred).subscribe(data => {

      this.user = data;
      // console.log(this.user);

      for (let x of this.user) {
        this.is_Logged = x.id_customer;
        // console.log('voici le x',this.is_Logged);
      }

      // console.log('L_ID du connecté ', this.is_Logged);
      // console.log('Le connecté est', JSON.stringify(this.user));

      if (this.is_Logged != 0) {
        this.storage.set('Customer', this.user[0])
          .then(
            () => {
              // console.log('Customer stored')
            },
            error => {
              // console.error('Error storing Customer', error)
            }
          )
        setTimeout(() => { this.navCtrl.setRoot('MyAccountPage') }, 200);
        this.showSpiner = false;
      }
      // this.logError = false;
      this.showSpiner = false;
      this.logError = true;
    }, error => {
      // console.log('No customer avalable');
      // this.nativeStorage.remove('Customer');
    });

  }
  reset() {
    this.logError = false;
  }

  goToRegistration() {
    this.navCtrl.push('AccountPage');
  }

}
