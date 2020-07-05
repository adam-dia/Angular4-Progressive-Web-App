import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage';
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
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-step-payment',
  templateUrl: 'step-payment.html',
})
export class StepPaymentPage {

  showSpinner: boolean = false;
  title: string = "Confirmation de Commande";
  resume_title: string = "Résumé de commande";
  delivery_title: string = "Adresse de Livraison";

  public idCustomer;
  public idShop = 1;
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
  public idDeliveryAddress;
  //***************************/
  public isCash: boolean = false;
  public isOrange: boolean = false;
  public isCb: boolean = false;
  public deliveryTypes;

  rForm: FormGroup;
  constructor(public omc: OmconfirmationProvider, public alertCtrl: AlertController, private inAppBrowser: InAppBrowser, public toastCtrl: ToastController, public _dd: DeliverydateProvider, public _da: DeliveryaddressProvider, public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, public storage: Storage, public _co: ConfirmorderProvider, public carrier: GetcarrierProvider, public disc: DiscountProvider, public om: OmProvider) {
    this.showSpinner = true;
    this.rForm = fb.group({
      'commune': [null],
      'quartier': [null],
      'deliveryType': [null],
      'myCalendar': [null],
      'myTime': [null],
      'description': [null],
      'payement': [null, Validators.required],
      // 'payement':({value: 'rust', disabled: true}),
      'discount': [null]
    })

    this.deliveryTypes = this.navParams.get('deliveryTypes');
    // console.log('******** parameters ******', this.navParams.get('deliveryTypes'));
    // console.log('******** parameters ******', this.navParams.get('deliveryTypes'),this.navParams.get('district'),this.navParams.get('location'),this.navParams.get('description'));

    // this.rForm.get('myCalendar').disable();
    // this.rForm.get('myTime').disable();
    // this.rForm.get('quartier').disable();
    // this.rForm.get('payement').disable();

    this.storage.get('Customer').then(
      data => {
        this.idCustomer = data.id_customer;
        this.secure_key = data.secure_key;
        // console.log(JSON.stringify(data))
      }
    )
    this.storage.get('Cart').then(
      data => {
        this.idCart = data.id;
        this.reference = data.customer;
        // console.log(JSON.stringify(data));
      }
    )
    // console.log('Lheure actuel est ',new Date().toDateString);
    this.storage.get('Order').then(
      (data) => { this.totalAmount = data.total }

    )
    this.storage.get('Shop').then(
      data => {
        this.idShop = data.id;
        // Recupere les carrier en fonction du Shop
        let id_Shop = {
          'id_shop': this.idShop
        }
        this.carrier.getCarrier(JSON.stringify(id_Shop)).subscribe(data => {
          this.allCarrier = data;
          // console.log('Voici les carriers',JSON.stringify(this.allCarrier));
          this.showSpinner = false;
        })
        // Fin Carrier
        // console.log('Le shop ID est ',this.idShop);
      },
      error => {
        this.showSpinner = false;
      }
    )
  }

  ionViewWillEnter() {
    this.storage.get('Customer')
      .then(
        data => {
          this.idDeliveryAddress = data.id_address;
          // console.log('********* Utilisateur *************',this.idDeliveryAddress);
        }
      );
  }


  confirmOrder(post) {
    this.showSpinner = true;

    let deliveryAddress = {
      'idCart': this.idCart,
      'customer': this.idCustomer,
      'district': this.navParams.get('district'),
      'location': this.navParams.get('location'),
      'description': this.navParams.get('description'),
    }

    this.recordDeliveryAddress(deliveryAddress);

    let deliveryOptions = this.deliveryTypes;
    // let deliveryOptions =  post.deliveryType;
    this.carrierId = parseInt(deliveryOptions.split(",", 1));
    this.carrierCost = parseInt(deliveryOptions.slice(3, 14));

    let orderParam = {
      'id_cart': this.idCart,
      'id_carrier': this.carrierId,
      'id_shop': this.idShop,
      'id_address_delivery': this.idDeliveryAddress,
      // 'id_address_delivery':1,
      'id_customer': this.idCustomer,
      'id_address_invoice': this.idDeliveryAddress,
      // 'id_address_invoice':1,
      'total_discounts': 0,
      'total_paid': this.totalAmount + this.carrierCost,
      'total_products': this.totalAmount,
      'total_shipping': this.carrierCost,
      'carrier_tax_rate': this.carrierCost,
      'total_wrapping': 0,
      'delivery_number': 99,
      'valid': 1,
      'reference': this.reference,
      'secure_key': this.secure_key
    }
    // console.log('the param are ',JSON.stringify(orderParam));
    this.validateOrder(orderParam);
    this.showSpinner = false;
  }
  cashOnDelivery() {
    this.isCash = true;
    this.isCb = false;
    this.isOrange = false;
  }

