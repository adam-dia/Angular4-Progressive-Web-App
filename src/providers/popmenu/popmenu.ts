import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../models/Config';
import { PopMenu } from '../../models/PopMenu';
import 'rxjs/add/operator/map';

@Injectable()
export class PopmenuProvider {
  menu: PopMenu[];
  constructor(public http: Http) {
    // console.log('Hello PopmenuProvider Provider');
  }
  getTopMenu(){
    return this.http.get(Config.API_ROUTE.URL_TOP_MENU).map(data => {
      this.menu = data.json();
      return this.menu;
    }).take(2).catch(this.catchError)
  }

  private catchError(error: Response | any){
    return Observable.throw(error.json() || "Problème de connexion Internet");
  }

}
