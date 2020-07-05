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
import { ToastController } from 'ionic-angular';
import { OmProvider } from '../../providers/om/om';
import { AlertController } from 'ionic-angular';
import { OmconfirmationProvider } from '../../providers/omconfirmation/omconfirmation';
import { OmModel } from '../../models/OmModel';
// import { parseDate } from 'ionic-angular/util/datetime-util';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-step-delivery',
  templateUrl: 'step-delivery.html',
})
export class StepDeliveryPage {
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
  public disc_id: number = 0;
  public disc_min_amount: number = 0;
  public disc_code;
  public disc_reduction_ratio;
  public disc_reduction_amount;
  public payParams;
  //***************************/
  public sp: boolean = false;
  public omResult: OmModel[];
  public omStatus: number = 1; public omError: number = 1;
  public deliveryDate: Object;
  public cartProduct;

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
  public deliveryTypes;
  public deliveryType;
  public Transporter;
  rForm: FormGroup;
  constructor(public omc: OmconfirmationProvider, public alertCtrl: AlertController,
    public toastCtrl: ToastController, public _dd: DeliverydateProvider,
    public _da: DeliveryaddressProvider, public navCtrl: NavController,
    public navParams: NavParams, fb: FormBuilder, public storage: Storage,
    public _co: ConfirmorderProvider, public carrier: GetcarrierProvider,
    public disc: DiscountProvider, public om: OmProvider) {
    this.showSpinner = true;
    this.rForm = fb.group({
      'commune': [null],
      'quartier': [null],
      'deliveryType': [null],
      'myCalendar': [null, Validators.required],
      'myTime': [null, Validators.required],
      'description': [null],
      'payement': [null],
      // 'payement':({value: 'rust', disabled: true}),
      'discount': [null]
    })
    // console.log('*************** RouteParams *************', navParams.get('deliveryTypes'));

    this.deliveryTypes = navParams.get('deliveryTypes');
    this.deliveryType = this.deliveryTypes.split(",", 1);


    this.rForm.get('myTime').disable();

    this.storage.get('Customer').then(
      data => {
        this.idCustomer = data.id_customer;
        this.secure_key = data.secure_key;
        // console.log(JSON.stringify(data))
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
      },
      error => {
        // console.log('No Cart avalable')
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

      },
      error => {
        this.showSpinner = false;
      }
    )

    this.storage.get('cartProds').then(
      data => {
        this.cartProduct = data;
        // console.log('THe cart product categoris are ',this.cartProduct);
      },
      error => {
        // console.error('Error loading data')
      }
    )

  }