  orangeMoney() {

    this.isCash = false;
    this.isCb = false;
    this.isOrange = true;
    // console.log('Clique sur le boutton l_ID est ',this.idCart);
  }

  payOrange() {
    this.showSpinner = true;
    let sessionId = Math.floor(Math.random() * Math.floor(999999999));
    // let sessionId = this.idCart;
    let param = {
      'amount': this.totalAmount
    }
    let token;
    this.om.getToken(JSON.stringify(param)).subscribe(
      // data => console.log('The token is ', JSON.stringify(data)),
      data => {
        token = data.token;
        // console.log('The token is ',token);
      },
      error => {
        // console.log('NO token avalable')
      },
      () => {
        this.showSpinner = false;
        let confirm = this.alertCtrl.create({
          title: 'Paiement Orange money',
          message: 'Vous allez être redirigé vers la plateforme de paiement Orange money ',
          buttons: [
            {
              text: 'Annuler',
              handler: () => {
                // console.log('Disagree clicked');
              }
            },
            {
              text: 'Suivant',
              handler: () => {
                this.showSpinner = true;
                let url = 'https://www.yaatoo.ci/mobileApp/om/pay.php?token=' + token + '&sid=' + sessionId + '&amount=' + this.totalAmount + '&idCart=' + this.idCart;
                const options: InAppBrowserOptions = {
                  zoom: 'no',
                  toolbar: 'yes',
                  closebuttoncaption: 'Terminer',
                  toolbarposition: 'top'
                }
                const browser = this.inAppBrowser.create(url, '_parent', options);
                this.showSpinner = false;

                if (browser.on('loadstart').subscribe)
                  browser.on('loadstart').subscribe((e: InAppBrowserEvent) => {
                    if (e && e.url) {
                      url = e.url;
                      // console.log(url);
                    }
                  });

                if (browser.on('exit').subscribe)
                  browser.on('exit').subscribe((e: InAppBrowserEvent) => {

                    if (url === 'https://www.yaatoo.ci/module/orangemoney/retour') {

                      // console.log('Paiment effectué avec succès ', this.idCart);
                      let purchase = {
                        "purchaseref": this.idCart
                      }
                      this.omc.getConfirmation(JSON.stringify(purchase)).subscribe(
                        data => {
                          this.omResult = data;
                          // console.log('The data received ',JSON.stringify(this.omResult));
                          for (let x of this.omResult) {
                            this.omStatus = x.status;
                            this.omError = x.error;
                          }
                          // console.log('The status is ',this.omStatus);
                          if (this.omStatus === 1 && this.omError === 1) {
                            let alert = this.alertCtrl.create({
                              title: 'Echec de paiement',
                              subTitle: 'Une erreur est survenue lors du paiement veuillez réessayer SVP !',
                              buttons: ['OK']
                            });
                            alert.present();
                          }
                          if (this.omStatus === -3 && this.omError === -3) {
                            let alert = this.alertCtrl.create({
                              title: 'Echec de paiement',
                              subTitle: 'Désolé, votre solde est insuffisant',
                              buttons: ['OK']
                            });
                            alert.present();
                          }
                          if (this.omStatus == 0 && this.omError == 0) {
                            this.showSpinner = true;
                            // console.log('The succes status is ',this.omStatus);
                            let deliveryOptions = this.deliveryTypes;
                            // let deliveryOptions = this.rForm.get('deliveryType').value;
                            let payement = this.rForm.get('payement').value;
                            this.carrierId = parseInt(deliveryOptions.split(",", 1));
                            this.carrierCost = parseInt(deliveryOptions.slice(3, 14));
                            let orderParam = {
                              'id_cart': this.idCart,
                              'id_carrier': this.carrierId,
                              'id_shop': this.idShop,
                              'id_address_delivery': this.idDeliveryAddress,
                              // 'id_address_delivery':1,
                              'id_customer': this.idCustomer,
                              'id_address_invoice': this.idDeliveryAddress,
                              // 'id_address_invoice':1,
                              'total_discounts': 0,
                              'total_paid': this.totalAmount + this.carrierCost,
                              'total_products': this.totalAmount,
                              'total_shipping': this.carrierCost,
                              'carrier_tax_rate': this.carrierCost,
                              'total_wrapping': 0,
                              'delivery_number': 99,
                              'valid': 1,
                              'reference': this.reference,
                              'secure_key': this.secure_key,
                              'payment': payement,
                            }
                            this.validateOrder(orderParam);
                            // this.navCtrl.setRoot('CongratPage');
                            this.showSpinner = false;
                            // console.log('Payment agree The status ',this.omStatus, 'the error ',this.omError);
                          }
                        },
                        error => {
                          // console.log('Error confirmation')
                        }
                      )

                    }

                    if (url === 'https://www.yaatoo.ci/module/orangemoney/erreur') {
                      let alert = this.alertCtrl.create({
                        title: 'Echec de paiement',
                        subTitle: 'Une erreur est survenue lors du paiement veuillez reesayer SVP !',
                        buttons: ['OK']
                      });
                      alert.present();
                    }

                    if (url === 'https://ompay.orange.ci/e-commerce/' || url === 'https://ompay.orange.ci/e-commerce/payment' || url === 'https://ompay.orange.ci/e-commerce/echec.php?errType=a87ff679a2f3e71d9181a67b7542122c') {
                      let alert = this.alertCtrl.create({
                        title: 'Echec de paiement',
                        subTitle: 'Une erreur est survenue lors du paiement veuillez reesayer SVP !',
                        buttons: ['OK']
                      });
                      alert.present();
                    }
                  });


              }
            }
          ]
        });
        confirm.present();
      }
    )
  }
  cartPayment() {
    this.isCash = false;
    this.isCb = true;
    this.isOrange = false;
  }

