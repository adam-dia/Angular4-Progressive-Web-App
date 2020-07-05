import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategorieProvider } from '../providers/categorie/categorie';
import { GetshopProvider } from '../providers/getshop/getshop';
import { ShopdeliveryProvider } from '../providers/shopdelivery/shopdelivery';
import { Shops } from '../models/Shops';
import { Events } from 'ionic-angular';
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { ActionSheetController } from 'ionic-angular';
import { SocialSharing } from '../../node_modules/@ionic-native/social-sharing';
import { GetSpecialShopProvider } from '../providers/get-special-shop/get-special-shop';
import { specialShop } from '../models/specialShop';
import { PaymentPageProvider } from '../providers/payment-page/payment-page';
import { Storage } from '@ionic/storage';
import { isUndefined } from 'ionic-angular/util/util';

@Component({
  templateUrl: 'app.html',

})

export class Yaatoo {
  @ViewChild(Nav) nav: Nav;

  // rootPage: string = 'OrderConfirmePage';
  // rootPage: string = 'CongratPage';
  // rootPage: string = 'StepPaymentPage';
  // rootPage: string = 'CartPage';
  rootPage: string = 'HomePage';
  categories: any[];
  public shops: Shops[];
  public pages: any[];
  public categorieOne: boolean = false;
  public categorieTwo: boolean = false;
  public state: string = 'show';
  public mainBloc: boolean = true;
  public diplayCat: boolean = false;
  public specialShop: boolean = false;
  HomeParams;
  children;
  endChildren;
  public delivery: Shops[];
  public selectShop: boolean = false;
  public shopInShop: specialShop[];
  public paymentBanner;
  public paramBanner;
  public isTablet: boolean = false;
  public isPhone: boolean = true;
  public isAbidjan: boolean = true;
  public activeCommune: boolean = false;
  public isDefaultShop: boolean = false;
  public activeSelector: boolean = false;


  constructor(public _payPage: PaymentPageProvider, public shopSpecial: GetSpecialShopProvider,
    public socialSharer: SocialSharing, public actionSheetCtrl: ActionSheetController,
    private screenOrientation: ScreenOrientation, public getDeliveryShop: ShopdeliveryProvider,
    public platform: Platform, public events: Events, public splashScreen: SplashScreen,
    public _provider: CategorieProvider, public storage: Storage, public shop: GetshopProvider) {
    // constructor(public _payPage: PaymentPageProvider, public shopSpecial: GetSpecialShopProvider ,public socialSharer: SocialSharing, public actionSheetCtrl: ActionSheetController, private screenOrientation: ScreenOrientation, public getDeliveryShop: ShopdeliveryProvider, public platform: Platform, public events:Events, public statusBar: StatusBar, public splashScreen: SplashScreen, public _provider: CategorieProvider,public storage: Storage,public shop: GetshopProvider ) {
    // this.initializeApp();
    this.initiateDefaultShop();
    if (this.platform.is('tablet') || this.platform.is('ipad')) {
      this.isPhone = false;
      this.isTablet = true;
    }

    this.shop.getShops().subscribe(
      data => {
        this.shops = data;
      },
      error => {
      }
    );

    this.storage.get('Shop').then(
      data => {
        this.isDefaultShop = false;
        // this.isDefaultShop = data.id;
        // console.log('*********** Shop Already taken ********** ', this.isDefaultShop);
      },
      error => {
        this.isDefaultShop = true;
        // console.log('*********** Shop Already taken ********** ', this.isDefaultShop);
        // console.log('No shop delivered');
      })

    this.getDeliveryShop.getDeliveryShops().subscribe(
      data => {
        this.delivery = data;
      },
      error => {
      }
    )
    this._provider.getCategories().subscribe(data => {
      this.pages = data;
    });
    this._payPage.getPaymentPage().subscribe(data => {
      this.paymentBanner = data;
      for (let ban of this.paymentBanner) {
        this.paramBanner = this.paymentBanner[0];
      }
    })

    this.shopSpecial.getSpecialShops().subscribe(data => {
      this.shopInShop = data;
      // console.log('The New spacial SHOP is ************ ', this.shopInShop);
    })

    this.storage.remove('Shop');
    this.storage.remove('dateChecker').then(
      data => console.log('Removing Date')
    );

  }

  downloadAppStore() {
    window.open("https://itunes.apple.com/us/app/yaatoo-avec-vous-partout/id1413670927?l=fr&ls=1&mt=8", "_system");
  }

