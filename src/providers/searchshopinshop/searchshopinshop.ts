import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../models/Products';
import { Config } from '../../models/Config';
import 'rxjs/add/operator/map';
/*
  Generated class for the SearchshopinshopProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchshopinshopProvider {

  public shops: any[];

  constructor(public http: Http) {
    console.log('Hello SearchshopinshopProvider Provider');
  }

  findShop(param): Observable<Product[]> {
    return this.http.post(Config.API_ROUTE.URL_SEARCH_SPECIAL_SHOP, param).map(response => {
      this.shops = response.json();
      return this.shops;
    }, (error) => {
      // console.log('Erreur de connexion');
    });
  }

}
