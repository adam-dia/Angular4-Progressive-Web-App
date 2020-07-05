import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-delivery-address',
  templateUrl: 'delivery-address.html',
})
export class DeliveryAddressPage {

  constructor(private navParams: NavParams, private view: ViewController) {
  }

  ionViewWillLoad() {
    const data = this.navParams.get('data');
    // console.log(data);
  }
  closeModal() {

    const dataLoad = {
      name: 'Cheick Mohamad',
      deliveryPlace: '• Livraison Express prévue le 10-10-2017 à 17h 30 ',
      deliveryAddress: 'Abobo - Sogefia - Près du sapeur pompier le chawarma blablablablabla juste pour remplir',
      number: '26987609'
    }

    this.view.dismiss(dataLoad);
  }

}
