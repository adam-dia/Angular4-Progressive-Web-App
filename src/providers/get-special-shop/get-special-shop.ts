import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { specialShop } from '../../models/specialShop';
import { Config } from '../../models/Config';
import { Observable } from '../../../node_modules/rxjs/Observable';

@Injectable()
export class GetSpecialShopProvider {

  public specialShop: specialShop[];
  constructor(public http: Http) {

  }

  getSpecialShops(): Observable<specialShop[]> {
    return this.http.get(Config.API_ROUTE.URL_SPECIAL_SHOP).map(data => {
      this.specialShop = data.json();
      return this.specialShop;
    })
  }

}
