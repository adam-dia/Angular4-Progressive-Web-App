import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { NativeStorage } from '@ionic-native/native-storage';
import { DeliveryaddressProvider } from '../../providers/deliveryaddress/deliveryaddress'
import { DeliverydateProvider } from '../../providers/deliverydate/deliverydate';
import { ConfirmorderProvider } from '../../providers/confirmorder/confirmorder';
import { Orders } from '../../models/Orders';
import { GetcarrierProvider } from '../../providers/getcarrier/getcarrier';
import { Carrier } from '../../models/Carrier';
import { DiscountProvider } from '../../providers/discount/discount';
import { Discount } from '../../models/Discount';
import { ToastController } from 'ionic-angular';
import { OmProvider } from '../../providers/om/om';
import { InAppBrowser, InAppBrowserOptions, InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { AlertController } from 'ionic-angular';
import { OmconfirmationProvider } from '../../providers/omconfirmation/omconfirmation';
import { OmModel } from '../../models/OmModel';
// import { parseDate } from 'ionic-angular/util/datetime-util';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-order-confirme',
  templateUrl: 'order-confirme.html',
})
export class OrderConfirmePage {
  showSpinner: boolean = false;
  title: string = "Confirmation de Commande";
  resume_title: string = "Résumé de commande";
  delivery_title: string = "Adresse de Livraison";

  public idCustomer;
  public idShop;
  public idCart;
  public totalAmount;
  public reference;
  public secure_key;
  public order: Orders[];
  public allCarrier: Carrier[];
  public carrierPrice;
  public ngClasses;
  public carrierId;
  public carrierCost;
  public discount: Discount[];
  public disc_attempt: number = 0;
  public disc_id: number = 0;
  public disc_min_amount: number = 0;
  public disc_code;
  public disc_reduction_ratio;
  public disc_reduction_amount;
  //***************************/
  public Abobo: boolean = false;
  public Adjame: boolean = false;
  public Bingerville: boolean = false;
  public Yopougon: boolean = false;
  public Plateau: boolean = false;
  public Attecoube: boolean = false;
  public Cocody: boolean = false;
  public Marcory: boolean = false;
  public Koumassi: boolean = false;
  public Treichville: boolean = false;
  public Portbouet: boolean = false;
  public Bouake: boolean = false;
  public Yamoussoukro: boolean = false;
  public daloa: boolean = false;
  public sp: boolean = false;
  public omResult: OmModel[];
  public omStatus: number = 1; public omError: number = 1;
  public deliveryDate: Object;
  public instantCarrier;
  public cartProduct;
  public cartVerif;

  public hoursVal: any[];
  public hoursValEnd;
  public minutesVal = ["30"];
  public daysVal;
  public daysVals;
  public monthVal;
  public dateMaxVal;
  public yearVal;
  public minDate;
  public minDati;
  //***************************/
  public isCash: boolean = false;
  public isOrange: boolean = false;
  public isCb: boolean = false;
  public RouteParams;
  public validate: boolean = false;

  rForm: FormGroup;
  constructor(public omc: OmconfirmationProvider, public alertCtrl: AlertController, private inAppBrowser: InAppBrowser, public toastCtrl: ToastController, public _dd: DeliverydateProvider, public _da: DeliveryaddressProvider, public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, public storage: Storage, public _co: ConfirmorderProvider, public carrier: GetcarrierProvider, public disc: DiscountProvider, public om: OmProvider) {
    this.showSpinner = true;

    this.rForm = fb.group({
      'commune': [null, Validators.required],
      'quartier': [null, Validators.required],
      'deliveryType': [null, Validators.required],
      'myCalendar': [null],
      'myTime': [null],
      'description': [null, Validators.compose([Validators.required, Validators.min(10)])],
      'payement': [null],
      // 'payement':({value: 'rust', disabled: true}),
      'discount': [null]
    });

    this.storage.get('Order').then(
      data => {
        this.totalAmount = data.total;
        // console.log('Stored amount is ********** ',this.totalAmount)
      }
    );

    this.storage.get('Customer').then(
      data => {
        this.idCustomer = data.id_customer;
        this.secure_key = data.secure_key;
        // console.log('The customer is ',data);
      },
      error => {
        // console.log('No Customer avalable')
      }
    )
    this.storage.get('Cart').then(
      data => {
        this.idCart = data.id;
        this.reference = data.customer;
        // console.log(JSON.stringify(data));
      }
    );

    this.storage.get('Shop').then(
      data => {
        this.idShop = data.id;
        // console.log('*********** Shop taken ********** ',JSON.stringify(data));
      },
      error => {
        // console.log('No shop delivered');
      })

  }

