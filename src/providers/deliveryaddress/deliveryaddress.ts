import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../../models/Config';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DeliveryaddressProvider {

  constructor(public http: Http) {

  }

  addDeliveryAddress(param) {
    return this.http.post(Config.API_ROUTE.URL_DELIVERY_ADDRESS, param).map(response => {
      return response;
    }).take(3).catch(this.catchError);
  }

  private catchError(error: Response | any) {
    return Observable.throw(error.json() || 'Error d\'enregistrement address');
  }

}
