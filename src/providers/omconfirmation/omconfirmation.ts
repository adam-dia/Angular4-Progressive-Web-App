import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Config } from '../../models/Config';
import { OmModel } from '../../models/OmModel';

@Injectable()
export class OmconfirmationProvider {

  public confirm : OmModel[];
  constructor(public http: Http) {
  }
  getConfirmation(param):Observable<OmModel[]> {
    return this.http.post(Config.API_ROUTE.URL_OM_CONFIRMATION, param).map(
      data => {
        this.confirm = data.json();
      return this.confirm;
      },
      error => {
        // console.log('Error confirmaing')
    }
    ).catch(this.catchError).take(2)
  }
  private catchError(error: Response | any) {
    return Observable.throw(error.json() || 'Error lors du login');
  }

}
