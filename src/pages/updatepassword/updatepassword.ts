import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/User';

@IonicPage()
@Component({
  selector: 'page-updatepassword',
  templateUrl: 'updatepassword.html',
})
export class UpdatepasswordPage {

  public showSpiner: boolean;
  rForm: FormGroup;
  public mail: string;
  public password: string;
  public post: any;
  public user: User[];
  public logError: boolean = false;
  public is_Logged: number = 0;

  constructor(public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.rForm = fb.group({
      'mail': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(200)])],
      'oldpassword': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
      'newpasswordone': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
      'newpasswordtwo': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
    });
  }

  ionViewDidLoad() {
  }

  updatePassword(post) {

  }

  reset() {
    this.logError = false;
  }

}
