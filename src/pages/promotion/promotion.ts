import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, Platform } from 'ionic-angular';
import { Product } from '../../models/Products';
import { ProductProvider } from '../../providers/product/product';
import { SerchboxProvider } from '../../providers/serchbox/serchbox';
import { GetcategoryproductProvider } from '../../providers/getcategoryproduct/getcategoryproduct';
import { GetPromotionProductProvider } from '../../providers/get-promotion-product/get-promotion-product';
import { GetmanufacturersProvider } from '../../providers/getmanufacturers/getmanufacturers';
import { Storage } from '@ionic/storage';

@IonicPage({
  segment: 'promotion/:id_shop'
})
@Component({
  selector: 'page-promotion',
  templateUrl: 'promotion.html',
})
export class PromotionPage {

  public products: Product[];
  public promoProds: Product[];
  public manuProds: Product[];
  public showSpiner: Boolean = false;
  public id_category: number = 0;
  public id_shop: number = 0;
  public category_name: string;
  public static: boolean = true;
  public q: any;
  public isPromo: number;
  public isPromoter: boolean = false;
  public isSearch = 0;
  public isManufac;
  public manufVerif = 0;
  public isSearcher: boolean = false;
  public isNormal: boolean = true;
  public isManufacturer: boolean = false;
  public promoName: string;
  isBrand = null;
  public isTablet: boolean = false;
  public isPhone: boolean = true;
  public id_shop_manuf;

  constructor(public _manufacturer: GetmanufacturersProvider, public platform: Platform,
    public _promoProduct: GetPromotionProductProvider, private modal: ModalController,
    public navCtrl: NavController, public navParams: NavParams, public _prodService: ProductProvider,
    public _searcher: SerchboxProvider, public gcp: GetcategoryproductProvider,
    public storage: Storage) {

    let promote = { 'id_shop': this.navParams.get('id_shop') };
    console.log("The promotion shop ID is ", promote);

    this._promoProduct.getPromoProducts(JSON.stringify(promote)).subscribe(data => {
      this.products = data;
      // this.products = data;
      console.log("the promotion product are ", this.products);
    }, error => this.showSpiner = false,
      () => {
        this.isNormal = false;
        this.isSearcher = false;
        this.isPromoter = true;
        this.showSpiner = false;
      });


  }

  ionViewWillEnter() {

  }

  openFilter() {
    const filter: Modal = this.modal.create('FilterPage', { data: this.products });
    filter.present();
    filter.onDidDismiss((data) => {
      if (data.brand) {
        this.isBrand = data.brand;
        this.products = this.products.filter((prod) => {
          return prod.manufac == this.isBrand;
        })
      }
      else if (data.range) {
        // console.log('Interval price ',data.range);
        // console.log('Interval price min ',data.range[0]);
        this.products = this.products.filter((prod) => {
          return prod.price >= data.range[0];
        })
      }
    }
    );
  }
  sortBypriceAsc() {
    this.showSpiner = true;
    this.products = this.products.sort((prodA, prodB) => {
      return prodA.price - prodB.price;
    })
    this.showSpiner = false;
  }
  sortBypriceDesc() {
    this.showSpiner = true;
    this.products = this.products.sort((prodA, prodB) => {
      return prodB.price - prodA.price;
    })
    this.showSpiner = false;
  }
  sortByNew() {
    this.products = this.products.sort((prodA, prodB) => {
      return prodB.id - prodA.id;
    })
    //  console.log("nouveauté ",this.products);
  }

}
