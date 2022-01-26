import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IFavorites } from '../models/favorite.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  public favoriteSubject$: Subject<IFavorites> = new Subject();

  private favoriteBehaviorSubject$: BehaviorSubject<any> = new BehaviorSubject(
    null
  );

  private _favorites: IFavorites[] = [];

  constructor() {}

  public setFavorite(favorite: IFavorites): void {
    this.favoriteSubject$.next(favorite);
  }

  public getFavorite(): Observable<IFavorites> {
    return this.favoriteBehaviorSubject$.asObservable();
  }

  public getFavorites(): IFavorites[] {
    return this._favorites;
  }

  public setFavorites(favorite: IFavorites[]): void {
    this._favorites = [...this._favorites, ...favorite];
  }
}
