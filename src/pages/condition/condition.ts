import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-condition',
  templateUrl: 'condition.html',
})
export class ConditionPage {

  title: string = "CGU";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    var data = this.navParams.get('data');
    // console.log('data parameters',data);
  }

}