  downloadPlayStore() {
    window.open("https://play.google.com/store/apps/details?id=org.yaatoo.app", "_system");
  }
  getCategories() {
    this._provider.getCategories().subscribe(data => {
      this.pages = data;
    });

    this.shop.getShops().subscribe(
      data => {
        this.shops = data
      },
      error => {
      }
    )
  }

  toggleSection(i) {
    this.pages[i].open = !this.pages[i].open;
  }
  toggleItem(i, j) {
    this.pages[i].children[j].open = !this.pages[i].children[j].open;
  }

  chooseInterior() {

    let param = {
      'id': 7,
      'name': "Interieur"
    }

    this.storage.get('Shop').then(
      (data) => {
        if (data === null || isUndefined(data)) {
          this.storage.set('Shop', param).then(
            (data) => {
              // console.log('Shop stored',param);
              this.selectShop = false;
            }
          )
        }
        else {
          if (data.id == 7) {
            this.selectShop = false;
            // console.log('this shop is already selected');
          }
          else {
            this.storage.set('Shop', param).then(
              data => {
                // console.log('The new shop has been selected ',param);
                this.selectShop = false;
                this.storage.remove('Cart');
              },
              error => {
                this.selectShop = true;
              }
            )
          }
        }
      }
    )
  }

  // verifyShop(event) {
  //   event.preventDefault();
  //   event.stopPropagation();

  //   console.log('Click on the main element');

  //   this.storage.get('dateChecker').then(
  //     data => {
  //       if (data) {
  //         console.log('the data DATE-TIME get stored is ', JSON.stringify(data));
  //         let dater = new Date();
  //         let date = dater.getUTCDate();
  //         let dateFormater = date.toLocaleString();

  //         if (data.date == dateFormater) {
  //           // console.log('**************| there is Data EGAL|**************' + data.date);
  //           // console.log('***********Click on main element Shop Already taken ********** ' + JSON.stringify(data));
  //           this.activeSelector = false;
  //         }
  //         else if (data.date != dateFormater) {
  //           this.storage.remove('dateChecker').then(data => {
  //           });
  //           // console.log('The date checker is not today ', dateFormater);
  //           this.activeSelector = true;
  //         }
  //         // this.activeSelector = false;
  //         // console.log('***********Click on main element Shop Already taken ********** ', data);
  //       }
  //       else if (data == null || isUndefined(data)) {

  //         if (this.nav.getPrevious() == null) {
  //           this.activeSelector = true;
  //           this.nav.pop(this.nav.getPrevious());
  //         }
  //         else {
  //           this.activeSelector = true;
  //           this.nav.pop(this.nav.getPrevious());
  //         }
  //         // this.appCtrl.getRootNav().push(this.navCtrl.getPrevious());
  //         return false;
  //         // console.log('***********Click on main element Nooooo Shop Already taken ********** ');
  //       }
  //     })
  // }


  chooseAbidjanNord() {
    let param = {
      'id': 20,
      'name': "Yaatoo"
    }

    this.storage.get('Shop').then(
      (data) => {
        if (data === null || isUndefined(data)) {
          this.storage.set('Shop', param).then(
            (data) => {
              console.log('Shop stored', param);
              this.selectShop = false;
            }
          )
        }
        else {
          if (data.id == 20) {
            this.selectShop = false;
            console.log('this shop is already selected');
          }
          else {
            this.storage.set('Shop', param).then(
              data => {
                console.log('The new shop has been selected ', param);
                this.selectShop = false;
                this.storage.remove('Cart');
              },
              error => {
                this.selectShop = true;
              }
            )
          }
        }
      }
    )
  }

  chooseAbidjan() {

    let param = {
      'id': 1,
      'name': "Yaatoo"
    }

    this.storage.get('Shop').then(
      (data) => {
        if (data === null || isUndefined(data)) {
          this.storage.set('Shop', param).then(
            (data) => {
              console.log('Shop stored', param);
              this.selectShop = false;
            }
          )
        }
        else {
          if (data.id == 1) {
            this.selectShop = false;
            console.log('this shop is already selected');
          }
          else {
            this.storage.set('Shop', param).then(
              data => {
                console.log('The new shop has been selected ', param);
                this.selectShop = false;
                this.storage.remove('Cart');
              },
              error => {
                this.selectShop = true;
              }
            )
          }
        }
      }
    )

  }

  chooseShop(shop) {

    let param = {
      id: shop.id_shop,
      name: shop.name
    }

    this.storage.get('Shop').then(
      (data) => {
        if (data === null || isUndefined(data)) {
          this.storage.set('Shop', param).then(
            (data) => {
              console.log('Shop stored', param);
              this.selectShop = false;
            }
          )
        }
        else {
          if (data.id == shop.id_shop) {
            this.selectShop = false;
            console.log('this shop is already selected');
          }
          else {
            this.storage.set('Shop', param).then(
              data => {
                console.log('The new shop has been selected ', param);
                this.selectShop = false;
                this.storage.remove('Cart');
              },
              error => {
                this.selectShop = true;
              }
            )
          }
        }
      }
    )

  }

