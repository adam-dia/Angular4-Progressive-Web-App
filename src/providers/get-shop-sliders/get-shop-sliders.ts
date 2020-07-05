import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Config } from '../../models/Config';
import { Product } from '../../models/Products';

@Injectable()
export class GetShopSlidersProvider {

  public slide: any[];
  constructor(public http: Http) {
  }

  getShopSliders(param): Observable<any[]> {
    return this.http.post(Config.API_ROUTE.URL_SHOPIN_SLIDERS, param).map(
      data => {
        this.slide = data.json();
        return this.slide;
      }
    ).catch(this.catchError);
  }

  private catchError(error: Response | any) {
    return Observable.throw(error.json() || 'Error lors du login');
  }


}
