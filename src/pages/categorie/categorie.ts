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
  segment: 'categorie/:id'
})
@Component({
  selector: 'page-categorie',
  templateUrl: 'categorie.html',
})
export class CategoriePage {

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

    if (this.platform.is('tablet') || this.platform.is('ipad')) {
      this.isPhone = false;
      this.isTablet = true;
    }

    this.showSpiner = true;
    this.id_category = this.navParams.get('id');
    this.id_shop = this.navParams.get('id_shop');
    this.isSearch = this.navParams.get('isSearch');
    this.isSearch = this.navParams.get('isSearch');
    this.isManufac = this.navParams.get('manufacturer');
    this.manufVerif = this.navParams.get('is_product');

    // console.log('The received category Id is ',this.id_category);

    this.isPromo = this.navParams.get('promo');

    this.promoName = this.navParams.get('promoName');
    this.q = this.navParams.get('q');
    this.category_name = this.navParams.get('name');

    let queries = { 'q': this.q };

    let promote = { 'id_shop': this.navParams.get('id_shop') };

    let param = {
      'id_category': this.id_category,
      'id_shop': this.id_shop
    };

    this.gcp.getCategoryProduct(JSON.stringify(param)).subscribe(data => {
      this.products = data;
      this.showSpiner = false;
    },
      error => {
      },
      () => this.showSpiner = false
    )

    if (this.isSearch === 1) {
      // console.log('THIS IS THE MOMENT ',this.isSearch);
      this._searcher.findProduct(JSON.stringify(queries)).subscribe(data => {
        this.products = data;
      }, error => this.showSpiner = false,
        () => {
          this.isNormal = false;
          this.isPromoter = false;
          this.isSearcher = true;
          this.showSpiner = false;
        });
    }

    if (this.isPromo === 1) {
      // console.log('THIS IS THE MOMENT ',this.isSearch);
      this._promoProduct.getPromoProducts(JSON.stringify(promote)).subscribe(data => {
        this.promoProds = data;
        // this.products = data;
        // console.log(JSON.stringify(this.products));
      }, error => this.showSpiner = false,
        () => {
          this.isNormal = false;
          this.isSearcher = false;
          this.isPromoter = true;
          this.showSpiner = false;
        });
    }

    let manufParam = {
      'id_shop': this.id_shop_manuf,
      'id_manufacturer': this.isManufac
    }

    if (this.manufVerif === 2) {

      this._manufacturer.getManufacturerProducts(JSON.stringify(manufParam)).subscribe(data => {
        this.manuProds = data;
        // console.log('The manufacturer prod are ',JSON.stringify(this.manuProds));
      }
        , error => this.showSpiner = false,
        () => {
          this.isManufacturer = true
          this.isNormal = false;
          this.isSearcher = false;
          this.isPromoter = false;
          this.showSpiner = false;
        });
    }
  }

  ionViewWillEnter() {
    this.showSpiner = true;
    this.id_category = this.navParams.get('id');
    this.id_shop = (this.navParams.get('id_shop') ? this.navParams.get('id_shop') : 1);
    this.isSearch = this.navParams.get('isSearch');
    this.isSearch = this.navParams.get('isSearch');
    this.isManufac = this.navParams.get('manufacturer');
    this.manufVerif = this.navParams.get('is_product');

    // console.log('The received category Id is ', this.id_category);

    this.isPromo = this.navParams.get('promo');

    this.promoName = this.navParams.get('promoName');
    this.category_name = this.navParams.get('name');
    // console.log('The Id Shop is ',this.id_shop);
    let param = {
      'id_category': this.id_category,
      'id_shop': this.id_shop
    };
    // console.log('the params is ',JSON.stringify(param));
    this.gcp.getCategoryProduct(JSON.stringify(param)).subscribe(data => {
      this.products = data;
      this.showSpiner = false;
    },
      error => {
      },
      () => this.showSpiner = false
    )

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
