export interface WeatherApiResp {
  EpochTime: number;
  HasPrecipitation: boolean;
  IsDayTime: boolean;
  Link: string;
  LocalObservationDateTime: string;
  MobileLink: string;
  PrecipitationType: string;
  Temperature: {
    Metric: TempApiResp;
    Imperial: TempApiResp;
  };
  WeatherIcon: number;
  WeatherText: string;
}

export interface TempApiResp {
  Unit: 'C' | 'F';
  UnitType: number;
  Value: number;
}
