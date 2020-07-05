import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../models/Config';
import { Orders } from '../../models/Orders';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';


@Injectable()
export class ConfirmorderProvider {

  public order: Orders[]
  constructor(public http: Http) {

  }
  confirmOrder(param): Observable<Orders[]> {
    return this.http.post(Config.API_ROUTE.URL_CONFIRM_ORDER, param).map( data => {
       this.order = data.json();
       return this.order;
      },
      error => {
        // console.log('Error finalizing order')
    }
    ).take(3).catch(this.catchError)
  }
  private catchError(error: Response | any) {
    return Observable.throw(error.json() || 'Error d\'enregistrement address');
  }
}
