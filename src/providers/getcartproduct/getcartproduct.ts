import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import { Config } from '../../models/Config';
import { ProductCart } from '../../models/ProductCart';

@Injectable()
export class GetcartproductProvider {

  public products:ProductCart[];

  constructor(public http: Http) {
  }
  getAllCartProducts(param): Observable<ProductCart[]> {
    return this.http.post(Config.API_ROUTE.URL_GET_CART_PRODUCT, param).map( response => {
      this.products = response.json();
      return this.products;
    }).take(4).catch(this.catchError);
  }
  private catchError(error: Response | any){
    return Observable.throw(error.json() || "Problème de connexion Internet");
  }
}
