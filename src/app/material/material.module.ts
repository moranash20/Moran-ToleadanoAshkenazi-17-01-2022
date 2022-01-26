import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

const modules: any = [
  MatInputModule,
  BrowserModule,
  BrowserAnimationsModule,
  MatRadioModule,
  MatIconModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: modules,
})
export class MaterialModule {}
