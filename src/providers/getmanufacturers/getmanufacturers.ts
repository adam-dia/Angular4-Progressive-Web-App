import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Config } from '../../models/Config';
import { Product } from '../../models/Products';

@Injectable()
export class GetmanufacturersProvider {

  public product: Product[];
  constructor(public http: Http) {
  }

  getManufacturerProducts(param): Observable<Product[]> {
    return this.http.post(Config.API_ROUTE.URL_MANUFAC_PRODS, param).map( response => {
      this.product = response.json();
      return this.product;
    }).catch(this.catchError);
  }

  private catchError(error: Response | any){
    return Observable.throw(error.json() || "Problème de connexion Internet");
  }
}
