import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../models/Config';
import { Product } from '../../models/Products';
import 'rxjs/add/operator/map';


@Injectable()
export class PopularproductProvider {

  popularProducts: Product[];
  constructor(public http: Http) {
  }

  getPopularProduct(): Observable<Product[]> {
    return this.http.get(Config.API_ROUTE.URL_POPULAR_PRODUCTS).map(response => {
      this.popularProducts = response.json();
      return this.popularProducts;
    })
  }

}
