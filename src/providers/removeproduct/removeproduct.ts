import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../models/Config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';

@Injectable()
export class RemoveproductProvider {

  constructor(public http: Http) {

  }
  removeProd(param) {
    return this.http.post(Config.API_ROUTE.URL_REMOVE_PRODUCT, param).map(
      data => {
        // console.log('Product removed')
    },
      error => {
        // console.log('Impossible to uupdae product')
    }
    ).take(3).catch(this.catchError);
  }
  private catchError(error: Response | any){
    return Observable.throw(error.json() || "Problème de connexion Internet");
  }
}
