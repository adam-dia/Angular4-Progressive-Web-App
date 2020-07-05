import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Product } from '../../models/Products';
import { Config } from '../../models/Config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class WeekdealsProvider {

  dealProduct : Product[];
  constructor(public http: Http) {

  }
  getWeekDeals(): Observable<Product[]> {
    return this.http.get(Config.API_ROUTE.URL_WEEK_DEALS).map(response => {
      this.dealProduct = response.json();
      return this.dealProduct;
    })
  }

}
