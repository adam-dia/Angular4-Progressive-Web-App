import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../models/Config';
import { PopCategories } from '../../models/PopCategorie'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class PopularcategorieProvider {

  categories: PopCategories[];
  constructor(public http: Http) {
  }

  getPopCategorie(): Observable<PopCategories[]>{
    return this.http.get(Config.API_ROUTE.URL_POP_CATEGORIE).map(response => {
      this.categories = response.json();
      return this.categories;
    }).catch(this.catchError).take(3);
  }

  private catchError(error: Response | any){
    return Observable.throw(error.json() || "Problème de connexion Internet");
  }

}
