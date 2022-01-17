import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const locations = [
      { id: 11, name: 'Dr Nice', currentWeather: 'sunny' },
      { id: 12, name: 'Narco', currentWeather: 'sunny' },
      { id: 13, name: 'Bombasto', currentWeather: 'sunny' },
      { id: 14, name: 'Celeritas', currentWeather: 'sunny' },
      { id: 15, name: 'Magneta', currentWeather: 'sunny' },
      { id: 16, name: 'RubberMan', currentWeather: 'sunny' },
      { id: 17, name: 'Dynama', currentWeather: 'sunny' },
      { id: 18, name: 'Dr IQ', currentWeather: 'sunny' },
      { id: 19, name: 'Magma', currentWeather: 'sunny' },
      { id: 20, name: 'Tornado', currentWeather: 'sunny' },
    ];
    return { locations };
  }
}
