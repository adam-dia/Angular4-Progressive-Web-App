import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage';
import { RegistrationProvider } from '../../providers/registration/registration';
import { Customer } from '../../models/Customer';
import { User } from '../../models/User';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  showSpiner: Boolean = false;
  public rForm: FormGroup;
  public user: Customer[];
  // public gender = 1;
  public isTablet: boolean = false;
  public isPhone: boolean = true;
  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public fb: FormBuilder, private nativeStorage: NativeStorage, private regService: RegistrationProvider) {

    if (this.platform.is('tablet') || this.platform.is('ipad')) {
      this.isPhone = false;
      this.isTablet = true;
    }

    this.rForm = fb.group({
      'gender': [null, Validators.compose([Validators.minLength(1), Validators.maxLength(1), Validators.required])],
      'firstname': [null, Validators.compose([Validators.minLength(2), Validators.required])],
      'lastname': [null, Validators.compose([Validators.minLength(2), Validators.required])],
      'email': [null, Validators.compose([Validators.minLength(2), Validators.required])],
      'password': [null, Validators.compose([Validators.minLength(2), Validators.required])],
      'birthday': [null],
      'number': [null, Validators.compose([Validators.minLength(8), Validators.required])],
      'city': [null, Validators.compose([Validators.required])],
      'quarter': [null, Validators.compose([Validators.required])],
    })
    // console.log('Registration Page');
  }
  register(post) {
    this.showSpiner = true;
    let userCord = {
      'gender': post.gender,
      'firstname': post.firstname,
      'lastname': post.lastname,
      'email': post.email,
      'password': post.password,
      'birthday': post.birthday,
      'number': post.number,
      'city': post.city,
      'quarter': post.quarter,
    }
    // console.log('this is the post ',JSON.stringify(userCord));
    // let userCredentials = JSON.stringify(userCord);
    this.regService.register(JSON.stringify(userCord)).subscribe(data => {
      this.user = data;
      // console.log('User rigister goog ',this.user);
    },
      error => {
        // console.log('Error registering user')
      },
      () => {
        this.showSpiner = false;
        this.navCtrl.push('LoginPage');
      }
    )
  }
  goToLogin() {
    this.navCtrl.popTo('LoginPage');
  }

}
