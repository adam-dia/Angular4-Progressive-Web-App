import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SerchboxProvider } from '../../providers/serchbox/serchbox';
import { Product } from '../../models/Products';
import { SearchshopinshopProvider } from '../../providers/searchshopinshop/searchshopinshop';
// import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'search-bar',
  templateUrl: 'search-bar.html'
})
export class SearchBarComponent {

  public isTablet: boolean = false;
  public isPhone: boolean = true;
  public searchItem: string;
  public post: any;
  rForm: FormGroup;
  public startSearch: boolean = false;
  public products: Product[];
  public foundedProducts: Product[];
  public foundedShops: any[];
  public activeFoundProduct: boolean = false;
  public activeFoundShop: boolean = false;
  public activeNotFound: boolean = false;
  public totalFound: number;
  bgColor: string = 'red';

  constructor(public platform: Platform,
    public navCtrl: NavController,
    public searchShop: SearchshopinshopProvider,
    public navParams: NavParams,
    fb: FormBuilder,
    private _searchProduct: SerchboxProvider) {
    // constructor(public platform: Platform, public navCtrl:NavController, public navParams:NavParams,fb: FormBuilder, private speechRecognition: SpeechRecognition) {

    if (this.platform.is('tablet') || this.platform.is('ipad')) {
      this.isPhone = false;
      this.isTablet = true;
    }

    this.rForm = fb.group({
      'searchItem': [null, Validators.required]
    });
  }

  search(post) {
    let params = {
      q: post.searchItem,
      isSearch: 1
    }
    this.navCtrl.push('CategoriePage', params);
  }
  goToProduct(prod) {
    let params: Object = prod;
    this.navCtrl.push('ProductPage', params);
  }
  async foundItem(post) {
    // console.log('element number one => ', post.searchItem);
    if (this.rForm.get('searchItem').value != "") {
      this.startSearch = true;

      let queries = { 'q': post.searchItem };
      let shopQuery = { 'q': post.searchItem };
      //**************** Find Shop *************************************/
      this.searchShop.findShop(JSON.stringify(shopQuery)).subscribe(data => {
        if (data.length > 0) {
          this.foundedShops = data;
          console.log('Shop found => ', this.foundedShops);
          this.activeFoundShop = true;
          this.activeNotFound = false;
        }
      })
      //**************** End  Shop *************************************/
      //**************** Find Product *************************************/
      this._searchProduct.findProduct(JSON.stringify(queries)).subscribe(data => {
        if (data.length > 0) {
          this.foundedProducts = data;
          this.products = this.foundedProducts.slice(0, 4);
          this.activeFoundProduct = true;
          this.totalFound = this.foundedProducts.length;
          this.activeNotFound = false;
          // console.log('The change search are => ', this.totalFound);
        }
        else {
          this.activeFoundProduct = false;
          this.activeNotFound = true;
        }
      })
      //**************** End  Product *************************************/
      this.activeFoundProduct = true;
      // console.log('different de ZERO');
    }
    else {
      this.startSearch = false;
      this.activeFoundShop = false;
      this.activeFoundProduct = false;
      // console.log('est égal à ZERO');
    }
  }

  cancelSearch() {
    this.activeFoundProduct = false;
    this.startSearch = false;
    this.activeNotFound = false;
    this.rForm.get('searchItem').setValue("");
  }

  ngOnInit() {
    // this.speechRecognition.hasPermission()
    // .then((hasPermission: boolean) => {

    //   if( !hasPermission) {
    //     this.speechRecognition.requestPermission()
    //     .then(
    //       () => {
    //     },
    //       () => {
    //     }
    //     )
    //   }
    // });
  }

  //   start() {
  //     this.speechRecognition.startListening()
  //     .subscribe(
  //       (matches: Array<string>) => {
  //         let params = {
  //           q: matches[0],
  //           isSearch: 1
  //         }
  //         this.searchItem = matches[0];
  //         this.navCtrl.push('CategoriePage', params);
  //       }
  //     )
  //   }

}
