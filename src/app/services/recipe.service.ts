import { Injectable } from '@angular/core';
import db from '../utils/firebase/db-firebase';
import {
  Recipe,
  RecipeResponse,
} from '../components/create-recipe/recipe.model';
import { isAppError } from '../utils/errors.model';
import { UserService } from './user.service';
import { Endpoints } from '../utils/firebase/api.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipes: RecipeResponse | null = null;

  constructor(private userService: UserService) {
    this.userService.onUserUpd.subscribe((user) => {
      this.getRecipes();
    });
  }

  async getRecipes() {
    if (!this.userService.user) return null;

    const response = await db.getData<RecipeResponse>(Endpoints.recipes);

    if (!isAppError(response)) {
      this.recipes = response;
      return response;
    }

    return null;
  }

  createRecipe(recipe: Recipe, id?: string, cb?: () => void) {
    if (!this.userService.user) return;

    db.sendData(Endpoints.recipes, recipe, id, () => {
      this.getRecipes();
    });

    if (cb) {
      cb();
    }
  }
}
