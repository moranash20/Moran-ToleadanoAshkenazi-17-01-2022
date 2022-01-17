import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
//import {API_KEY} from '../models/api.interface'

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  public API_KEY: string = 'FjttvB4XFLUwg6OFX5YSKb4eBKWGze8I';

  private locationAutocomplete: string =
    'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
  private daysOfForecasts: string =
    'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
  private currentCondition: string =
    'http://dataservice.accuweather.com/currentconditions/v1/';
  private geoPosition: string =
    'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search';

  constructor(private httpService: HttpClient) {}

  // public getWeather(location: string) {
  //   return this.httpService.get(
  //     // 'https://api.apixu.com/v1/' + location
  //     'https://api.apixu.com/v1/current.json?key=YOUR_API_KEY&q=' + location
  //   );
  // }

  public getRequest(url: string, q?: string) {
    const params = new HttpParams({ fromObject: { apikey: this.API_KEY } });
    return this.httpService.get(url, { params });
  }

  public getGeoPosition(lat: number, lng: number): Observable<any> {
    const url = this.geoPosition;
    console.log('lat, lng', `${lat},${lng}`);
    console.log('url', url);
    return this.getRequest(url, `${lat},${lng}`);
  }

  public getAutoComplete(key: string): Observable<any> {
    const url = this.locationAutocomplete;
    return this.getRequest(url, `${key}`);
  }

  public get5DaysOfForecasts(key: string): Observable<any> {
    const url = this.daysOfForecasts + { key };
    return this.getRequest(url);
  }

  public getCurrentConditions(key: string): Observable<any> {
    const url = this.currentCondition + { key };
    return this.getRequest(url);
  }
}
