import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Product } from '../../models/Products';
import { FormBuilder, FormGroup } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {

  product: Product[];
  brand: any[];
  chosed: string = '';
  priced: string = '';
  isBrand: boolean = true;
  isPrice: boolean = false;
  price: number[];
  public rangeMin;
  public rangeMax;
  rForm: FormGroup;

  constructor(private fb: FormBuilder, private navParams: NavParams, private view: ViewController) {
    this.rForm = fb.group({
      'price': [null]
    })
  }

  ionViewWillLoad() {
    this.product = this.navParams.get('data');
  }
  closeModal() {
    let filter = {
      'brand': this.chosed,
      'range': [this.priced, this.rangeMax]
    }
    this.view.dismiss(filter);
  }
  ngOnInit() {
    this.byBrand();
  }
  dissmissModal() {
    this.view.dismiss();
  }
  choseBrand(b) {
    this.chosed = b
  }
  chosenPrice(b) {
    this.priced = this.rForm.get('price').value;
  }
  byBrand() {
    this.isBrand = true;
    this.isPrice = false;
    // this.brand = this.product.map((e) => {
    //   return e.manufac;
    // })

    let cache = {};
    this.product = this.product.filter(function (elem, index, array) {
      return cache[elem.manufac] ? 0 : cache[elem.manufac] = 1;
    });
    this.brand = this.product.map((e) => {
      return e.manufac;
    })
    // console.log(this.brand);
    // console.log('Le cache est ',cache);
  }
  byPrice() {
    this.chosed = null;
    this.isBrand = false;
    this.isPrice = true;
    this.price = this.product.map((e) => {
      return e.price;
    })
    this.rangeMax = Math.max(...this.price);
    this.rangeMin = Math.min(...this.price);
    // console.log('the price ',this.price);
  }

}
