import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Panel } from '../../models/Panel';
import { GetordersProvider } from '../../providers/getorders/getorders';
// import { DatePipe } from '@angular/common';
@IonicPage()
@Component({
  selector: 'page-my-orders',
  templateUrl: 'my-orders.html',
})
export class MyOrdersPage {
  public id_order: number = 0;
  public email: string = null;
  public orders: Panel[];
  public showSpinner: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public getOrders: GetordersProvider) {
    this.showSpinner = true;

    this.email = this.navParams.get('email');
    let param = {
      'email': this.email
    }
    // console.log('le mail du Param est ',JSON.stringify(param));
    this.getOrders.getOders(JSON.stringify(param)).subscribe(data => {
      this.orders = data;
    },
      error => {
        this.showSpinner = false;
        // console.log('Errore Loading data')
      },
      () => this.showSpinner = false)

  }

}
