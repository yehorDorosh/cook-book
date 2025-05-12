import { Component, Input } from '@angular/core';
import { LayoutMainComponent } from '../../components/layout/layout-main/layout-main.component';
import { NgFor, NgIf } from '@angular/common';
import { CreateRecipeComponent } from '../../components/create-recipe/create-recipe.component';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe',
  imports: [LayoutMainComponent, NgFor, CreateRecipeComponent, NgIf],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent {
  @Input() recipeId!: string;
  editState = false;

  constructor(private recipeService: RecipeService, private router: Router) {}

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

  onDelete() {
    if (!this.recipeId || !this.recipes) return;
    const recipe = this.recipes[this.recipeId];

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this recipe?'
    );
    if (confirmDelete) {
      this.recipeService.deleteRecipe(this.recipeId, () => {
        this.router.navigate(['/'], { replaceUrl: true });
        console.log(`Recipe with ID ${this.recipeId} has been deleted.`);
      });
    }
  }
}
