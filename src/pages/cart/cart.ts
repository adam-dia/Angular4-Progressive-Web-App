import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Product } from '../../models/Products';
import { ProductCart } from '../../models/ProductCart';
import { GetcartproductProvider } from '../../providers/getcartproduct/getcartproduct';
import { UpdatecartProvider } from '../../providers/updatecart/updatecart';
// import { NativeStorage } from '@ionic-native/native-storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FidelityProvider } from '../../providers/fidelity/fidelity';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { isUndefined } from 'ionic-angular/util/util';
import { GetcarrierProvider } from '../../providers/getcarrier/getcarrier';
import { Carrier } from '../../models/Carrier';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  public cartId;
  public products: ProductCart[];
  public orderTotalPaid;
  public userId: number = 0;
  public userKey: number = 0;
  public showSpinner: boolean = false;
  public error: boolean = false;
  public prodUpdate: boolean = false;
  public cartProduct = [];
  public idShop;
  public idCustomer;
  public allCarrier: Carrier[];
  public carrierId;
  public carrierPrice;
  public carrierParam;
  public retraitParam;

  public rForm: FormGroup;

  constructor(public carrier: GetcarrierProvider, public toastCtrl: ToastController, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public _gProducts: GetcartproductProvider, public uc: UpdatecartProvider, public _fd: FidelityProvider) {

    this.showSpinner = true;

    this.rForm = fb.group({
      'fidelity': [null],
    })

    this.storage.get('Cart').then(
      data => {
        if (data != null && !isUndefined(data)) {
          this.cartId = data.id
          let param = {
            id_cart: this.cartId
          }

          this._gProducts.getAllCartProducts(JSON.stringify(param)).subscribe(
            data => {
              if (data === null || isUndefined(data)) {
                this.showSpinner = false;
                // this.error = true;
              }
              else {
                this.products = data;
                // console.log('The cart products are ', JSON.stringify(this.products));
                this.orderTotalPaid = this.products.reduce(function (prev, x) {
                  return prev + (x.price * x.quantity);
                }, 0)
                // console.log(this.orderTotalPaid);
              }
            }
          )
        }
        else {
          this.showSpinner = false;
          this.error = true;
        }
      }
      // ,
      // error => {

      // }
    )

    this.storage.get('Customer').then(
      data => {
        if (data !== null && !isUndefined(data)) {
          this.idCustomer = data.id_customer;
          // console.log('The customer is ',this.idCustomer);
        }
        else {
          console.log('No costomer logged');
        }
      }
    )
    this.showSpinner = false;
  }

  useFidelity(post) {

    let param = {
      'code': post.fidelity,
      'id_cart': this.cartId,
      'id_customer': this.idCustomer,
    }

    if (post.fidelity != null && !isNaN(post.fidelity)) {

      post.fidelity.substr(0, 7);
      let verif = post.fidelity.substr(0, 7);
      if (parseInt(verif) === 3660100) {
        // console.log('7 premier chiffre',post.fidelity.substr(0,7));
        this._fd.registerFidelityCode(JSON.stringify(param)).subscribe(
          data => {
            let toast = this.toastCtrl.create({
              message: 'Félicitation votre code à été prise en compte',
              duration: 1500,
              position: 'top'
            });
            toast.present();
            // console.log('Data fidelité well stored')
          },
          error => {
            // console.error('Error recording fidelity data')
          }
        )
      }
      else {
        let toast = this.toastCtrl.create({
          message: 'Désolé votre code est incorrecte, veuillez reprendre SVP',
          duration: 1500,
          position: 'top'
        });
        toast.present();
      }
    }
    else {
      let toast = this.toastCtrl.create({
        message: 'Désolé, votre code doit comprendre 13 chiffres, veuillez reprendre SVP',
        duration: 1500,
        position: 'top'
      });
      toast.present();
    }

  }

  validateOrder() {

    // console.log('Cart product ', this.products);

    this.showSpinner = true;

    for (let x of this.products) {
      // console.log('The X is ', x);
      this.cartProduct.push(x.categorie);
      // console.log('the products in the cart are ', this.cartProduct);
    }

    this.storage.set('cartProds', this.cartProduct).then(
      data => { },
      error => { })

    this.storage.get('Shop').then(
      data => {
        this.idShop = data.id;
        // console.log('The param shop id is',this.idShop);
      }
    )

    this.storage.get('Customer').then(
      data => {
        // console.log('*********** The customer logged is ',data);

        if (data !== null && !isUndefined(data)) {

          this.userId = data.id_customer;
          this.userKey = data.secure_key;
          if (this.userId != 0) {
            // console.log('TOut ce passe bien');
            let updaterCart = {
              'id_cart': this.cartId,
              'id_customer': this.userId,
              'secure_key': this.userKey
            }
            // console.log(JSON.stringify(updaterCart));
            this.updateCart(updaterCart);

            let param = {
              total: this.orderTotalPaid
            }
            this.storage.get('Order').then(
              data => {
                if (data.total != this.orderTotalPaid) {

                  let newTotal = {
                    total: this.orderTotalPaid
                  }
                  this.storage.set('Order', newTotal).then(
                    data => {
                      // console.log('New !!!!! total stored')
                    },
                    error => {
                      // console.log('Error Storing Total')
                    }
                  )
                  // console.log('la difference est', data.total,'=>',this.orderTotalPaid);

                }

                if (this.idShop != 1 && this.idShop != 20) {
                  // console.log('Disable address page !!! ',this.idShop);
                  let id_Shop = {
                    'id_shop': this.idShop
                  }
                  this.carrier.getCarrier(JSON.stringify(id_Shop)).subscribe(data => {
                    this.allCarrier = data;

                    for (let x of this.allCarrier) {
                      this.carrierId = x.id_carrier;
                      this.carrierPrice = x.price;
                      this.carrierParam = this.carrierId + ',' + this.carrierPrice;
                      // console.log('the carrier info ',this.carrierParam);

                      this.retraitParam = {
                        'deliveryTypes': this.carrierParam,
                        'idCart': this.cartId,
                        'customer': this.idCustomer,
                        'district': '',
                        'location': '',
                        'description': '',
                      };
                      // console.log('The parameters are ',this.retraitParam);
                      setTimeout(() => {
                        this.navCtrl.push('StepDeliveryPage', this.retraitParam);
                      }, 100);
                    }
                  });
                }
                else {
                  let routeParam = {
                    id_shop: this.idShop
                  }
                  // console.log('ENABLE address page !!! ',this.idShop);
                  setTimeout(() => {
                    this.navCtrl.push('OrderConfirmePage', routeParam);
                  }, 100);
                }

                // console.log('total stored', data.total);
                // let routeParam = {
                //   id_shop : this.idShop
                // }

                // setTimeout(()=> {
                // this.navCtrl.push('OrderConfirmePage', routeParam);
                // },100);
              },
              error => {
                this.storage.set('Order', param).then(
                  data => {
                    //  console.log('total stored')
                  },
                  error => {
                    //  console.log('Error Storing Total')
                  }
                )
              }
            )
          }
        }
        else {
          // console.log('************* No customer avalable **************');

          let param = {
            total: this.orderTotalPaid
          }
          // console.log('The no log param is ',JSON.stringify(param));

          this.storage.get('Order').then(
            data => {
              // console.log('Order param is ',data);
              if (data !== null && !isUndefined(data)) {
                if (data.total != this.orderTotalPaid) {
                  let newTotal = {
                    total: this.orderTotalPaid
                  }
                  this.storage.set('Order', newTotal).then(
                    data => {
                      // console.log('New !!!!! total stored')
                    },
                    error => {
                      // console.log('Error Storing Total')
                    }
                  )
                }
                // console.log('total stored', data.total);
                let routeParam = {
                  id_shop: this.idShop
                }

                setTimeout(() => {
                  this.navCtrl.push('CartLoginPage', routeParam);
                }, 100);
              }
              else {
                this.storage.set('Order', param).then(
                  data => {
                  },
                  error => {
                  }
                )
              }

            }
          )
        }

        this.showSpinner = false;
      }
      ,
      error => {

      }
    )
  }

  updateCart(param) {
    this.uc.updateCartCustomer(JSON.stringify(param)).subscribe(
      data => {
        // console.log('Cart updated')
      },
      error => {
        // console.log('Error updating Cart')
      }
    )
  }

}
