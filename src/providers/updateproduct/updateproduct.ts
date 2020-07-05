import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../../models/Config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';


@Injectable()
export class UpdateproductProvider {

  constructor(public http: Http) {

  }

  updateProduct(param) {
    return this.http.post(Config.API_ROUTE.URL_UPDATE_PRODUCT, param).map(
      () => {
        // console.log('Product updated')
    },
      error => {}
    ).take(3).catch(this.catchError);
  }

  private catchError(error: Response | any){
    return Observable.throw(error.json() || "Problème de connexion Internet");
  }

}
