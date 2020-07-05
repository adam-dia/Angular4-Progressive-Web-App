import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoginProvider } from '../../providers/login/login';
import { User } from '../../models/User';
import { AlertController } from 'ionic-angular';
import { GetcartproductProvider } from '../../providers/getcartproduct/getcartproduct';
import { ProductCart } from '../../models/ProductCart';
import { Storage } from '@ionic/storage';
import { GetcarrierProvider } from '../../providers/getcarrier/getcarrier';
import { Carrier } from '../../models/Carrier';

@IonicPage()
@Component({
  selector: 'page-cart-login',
  templateUrl: 'cart-login.html',
})
export class CartLoginPage {
  public showSpiner: boolean;
  rForm: FormGroup;
  public mail: string;
  public password: string;
  public post: any;
  public user: User[];
  public logError: boolean = false;
  public is_Logged: number = 0;
  public orderTotalPaid;
  public cartId;
  public products: ProductCart[];
  public showSpinner: boolean = true;
  public error: boolean = false;
  public totalAmount;
  public showError: Boolean = false;
  public idShop;
  public allCarrier: Carrier[];
  public carrierId;
  public carrierPrice;
  public carrierParam;
  public retraitParam;
  public idCustomer;
  public reference;

  constructor(public carrier: GetcarrierProvider, public _gProducts: GetcartproductProvider, public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder, public authService: LoginProvider, public storage: Storage, public alertCtrl: AlertController) {
    this.rForm = fb.group({
      'mail': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(200)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
    });
    this.idShop = this.navParams.get('id_shop');
    // console.log('the id_shop in param is ',this.idShop);

    // this.storage.get('Customer').then(
    //   data => {
    //     this.idCustomer = data.id_customer;
    //   },
    //   error => {
    // }
    // )

    this.storage.get('Cart').then(
      data => {
        this.cartId = data.id;
        this.reference = data.customer;
      },
      error => {
      }
    );
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
      for (let x of this.user) {
        this.is_Logged = x.id_customer;
      }

      if (this.is_Logged != 0) {
        this.storage.set('Customer', this.user[0])
          .then(
            () => {
            },
            error => {
            }
          )
        this.showSpiner = false;
        // console.log('******************* Redirecting to the new ******************');
        this.getOrderTotal();
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

        // let routeParam = {
        //   id_shop : this.idShop
        // }
        // setTimeout(()=> { this.navCtrl.push('OrderConfirmePage',routeParam) } ,150);

      }
      else {
        this.showError = true;
      }

      this.showSpiner = false;
      // this.logError =true;
    }, error => {
      this.showError = true;
    });

  }

  reset() {
    this.logError = false;
  }

  goToRegistration() {
    this.navCtrl.push('AccountPage');
  }
  getOrderTotal() {
    this.storage.get('Order').then(
      data => { this.totalAmount = data.total; },
      error => { }
    )
  }
}
