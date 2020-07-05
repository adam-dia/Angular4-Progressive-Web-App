import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Config } from '../../models/Config';
import { Product } from '../../models/Products';

@Injectable()
export class GetSingleProductProvider {

  public product: Product[];
  constructor(public http: Http) {
  }

  getSingleProduct(param): Observable<any[]> {
    return this.http.post(Config.API_ROUTE.URL_GET_PRODUCT_BY_ID, param).map(
      data => {
        this.product = data.json();
        return this.product;
      }
    ).catch(this.catchError);
  }

  private catchError(error: Response | any) {
    return Observable.throw(error.json() || 'Error lors du login');
  }

}
