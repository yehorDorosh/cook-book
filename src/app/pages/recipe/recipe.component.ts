import { Component, Input } from '@angular/core';
import { LayoutMainComponent } from '../../components/layout/layout-main/layout-main.component';
import { NgFor, NgIf } from '@angular/common';
import { CreateRecipeComponent } from '../../components/create-recipe/create-recipe.component';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe',
  imports: [LayoutMainComponent, NgFor, CreateRecipeComponent, NgIf],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent {
  @Input() recipeId!: string;
  editState = false;

  constructor(private recipeService: RecipeService) {}

  get ingredientsList() {
    if (this.recipes) {
      return Object.values(this.recipes[this.recipeId].ingredients);
    }
    return null;
  }

  onEditClick() {
    this.editState = !this.editState;
  }

  get recipes() {
    return this.recipeService.recipes;
  }

  onEdit() {
    this.editState = false;
  }
}
