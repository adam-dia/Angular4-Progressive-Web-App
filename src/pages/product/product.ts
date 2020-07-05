import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddtocartProvider } from '../../providers/addtocart/addtocart';
import { CartproductsProvider } from '../../providers/cartproducts/cartproducts';
import { Cart } from '../../models/Cart';
import { ToastController } from 'ionic-angular';
// import { NativeStorage } from '@ionic-native/native-storage';
import { RecommandProdProvider } from '../../providers/recommand-prod/recommand-prod';
import { App, ViewController } from 'ionic-angular';
import { VerifProductProvider } from '../../providers/verif-product/verif-product';
import { Storage } from '@ionic/storage';
import { isUndefined } from 'ionic-angular/util/util';
import { GetSingleProductProvider } from '../../providers/get-single-product/get-single-product';


@IonicPage({
  segment: 'product/:id_product'
  // segment: 'ProductPage/:id_product'
})
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  // private db:SQLiteObject;

  public panel: Cart[];
  public id_cart: number;
  public is_cart: number = 0;
  public is_hash: string;

  public product;
  public quantity;
  public id_product: number = 0;
  public categorie: string;
  public reference: number;
  public namme: string;
  public name: string;
  public shopname: string;
  public picture: string;
  public manufac: string;
  public description: string;
  public price: number;
  public showSpinner: boolean = false;
  public rForm: FormGroup;
  public recommandProduct;
  public shop_id;
  public verifToken;
  public token;
  public activeState;
  public isTablet: boolean = false;
  public isPhone: boolean = true;
  public deepProd;
  // @ViewChild('post_content') post_content;

  constructor(public platform: Platform, public verif: VerifProductProvider,
    public getSingle: GetSingleProductProvider,
    public viewCtrl: ViewController, public appCtrl: App, public _recomProd: RecommandProdProvider,
    public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public fb: FormBuilder, public _cart: AddtocartProvider,
    public _cartProduct: CartproductsProvider, public storage: Storage) {

    if (this.platform.is('tablet') || this.platform.is('ipad')) {
      this.isPhone = false;
      this.isTablet = true;
    }

    this.rForm = fb.group({
      'id_product': [null, Validators.compose([Validators.required])],
      'quantity': [null, Validators.required]
    });

  }

  ionViewWillEnter() {
    this.showSpinner = true;
    this.id_product = this.navParams.get('id_product');
    // console.log('********* The Param is ', this.id_product);

    this.storage.get('Shop').then(
      data => {
        if (data != null || isUndefined(data)) {
          console.log('The default data is null there is no shop');
          // console.log("The default shop is ***************", data);
          this.shop_id = data.id;
          // console.log('The shop Id is ', this.shop_id);
          let param = {
            id_product: this.id_product,
            id_shop: this.shop_id
          };
          // console.log('the params is ',JSON.stringify(param));
          this.getSingle.getSingleProduct(JSON.stringify(param)).subscribe(data => {
            // console.log('The data lenght is ',data.length);
            // console.log('The deeplink data is *********** > ', JSON.stringify(data));

            this.deepProd = data;
            for (let x of this.deepProd) {
              this.id_product = x.id_product;
              this.categorie = x.id_category_default;
              this.reference = x.reference;
              this.namme = x.namme;
              this.name = x.name;
              this.shopname = x.shopname;
              this.picture = x.picture;
              this.manufac = x.manufac;
              this.description = x.description;
              this.price = x.price;
            }

            this._recomProd.getRecommandedProduct(JSON.stringify(param)).subscribe(response => {
              this.recommandProduct = response;
            })
            this.showSpinner = false;
          }, error => { })
        }
        else {

          console.log('******* there is a shop now *********');
          let param = {
            id_product: this.id_product,
            id_shop: 1
          };
          this.getSingle.getSingleProduct(JSON.stringify(param)).subscribe(data => {
            // console.log('The data lenght is ',data.length);
            // console.log('The data is ',JSON.stringify(data));
            this.deepProd = data;
            for (let x of this.deepProd) {
              this.id_product = x.id_product;
              this.categorie = x.id_category_default;
              this.reference = x.reference;
              this.namme = x.namme;
              this.name = x.name;
              this.shopname = x.shopname;
              this.picture = x.picture;
              this.manufac = x.manufac;
              this.description = x.description;
              this.price = x.price;
            }

            this._recomProd.getRecommandedProduct(JSON.stringify(param)).subscribe(response => {
              this.recommandProduct = response;
            })
            this.showSpinner = false;
          }, error => { })
        }
      }
    )

  }

  goToProduct(prod) {
    let params: Object = prod;
    this.navCtrl.push('ProductPage', params);
  }

  payProcess() {
    let params = {
      id: this.id_product,
      categorie: this.categorie,
      reference: this.reference,
      namme: this.namme,
      name: this.name,
      shopname: this.shopname,
      picture: this.picture,
      manufac: this.manufac,
      description: this.description,
      price: this.price,
    }
    this.navCtrl.push('OrderConfirmePage', params);

  }

  addToCart(post) {

    this.showSpinner = true;

    let verifParams = {
      'id_product': post.id_product,
      'id_shop': this.shop_id
    }

    this.verif.verfiProduct(JSON.stringify(verifParams)).subscribe(data => {
      this.verifToken = data;
      // console.log('Verification data ',this.verifToken);

      for (let x of this.verifToken) {
        this.token = x.id_shop;
        this.activeState = x.active;
        // console.log('The final token is ',this.token, 'And the state is ',this.activeState);

        if (this.token == this.shop_id && this.activeState == 1) {
          // console.log('The verifyer token is ',this.activeState);
          // console.log('The Shop id is ',this.shop_id);

          this.storage.get('Cart').then(
            (data) => {
              if (data != null && !isUndefined(data)) {
                // console.log('cart is : ',data);
                // console.log('cart id is : ',data.id);

                this.is_cart = data.id;
                // console.log('The is_cart ',this.is_cart);
                if (post.quantity == 0 || post.quantity < 0) {
                  this.showSpinner = false;
                  let toast = this.toastCtrl.create({
                    message: 'Vous ne pouvez pas ajouter moins d\'un article',
                    duration: 3000,
                    position: 'top'
                  });
                  toast.present();
                }
                else if (post.quantity > 0) {

                  if (this.is_cart != 0 && this.is_cart != null && !isUndefined(this.is_cart)) {
                    // console.log('L_ID recupere en Memoire', this.is_cart);
                    let product = {
                      'id_cart': this.is_cart,
                      'id_product': post.id_product,
                      'quantity': post.quantity,
                    }
                    let products = JSON.stringify(product);
                    this.addProductsToCart(products);

                    let alert = this.alertCtrl.create({
                      subTitle: 'Produit ajouté au panier',
                      buttons: ['OK']
                    });

                    this.showSpinner = false;
                    alert.present();
                  }
                }
              }
              else if (data === null || isUndefined(data)) {

                let customer = Math.floor(Math.random() * Math.floor(999999999));

                let param = {
                  id_customer: customer,
                  secure_key: "XXXX"
                }
                let params = JSON.stringify(param);

                this._cart.addTocart(params).subscribe(data => {
                  this.panel = data;
                  for (let x of this.panel) {
                    this.id_cart = x.id_cart;
                    // console.log('L\'ID is_Logged => ', this.id_cart);
                  };

                  let product = {
                    'id_cart': this.id_cart,
                    'id_product': post.id_product,
                    'quantity': post.quantity,
                  }
                  let products = JSON.stringify(product);
                  if (post.quantity > 0) {
                    this._cartProduct.AddProductToCart(products).subscribe(data => {
                    });

                    let cart = {
                      'id': this.id_cart,
                      'secure_key': 'XXXX',
                      'customer': customer
                    }

                    this.storage.set('Cart', cart)
                      .then(
                        () => {
                          // console.log('Cart Created')
                        },
                        error => {
                        }
                      )

                    let alert = this.alertCtrl.create({
                      subTitle: 'Produit ajouté au panier',
                      buttons: ['OK']
                    });

                    this.showSpinner = false;
                    alert.present();
                  }
                  else if (post.quantity == 0 || post.quantity < 0) {
                    let toast = this.toastCtrl.create({
                      message: 'Vous ne pouvez pas ajouter moins d\'un artice',
                      duration: 3000,
                      position: 'top'
                    });
                    toast.present();
                  }

                })
              }
            }
          )


        }
        else {
          let toast = this.toastCtrl.create({
            message: 'Désolé ce produit n\'est pas disponible dans la boutique choisie veuillez svp choisir une autre boutique',
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
        this.showSpinner = false;
      }
    }, error => {

    });

  }

  increase() {

    let val = parseInt(this.rForm.get('quantity').value);
    let total = val + 1
    this.rForm.get('quantity').setValue(total);
  }

  dicrease() {
    if (this.rForm.get('quantity').value > 1) {
      let val = parseInt(this.rForm.get('quantity').value);
      let total = val - 1
      this.rForm.get('quantity').setValue(total);
    }
  }

  addProductsToCart(prod) {
    this._cartProduct.AddProductToCart(prod).subscribe(data => {
    })
  }

}



