import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class DeeplinkproviderProvider {

  constructor(public http: Http) {

  }
  getRootUrl()
  {
  }
}
