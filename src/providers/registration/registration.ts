import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../models/Config';
import { Customer } from '../../models/Customer';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class RegistrationProvider {
  customer: Customer[];
  constructor(public http: Http) {
  }
  register(params): Observable<Customer[]>{
    return this.http.post(Config.API_ROUTE.URL_REGISTER, params).map( data => {
      this.customer = data.json();
    }).catch(this.catchError);
  }
  private catchError(error: Response | any){
    return Observable.throw(error.json() || "Problème de connexion Internet");
  }

}
