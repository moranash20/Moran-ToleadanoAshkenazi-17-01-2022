import {
  Injectable,
  ɵclearResolutionOfComponentResourcesQueue,
} from '@angular/core';
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

  public getRequest(url: string, q?: any) {
    const params = new HttpParams({ fromObject: { apikey: this.API_KEY, q } });
    return this.httpService.get(url, { params });
    //return this.httpService.get('../mock/CurrentConditions.json');
  }

  public getGeoPosition(lat: number, lng: number): Observable<any> {
    const url = this.geoPosition;
    return this.getRequest(url, `${lat},${lng}`);
  }

  public getAutoComplete(key: string): Observable<any> {
    return this.httpService.get(
      'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=FjttvB4XFLUwg6OFX5YSKb4eBKWGze8I&q=' +
        key
    );
  }

  public get5DaysOfForecasts(key: string): Observable<any> {
    return this.httpService.get(
      'http://dataservice.accuweather.com/forecasts/v1/daily/5day/1?apikey=FjttvB4XFLUwg6OFX5YSKb4eBKWGze8I'
    );
  }

  public getCurrentConditions(location: string): Observable<any> {
    return this.httpService.get(
      'http://dataservice.accuweather.com/currentconditions/v1/' +
        location +
        '?apikey=FjttvB4XFLUwg6OFX5YSKb4eBKWGze8I'
    );
  }
}
