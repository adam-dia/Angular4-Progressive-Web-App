import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../models/Products';
import { Config } from '../../models/Config';
import 'rxjs/add/operator/map';

@Injectable()
export class RecommandProdProvider {

  public product: Product[];
  constructor(public http: Http) {
    // console.log('Hello RecommandProdProvider Provider');
  }

  getRecommandedProduct(param): Observable<Product[]> {
    return this.http.post(Config.API_ROUTE.URL_RECOMMANDE_PROD, param).map(data => {
      this.product = data.json();
      return this.product;
    })
  }

}
