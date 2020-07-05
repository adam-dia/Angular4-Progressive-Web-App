import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../../models/Config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class CartproductsProvider {

  public msg: string;
  constructor(public http: Http) {

  }
  AddProductToCart(param) {
    return this.http.post(Config.API_ROUTE.URL_ADD_CART_PRODUCTS, param).map(response => {

    }).catch(this.catchError);
  }

  private catchError(error: Response | any) {
    return Observable.throw(error.json() || 'Erreur lors de la création du panier');
  }

}
