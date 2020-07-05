import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import { Product } from '../../models/Products';
import { Config } from '../../models/Config';


@Injectable()
export class ProductProvider {

  public products: Product[];
  constructor(public http: Http) {
  }
  getProducts(): Observable<Product[]> {
    return this.http.get(Config.API_ROUTE.URL_PRODUCTS).map(response => {
      this.products = response.json();
      return this.products;
    }).catch(this.catchError).take(3);
  }

  getProductsByCategories(data): Observable<Product[]> {
    return this.http.post(Config.API_ROUTE.URL_PRODUCTS, data).map(response => {
    // return this.http.post(Config.API_ROUTE.URL_GET_BY_CATEGORIES, data).map(response => {
      this.products = response.json();
      // console.log(this.products)
      return this.products;
    });
  }

  private catchError(error: Response | any){
    return Observable.throw(error.json() || "Problème de connexion Internet");
  }

}
