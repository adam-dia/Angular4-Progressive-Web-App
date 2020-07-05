import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Categorie } from '../../models/Categories'
import { Config } from '../../models/Config';
import 'rxjs/add/operator/map';

@Injectable()
export class CategorieProvider {

  public categories: Categorie[];
  constructor(public http: Http) {
    // console.log('Hello CategorieProvider Provider');
  }

  getCategories():Observable<Categorie[]> {
    return this.http.get(Config.API_ROUTE.URL_CATEGORIES).map(response => {
      this.categories = response.json();
      return this.categories;
    });
  }


}
