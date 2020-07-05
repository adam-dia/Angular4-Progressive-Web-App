import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Config } from '../../models/Config';

@Injectable()
export class VerifProductProvider {

  public shop;
  constructor(public http: Http) {
    // console.log('Hello VerifProductProvider Provider');
  }

  verfiProduct(param):Observable<any[]> {
    return this.http.post(Config.API_ROUTE.URL_VERIF_PRODUCT, param).map(data => {
      this.shop = data.json();
      return this.shop;
    }).catch(this.catchError);
  }

  private catchError(error: Response | any) {
    return Observable.throw(error.json() || 'Error lors du login');
  }


}
