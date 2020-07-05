import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { GetcartproductProvider } from '../../providers/getcartproduct/getcartproduct';
import { ProductCart } from '../../models/ProductCart';
// import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'menu-cart',
  templateUrl: 'menu-cart.html'
})
export class MenuCartComponent {

  public products: ProductCart[];
  public cartId;
  public totalItem;
  public showNumber: boolean = false;
  public isTablet: boolean = false;
  public isPhone: boolean = true;

  constructor(public platform: Platform, public storage: Storage, public _gProducts: GetcartproductProvider, public navCtrl: NavController, public navParams: NavParams) {

    if (this.platform.is('tablet') || this.platform.is('ipad')) {
      this.isPhone = false;
      this.isTablet = true;
    }
    setInterval(() => { this.getItems(); }, 1600);

    // this.getItems();
  }

  goToCart() {
    this.navCtrl.push('CartPage');
  }

  // ionViewDidLoad() {
  //   this.getItems();
  // }

  // ionViewDidLeave() {
  //   this.getItems();
  // }

  // ionViewDidEnter() {
  //   this.getItems();
  // }

  async getItems() {

    // this._cartitem.getCartItems();
    await this.storage.get('Cart').then(
      data => {
        if (data != null && data != undefined) {
          this.cartId = data.id
          let param = {
            'id_cart': this.cartId
          }
          this._gProducts.getAllCartProducts(JSON.stringify(param)).subscribe(
            data => {
              this.products = data;
              this.totalItem = this.products.reduce(function (prev, x) {
                return prev + x.quantity;
              }, 0)
              this.showNumber = true;
            },
          )
        }
      }
    )
  }

}
