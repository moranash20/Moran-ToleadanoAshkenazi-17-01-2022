import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Geolocation } from '../modals/geolocation.interface';
import { state } from '@angular/animations';
import { Subject } from 'rxjs';
import { debounceTime, filter, switchMap, takeUntil } from 'rxjs/operators';
// import { FormControl, FormGroup } from '@angular/forms';
import { currCon } from '../MOCK/CurrentConditions.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public DEFAULT_LAT: number = 32.109333;
  public DEFAULT_LNG: number = 34.855499;
  public cityName: string = '';
  public headLine: string = '';
  public forecasts: string = '';
  public celsiusFahrenheit: boolean = true;
  public weatherData: any;
  public autoCompleteInput: Subject<string> = new Subject<string>();
  public ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(
    private WeatherService: WeatherService // public weatherSearchForm: FormGroup
  ) {}

  ngOnInit(): void {
    this.WeatherService.getCurrentConditions(this.cityName).subscribe(
      (data) => {
        this.cityName = data;
        console.log('city', this.cityName);
      }
    );
    // this.autoCompleteInput.pipe(
    //   filter((data: string) => data.length > 0),
    //   takeUntil(this.ngUnSubscribe),
    //   debounceTime(300),
    //   switchMap((data: string) => {
    //     return this.WeatherService.getAutoComplete(data);
    //   })
    // );
    // .subscribe((suggestions: AutoCompleteSuggestions[]) => {
    //   this.autoCompletedSuggestions = suggestions;
    // });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log('latitude', latitude);
        console.log('longitude', longitude);
        this.WeatherService.getGeoPosition(latitude, longitude).subscribe(
          (data) => {
            console.log('data', data);
            //this.handleInitPosition(data);
          }
        );
      });
    } else {
      this.WeatherService.getGeoPosition(
        this.DEFAULT_LAT,
        this.DEFAULT_LNG
      ).subscribe((data) => {
        console.log('data', data);
        //this.handleInitPosition(data);
      });
    }
  }

  public getCurrentWeather(formValues: any) {
    this.WeatherService.getCurrentConditions(formValues.location).subscribe(
      (data) => {
        this.weatherData = data;
        console.log('weatherData', this.weatherData);
      }
    );
  }

  // private handleInitPosition(geoPositionRes: GeoPositionRes) {
  //   this.cityName = `${geoPositionRes.ParentCity.EnglishName},${geoPositionRes.Country.EnglishName}`;
  //   this.WeatherService
  //     .get5DaysOfForecasts(geoPositionRes.Key)
  //     .subscribe((fiveDaysForecastData: FiveDaysForecast) => {
  //       this.headLine = fiveDaysForecastData.Headline.Text;
  //       this.forecasts = fiveDaysForecastData.DailyForecasts;
  //     });
  // }

  public toggleCelsiusFahrenheitv(): boolean {
    return (this.celsiusFahrenheit = !this.celsiusFahrenheit);
  }
}
