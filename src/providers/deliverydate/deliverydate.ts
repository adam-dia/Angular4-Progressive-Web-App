import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../../models/Config';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DeliverydateProvider {

  constructor(public http: Http) {

  }

  addDeliveryDate(param) {
    return this.http.post(Config.API_ROUTE.URL_DELIVERY_DATE, param).map(data => {
      // return console.log('Date registered');
    }).take(3).catch(this.catchError)
  }

  private catchError(error: Response | any) {
    return Observable.throw(error.json() || 'Error d\'enregistrement address');
  }
}
