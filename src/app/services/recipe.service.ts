import { Injectable } from '@angular/core';
import db from '../utils/firebase/db-firebase';
import { RecipeResponse } from '../components/create-recipe/recipe.model';
import { isAppError } from '../utils/errors.model';
import { UserService } from './user.service';
import auth from '../utils/firebase/auth-firebase';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipes: RecipeResponse | null = null;

  constructor(private userService: UserService) {
    this.userService.onUserUpd.subscribe((user) => {
      this.getRecipes().then((response) => {
        this.recipes = response;
      });
    });
  }

  async getRecipes() {
    if (!this.userService.user) return null;

    const response = await db.getData<RecipeResponse>('recipe/');

    if (!isAppError(response)) {
      return response;
    }

    return null;
  }
}
