import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Geolocation } from '../models/geolocation.interface';
import { keyframes, state } from '@angular/animations';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  filter,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { WeatherApiResp } from '../models/wheatherApiResp';
import { Time } from '@angular/common';
import { IFavorites } from '../models/favorite.interface';
import { FavoritesService } from '../services/favorites.service';
import { ActivatedRoute } from '@angular/router';
import { AW_LocationData } from '../models/locationData.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public DEFAULT_LAT: number = 32.109333;
  public DEFAULT_LNG: number = 34.855499;
  public cityName!: string;
  public cityKey!: string;
  public startChar!: string;
  searchForm = new FormControl();
  public currentCelsiusDeg!: number;
  public currentFahrenheitDeg!: number;
  public celsiusFahrenheit: boolean = true;
  public weatherData: any;
  public autoCompleteInput: Subject<string> = new Subject<string>();
  public ngUnSubscribe: Subject<void> = new Subject<void>();
  public isFavorite: boolean = false;
  public currentTime = new Date();
  public currentWeatherStaus: string | undefined;
  public favoritesList: IFavorites[] = [];

  public weatherSearchForm!: FormGroup;

  public weather$?: Observable<WeatherApiResp>;

  public autoCompletedSuggestions: string = '';

  private results?: AW_LocationData[];

  @Output() placeSelected = new EventEmitter<string>();

  filteredOptions$: Observable<string[]> = this.searchForm.valueChanges.pipe(
    debounceTime(1000),
    switchMap((value) => this.WeatherService.getAutoComplete(value)),
    map((values) => {
      this.results = values;
      return values.map((v: { LocalizedName: any }) => v.LocalizedName);
    })
  );

  constructor(
    private WeatherService: WeatherService,
    private favoritesService: FavoritesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.params.pipe(
    //   map(params => params.key),
    // )

    this.autoCompleteInput
      .pipe(
        filter((data: string) => data.length > 0),

        takeUntil(this.ngUnSubscribe),
        debounceTime(300),
        switchMap((data: string) => {
          console.log('getAutoComplete', data);
          return this.WeatherService.getAutoComplete(data);
        })
      )
      .subscribe((dataSuggestions) => {
        this.autoCompletedSuggestions = dataSuggestions;
      });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log('latitude', position.coords.latitude);
        console.log('longitude', position.coords.longitude);
        this.weather$ = this.WeatherService.getGeoPosition(
          latitude,
          longitude
        ).pipe(
          tap(console.log),
          switchMap((data) => {
            this.cityName = data.LocalizedName;
            this.cityKey = data.Key;
            console.log('cityKey', this.cityKey);

            return this.WeatherService.getCurrentConditions(data.Key).pipe(
              filter((data) => !!data),
              tap((data) => {
                this.currentTime = data[0].LocalObservationDateTime;
                this.currentCelsiusDeg = data[0].Temperature.Metric.Value;
                this.currentFahrenheitDeg = data[0].Temperature.Imperial.Value;
                this.currentWeatherStaus = data[0].WeatherText;
                this.favoritesService.favoriteSubject$.pipe(
                  filter(data),
                  map((data) => {
                    console.log('map', data);
                    this.addToFavoritesList(data);
                  })
                );
                this.favoritesService.favoriteSubject$.subscribe((data) => {
                  console.log('subscribe', data);

                  this.addToFavoritesList(data);
                });
              })
            );
          })
        );
      });
    } else {
      this.WeatherService.getGeoPosition(
        this.DEFAULT_LAT,
        this.DEFAULT_LNG
      ).subscribe((data) => {
        this.cityName = data.LocalizedName;
        console.log('data', data);
      });
    }
  }

  selectPlace(name: string) {
    const place = this.results?.find((place) => place.LocalizedName === name);
    if (place) {
      this.placeSelected.emit(place.Key);
    }
  }

  public toggleCelsiusFahrenheitv(): boolean {
    return (this.celsiusFahrenheit = !this.celsiusFahrenheit);
  }

  public getCurrenLocationDetail(): any {
    return this.WeatherService.getCurrentConditions(this.weatherData);
  }

  public clickFavoritesButton(cityName: string): boolean {
    let cityIndex: number = 0;
    // console.log(this.isFavorite);
    if (!this.isFavorite) cityIndex = this.addToFavoritesList(cityName);
    else this.removeFavorite(cityIndex);
    return this.isFavorite;
  }

  public addToFavoritesList(data: any): number {
    console.log('addToFavoritesList');
    // this.favoritesService.favoriteSubject$.subscribe((data) => {
    //   console.log('favoritesList', data);

    // });
    // this.isFavorite = true;

    // this.favoritesList.push(cityName);
    // console.log('favoritesList', this.favoritesList);
    // console.log('city index', this.favoritesList.findIndex(cityName));
    console.log(data);
    this.favoritesList.push(data);
    this.favoritesService.setFavorites(this.favoritesList);
    this.isFavorite = true;
    return this.favoritesList.length;
  }

  public removeFavorite(favoriteIndex: any): void {
    console.log('removeFavorite');
    if (this.isFavorite) {
      this.isFavorite = false;
      this.favoritesList.splice(favoriteIndex, 1);
    }
  }

  // public deleteFavorite(favoriteIndex: number): void {
  //   this.favoritesList.splice(favoriteIndex, 1);
  // }
}
