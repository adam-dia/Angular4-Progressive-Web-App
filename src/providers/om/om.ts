import { Injectable } from '@angular/core';
import { Http,Response, Headers, RequestOptions } from '@angular/http';
import { Config } from '../../models/Config';
import { Token } from '../../models/Token';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OmProvider {

  public headers = new Headers();
  // public token:Token[];
  public token;
  constructor(public http: Http) {
  }
  getToken(post):Observable<any> {

    let options = new RequestOptions({
      // headers: new Headers({
      //   'Accept': 'application/x-www-form-urlencoded',
      // })
    });

    // return this.http.post(Config.API_ROUTE.URL_OM, post, options).map(
    return this.http.post(Config.API_ROUTE.URL_OM, post).map(
      data => {
        this.token = data.json();
        return this.token;
      },
      error => {
        // console.log('No Service data avalable')
    }
    ).take(2).catch(this.catchError)
  }

  private catchError(error: Response | any) {
    return Observable.throw(error.json() || 'Error lors du login');
  }


}
