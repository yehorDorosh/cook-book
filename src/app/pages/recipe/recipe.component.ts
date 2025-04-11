import { Component, Input } from '@angular/core';
import { API_MOCKS } from '../../utils/mocks/api';
import { type Recipe } from '../../components/create-recipe/recipe.model';
import { LayoutMainComponent } from '../../components/layout/layout-main/layout-main.component';
import { NgFor, NgIf } from '@angular/common';
import { CreateRecipeComponent } from '../../components/create-recipe/create-recipe.component';

@Component({
  selector: 'app-recipe',
  imports: [LayoutMainComponent, NgFor, CreateRecipeComponent, NgIf],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent {
  @Input() recipeId!: string;
  recipesAPI: { [key: string]: Recipe } = {};
  editState = false;

  ngOnInit(): void {
    this.recipesAPI = API_MOCKS.RECIPES_FROM_API;
  }

  get ingredientsList() {
    return Object.values(this.recipesAPI[this.recipeId].ingredients);
  }

  onEdit() {
    this.editState = !this.editState;
  }
}
