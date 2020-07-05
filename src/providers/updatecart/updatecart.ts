import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Config } from '../../models/Config';


@Injectable()
export class UpdatecartProvider {

  constructor(public http: Http) {
  }
  updateCartCustomer(param) {
    return this.http.post(Config.API_ROUTE.URL_UPDATE_CART, param).map(
    data => {
      // console.log('Customer updated')
  },
    error => {
      // console.log('Error updating Customer')
  }).take(3).catch(this.catchError)
  }
  private catchError(error: Response | any) {
    return Observable.throw(error.json() || 'Error lors du login');
  }
}
