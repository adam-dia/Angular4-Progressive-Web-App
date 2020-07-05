import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Config } from '../../models/Config';
import { Product } from '../../models/Products';

@Injectable()
export class GetShopInProductsProvider {

  public products: Product[];
  constructor(public http: Http) {
  }

  getShopInProduct(param): Observable<Product[]> {
    return this.http.post(Config.API_ROUTE.URL_SHOPINSHOP_PRODUCTS, param).map(response => {
      this.products = response.json();
      // console.log('*** The provider product are **** ', this.products);
      return this.products;
    }).catch(this.catchError);
  }

  private catchError(error: Response | any) {
    return Observable.throw(error.json() || 'Error lors du login');
  }

}
