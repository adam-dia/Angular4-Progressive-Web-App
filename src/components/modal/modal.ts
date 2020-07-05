import { Component } from '@angular/core';
import { Modal, ModalController, ModalOptions } from 'ionic-angular';


@Component({
  selector: 'modal',
  templateUrl: 'modal.html'
})
export class ModalComponent {

  text: string;


  constructor(private modal: ModalController) {

  }

  openModal() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false,

    }

    const dataLoad = {
      name: 'Cheick Mohamad',
      deliveryPlace: '• Livraison Express prévue le 10-10-2017 à 17h 30 ',
      deliveryAddress: 'Abobo - Sogefia - Près du sapeur pompier le chawarma blablablablabla juste pour remplir',
      number: '26987609'
    }

    const modal: Modal = this.modal.create('DeliveryAddressPage', { data: dataLoad }, myModalOptions);
    modal.present();
    modal.onDidDismiss(
      (data) => {
        // console.log(data)
      }
    );
    modal.onWillDismiss(
      (data) => {
        // console.log('Will dismiss');
        // console.log(data);
      }
    )
  }


}
