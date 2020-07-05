import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Sliders } from '../../models/Sliders';
import { Config } from '../../models/Config';

@Injectable()
export class SliderProvider {

  public slides: Sliders[];

  constructor(public http: Http) {
  }

  getAllSliders(): Observable<Sliders[]> {
    return this.http.get(Config.API_ROUTE.URL_SLIDERS).map(response => {
      this.slides = response.json();
      return this.slides;
    })
  }

}
