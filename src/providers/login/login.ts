import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Config } from '../../models/Config';
import { User } from '../../models/User';

@Injectable()
export class LoginProvider {

  public user: User[];
  constructor(public http: Http) {
  }

  login(data): Observable<User[]> {
    return this.http.post(Config.API_ROUTE.URL_LOGIN, data).map(response => {
      this.user = response.json();
      return this.user;
    }).catch(this.catchError).take(2);
   }

  private catchError(error: Response | any) {
    return Observable.throw(error.json() || 'Error lors du login');
  }


}