  payCart() {
    this.isCash = false;
    this.isCb = true;
    this.isOrange = false;

    let confirm = this.alertCtrl.create({
      title: 'Paiement Carte Bancaire',
      message: 'Vous allez être redirigé vers la plateforme de paiement par Carte Bancaire',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            // console.log('Disagree clicked');
          }
        },
        {
          text: 'Suivant',
          handler: () => {
            this.showSpinner = true;
            let url = 'https://www.yaatoo.ci/mobileApp/cb/pay.php?amount=' + this.totalAmount + '&ref=' + this.idCart + '&info=' + this.idCustomer;
            const options: InAppBrowserOptions = {
              // zoom: 'no',
              toolbar: 'yes',
              closebuttoncaption: 'Terminer',
              fullscreen: 'yes',
              toolbarposition: 'top'
            }
            const browser = this.inAppBrowser.create(url, '_parent', options);
            this.showSpinner = false;

            if (browser.on('loadstart').subscribe)
              browser.on('loadstart').subscribe((e: InAppBrowserEvent) => {
                if (e && e.url) {
                  url = e.url;
                  // console.log(url);
                }
              });

            if (browser.on('exit').subscribe)
              browser.on('exit').subscribe((e: InAppBrowserEvent) => {

                if (url === 'https://www.yaatoo.ci/module/cardpayment/retour') {
                  // console.log('Transaction VALIDE');
                }
                else {
                  let alert = this.alertCtrl.create({
                    title: 'Echec de paiement',
                    subTitle: 'Une erreur est survenue lors du paiement veuillez reesayer SVP !',
                    buttons: ['OK']
                  });
                  alert.present();
                }
              });


          }
        }
      ]
    });
    confirm.present();

  }
  recordDeliveryAddress(param) {

    this._da.addDeliveryAddress(JSON.stringify(param)).subscribe(data => {
      // console.log('address added')
    }, error => {
      // console.log('Error addind delivery adress')
    })

  }
  recordeDeliveryDate(param) {
    this._dd.addDeliveryDate(JSON.stringify(param)).subscribe(data => {
    },
      error => {
        // console.log('Error loading Date')
      }
    )
  }

  validateOrder(param) {
    this.showSpinner = true;
    this._co.confirmOrder(JSON.stringify(param)).subscribe(
      data => {
        this.order = data;

        this.storage.remove('Cart').then(
          data => {
            // console.log('Cart removed')
          },
          error => console.log('ERROR removing cart')
        )
        this.storage.remove('cartProds').then(
          data => {
            // console.log('Cart product removed')
          },
          error => {
            // console.log('ERROR removing cart product')
          }
        )
        this.navCtrl.setRoot('CongratPage');
        this.showSpinner = false;
      },
      error => {
        // console.log('Error Finalizing data')
      }
    )
  }

  getOrderTotal() {
    this.storage.get('Order').then(
      data => this.totalAmount = data.total,
      error => {
        // console.log('Error on total')
      }
    )
  }

  applyDiscount(post) {
    this.showSpinner = true
    // console.log('Le Code du discount est le suivant ',post.discount);
    let param = {
      'code': post.discount
    }
    // console.log('THe code is ',JSON.stringify(param));
    if (post.discount != null || post.discount != "" || post.discount != NaN || post.discount != undefined) {
      this.disc.getDiscount(JSON.stringify(param)).subscribe(
        data => {
          this.discount = data;
          // console.log('Le total est ',this.totalAmount);
          // console.log('le discount est ',JSON.stringify(this.discount));

          for (let x of this.discount) {
            this.disc_id = x.id_cart_rule;
            this.disc_min_amount = x.minimum_amount;
            this.disc_code = x.code;
            this.disc_reduction_amount = x.reduction_amount;
            this.disc_reduction_ratio = x.reduction_percent;
            // console.log('LID discount ',this.disc_reduction_amount);
          }

          if (this.disc_code === '' || this.disc_code == null || this.disc_code === NaN) {

            this.totalAmount = this.totalAmount;
            let toast = this.toastCtrl.create({
              message: 'Désolé ce code n\'est pas valable',
              duration: 1500,
              position: 'top'
            });
            toast.present();

          }
          else {

            if (this.disc_min_amount != 0 && this.disc_attempt == 0) {
              if (this.totalAmount > this.disc_min_amount) {
                this.totalAmount = this.totalAmount - this.disc_reduction_amount;
                let toast = this.toastCtrl.create({
                  message: `Vous benficiez d'une reduction de ${parseInt(this.disc_reduction_amount)} !`,
                  duration: 1500,
                  position: 'top'
                });
                toast.present();
                // console.log('Le discount est ',JSON.stringify(this.discount));
                // console.log('Le Montant total avec discount est ',this.totalAmount);
                // Mettre la condition d'utiliser deja
                this.disc_attempt = 1;
                // console.log('Le discount est ',JSON.stringify(this.discount));
              }
              else if (this.totalAmount < this.disc_min_amount) {
                let toast = this.toastCtrl.create({
                  message: 'Oups !! Le montant de votre panier doit être superieur à ' + parseInt(this.disc_reduction_amount),
                  duration: 1500,
                  position: 'top'
                });
                toast.present();
              }
            }
            else if (this.disc_min_amount == 0 && this.totalAmount > this.disc_min_amount) {
              this.totalAmount = this.totalAmount - this.disc_reduction_amount;
              let toast = this.toastCtrl.create({
                message: `Vous benficiez d'une reduction de ${parseInt(this.disc_reduction_amount)} !`,
                duration: 1500,
                position: 'top'
              });
              toast.present();
              // console.log('Le discount est ',JSON.stringify(this.discount));
              // console.log('Le Montant total avec discount est ',this.totalAmount);
              this.disc_attempt = 1;
            }
            else if (this.disc_attempt == 1) {
              let toast = this.toastCtrl.create({
                message: 'Ce code à déja été utilisé !',
                duration: 1500,
                position: 'top'
              });
              toast.present();
            }

          }

        },
        error => {

          let toast = this.toastCtrl.create({
            message: 'Désolé ce code n\'est pas valable',
            duration: 1500,
            position: 'top'
          });
          toast.present();
        }
      )
    }
    else if (post.discount == null || post.discount == '') {
      let toast = this.toastCtrl.create({
        message: 'Veuillez entrer un code Valide SVP !',
        duration: 1500,
        position: 'top'
      });
      toast.present();

      // console.log('Entre un code Valide SVP !!');
    }
    this.showSpinner = false;
  }
  next() {
    this.navCtrl.push('StepDeliveryPage');
  }
}