  ionViewWillEnter() {

    // console.log('View will load');

    this.storage.get('Shop').then(
      data => {
        this.idShop = data.id;
      },
      error => {
      })

    this.storage.get('cartProds').then(
      data => {

        // console.log(' prevent Cart product are ', data);

        this.cartProduct = data;
        for (let x of this.cartProduct) {
          // this.cartVerif = x.cat;
          this.cartVerif = x;
          // this.cartVerif = parseInt(x);

          // console.log('*********** Verification ********** ', this.cartVerif);

          if (this.cartVerif === 576 || this.cartVerif === "Boxing Day") {
            // if (this.cartVerif === 576 || this.cartVerif === "Boxing Day") {
            // console.log('*********** ENTER Boxing days **********');
            // this.idShop = this.navParams.get('id_shop');
            // console.log('*********** L ID shooper est en parametre **********', this.idShop);
            if (this.idShop === 20 || this.idShop === 1) {
              // console.log('*********** Boxing days ACTIF **********');
              let id_Shop = {
                'id_shop': this.idShop
              }
              this.carrier.getCarrier(JSON.stringify(id_Shop)).subscribe(data => {
                this.allCarrier = data.filter(shop => shop.id_carrier < 22);
                // console.log('allcarrier called', this.allCarrier);
              })
              // console.log('*********** La livraison est Abidjan dans la boucle **********');
              this.showSpinner = false;
            }
            else if (this.idShop != 1) {

              let id_Shop = {
                'id_shop': this.idShop
              }
              this.carrier.getCarrier(JSON.stringify(id_Shop)).subscribe(data => {
                this.allCarrier = data;
              })
              this.showSpinner = false;
            }
            break;
          }
          if (this.cartVerif != 576 || this.cartVerif != 879) {

            this.idShop = this.navParams.get('id_shop');
            let id_Shop = {
              'id_shop': this.idShop
            }
            this.carrier.getCarrier(JSON.stringify(id_Shop)).subscribe(data => {
              this.allCarrier = data;
              this.showSpinner = false;
            })
            // console.log('*********** Autre livraison **********');

          }
        }
        this.showSpinner = false;
      },
      error => {
        // console.error('Error loading data')
      }
    );
  }

  dateOption(post) {
    this.rForm.get('myTime').enable();
  }
  activation() {
    this.validate = true;
  }

  saveDateAdd(post) {
    this.rForm.get('payement').enable();
    this.showSpinner = true;
    let deliveryOptions = this.rForm.get('deliveryType').value;
    this.carrierId = parseInt(deliveryOptions.split(",", 1));

    this.RouteParams = {
      'deliveryTypes': this.rForm.get('deliveryType').value,
      'idCart': this.idCart,
      'customer': this.idCustomer,
      'district': this.rForm.get('commune').value,
      'location': this.rForm.get('quartier').value,
      'description': this.rForm.get('description').value,
    };
    this.navCtrl.push('StepDeliveryPage', this.RouteParams);

    this.showSpinner = false;
  }

