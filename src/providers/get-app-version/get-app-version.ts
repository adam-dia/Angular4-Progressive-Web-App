import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class GetAppVersionProvider {

  constructor(public http: Http) {
    // console.log('Hello GetAppVersionProvider Provider');
  }

}
