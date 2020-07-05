import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, Segment } from 'ionic-angular';
import { Sliders } from '../../models/Sliders';
import { PopCategories } from '../../models/PopCategorie';
import { SliderProvider } from '../../providers/slider/slider';
import { PopularcategorieProvider } from '../../providers/popularcategorie/popularcategorie';
import { PromobanertopProvider } from '../../providers/promobanertop/promobanertop';
import { Promo2banertopProvider } from '../../providers/promo2banertop/promo2banertop';
import { WeekdealsProvider } from '../../providers/weekdeals/weekdeals';
import { PopularproductProvider } from '../../providers/popularproduct/popularproduct';
import { PromoBanner } from '../../models/PromoBanner';
import { Product } from '../../models/Products';
import { Network } from '@ionic-native/network';
import { Shops } from '../../models/Shops';
// import { NativeStorage } from '@ionic-native/native-storage';
import { GetshopProvider } from '../../providers/getshop/getshop';
import { PopmenuProvider } from '../../providers/popmenu/popmenu';
import { PopMenu } from '../../models/PopMenu';
import { ShopdeliveryProvider } from '../../providers/shopdelivery/shopdelivery';
import { Storage } from '@ionic/storage';
import { isUndefined } from 'ionic-angular/util/util';
import { App, ViewController } from 'ionic-angular';