  quartier(commune) {

    this.rForm.get('quartier').enable();
    this.ngClasses = commune.commune;
    switch (this.ngClasses) {
      case 'Abobo':
        this.Treichville = false;
        this.Abobo = true;
        this.Adjame = false;
        this.Yopougon = false;
        this.Yamoussoukro = false;
        this.Plateau = false;
        this.Cocody = false;
        this.Marcory = false;
        this.Cocody = false;
        this.Koumassi = false;
        this.Bouake = false;
        this.Portbouet = false;
        this.daloa = false;
        this.sp = false;
        this.Attecoube = false;
        this.Bingerville = false;
        break;
      case 'Adjame':
        this.Treichville = false;
        this.Adjame = true;
        this.Abobo = false;
        this.Yopougon = false;
        this.Yamoussoukro = false;
        this.Plateau = false;
        this.Cocody = false;
        this.Marcory = false;
        this.Cocody = false;
        this.Koumassi = false;
        this.Bouake = false;
        this.Portbouet = false;
        this.daloa = false;
        this.daloa = false;
        this.Attecoube = false;
        this.Bingerville = false;
        break;
      case 'Bingerville':
        this.Treichville = false;
        this.Adjame = false;
        this.Abobo = false;
        this.Yopougon = false;
        this.Yamoussoukro = false;
        this.Plateau = false;
        this.Cocody = false;
        this.Marcory = false;
        this.Cocody = false;
        this.Koumassi = false;
        this.Bouake = false;
        this.Portbouet = false;
        this.daloa = false;
        this.daloa = false;
        this.Attecoube = false;
        this.Bingerville = true;
        break;
      case 'Yopougon':
        this.Treichville = false;
        this.Yopougon = true;
        this.Abobo = false;
        this.Adjame = false;
        this.Yopougon = true;
        this.Yamoussoukro = false;
        this.Plateau = false;
        this.Cocody = false;
        this.Marcory = false;
        this.Cocody = false;
        this.Koumassi = false;
        this.Bouake = false;
        this.Portbouet = false;
        this.daloa = false;
        this.sp = false;
        this.Attecoube = false;
        this.Bingerville = false;
        break;
      case 'Plateau':
        this.Treichville = false;
        this.Plateau = true;
        this.Abobo = false;
        this.Adjame = false;
        this.Yopougon = false;
        this.Yamoussoukro = false;
        this.Cocody = false;
        this.Marcory = false;
        this.Cocody = false;
        this.Koumassi = false;
        this.Bouake = false;
        this.Portbouet = false;
        this.daloa = false;
        this.sp = false;
        this.Attecoube = false;
        this.Bingerville = false;
        break;
      case 'Attecoube':
        this.Treichville = false;
        this.Attecoube = true;
        this.Abobo = false;
        this.Adjame = false;
        this.Yopougon = false;
        this.Yamoussoukro = false;
        this.Plateau = false;
        this.Cocody = false;
        this.Marcory = false;
        this.Cocody = false;
        this.Koumassi = false;
        this.Bouake = false;
        this.Portbouet = false;
        this.daloa = false;
        this.sp = false;
        this.Bingerville = false;
        break;
      case 'Cocody':
        this.Treichville = false;
        this.Attecoube = false;
        this.Abobo = false;
        this.Adjame = false;
        this.Yopougon = false;
        this.Yamoussoukro = false;
        this.Plateau = false;
        this.Cocody = true;
        this.Marcory = false;
        this.Koumassi = false;
        this.Bouake = false;
        this.Portbouet = false;
        this.daloa = false;
        this.sp = false;
        this.Attecoube = false;
        this.Bingerville = false;
        break;
      case 'Marcory':
        this.Treichville = false;
        this.Attecoube = false;
        this.Abobo = false;
        this.Adjame = false;
        this.Yopougon = false;
        this.Yamoussoukro = false;
        this.Plateau = false;
        this.Cocody = false;
        this.Marcory = true;
        this.Cocody = false;
        this.Koumassi = false;
        this.Bouake = false;
        this.Portbouet = false;
        this.daloa = false;
        this.sp = false;
        this.Attecoube = false;
        this.Bingerville = false;
        break;
      case 'Koumassi':
        this.Treichville = false;
        this.Attecoube = false;
        this.Abobo = false;
        this.Adjame = false;
        this.Yopougon = false;
        this.Yamoussoukro = false;
        this.Plateau = false;
        this.Cocody = false;
        this.Marcory = false;
        this.Cocody = false;
        this.Koumassi = true;
        this.Bouake = false;
        this.Portbouet = false;
        this.daloa = false;
        this.sp = false;
        this.Attecoube = false;
        this.Bingerville = false;
        break;
      case 'Treichville':
        this.Treichville = true;
        this.Attecoube = false;
        this.Abobo = false;
        this.Adjame = false;
        this.Yopougon = false;
        this.Yamoussoukro = false;
        this.Plateau = false;
        this.Cocody = false;
        this.Marcory = false;
        this.Cocody = false;
        this.Koumassi = false;
        this.Bouake = false;
        this.Portbouet = false;
        this.daloa = false;
        this.sp = false;
        this.Attecoube = false;
        this.Bingerville = false;
        break;
      case 'Yamoussoukro':
        this.Attecoube = false;
        this.Treichville = false;
        this.Attecoube = false;
        this.Abobo = false;
        this.Adjame = false;
        this.Yopougon = false;
        this.Yamoussoukro = true;
        this.Plateau = false;
        this.Cocody = false;
        this.Marcory = false;
        this.Cocody = false;
        this.Koumassi = false;
        this.Bouake = false;
        this.Portbouet = false;
        this.daloa = false;
        this.sp = false;
        this.Attecoube = false;
        this.Bingerville = false;
        break;
      case 'Bouake':
        this.Attecoube = false;
        this.Treichville = false;
        this.Attecoube = false;
        this.Abobo = false;
        this.Adjame = false;
        this.Yopougon = false;
        this.Yamoussoukro = false;
        this.Plateau = false;
        this.Cocody = false;
        this.Marcory = false;
        this.Cocody = false;
        this.Koumassi = false;
        this.Bouake = true;
        this.Portbouet = false;
        this.daloa = false;
        this.sp = false;
        this.Attecoube = false;
        this.Bingerville = false;
        break;
      case 'PortBouet':
        this.Attecoube = false;
        this.Treichville = false;
        this.Attecoube = false;
        this.Abobo = false;
        this.Adjame = false;
        this.Yopougon = false;
        this.Yamoussoukro = false;
        this.Plateau = false;
        this.Cocody = false;
        this.Marcory = false;
        this.Cocody = false;
        this.Koumassi = false;
        this.Bouake = false;
        this.Portbouet = true;
        this.daloa = false;
        this.sp = false;
        this.Attecoube = false;
        this.Bingerville = false;
        break;
      case 'SanPedro':
        this.Attecoube = false;
        this.Treichville = false;
        this.Attecoube = false;
        this.Abobo = false;
        this.Adjame = false;
        this.Yopougon = false;
        this.Yamoussoukro = false;
        this.Plateau = false;
        this.Cocody = false;
        this.Marcory = false;
        this.Cocody = false;
        this.Koumassi = false;
        this.Bouake = false;
        this.Portbouet = false;
        this.daloa = false;
        this.sp = true;
        this.Attecoube = false;
        this.Bingerville = false;
        break;
      case 'Daloa':
        this.Attecoube = false;
        this.Treichville = false;
        this.Attecoube = false;
        this.Abobo = false;
        this.Adjame = false;
        this.Yopougon = false;
        this.Yamoussoukro = false;
        this.Plateau = false;
        this.Cocody = false;
        this.Marcory = false;
        this.Cocody = false;
        this.Koumassi = false;
        this.Bouake = false;
        this.Portbouet = false;
        this.daloa = true;
        this.sp = false;
        this.Attecoube = false;
        this.Bingerville = false;
        break;

    }
  }
  getOrderTotal() {
    this.storage.get('Order').then(
      data => {
        this.totalAmount = data.total;
        // console.log('Stored amount is ********** ',this.totalAmount)
      },
      error => {
      }
    )
  }



}
