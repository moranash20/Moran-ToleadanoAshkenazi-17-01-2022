import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export const currCon: any = [
  {
    LocalObservationDateTime: '2022-01-18T09:32:00+01:00',
    EpochTime: 1642494720,
    WeatherText: 'Fog',
    WeatherIcon: 11,
    HasPrecipitation: false,
    PrecipitationType: null,
    IsDayTime: true,
    Temperature: {
      Metric: {
        Value: 0.9,
        Unit: 'C',
        UnitType: 17,
      },
      Imperial: {
        Value: 34,
        Unit: 'F',
        UnitType: 18,
      },
    },
    MobileLink:
      'http://www.accuweather.com/en/ch/meisterschwanden/1/current-weather/1?lang=en-us',
    Link: 'http://www.accuweather.com/en/ch/meisterschwanden/1/current-weather/1?lang=en-us',
  },
];
