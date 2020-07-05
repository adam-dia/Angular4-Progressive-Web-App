import { Component, Input } from '@angular/core';
import { ProductCart } from '../../models/ProductCart'
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RemoveproductProvider } from '../../providers/removeproduct/removeproduct';
import { UpdateproductProvider } from '../../providers/updateproduct/updateproduct';
import { ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage';
import { App, ViewController } from 'ionic-angular';
// import { BaggedProvider } from '../../providers/bagged/bagged';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'cart-items',
  templateUrl: 'cart-items.html'
})
export class CartItemsComponent {

  @Input() product: ProductCart[];

  public showSpinner: boolean = false;
  text: string;
  public idCart;
  rForm: FormGroup;
  public inputVal;
  public clickItems = [];
  public quantity;
  public defaultQuantity;
  public compteur: number = 0;

  constructor(public viewCtrl: ViewController, public appCtrl: App, public toastCtrl: ToastController, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public storage: Storage, public _updateP: UpdateproductProvider, public _removeP: RemoveproductProvider) {

    this.rForm = fb.group({
      'quantity': ['', Validators.required]
    });

    this.storage.get('Cart').then(
      (data) => { this.idCart = data.id }
    )

  }

  removeProduct(post) {
    let confirm = this.alertCtrl.create({
      title: 'Supprimer ce produit',
      message: 'Voulez-vous vraiment supprimer ce produit du panier ?',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            // console.log('Disagree clicked');
          }
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.showSpinner = true;

            let param = {
              'id_cart': this.idCart,
              'id_product': post.id_product
            }
            this._removeP.removeProd(JSON.stringify(param)).subscribe(data => {
              // console.log('Prod removed');
            })

            this.showSpinner = false;
            // this.navCtrl.setRoot('CartPage');
            this.viewCtrl.dismiss(
              // console.log('Dismiss'),
              this.appCtrl.getRootNav().push('CartPage')
            );

            let toast = this.toastCtrl.create({
              message: 'Produit supprimé de votre panier',
              duration: 1500,
              position: 'top'
            });
            toast.present();

          }
        }
      ]
    });
    confirm.present();
  }

  goToProduct(prod) {
    let params: Object = prod;
    this.navCtrl.push('ProductPage', params);
  }

  increase(prod) {

    if (this.compteur === 0) {

      let val = prod.quantity;
      let total = parseInt(val + 1);
      this.rForm.get('quantity').setValue(total);
      this.compteur = 1;

      //***********************************************
      this.clickItems.push(total);
      let lastValue = this.clickItems[this.clickItems.length - 1];
      setTimeout(() => {
        if (parseInt(lastValue) == parseInt(this.rForm.get('quantity').value)) {
          // console.log('the rForm value is ',this.rForm.get('quantity').value);
          let param = {
            'id_cart': this.idCart,
            'quantity': lastValue,
            'id_product': prod.id_product
          }

          this._updateP.updateProduct(JSON.stringify(param)).subscribe(
            data => {
              // console.log('UPDATE DONE !!!');
              this.showSpinner = false;
              // this.navCtrl.setRoot('CartPage');
              this.viewCtrl.dismiss(
                // console.log('Dismiss'),
                this.appCtrl.getRootNav().push('CartPage')
              );
              let toast = this.toastCtrl.create({
                message: 'Produit mis à jour',
                duration: 2500,
                position: 'top'
              });
              toast.present();
            },
            error => {
              this.showSpinner = false;
              let toast = this.toastCtrl.create({
                message: 'Une erreur s\'est produite',
                duration: 2500,
                position: 'top'
              });
              toast.present();
            }
          )
        }
      }, 700);
      //***********************************************

    }
    else {

      let val = this.rForm.get('quantity').value;
      // console.log('The input value is ',val);
      let total = parseInt(val + 1);
      this.rForm.get('quantity').setValue(total);
      // console.log('The new input value is ',total);

      if (this.rForm.get('quantity').valueChanges) {

        this.clickItems.push(total);
        // console.log('*********** the click value is ',this.clickItems);
        let lastValue = this.clickItems[this.clickItems.length - 1];
        // console.log('*********** the last value is ',lastValue);
        setTimeout(() => {
          if (parseInt(lastValue) == parseInt(this.rForm.get('quantity').value)) {

            let param = {
              'id_cart': this.idCart,
              'quantity': lastValue,
              'id_product': prod.id_product
            }

            this._updateP.updateProduct(JSON.stringify(param)).subscribe(
              data => {
                // console.log('UPDATE DONE !!!');
                this.showSpinner = false;
                // this.navCtrl.setRoot('CartPage');
                this.viewCtrl.dismiss(
                  // console.log('Dismiss'),
                  this.appCtrl.getRootNav().push('CartPage')
                );
                let toast = this.toastCtrl.create({
                  message: 'Produit mis à jour',
                  duration: 2500,
                  position: 'top'
                });
                toast.present();
              },
              error => {
                this.showSpinner = false;
                let toast = this.toastCtrl.create({
                  message: 'Une erreur s\'est produite',
                  duration: 2500,
                  position: 'top'
                });
                toast.present();
              }
            )
          }
        }, 700);
      }

    }

  }

  dicrease(prod) {

    if (prod.quantity > 1) {

      if (this.compteur === 0) {

        let val = prod.quantity;
        let total = parseInt(val) - 1;
        this.rForm.get('quantity').setValue(total);
        this.compteur = 1;

        //***********************************************
        this.clickItems.push(total);
        let lastValue = this.clickItems[this.clickItems.length - 1];
        setTimeout(() => {
          if (parseInt(lastValue) == parseInt(this.rForm.get('quantity').value)) {
            // console.log('the rForm value is ',this.rForm.get('quantity').value);
            let param = {
              'id_cart': this.idCart,
              'quantity': lastValue,
              'id_product': prod.id_product
            }

            this._updateP.updateProduct(JSON.stringify(param)).subscribe(
              data => {
                // console.log('UPDATE DONE !!!');
                this.showSpinner = false;
                // this.navCtrl.setRoot('CartPage');
                this.viewCtrl.dismiss(
                  // console.log('Dismiss'),
                  this.appCtrl.getRootNav().push('CartPage')
                );
                let toast = this.toastCtrl.create({
                  message: 'Produit mis à jour',
                  duration: 2500,
                  position: 'top'
                });
                toast.present();
              },
              error => {
                this.showSpinner = false;
                let toast = this.toastCtrl.create({
                  message: 'Une erreur s\'est produite',
                  duration: 2500,
                  position: 'top'
                });
                toast.present();
              }
            )
          }
        }, 700);
        //***********************************************

      }

      else {

        let val = this.rForm.get('quantity').value;
        // console.log('the dicrease value is ',val);

        if (val > 1) {
          // console.log('The input value is ',val);
          let total = parseInt(val) - 1;
          this.rForm.get('quantity').setValue(total);
          // console.log('The new input value is ',total);

          if (this.rForm.get('quantity').valueChanges) {

            this.clickItems.push(total);
            let lastValue = this.clickItems[this.clickItems.length - 1];
            setTimeout(() => {
              if (parseInt(lastValue) == parseInt(this.rForm.get('quantity').value)) {

                let param = {
                  'id_cart': this.idCart,
                  'quantity': lastValue,
                  'id_product': prod.id_product
                }

                this._updateP.updateProduct(JSON.stringify(param)).subscribe(
                  data => {
                    // console.log('UPDATE DONE !!!');
                    this.showSpinner = false;
                    // this.navCtrl.setRoot('CartPage');
                    this.viewCtrl.dismiss(
                      // console.log('Dismiss'),
                      this.appCtrl.getRootNav().push('CartPage')
                    );
                    let toast = this.toastCtrl.create({
                      message: 'Produit mis à jour',
                      duration: 2500,
                      position: 'top'
                    });
                    toast.present();
                  },
                  error => {
                    this.showSpinner = false;
                    let toast = this.toastCtrl.create({
                      message: 'Une erreur s\'est produite',
                      duration: 2500,
                      position: 'top'
                    });
                    toast.present();
                  }
                )
              }
            }, 700);
          }

        }

      }
    }

  }

  updateProduct(post, id_product) {

    this.showSpinner = true;

    let param = {
      'id_cart': this.idCart,
      'quantity': post.quantity,
      'id_product': id_product.id_product
    }
    // console.log('LID de du panier ',JSON.stringify(this.idCart));
    if (post.quantity == 0 || post.quantity == null || post.quantity < 0) {

      this.showSpinner = false;
      this.navCtrl.setRoot('CartPage');
      let toast = this.toastCtrl.create({
        message: 'Désolé, Veuillez ajouter plus d\'un article',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else {

      this._updateP.updateProduct(JSON.stringify(param)).subscribe(
        data => {
          // console.log('UPDATE DONE !!!');
          this.showSpinner = false;

          // this.navCtrl.setRoot('CartPage');
          this.viewCtrl.dismiss(
            // console.log('Dismiss'),
            this.appCtrl.getRootNav().push('CartPage')
          );
          let toast = this.toastCtrl.create({
            message: 'Produit mis à jour',
            duration: 2500,
            position: 'top'
          });
          toast.present();
        },
        error => {
          this.showSpinner = false;
          let toast = this.toastCtrl.create({
            message: 'Une erreur s\'est produite',
            duration: 2500,
            position: 'top'
          });
          toast.present();
        }
      )
    }
  }

}
