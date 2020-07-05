import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../models/Config';
import { Shops } from '../../models/Shops';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GetshopProvider {

  public shops:Shops[];
  constructor(public http: Http) {
  }

  getShops(): Observable<Shops[]> {
    return this.http.get(Config.API_ROUTE.URL_GET_SHOPS).map(
      data => {
        this.shops = data.json();
        return this.shops;
      }
    ).take(3).catch(this.catchError)
  }

  private catchError(error: Response | any) {
    return Observable.throw(error.json() || 'Error d\'enregistrement address');
  }

}