  ionViewDidEnter(post) {
    let d = new Date();
    let nowDays = d.getDate().toString();
    let nowHours = d.getHours().toString();
    let nowMinutes = d.getMinutes().toString();
    let nowMonth = d.getUTCMonth().toString();
    let nowFinalMonth = (parseInt(nowMonth) + 1).toString();
    let nowYear = 2018;
    let nextDays = (parseInt(nowDays) + 1).toString();
    let interiorDays = (parseInt(nowDays) + 3).toString();

    let deliveryOptions = this.deliveryTypes;
    this.carrierId = parseInt(deliveryOptions.split(",", 1));

    // console.log('CArrier ID Date page ',this.carrierId);

    let expressHour = parseInt(nowHours) + 2;
    let classicHour = parseInt(nowHours) + 4;
    this.daysVals = [parseInt(nowDays), parseInt(nowDays) + 1, parseInt(nowDays) + 2,
    parseInt(nowDays) + 3, parseInt(nowDays) + 4, parseInt(nowDays) + 5, parseInt(nowDays) + 6,
    parseInt(nowDays) + 7, parseInt(nowDays) + 8, parseInt(nowDays) + 9, parseInt(nowDays) + 10,
    parseInt(nowDays) + 11, parseInt(nowDays) + 12, parseInt(nowDays) + 13, parseInt(nowDays) + 14, parseInt(nowDays) + 15,
    parseInt(nowDays) + 16, parseInt(nowDays) + 17, parseInt(nowDays) + 18, parseInt(nowDays) + 18, parseInt(nowDays) + 18,
    parseInt(nowDays) + 19, parseInt(nowDays) + 20, parseInt(nowDays) + 21, parseInt(nowDays) + 22, parseInt(nowDays) + 23, parseInt(nowDays) + 24,
    parseInt(nowDays) + 25, parseInt(nowDays) + 26, parseInt(nowDays) + 27, parseInt(nowDays) + 28, parseInt(nowDays) + 29,
    parseInt(nowDays) + 30, parseInt(nowDays) + 31]

    if ((parseInt(nowMonth) + 1 == 4 || parseInt(nowMonth) + 1 == 6 || parseInt(nowMonth) + 1 == 9 || parseInt(nowMonth) + 1 == 11) && parseInt(nowDays) <= 30) {
      this.daysVal = this.daysVals.filter(function (element, index, array) {
        return (element < 31);
      })
    }
    if ((parseInt(nowMonth) + 1 == 1 || parseInt(nowMonth) + 1 == 3 || parseInt(nowMonth) + 1 == 5 ||
      parseInt(nowMonth) + 1 == 7 || parseInt(nowMonth) + 1 == 8 || parseInt(nowMonth) + 1 == 10 || parseInt(nowMonth) + 1 == 12)
      && parseInt(nowDays) < 30) {
      this.daysVal = this.daysVals.filter(function (element, index, array) {
        return (element <= 31);
      })
    }
    if ((parseInt(nowMonth) + 1 == 2 && parseInt(nowDays) <= 28)) {
      this.daysVal = this.daysVals.filter(function (element, index, array) {
        return (element <= 28);
      })
    }

    //***************************** Watch Mp product in cart *****************************

    for (let x of this.cartProduct) {
      let y = x;
      // let y = parseInt(x);
      // console.log('Le Y est ', y);
      if (y == 576 || y == "Boxing Day") {

        // console.log('The verification is ', y);
        // console.log('Le jour actuel est',nowDays);
        // console.log('Le mois actuel est',parseInt(nowMonth)+1);

        this.daysVals = [
          parseInt(nowDays) + 4, parseInt(nowDays) + 5, parseInt(nowDays) + 6,
          parseInt(nowDays) + 7, parseInt(nowDays) + 8, parseInt(nowDays) + 9, parseInt(nowDays) + 10,
          parseInt(nowDays) + 11, parseInt(nowDays) + 12, parseInt(nowDays) + 13, parseInt(nowDays) + 14, parseInt(nowDays) + 15,
          parseInt(nowDays) + 16, parseInt(nowDays) + 17, parseInt(nowDays) + 18, parseInt(nowDays) + 18, parseInt(nowDays) + 18,
          parseInt(nowDays) + 19, parseInt(nowDays) + 20, parseInt(nowDays) + 21, parseInt(nowDays) + 22, parseInt(nowDays) + 23, parseInt(nowDays) + 24,
          parseInt(nowDays) + 25, parseInt(nowDays) + 26, parseInt(nowDays) + 27, parseInt(nowDays) + 28, parseInt(nowDays) + 29,
          parseInt(nowDays) + 30, parseInt(nowDays) + 31]

        if (parseInt(nowMonth) + 3 >= 12) {
          this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, "1", "2", "3", "4", "5", "6"];
        }
        else {
          this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, parseInt(nowMonth) + 3];
        }
        // this.monthVal = [parseInt(nowMonth)+1,parseInt(nowMonth)+2,parseInt(nowMonth)+3];
        this.yearVal = nowYear;
        this.hoursVal = [classicHour, expressHour + 1, expressHour + 2, expressHour + 3, expressHour + 5, , expressHour + 5, expressHour + 6, expressHour + 7, expressHour + 8, expressHour + 9, expressHour + 10, expressHour + 11];
        this.hoursValEnd = this.hoursVal.filter(function (element, index, array) {
          return (element < 19);
        })

        if ((parseInt(nowMonth) + 1 == 4 || parseInt(nowMonth) + 1 == 6 || parseInt(nowMonth) + 1 == 9 || parseInt(nowMonth) + 1 == 11) && parseInt(nowDays) <= 30) {
          if (parseInt(nowDays) + 4 > 29) {

            if (parseInt(nowMonth) + 3 >= 12) {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, "1", "2", "3", "4", "5", "6"];
            }
            else {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, parseInt(nowMonth) + 3];
            }

            // console.log('les dates sont ',this.monthVal);
            this.daysVals = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13",
              "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "28", "27", "29", "30", "31"];

          }
          else {
            this.daysVal = this.daysVals.filter(function (element, index, array) {
              return (element + 3 <= 30);
            });
            if (parseInt(nowMonth) + 3 >= 12) {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, "1", "2", "3", "4", "5", "6"];
            }
            else {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, parseInt(nowMonth) + 3];
            }

          }
          // this.daysVal = this.daysVals.filter(function(element, index, array){
          //   return (element < 31);
          // });
        }

        if ((parseInt(nowMonth) + 1 == 1 || parseInt(nowMonth) + 1 == 3 || parseInt(nowMonth) + 1 == 5 ||
          parseInt(nowMonth) + 1 == 7 || parseInt(nowMonth) + 1 == 8 || parseInt(nowMonth) + 1 == 10 || parseInt(nowMonth) + 1 == 12)
          && parseInt(nowDays) < 30) {

          if (parseInt(nowDays) + 4 > 30) {

            if (parseInt(nowMonth) + 3 >= 12) {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, "1", "2", "3", "4", "5", "6"];
            }
            else {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, parseInt(nowMonth) + 3];
            }

            // console.log('les dates sont ',this.monthVal);
            this.daysVals = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13",
              "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "28", "27", "29", "30", "31"];

          }
          else {
            this.daysVal = this.daysVals.filter(function (element, index, array) {
              return (element + 3 <= 31);
            });
            if (parseInt(nowMonth) + 3 >= 12) {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, "1", "2", "3", "4", "5", "6"];
            }
            else {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, parseInt(nowMonth) + 3];
            }

          }

        }
        if ((parseInt(nowMonth) + 1 == 2 && parseInt(nowDays) <= 28)) {

          if (parseInt(nowDays) + 4 > 27) {

            if (parseInt(nowMonth) + 3 >= 12) {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, "1", "2", "3", "4", "5", "6"];
            }
            else {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, parseInt(nowMonth) + 3];
            }

            // console.log('les dates sont ',this.monthVal);
            this.daysVals = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13",
              "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"];

          }
          else {
            this.daysVal = this.daysVals.filter(function (element, index, array) {
              return (element <= 28);
            });
            if (parseInt(nowMonth) + 3 >= 12) {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, "1", "2", "3", "4", "5", "6"];
            }
            else {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, parseInt(nowMonth) + 3];
            }

          }
        }
        // this.monthVal = [parseInt(nowMonth)+1,parseInt(nowMonth)+2,parseInt(nowMonth)+3];
        this.yearVal = nowYear;
        this.hoursValEnd = ["10", "11", "12", "13", "14", "15", "16", "17", "18"];

      }
      else {

        // console.log('***************** Produit non market place **************');
        // console.log('***************** ID carrier **************', this.carrierId);

        if (this.carrierId === 22) {

          if (parseInt(nowHours) < 16) {
            if (parseInt(nowMonth) + 3 >= 12) {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, "1", "2", "3", "4", "5", "6"];
            }
            else {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, parseInt(nowMonth) + 3];
            }

            this.yearVal = nowYear;
            this.hoursVal = [expressHour, expressHour + 1, expressHour + 2, expressHour + 3, expressHour + 4, expressHour + 5, expressHour + 6, expressHour + 7, expressHour + 8, expressHour + 9];
            // console.log('Aujoudhui EXPRESS pour la livraison', this.minDate);
            this.hoursValEnd = this.hoursVal.filter(function (element, index, array) {
              return (element < 19);
            })
          }
          else if (parseInt(nowHours) >= 16) {
            this.daysVals = [parseInt(nowDays) + 1, parseInt(nowDays) + 2,
            parseInt(nowDays) + 3, parseInt(nowDays) + 4, parseInt(nowDays) + 5, parseInt(nowDays) + 6,
            parseInt(nowDays) + 7, parseInt(nowDays) + 8, parseInt(nowDays) + 9, parseInt(nowDays) + 10,
            parseInt(nowDays) + 11, parseInt(nowDays) + 12, parseInt(nowDays) + 13, parseInt(nowDays) + 14, parseInt(nowDays) + 15,
            parseInt(nowDays) + 16, parseInt(nowDays) + 17, parseInt(nowDays) + 18, parseInt(nowDays) + 18, parseInt(nowDays) + 18,
            parseInt(nowDays) + 19, parseInt(nowDays) + 20, parseInt(nowDays) + 21, parseInt(nowDays) + 22, parseInt(nowDays) + 23, parseInt(nowDays) + 24,
            parseInt(nowDays) + 25, parseInt(nowDays) + 26, parseInt(nowDays) + 27, parseInt(nowDays) + 28, parseInt(nowDays) + 29,
            parseInt(nowDays) + 30, parseInt(nowDays) + 31]

            if ((parseInt(nowMonth) + 1 == 4 || parseInt(nowMonth) + 1 == 6 || parseInt(nowMonth) + 1 == 9 || parseInt(nowMonth) + 1 == 11) && parseInt(nowDays) <= 30) {
              this.daysVal = this.daysVals.filter(function (element, index, array) {
                return (element < 31);
              })
            }
            if ((parseInt(nowMonth) + 1 == 1 || parseInt(nowMonth) + 1 == 3 || parseInt(nowMonth) + 1 == 5 ||
              parseInt(nowMonth) + 1 == 7 || parseInt(nowMonth) + 1 == 8 || parseInt(nowMonth) + 1 == 10 || parseInt(nowMonth) + 1 == 12)
              && parseInt(nowDays) < 30) {
              this.daysVal = this.daysVals.filter(function (element, index, array) {
                return (element + 3 <= 31);
              })
            }
            if ((parseInt(nowMonth) + 1 == 2 && parseInt(nowDays) <= 28)) {
              this.daysVal = this.daysVals.filter(function (element, index, array) {
                return (element <= 28);
              })
            }

            if (parseInt(nowMonth) + 3 >= 12) {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, "1", "2", "3", "4", "5", "6"];
            }
            else {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, parseInt(nowMonth) + 3];
            }

            this.yearVal = nowYear;
            this.hoursValEnd = ["10", "11", "12", "13", "14", "15", "16", "17", "18"];
          }

        }

        if (this.carrierId === 14 || this.carrierId === 17 || this.carrierId === 20 || this.carrierId === 23 || this.carrierId === 24 || this.carrierId === 25 || this.carrierId === 26) {
          if (parseInt(nowHours) < 16) {
            if (parseInt(nowMonth) + 3 >= 12) {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, "1", "2", "3", "4", "5", "6"];
            }
            else {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, parseInt(nowMonth) + 3];
            }

            this.yearVal = nowYear;
            this.hoursVal = [expressHour, expressHour + 1, expressHour + 2, expressHour + 3, expressHour + 4, expressHour + 5, expressHour + 6, expressHour + 7, expressHour + 8, expressHour + 9];
            // console.log('Aujoudhui EXPRESS pour la livraison', this.minDate);
            this.hoursValEnd = this.hoursVal.filter(function (element, index, array) {
              return (element < 19);
            })

          }
          if (parseInt(nowHours) >= 16) {
            this.daysVals = [parseInt(nowDays) + 1, parseInt(nowDays) + 2,
            parseInt(nowDays) + 3, parseInt(nowDays) + 4, parseInt(nowDays) + 5, parseInt(nowDays) + 6,
            parseInt(nowDays) + 7, parseInt(nowDays) + 8, parseInt(nowDays) + 9, parseInt(nowDays) + 10,
            parseInt(nowDays) + 11, parseInt(nowDays) + 12, parseInt(nowDays) + 13, parseInt(nowDays) + 14, parseInt(nowDays) + 15,
            parseInt(nowDays) + 16, parseInt(nowDays) + 17, parseInt(nowDays) + 18, parseInt(nowDays) + 18, parseInt(nowDays) + 18,
            parseInt(nowDays) + 19, parseInt(nowDays) + 20, parseInt(nowDays) + 21, parseInt(nowDays) + 22, parseInt(nowDays) + 23, parseInt(nowDays) + 24,
            parseInt(nowDays) + 25, parseInt(nowDays) + 26, parseInt(nowDays) + 27, parseInt(nowDays) + 28, parseInt(nowDays) + 29,
            parseInt(nowDays) + 30, parseInt(nowDays) + 31];

            if ((parseInt(nowMonth) + 1 == 4 || parseInt(nowMonth) + 1 == 6 || parseInt(nowMonth) + 1 == 9 || parseInt(nowMonth) + 1 == 11) && parseInt(nowDays) <= 30) {
              this.daysVal = this.daysVals.filter(function (element, index, array) {
                return (element < 31);
              })
            }
            if ((parseInt(nowMonth) + 1 == 1 || parseInt(nowMonth) + 1 == 3 || parseInt(nowMonth) + 1 == 5 ||
              parseInt(nowMonth) + 1 == 7 || parseInt(nowMonth) + 1 == 8 || parseInt(nowMonth) + 1 == 10 || parseInt(nowMonth) + 1 == 12)
              && parseInt(nowDays) < 30) {
              this.daysVal = this.daysVals.filter(function (element, index, array) {
                return (element + 3 <= 31);
              })
            }
            if ((parseInt(nowMonth) + 1 == 2 && parseInt(nowDays) <= 28)) {
              this.daysVal = this.daysVals.filter(function (element, index, array) {
                return (element <= 28);
              })
            }
            if (parseInt(nowMonth) + 3 >= 12) {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, "1", "2", "3", "4", "5", "6"];
            }
            else {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, parseInt(nowMonth) + 3];
            }

            this.yearVal = nowYear;
            this.hoursValEnd = ["10", "11", "12", "13", "14", "15", "16", "17", "18"];
          }
        }
        if (this.carrierId === 19) {

          if (parseInt(nowHours) < 14) {
            if (parseInt(nowMonth) + 3 >= 12) {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, "1", "2", "3", "4", "5", "6"];
            }
            else {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, parseInt(nowMonth) + 3];
            }

            this.yearVal = nowYear;
            this.hoursVal = [classicHour, expressHour + 1, expressHour + 2, expressHour + 3, expressHour + 5, , expressHour + 5, expressHour + 6, expressHour + 7, expressHour + 8, expressHour + 9, expressHour + 10, expressHour + 11];
            this.hoursValEnd = this.hoursVal.filter(function (element, index, array) {
              return (element < 19);
            })
          }
          else if (parseInt(nowHours) >= 14) {
            this.daysVals = [parseInt(nowDays) + 1, parseInt(nowDays) + 2,
            parseInt(nowDays) + 3, parseInt(nowDays) + 4, parseInt(nowDays) + 5, parseInt(nowDays) + 6,
            parseInt(nowDays) + 7, parseInt(nowDays) + 8, parseInt(nowDays) + 9, parseInt(nowDays) + 10,
            parseInt(nowDays) + 11, parseInt(nowDays) + 12, parseInt(nowDays) + 13, parseInt(nowDays) + 14, parseInt(nowDays) + 15,
            parseInt(nowDays) + 16, parseInt(nowDays) + 17, parseInt(nowDays) + 18, parseInt(nowDays) + 18, parseInt(nowDays) + 18,
            parseInt(nowDays) + 19, parseInt(nowDays) + 20, parseInt(nowDays) + 21, parseInt(nowDays) + 22, parseInt(nowDays) + 23, parseInt(nowDays) + 24,
            parseInt(nowDays) + 25, parseInt(nowDays) + 26, parseInt(nowDays) + 27, parseInt(nowDays) + 28, parseInt(nowDays) + 29,
            parseInt(nowDays) + 30, parseInt(nowDays) + 31]

            if ((parseInt(nowMonth) + 1 == 4 || parseInt(nowMonth) + 1 == 6 || parseInt(nowMonth) + 1 == 9 || parseInt(nowMonth) + 1 == 11) && parseInt(nowDays) <= 30) {
              this.daysVal = this.daysVals.filter(function (element, index, array) {
                return (element < 31);
              })
            }
            if ((parseInt(nowMonth) + 1 == 1 || parseInt(nowMonth) + 1 == 3 || parseInt(nowMonth) + 1 == 5 ||
              parseInt(nowMonth) + 1 == 7 || parseInt(nowMonth) + 1 == 8 || parseInt(nowMonth) + 1 == 10 || parseInt(nowMonth) + 1 == 12)
              && parseInt(nowDays) < 30) {
              this.daysVal = this.daysVals.filter(function (element, index, array) {
                return (element + 3 <= 31);
              })
            }
            if ((parseInt(nowMonth) + 1 == 2 && parseInt(nowDays) <= 28)) {
              this.daysVal = this.daysVals.filter(function (element, index, array) {
                return (element <= 28);
              })
            }
            if (parseInt(nowMonth) + 3 >= 12) {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, "1", "2", "3", "4", "5", "6"];
            }
            else {
              this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, parseInt(nowMonth) + 3];
            }

            this.yearVal = nowYear;
            this.hoursValEnd = ["10", "11", "12", "13", "14", "15", "16", "17", "18"];
          }
        }
        if (this.carrierId === 21) {

          this.daysVals = [
            parseInt(nowDays) + 3, parseInt(nowDays) + 4, parseInt(nowDays) + 5, parseInt(nowDays) + 6,
            parseInt(nowDays) + 7, parseInt(nowDays) + 8, parseInt(nowDays) + 9, parseInt(nowDays) + 10,
            parseInt(nowDays) + 11, parseInt(nowDays) + 12, parseInt(nowDays) + 13, parseInt(nowDays) + 14, parseInt(nowDays) + 15,
            parseInt(nowDays) + 16, parseInt(nowDays) + 17, parseInt(nowDays) + 18, parseInt(nowDays) + 18, parseInt(nowDays) + 18,
            parseInt(nowDays) + 19, parseInt(nowDays) + 20, parseInt(nowDays) + 21, parseInt(nowDays) + 22, parseInt(nowDays) + 23, parseInt(nowDays) + 24,
            parseInt(nowDays) + 25, parseInt(nowDays) + 26, parseInt(nowDays) + 27, parseInt(nowDays) + 28, parseInt(nowDays) + 29,
            parseInt(nowDays) + 30, parseInt(nowDays) + 31]

          if ((parseInt(nowMonth) + 1 == 4 || parseInt(nowMonth) + 1 == 6 || parseInt(nowMonth) + 1 == 9 || parseInt(nowMonth) + 1 == 11) && parseInt(nowDays) <= 30) {
            this.daysVal = this.daysVals.filter(function (element, index, array) {
              return (element < 31);
            })
          }
          if ((parseInt(nowMonth) + 1 == 1 || parseInt(nowMonth) + 1 == 3 || parseInt(nowMonth) + 1 == 5 ||
            parseInt(nowMonth) + 1 == 7 || parseInt(nowMonth) + 1 == 8 || parseInt(nowMonth) + 1 == 10 || parseInt(nowMonth) + 1 == 12)
            && parseInt(nowDays) < 30) {
            this.daysVal = this.daysVals.filter(function (element, index, array) {
              return (element + 3 <= 31);
            })
          }
          if ((parseInt(nowMonth) + 1 == 2 && parseInt(nowDays) <= 28)) {
            this.daysVal = this.daysVals.filter(function (element, index, array) {
              return (element <= 28);
            })
          }

          if (parseInt(nowMonth) + 3 >= 12) {
            this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, "1", "2", "3", "4", "5", "6"];
          }
          else {
            this.monthVal = [parseInt(nowMonth) + 1, parseInt(nowMonth) + 2, parseInt(nowMonth) + 3];
          }

          this.yearVal = nowYear;
          this.hoursVal = ["10", "11", "12", "13", "14", "15", "16", "17", "18"];
        }
      }
    }
  }

  dateOption(post) {
    this.rForm.get('myTime').enable();
  }

  saveDateAdd(post) {
    this.rForm.get('payement').enable();
    this.showSpinner = true;
    let deliveryOptions = this.deliveryTypes;
    this.carrierId = parseInt(deliveryOptions.split(",", 1));

    let deliveryAddress = {
      'idCart': this.idCart,
      'customer': this.idCustomer,
      'district': this.navParams.get('district'),
      'location': this.navParams.get('location'),
      'description': this.navParams.get('description'),
    }

    if (this.carrierId === 22) {

      this.deliveryDate = {
        'id_cart': this.idCart,
        'id_customer': this.idCustomer,
        'delivery_date': this.rForm.get('myCalendar').value + ' ' + this.rForm.get('myTime').value,
        'deliverydate_clas': '0000-00-00',
        'creneau_horaire': '00:00:00'
      }
      this.recordDeliveryAddress(deliveryAddress);
      this.recordeDeliveryDate(this.deliveryDate);
    }
    else if (this.carrierId === 19) {
      this.deliveryDate = {
        'id_cart': this.idCart,
        'id_customer': this.idCustomer,
        'delivery_date': '0000-00-00 00:00:00',
        'deliverydate_clas': this.rForm.get('myCalendar').value,
        'creneau_horaire': this.rForm.get('myTime').value.split(":", 1) + 'h-' + (parseInt(this.rForm.get('myTime').value.split(":", 1)) + 1) + 'h'
      }
      this.recordDeliveryAddress(deliveryAddress);
      this.recordeDeliveryDate(this.deliveryDate);
    }
    if (this.carrierId === 14 || this.carrierId === 17 || this.carrierId === 20 || this.carrierId === 23 || this.carrierId === 24 || this.carrierId === 25 || this.carrierId === 26) {
      this.deliveryDate = {
        'id_cart': this.idCart,
        'id_customer': this.idCustomer,
        'delivery_date': this.rForm.get('myCalendar').value + ' ' + this.rForm.get('myTime').value,
        'deliverydate_clas': '0000-00-00',
        'creneau_horaire': '00:00:00'
      }
      this.recordDeliveryAddress(deliveryAddress);
      this.recordeDeliveryDate(this.deliveryDate);
    }
    if (this.carrierId === 21) {
      this.deliveryDate = {
        'id_cart': this.idCart,
        'id_customer': this.idCustomer,
        'delivery_date': '0000-00-00 00:00:00',
        'deliverydate_clas': this.rForm.get('myCalendar').value,
        'creneau_horaire': this.rForm.get('myTime').value.split(":", 1) + 'h-' + (parseInt(this.rForm.get('myTime').value.split(":", 1)) + 1) + 'h'
        // 'creneau_horaire': this.rForm.get('myTime').value
      }
      this.recordDeliveryAddress(deliveryAddress);
      this.recordeDeliveryDate(this.deliveryDate);
    }

    this.payParams = {
      'deliveryTypes': this.navParams.get('deliveryTypes'),
      'idCart': this.idCart,
      'customer': this.idCustomer,
      'district': this.navParams.get('district'),
      'location': this.navParams.get('location'),
      'description': this.navParams.get('description'),
    };
    // console.log('Route params are ',JSON.stringify(this.payParams));
    this.showSpinner = false;
    this.navCtrl.push('StepPaymentPage', this.payParams);

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

  getOrderTotal() {
    this.storage.get('Order').then(
      data => this.totalAmount = data.total,
      error => {
        // console.log('Error on total')
      }
    )
  }

}
