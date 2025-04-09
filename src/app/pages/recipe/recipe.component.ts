import { Component, Input } from '@angular/core';
import { API_MOCKS } from '../../utils/mocks/api';
import { type Recipe } from '../../components/create-recipe/recipe.model';
import { LayoutMainComponent } from '../../components/layout/layout-main/layout-main.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-recipe',
  imports: [LayoutMainComponent, NgFor],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent {
  recipesAPI: { [key: string]: Recipe } = {};
  @Input() recipeId!: string;

  ngOnInit(): void {
    this.recipesAPI = API_MOCKS.RECIPES_FROM_API;
    console.log(this.recipeId);
  }

  get ingredientsList() {
    return Object.values(this.recipesAPI[this.recipeId].ingredients);
  }
}
