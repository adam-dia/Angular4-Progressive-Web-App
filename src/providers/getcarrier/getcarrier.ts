import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Config } from '../../models/Config';
import { Carrier } from '../../models/Carrier';

@Injectable()
export class GetcarrierProvider {

  public carrier:Carrier[];
  constructor(public http: Http) {
  }
  getCarrier(param): Observable<Carrier[]> {
    return this.http.post(Config.API_ROUTE.URL_GET_CARRIER, param).map(
      response => {
        this.carrier = response.json();
        return this.carrier;
      },
      error => {
        // console.log('Error loading carrier')
    }
    ).take(3).catch(this.catchError)
  }
  private catchError(error: Response | any) {
    return Observable.throw(error.json() || 'Error lors du login');
  }

}
