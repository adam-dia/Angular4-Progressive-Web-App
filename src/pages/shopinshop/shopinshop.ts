import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/Products';
import { GetShopSlidersProvider } from '../../providers/get-shop-sliders/get-shop-sliders';
// import { NativeStorage } from '@ionic-native/native-storage';
import { GetShopInProductsProvider } from '../../providers/get-shop-in-products/get-shop-in-products';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-shopinshop',
  templateUrl: 'shopinshop.html',
})

export class ShopinshopPage {

  public products: Product[];
  public productsTop: Product[];
  public HomeParams;
  public slider: any[];
  public shopBackground;
  public banner;
  public id_shop;
  public content;
  public shopName;
  public shopSpinner: boolean = true;
  constructor(public _shopProduct: GetShopInProductsProvider, public storage: Storage, public getShopSliders: GetShopSlidersProvider, public navCtrl: NavController, public navParams: NavParams) {

    this.shopSpinner = true;

    this.shopBackground = this.navParams.get('background');
    this.banner = this.navParams.get('banner');
    this.id_shop = this.navParams.get('id_shop');
    this.content = this.navParams.get('content');
    this.shopName = this.navParams.get('boutique');
    console.log('The content is ', this.shopName);
    console.log('Name of the shop', this.content);
    this.storage.get('Shop').then(
      data => {
        let productsParams =
        {
          'id_boutique': this.navParams.get('id_shop'),
          'id_shop': data.id,
        }
        // let productsParamsTop =
        // {
        //   'id_shop': data.id,
        //   'id_boutique': this.navParams.get('id_shop'),
        //   'block': "Bas"
        // }
        let sliderParams = {
          'id_boutique': this.id_shop
        }
        // console.log('l ID de la boutique est ******************* => ', this.id_shop);
        this.getShopSliders.getShopSliders(JSON.stringify(sliderParams)).subscribe(response => {
          this.slider = response;
          // console.log('le slider shop ******************* => ', JSON.stringify(this.slider));
        })

        this._shopProduct.getShopInProduct(JSON.stringify(productsParams)).subscribe(data => {
          this.products = data;
          // console.log('The Shop component products are ******************* => ', this.products);
        })
        // this._shopProduct.getShopInProduct(JSON.stringify(productsParamsTop)).subscribe(result => {
        //   this.productsTop = result;
        //   console.log('The Shop Top products are ', JSON.stringify(this.products));
        // })
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      }
    );
    this.shopSpinner = false;
  }
  // public seeProd() {
  //   console.log('Product saw');
  // }

  // goToProduct(prod) {
  //   let params = prod;
  //   this.navCtrl.push('ProductPage', params);
  // }
  goToProduct(prod) {
    let params = prod;
    console.log('Going to product');
    this.navCtrl.push('ProductPage', params);
  }

  // getBackground() {
  //   return this.shopBackground;
  // }



}
