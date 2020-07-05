import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../models/Products';
import { Config } from '../../models/Config';

@Injectable()
export class GetcategoryproductProvider {

  public product: Product[];
  constructor(public http: Http) {
  }

  getCategoryProduct(params):Observable<Product[]> {
    return this.http.post(Config.API_ROUTE.URL_PRODUCTS, params).map(response => {
      this.product = response.json();
      return this.product;
    }).catch(this.catchError)
  }
  private catchError(error: Response | any) {
    return Observable.throw(error.json() || 'Error lors du login');
  }


}
