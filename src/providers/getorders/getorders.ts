import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import { Config } from '../../models/Config'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Panel } from '../../models/Panel';

@Injectable()
export class GetordersProvider {

  public panel:Panel[];
  constructor(public http: Http) {
  }
  getOders(param): Observable<Panel[]> {
    return this.http.post(Config.API_ROUTE.URL_USER_ORDERS, param).map(response => {
      this.panel = response.json();
      return this.panel;
    }).catch(this.catchError).take(2);
  }

  private catchError(error: Response | any) {
    return Observable.throw(error.json() || 'Error lors du login');
  }

}
