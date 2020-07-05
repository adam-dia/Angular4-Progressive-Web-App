import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../models/Config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FidelityProvider {

  constructor(public http: Http) {

  }

  registerFidelityCode(param) {
    return this.http.post(Config.API_ROUTE.URL_FIDELITY, param).map(data => {
      // console.log('Fidelity well recorded')
    },
    error => {
      // console.error('Error recording fidelity code')
  }
  ).catch(this.catchError)
  }

  private catchError(error: Response | any) {
    return Observable.throw(error.json() || 'Error d\'enregistrement address');
  }

}
