import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import { Product } from '../../models/Products';
import { Config } from '../../models/Config';

@Injectable()
export class PaymentPageProvider {

  public banner:any
  constructor(public http: Http) {
  }

  getPaymentPage(): Observable<any> {
    return this.http.get(Config.API_ROUTE.URL_PAYEMENT).map( response => {
      this.banner = response.json();
      return this.banner;
    }).catch(this.catchError);
  }
  private catchError(error: Response | any){
    return Observable.throw(error.json() || "Problème de connexion Internet");
  }

}
