import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../models/Config';
import { PromoBanner } from '../../models/PromoBanner';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PromobanertopProvider {

  banner: PromoBanner[];

  constructor(public http: Http) {
  }

  getBanner(): Observable<PromoBanner[]> {
    return this.http.get(Config.API_ROUTE.URL_TOP_PROMO_BANNER).map(response => {
      this.banner = response.json();
      return this.banner;
    })
  }

}
