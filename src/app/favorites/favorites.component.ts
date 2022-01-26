import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFavorites } from '../models/favorite.interface';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  // @Input()
  // favorite!: IFavorites;
  // @Input() favoriteIndex!: number;
  // @Input()
  // favoritesList: IFavorites[] = [];

  // @Output() onRemove: EventEmitter<number> = new EventEmitter();

  public favoritesList: IFavorites[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.favoritesService.setFavorites(this.favoritesList);
    console.log(
      'FavoritesComponent0',
      this.favoritesService.setFavorites(this.favoritesList)
    );

    this.favoritesList = this.favoritesService.getFavorites();
    console.log('FavoritesComponent1', this.favoritesList);

    this.favoritesService.favoriteSubject$.subscribe((data) => {
      this.favoritesList = this.favoritesService.getFavorites();
      console.log('FavoritesComponent1', this.favoritesList);
      // this.favoritesService.setFavorites(this.favoritesList);
      // console.log('FavoritesComponent', this.favoritesList);
      console.log('FavoritesComponent', data);
    });
  }

  // public remove() {
  //   this.onRemove.emit(this.favoriteIndex);
  //   console.log('remove');
  // }

  public getFavoritesList(): Array<IFavorites> {
    this.favoritesList = this.favoritesService.getFavorites();
    console.log('FavoritesComponent', this.favoritesList);
    return this.favoritesList;
  }
}
