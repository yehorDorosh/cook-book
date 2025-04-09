import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Recipe } from '../create-recipe/recipe.model';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  imports: [NgFor, RouterLink],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
})
export class RecipesListComponent implements OnChanges {
  @Input() list: { [key: string]: Recipe } = {};

  recipesFlat: Recipe[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.recipesFlat = Object.values(changes['list'].currentValue);
  }
}
