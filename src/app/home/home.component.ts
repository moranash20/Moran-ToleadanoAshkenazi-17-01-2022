import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Geolocation } from '../modals/geolocation.interface';

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

  constructor(private WeatherService: WeatherService) {}

  ngOnInit(): void {
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

  // private handleInitPosition(geoPositionRes: GeoPositionRes) {
  //   this.cityName = `${geoPositionRes.ParentCity.EnglishName},${geoPositionRes.Country.EnglishName}`;
  //   this.WeatherService
  //     .get5DaysOfForecasts(geoPositionRes.Key)
  //     .subscribe((fiveDaysForecastData: FiveDaysForecast) => {
  //       this.headLine = fiveDaysForecastData.Headline.Text;
  //       this.forecasts = fiveDaysForecastData.DailyForecasts;
  //     });
  // }
}
