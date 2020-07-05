import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../models/Products';
import { Config } from '../../models/Config';
import 'rxjs/add/operator/map';

@Injectable()
export class SerchboxProvider {

  public product: Product[];
  constructor(public http: Http) {
  }

  findProduct(param): Observable<Product[]> {
    return this.http.post(Config.API_ROUTE.URL_SEARCH, param).map(response => {
      this.product = response.json();
      return this.product;
    }, (error) => {
      // console.log('Erreur de connexion');
    });
  }

}
