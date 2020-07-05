import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../models/Config';
import { Cart } from '../../models/Cart';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AddtocartProvider {

  public cart: Cart[];
  constructor(public http: Http) {

  }

  addTocart(params): Observable<Cart[]> {
    return this.http.post(Config.API_ROUTE.URL_ADDTOCART, params).map(response => {
      this.cart = response.json();
      return this.cart;
    }).catch(this.catchError);
  }

  private catchError(error: Response | any) {
    return Observable.throw(error.json() || 'Erreur lors de la création du panier');
  }


}
