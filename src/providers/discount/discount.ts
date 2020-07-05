import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Discount } from '../../models/Discount';
import { Config } from '../../models/Config';

@Injectable()
export class DiscountProvider {
  public discount: Discount[];
  constructor(public http: Http) {

  }
  getDiscount(param):Observable<Discount[]> {
    return this.http.post(Config.API_ROUTE.URL_DISCOUNT, param).map(
      data => {
        this.discount = data.json();
        return this.discount;
      },
      error => {
        // console.log('ERROR ON DISCOUNT')
    }
    ).take(3)
  }
  private catchError(error: Response | any) {
    return Observable.throw(error.json() || 'Error lors du login');
  }

}