  activateCommune() {
    this.isAbidjan = false;
    this.activeCommune = true;
  }
  goBackToTown() {
    this.activeCommune = false;
    this.isAbidjan = true;
  }

  goPage(p) {
    alert('Boom');
  }

  openPage(param) {
    console.log('********** Opening page ********');

    this.storage.get('Shop').then(
      data => {
        this.HomeParams = {
          id: param.id,
          name: param.name,
          id_shop: data.id
        };
        this.nav.push('CategoriePage', this.HomeParams);
      },
      error => {
        this.HomeParams = {
          id: param.id,
          name: param.name,
          id_shop: 1
        };
        this.nav.push('CategoriePage', this.HomeParams);
      }
    )
  }

  goToCondition(param) {
    this.nav.push('ConditionPage');
  }

  goToCs(param) {
    this.nav.push('CustomerServicePage');
  }

  showMenu() {
    this.mainBloc = false;
    this.diplayCat = true;
  }
  goBack() {
    this.mainBloc = true;
    this.diplayCat = false;
  }

  showSpecialShop() {
    this.specialShop = true;
  }

  showPopup() {
    this.selectShop = true;
    this.isDefaultShop = true;
  }

  goToPromotion() {
    this.storage.get('Shop').then(
      data => {
        this.HomeParams = {
          promo: 1,
          promoName: "Produits en promotion",
          id_shop: data.id
        };
        this.nav.push('CategoriePage', this.HomeParams);
      },
      error => {
        this.HomeParams = {
          promo: 1,
          promoName: "Produits en promotion",
          id_shop: 1
        };
        this.nav.push('CategoriePage', this.HomeParams);
      }
    )
  }
  goToFidelity() {

    this.storage.get('Shop').then(
      data => {
        this.HomeParams = {
          id: 531,
          name: "Fidelité",
          id_shop: data.id
        };
        this.nav.push('CategoriePage', this.HomeParams);
      },
      error => {
        this.HomeParams = {
          id: 531,
          name: "Fidelité",
          id_shop: 1
        };
        this.nav.push('CategoriePage', this.HomeParams);
      }
    )
  }

  goToShopInShop(shop) {
    let parameters = {
      id_shop: shop.id,
      boutique: shop.boutique,
      background: shop.background,
      banner: shop.banner,
      lien_video: shop.lien_video,
      content: shop.contenu
    }
    this.nav.push('ShopinshopPage', parameters);
  }

  goToPayment() {
    let params = {
      banner: this.paramBanner.image,
    };
    this.nav.push('PaymentMeansPage', params);
  }

  socialSharing() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Partagez l\'application via',
      buttons: [
        {
          text: 'Facebook',
          role: 'destructive',
          handler: () => {
            this.socialSharer.shareViaFacebook('Ne manquez plus aucune promo installer l\'application Yaatoo',
              null, 'https://www.yaatoo.ci/download-app').then(() => {
              }).catch(() => {
              });
          }
        },
        {
          text: 'Twitter',
          handler: () => {
            this.socialSharer.shareViaTwitter('Ne manquez plus aucune promo installer l\'application Yaatoo',
              null, 'https://www.yaatoo.ci/download-app').then(() => {
              }).catch(() => {
              });
          }
        },
        {
          text: 'WhatsApp',
          role: 'destructive',
          handler: () => {
            this.socialSharer.shareViaWhatsApp('Ne manquez plus aucune promo installer l\'application Yaatoo',
              null, 'https://www.yaatoo.ci/download-app').then(() => {
              }).catch(() => {
              });
          }
        },
        {
          text: 'Instagram',
          role: 'destructive',
          handler: () => {
            this.socialSharer.shareViaInstagram('Ne manquez plus aucune promo installer l\'application Yaatoo',
              'https://www.yaatoo.ci/download-app').then(() => {
              }).catch(() => {
              });
          }
        },

        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
  initiateDefaultShop() {
    let defaultShop = { "id": 1, "name": "Yaatoo" };
    this.storage.set('Shop', defaultShop).then(
      (data) => {
        this.selectShop = false;
        console.log('The chosen Default shop is ', JSON.stringify(defaultShop));
        // this.nativeStorage.remove('Cart').then((data) => { }, (error) => { });
      },
      (error) => {
        console.log('Erreur d\'enregistrer un nouveau parametre');
      }
    );
  }

}