@IonicPage(
  //   {
  //   segment : 'HomePage'
  // }
)
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public slide: Sliders[];
  public PopCategories: PopCategories[];
  public proBan: PromoBanner[];
  public lastBann: PromoBanner[];
  public dealProducts: Product[];
  public popProducts: Product[];
  public showSpiner: boolean = false;
  public err: boolean = false;
  public showHome: boolean = false;
  public shops: Shops[];
  public menu: PopMenu[];
  public selectShop: boolean = true;
  public delivery: Shops[];
  public isTablet: boolean = false;
  public isPhone: boolean = true;
  public isDefaultShop: boolean = false;
  public activeSelector: boolean = false;
  public activity: boolean = true;

  constructor(public platform: Platform,
    public getDeliveryShop: ShopdeliveryProvider,
    public popmen: PopmenuProvider, public storage: Storage,
    public toastCtrl: ToastController, private network: Network,
    public navCtrl: NavController, public navParams: NavParams,
    private _slide: SliderProvider, private _popCat: PopularcategorieProvider,
    public viewCtrl: ViewController,
    public appCtrl: App,
    private _proBan: PromobanertopProvider, private _proBann: Promo2banertopProvider,
    private _dealsWeek: WeekdealsProvider, private _popProduct: PopularproductProvider,
    public shop: GetshopProvider) {

    if (this.platform.is('tablet') || this.platform.is('ipad')) {
      this.isPhone = false;
      this.isTablet = true;
    }

    // this.showHome = true;
    this.showSpiner = true;

    this.shop.getShops().subscribe(
      data => {
        this.shops = data;
        // console.log('SHOP of popup');
      },
      error => {
        // console.log('Error loading Shop')
      }
    );

    this.getDeliveryShop.getDeliveryShops().subscribe(
      data => {
        this.delivery = data;
        // console.log('Delivery Shop is ',this.delivery);
      },
      error => {
        // console.log('Error loading Shop')
      }
    );

    this.storage.get('Shop').then(
      data => {
        this.selectShop = false;
      },
      error => {
        this.selectShop = true;
        // console.log('NO shop selected');
      }
    );

    this.popmen.getTopMenu().subscribe(data => {
      this.menu = data;
      // console.log('The menu is ',this.menu);
    });
    this._slide.getAllSliders().subscribe(data => {
      this.slide = data;
    });
    this._popCat.getPopCategorie().subscribe(data => {
      this.PopCategories = data;
      // console.log('Categorie popular ',this.PopCategories);
    })
    this._proBan.getBanner().subscribe(response => {
      this.proBan = response;
    })
    this._proBann.getBanner().subscribe(response => {
      this.lastBann = response;
    })

    this._dealsWeek.getWeekDeals().subscribe(data => {
      this.dealProducts = data;
    })

    this._popProduct.getPopularProduct().subscribe(data => {
      this.popProducts = data;
    },
      error => { this.showSpiner = false },
      () => {
        this.showSpiner = false;
        this.showHome = true;
      })
  }


  ngOnInit() {
    this.network.onConnect().subscribe(data => {
      this._slide.getAllSliders().subscribe(data => {
        this.slide = data;
      });
      this._popCat.getPopCategorie().subscribe(data => {
        this.PopCategories = data;
        // console.log('************ The pop Categorie *************',this.PopCategories);
      })
      this._proBan.getBanner().subscribe(response => {
        this.proBan = response;
      })
      this._proBann.getBanner().subscribe(response => {
        this.lastBann = response;
      })

      this._dealsWeek.getWeekDeals().subscribe(data => {
        this.dealProducts = data;
      })

      this._popProduct.getPopularProduct().subscribe(data => {
        this.popProducts = data;
      },
        error => { this.showSpiner = false },
        () => {
          this.showSpiner = false;
          this.showHome = true;
          this.err = false;
        })
    }, error => {
      // console.error(error)
    }
    );

    this.network.onDisconnect().subscribe(data => {
      this.showHome = false;
      this.err = true;
      this.displayNetworkUpdate(data.type);
    }, error => {
      // console.error(error)
    });

  }

  verifyShop(event) {
    event.preventDefault();
    event.stopPropagation();
    this.storage.get('dateChecker').then(
      data => {
        if (data) {
          // console.log('the data DATE-TIME get stored is ', JSON.stringify(data));
          let dater = new Date();
          let date = dater.getUTCDate();
          let dateFormater = date.toLocaleString();

          if (data.date == dateFormater) {
            // console.log('**************| there is Data EGAL|**************' + data.date);
            // console.log('***********Click on main element Shop Already taken ********** ' + JSON.stringify(data));
            this.activeSelector = false;
          }
          else if (data.date != dateFormater) {
            this.storage.remove('dateChecker').then(data => {
            });
            // console.log('The date checker is not today ', dateFormater);
            this.activeSelector = true;
          }
          // this.activeSelector = false;
          // console.log('***********Click on main element Shop Already taken ********** ', data);
        }
        else if (data == null || isUndefined(data)) {

          if (this.navCtrl.getPrevious() == null) {
            this.activeSelector = true;
            this.navCtrl.pop(this.navCtrl.getPrevious());

          }
          else {
            this.activeSelector = true;
            this.navCtrl.pop(this.navCtrl.getPrevious());
          }
          // this.appCtrl.getRootNav().push(this.navCtrl.getPrevious());
          return false;
          // console.log('***********Click on main element Nooooo Shop Already taken ********** ');
        }
      })
  }

  chooseShop(shop) {
    let param = {
      'id': shop.id_shop,
      'name': shop.name
    }
    // console.log(JSON.stringify(shop));
    this.storage.set('Shop', param).then(
      data => {
        this.selectShop = false;
        // console.log('Shop choosen ',JSON.stringify(param));
      },
      error => {
        // console.log('Error chosing Shop');
        this.selectShop = true;
      }
    )

  }

  goHome() {
    this.navCtrl.setRoot('HomePage');
  }

  displayNetworkUpdate(connetionState: string) {
    // let networkType = this.network.type;
    let toast = this.toastCtrl.create({
      message: `Vous êtes ${connetionState}`,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  chooseAbidjan() {

    let param = {
      'id': 1,
      'name': "Yaatoo"
    }

    this.storage.get('Shop').then(
      (data) => {
        if (data === null) {
          this.storage.set('Shop', param).then(
            (data) => {
              //************ Condition for display popUp **********/
              let dater = new Date();
              let date = dater.getUTCDate();
              let dateFormater = date.toLocaleString();
              // console.log('the date formater => ', dateFormater);
              let dateParam = {
                'date': dateFormater
              }
              this.storage.set('dateChecker', dateParam).then(
                data => {
                  // alert('************** Date Stored *************')
                },
                error => {
                  // console.log('****** Error Registering Date ******')
                }
              )
              //***************************************************/
              // console.log('Shop stored', param);
              this.activeSelector = false;
            }
          )
        }
        else {
          if (data.id == 1) {
            //************ Condition for display popUp **********/
            let dater = new Date();
            let date = dater.getUTCDate();
            let dateFormater = date.toLocaleString();
            // console.log('the date formater => ', dateFormater);
            let dateParam = {
              'date': dateFormater
            }
            this.storage.set('dateChecker', dateParam).then(
              data => {
                // alert('************** Date Stored *************')
              },
              error => {
                // console.log('****** Error Registering Date ******')
              }
            )
            //***************************************************/
            this.activeSelector = false;
            console.log('this shop is already selected');
          }
          else {
            this.storage.set('Shop', param).then(
              data => {
                //************ Condition for display popUp **********/
                let dater = new Date();
                let date = dater.getUTCDate();
                let dateFormater = date.toLocaleString();
                // console.log('the date formater => ', dateFormater);
                let dateParam = {
                  'date': dateFormater
                }
                this.storage.set('dateChecker', dateParam).then(
                  data => {
                    // alert('************** Date Stored *************')
                  },
                  error => {
                    // console.log('****** Error Registering Date ******')
                  }
                )
                //***************************************************/
                // console.log('The new shop has been selected ', param);
                this.activeSelector = false;
                this.storage.remove('Cart');
              },
              error => {
                this.activeSelector = true;
              }
            )
          }
        }
      }
    )

  }

  chooseAbidjanNord() {
    let param = {
      'id': 20,
      'name': "Yaatoo"
    }

    this.storage.get('Shop').then(
      (data) => {
        if (data === null) {
          this.storage.set('Shop', param).then(
            (data) => {
              //************ Condition for display popUp **********/
              let dater = new Date();
              let date = dater.getUTCDate();
              let dateFormater = date.toLocaleString();
              // console.log('the date formater => ', dateFormater);
              let dateParam = {
                'date': dateFormater
              }
              this.storage.set('dateChecker', dateParam).then(
                data => {
                  // alert('************** Date Stored *************')
                },
                error => {
                  // console.log('****** Error Registering Date ******')
                }
              )
              //***************************************************/
              // console.log('Shop stored', param);
              this.activeSelector = false;
            }
          )
        }
        else {
          if (data.id == 20) {
            //************ Condition for display popUp **********/
            let dater = new Date();
            let date = dater.getUTCDate();
            let dateFormater = date.toLocaleString();
            // console.log('the date formater => ', dateFormater);
            let dateParam = {
              'date': dateFormater
            }
            this.storage.set('dateChecker', dateParam).then(
              data => {
                // alert('************** Date Stored *************')
              },
              error => {
                // console.log('****** Error Registering Date ******')
              }
            )
            //***************************************************/
            this.activeSelector = false;
            // console.log('this shop is already selected');
          }
          else {
            this.storage.set('Shop', param).then(
              data => {
                //************ Condition for display popUp **********/
                let dater = new Date();
                let date = dater.getUTCDate();
                let dateFormater = date.toLocaleString();
                // console.log('the date formater => ', dateFormater);
                let dateParam = {
                  'date': dateFormater
                }
                this.storage.set('dateChecker', dateParam).then(
                  data => {
                    // alert('************** Date Stored *************')
                  },
                  error => {
                    // console.log('****** Error Registering Date ******')
                  }
                )
                //***************************************************/
                // console.log('The new shop has been selected ', param);
                this.activeSelector = false;
                this.storage.remove('Cart');
              },
              error => {
                this.activeSelector = true;
              }
            )
          }
        }
      }
    )
  }



}
